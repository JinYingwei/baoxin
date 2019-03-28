<template>
  <div>
    <div id="shareCenter" class="center shadow-box">
      <h3 class="shareTitle">资料分享</h3>
      <van-cell-group>
        <van-field v-model="shareTitle" label="分享名称" type="textarea" placeholder="请输入分享名称" rows="1" autosize />
        <van-field v-model="shareUrl" label="分享链接" type="textarea" placeholder="请输入分享链接" rows="1" autosize />
        <van-field v-model="sharePassword" label="密码" placeholder="分享密码" />
        <div class="messageBtn">
          <van-button size="normal" @click="addDatum">提交</van-button>
        </div>
        <br>
      </van-cell-group>

      <br>
      <h3 class="shareTitle">分享历史</h3>
      <van-collapse v-model="activeShareList" accordion>
        <van-collapse-item v-for="(item,index) in getDatumData" :title="item.datumName" :name="index" :key="index">
          分享链接：{{ item.datumUrl }} <br> 分享密码：{{ item.extractedCode }}
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      shareTitle: "", //分享名称
      shareUrl: "", //分享链接
      sharePassword: "", //分享密码
      activeShareList: "0", //当前展开面板的 name
      getDatumData: []
    };
  },
  created() {
    this.getDatum();
  },
  methods: {
    // 检查字符串是否为合法URL
    isURL(str) {
      var reg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
      if (reg.test(str)) {
        console.log(str + " 是合法的URL");
        return true;
      } else {
        console.log(str + " 是不合法的URL");
        return false;
      }
    },
    //   新增资料
    addDatum() {
      if (!this.shareUrl) {
        Toast("请输入分享链接");
        return;
      }

      if (!this.isURL(this.shareUrl)) {
        Toast("请输入正确的分享链接");
        return;
      }
      this.axios({
        method: "post",
        url: baseURL + "/api/team/addDatum",
        data: {
          datumName: this.shareTitle,
          datumUrl: this.shareUrl,
          extractedCode: this.sharePassword
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            Toast.success("提交成功");
            this.shareTitle = "";
            this.shareUrl = "";
            this.sharePassword = "";
            this.getDatum();
          }
        })
        .catch(err => {
          Toast.fail("提交失败");
        });
    },
    //   新增资料
    getDatum() {
      this.axios({
        method: "get",
        url: baseURL + "/api/team/getDatum"
      })
        .then(result => {
          if (result.data.code == 0) {
            this.getDatumData = result.data.data.items;
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
.shareTitle {
  text-align: center;
}
.messageBtn {
  padding-top: 15px;
  text-align: right;
}
.upDateBtn {
  padding: 6px 0;
  text-align: right;
}
#shareCenter {
  height: 84vh;
}
.btnBox {
  display: inline-block;
}

.messageBtn {
  padding-top: 15px;
  text-align: center;
}
.messageBtn .van-button--default {
  background: #4e8cee;
  color: #fff;
  padding: 0 30px;
}
</style>