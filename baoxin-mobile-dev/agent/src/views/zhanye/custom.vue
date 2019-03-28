<template>
  <div>

    <!-- 顶部tabs -->
    <div class="topTabs">
      <div class="items" :class="{active:topTabsActive==0}" @click="tabChange(0)">
        <i class="iconfont icon-dingdan"></i>
        <span>海报</span>
      </div>
      <div class="items" :class="{active:topTabsActive==1}" @click="tabChange(1)">
        <i class="iconfont icon-ic_history"></i>
        <span>H5</span>
      </div>
    </div>
    <!-- 海报 -->
    <div v-show="topTabsActive == 0">
      <div class="center shadow-box">
        <h3 class="shareTitle">海报定制</h3>
        <ul class="gqMbList">
          <li v-for="(item,index) in MbList" :key="index" @click="unfold(item.url)">
            <img :src="item.url">
          </li>
        </ul>
      </div>
      <!-- 合成  @touchend="close"-->
      <div class="compoundBox" v-show="isChooseMb">
        <div class="mbBox" ref="imageWrapper">
          <img class="compoundMb" :src="compoundMb">
          <img ref="qrCodePath" class="qrCodePath" :src="qrCodePath">
        </div>
      </div>
    </div>
    <!-- H5 -->
    <div v-show="topTabsActive == 1">
      <div class="center shadow-box">
        <h3 class="shareTitle">H5</h3>
        <ul class="gqMbList">
          <li v-for="(item,index) in H5list" :key="index" @click="toH5(item.href)">
            <img :src="item.url">
          </li>
        </ul>
      </div>
      <!-- 合成  @touchend="close"-->
      <div class="compoundBox" v-show="isChooseMb">
        <div class="mbBox" ref="imageWrapper">
          <img class="compoundMb" :src="compoundMb">
          <img ref="qrCodePath" class="qrCodePath" :src="qrCodePath">
        </div>
      </div>
    </div>


  </div>
</template>

<script>

import html2canvas from "html2canvas";
export default {
  data() {
    return {
      userId:'',
      topTabsActive: 0, //选项卡索引
      // 海报
      MbList: [
				{
					id: "gqMB017",
					url: "http://ii.sinelinked.com/lib/img/assets-agent/gqMB017.jpg"
				},
				{
					id: "gqMB016",
					url: "http://ii.sinelinked.com/lib/img/assets-agent/gqMB016.jpg"
				},
        {
					id: "gqMB015",
					url: "http://ii.sinelinked.com/lib/img/assets-agent/gqMB015.jpg"
				},
				{
					id: "gqMB014",
					url: "http://ii.sinelinked.com/lib/img/assets-agent/gqMB014.jpg"
				},
				{
					id: "gqMB013",
					url: "http://ii.sinelinked.com/lib/img/assets-agent/gqMB013.jpg"
				},
				{
					id: "gqMB012",
					url: "http://ii.sinelinked.com/lib/img/assets-agent/gqMB012.jpg"
				},
				{
					id: "gqMB011",
					url: "http://ii.sinelinked.com/lib/img/assets-agent/gqMB011.jpg"
				},
				{
					id: "gqMB010",
					url: "http://ii.sinelinked.com/lib/img/assets-agent/gqMB010.jpg"
				},
				{
					id: "gqMB009",
					url: "http://ii.sinelinked.com/lib/img/assets-agent/gqMB009.jpg"
				},
        {
          id: "gqMB008",
          url: "http://ii.sinelinked.com/lib/img/assets-agent/gqMB008.jpg"
        },
        {
          id: "gqMB007",
          url: "http://ii.sinelinked.com/lib/img/assets-agent/gqMB007.jpg"
        },
        {
          id: "gqMB006",
          url: "http://ii.sinelinked.com/lib/img/assets-agent/gqMB006.jpg"
        },
        {
          id: "gqMB005",
          url: "http://ii.sinelinked.com/lib/img/assets-agent/gqMB005.jpg"
        },
        {
          id: "gqMB004",
          url: "http://ii.sinelinked.com/lib/img/assets-agent/gqMB004.jpg"
        },
        {
          id: "gqMB001",
          url: "http://ii.sinelinked.com/lib/img/assets-agent/gqMB001.jpg"
        },
        {
          id: "gqMB002",
          url: "http://ii.sinelinked.com/lib/img/assets-agent/gqMB002.jpg"
        },
        {
          id: "gqMB003",
          url: "http://ii.sinelinked.com/lib/img/assets-agent/gqMB003.jpg"
        }
      ],
      // H5
      H5list: [
				{
				  id: "H5006",
				  url: "http://ii.sinelinked.com/lib/img/assets-agent/H5006.jpg",
				  href:"http://ii.sinelinked.com/sub/share/H5-6/"
				},
				{
				  id: "H5005",
				  url: "http://ii.sinelinked.com/lib/img/assets-agent/H5005.jpg",
				  href:"http://ii.sinelinked.com/sub/share/H5-5/"
				},
				{
				  id: "H5004",
				  url: "http://ii.sinelinked.com/lib/img/assets-agent/H5004.jpg",
				  href:"http://ii.sinelinked.com/sub/share/H5-4/"
				},
				{
				  id: "H5003",
				  url: "http://ii.sinelinked.com/lib/img/assets-agent/H5003.jpg",
				  href:"http://ii.sinelinked.com/sub/share/H5-3/"
				},
				{
				  id: "H5002",
				  url: "http://ii.sinelinked.com/lib/img/assets-agent/H5002.jpg",
				  href:"http://ii.sinelinked.com/sub/share/H5-2/"
				},
        {
          id: "H5001",
          url: "http://ii.sinelinked.com/lib/img/assets-agent/H5001.jpg",
          href:"http://ii.sinelinked.com/sub/share/H5-1/?"
        }
      ],
      qrCodePath: "", //太阳码
      isChooseMb: false,
      compoundMb: "", //需要转换的模板
      dataURL: "" //转换后的base64地址
    };
  },
  methods: {
    // 接单/历史切换
    tabChange(index) {
      this.topTabsActive = index;
    },
    //查询顾问信息
    search() {
      this.axios({
        method: "get",
        url: baseURL + "/api/agent/search"
      })
        .then(result => {
          if (result.data[0]) {
            this.userId = result.data[0].userId
            this.qrCodePath = result.data[0].serverQrCodePath;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    unfold(url) {
      var that = this;
      this.$toast.loading({
        duration: 0,
        message: "加载中..."
      });
      this.compoundMb = url;
      this.isChooseMb = true;
      var compoundMbEle = document.querySelector(".compoundMb");
      compoundMbEle.onload = function() {
        that.toImage();
      };
    },
    // toH5
    toH5(href){
      location.href = href+'?userId='+this.userId
    },
    toImage() {
      var that = this;
      html2canvas(document.querySelector(".mbBox"), {
        useCORS: true,
        backgroundColor: null
      }).then(canvas => {
        console.log(canvas);
        let dataURL = canvas.toDataURL("image/jpeg");
        this.dataURL = dataURL;
        this.compoundMb = dataURL;
        var compoundMbEle = document.querySelector(".compoundMb");
        compoundMbEle.onload = function() {
          that.$toast.clear();
        };
      });
    },
    close() {
      this.isChooseMb = false;
    }
  },
  created() {
    this.search();
  }
};
</script>

<style scoped>
.shareTitle {
  text-align: center;
  margin: 0;
  line-height: 1.066667rem /* 80/75 */;
}
.gqMbList {
  display: flex;
  flex-wrap: wrap;
}
.gqMbList li {
  width: 50%;
  text-align: center;
  margin-bottom: 0.266667rem /* 20/75 */;
}
.gqMbList li img {
  width: 80%;
}
.compoundBox {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
}
.mbBox {
  width: 100%;
  height: 100%;
  position: relative;
}
.mbBox .compoundMb {
  width: 100%;
}
.mbBox .qrCodePath {
  position: absolute;
  top: 11rem /* 825/75 */;
  width: 3.033333rem /* 280/75 */;
  height: 3.033333rem /* 280/75 */;
  left: 50%;
  transform: translateX(-50%);
	border-radius: 50%;
	background: rgba(255,255,255,.3);
	border-radius: 50%;
}
i {
  font-style: normal;
  vertical-align: middle;
}
.topTabs {
  width: 100%;
  height: 1.066667rem /* 80/75 */;
  line-height: 1.066667rem /* 80/75 */;
  display: flex;
  color: #333333;
  box-sizing: border-box;
  border-bottom: 0.013333rem /* 1/75 */ solid #dddddd;
}
.agentNameS {
  max-width: 2rem /* 150/75 */;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.topTabs .items {
  width: 50%;
  text-align: center;
  vertical-align: middle;
}
.topTabs .items .iconfont {
  line-height: 1.066667rem /* 80/75 */;
}
.topTabs .items span {
  padding-left: 0.16rem /* 12/75 */;
}

.topTabs .active {
  color: #4e8cee;
  border-bottom: 0.013333rem /* 1/75 */ solid #4e8cee;
}
</style>