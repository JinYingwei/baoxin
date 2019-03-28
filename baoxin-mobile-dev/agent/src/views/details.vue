<template>
  <div>
    <van-tabs v-model="active" sticky class='learn-tab' id="learn-tab" color="#4e8cee" @click="onClick">
      <van-tab title='0'>
        <div slot="title">
          <van-icon name="pending-evaluate" />
          <em>观念</em>
        </div>
      </van-tab>
      <van-tab title='1'>
        <div slot="title">
          <van-icon name="contact" />
          <em>获客</em>
        </div>
      </van-tab>
      <van-tab title='2'>
        <div slot="title">
          <van-icon name="exchange" />
          <em>产品</em>
        </div>
      </van-tab>
      <van-tab title='3'>
        <div slot="title">
          <van-icon name="question" />
          <em>问答</em>
        </div>
      </van-tab>
    </van-tabs>
    <br>
    <div class="center">
      <!-- <h2 class="title">{{ content.title }}</h2>
      <h4>{{ content.createTime }}</h4> -->
      <div class="learn-top">
        <div class="title">
          <img src="../assets/img/logo.png">
          <strong>保信云顾问</strong>
          <strong><a href="#card">{{ userName }}</a> </strong>
        </div>
        <div class="article-title">
          <h3>{{ content.title }}</h3>
          <p><strong class="createTime">{{ content.createTime }}</strong><strong v-show="content.copyfrom">转自 {{ content.copyfrom }}</strong></p>
        </div>
      </div>
      <br>
      <div class="detailsConte" v-html="content.content">
        {{ content.content }}
      </div>
      <br>
      <br>
      <iframe id="consult" height="500px" src="http://ii.sinelinked.com/sub/consult/" frameborder="0"></iframe>
      <p id="card" class="wxCodeTitle">长按识别进入顾问名片</p>
      <img class="qrCodePath" :src="qrCodePath">
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      userId:"",
      userName: "",
      active: "0",
      content: {},
      timestamp: "",
      nonceStr: "",
      signature: "",
      id: 0,
      qrCodePath: ""
    };
  },
  created() {
    var id = this.$route.query.id;
    this.id = this.$route.query.id;
    var title = this.$route.query.title;
		console.log(title);
    switch (title) {
      case '0':
        this.active = '0'
        break;
      case '1':
        this.active = '1'
         break;
      case '2':
        this.active = '2'
         break;
      case '3':
        this.active = '3'
         break;
      default:
        break;
    }
    this.searchArtById(id);
    this.search();
  },
  mounted: function() {
    // 如果分享来源进入，则隐藏底部
    if (this.$route.query.from == "singlemessage") {
      this.$nextTick(function() {
        var vanTabbar = document.querySelector(".van-tabbar");
        var learnTab = document.querySelector("#learn-tab");
        vanTabbar.style.display = "none";
        learnTab.style.display = "none";
      });
    }

    this.shareArt();
  },
  methods: {
    searchArtById(id) {
      this.axios({
        method: "get",
        url: baseURL + "/api/cms/searchArtById",
        params: {
          id: id
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            this.content = result.data.data;
          }
        })
        .catch(err => {});
    },
    onClick(index, title) {
      this.$router.push({ path: "/learn", query: { tabId: title } });
    },
    //内容转发
    shareArt() {
      // let currentUrl = encodeURIComponent(window.location.href.split("#")[0]);
      let currentUrl = window.location.href.split("#")[0];
      this.axios({
        method: "get",
        url: baseURL + "/api/cms/shareArt",
        params: {
          url: currentUrl
        }
      })
        .then(result => {
          this.timestamp = result.data.data.timestamp;
          this.nonceStr = result.data.data.nonce_str;
          this.signature = result.data.data.sha1Data;

          this.share();
        })
        .catch(err => {});
    },
    share(data) {
      var that = this;
      wx.config({
        // debug: true,
        // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: "wxe606548e5709ce55", // 必填，公众号的唯一标识
        timestamp: this.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.nonceStr, // 必填，生成签名的随机串
        signature: this.signature, // 必填，签名，见附录1
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "updateAppMessageShareData"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      wx.ready(function() {
        wx.updateAppMessageShareData(
          {
            title: that.content.title+'保信云顾问', // 分享标题
            desc: that.content.description, // 分享描述
            link:
              "http://ii.sinelinked.com/sub/article/details/?articleId=" +that.id +"&userId="+that.userId,
            imgUrl: "http://ii.sinelinked.com/lib/img/logo.png" // 分享图标
          },
          function(res) {
            alert("成功");
            //这里是回调函数
          }
        );
      });

      wx.error(function(res) {
        alert("微信验证失败");
        alert(JSON.stringify(res));
      });
    },
    //查询顾问信息
    search() {
      this.axios({
        method: "get",
        url: baseURL + "/api/agent/search"
      })
        .then(result => {
          if (result.data[0]) {
            this.qrCodePath = result.data[0].qrCodePath;
            this.userName = result.data[0].userName;
             this.userId = result.data[0].userId;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.center {
  width: 94%;
  margin: 0 auto;
  padding: 0.4rem /* 30/75 */;
  box-sizing: border-box;
  border-radius: 0.266667rem /* 20/75 */;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0 0.333333rem /* 25/75 */ rgba(0, 0, 0, 0.3);
}
.learn-tab em {
  font-style: normal;
  vertical-align: middle;
}

.learn-tab .van-icon {
  vertical-align: middle;
}
.wxCodeTitle {
  text-align: center;
}
.qrCodePath {
  width: 60%;
  display: block;
  margin: 0 auto;
}
.learn-top {
}
.learn-top .title {
  line-height: 0.813333rem /* 61/75 */;
  display: flex;
}
.learn-top .title img {
  width: 0.853333rem /* 64/75 */;
  height: 0.813333rem /* 61/75 */;
  vertical-align: middle;
}
.learn-top .title strong {
  vertical-align: middle;
  flex: 2;
  text-align: left;
  padding-left: 0.266667rem /* 20/75 */;
}
.learn-top .title strong:last-child {
  text-align: left;
  flex: 3;
  padding-left: 0;
}
.learn-top .title strong:last-child a {
  color: #5994f1;
}
.createTime {
  padding-right: 0.4rem /* 30/75 */;
  color: #878787;
}
.article-title h3 {
  font-size: 0.48rem /* 36/75 */;
}
#consult {
  width: 100%;
}
</style>