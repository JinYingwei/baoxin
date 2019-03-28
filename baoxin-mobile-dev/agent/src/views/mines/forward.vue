<template>
  <div>
    <div
      id="forward"
      class="shadow-box"
    >
      <div class="title"><img
          class="title-logo"
          src="../../assets/img/logo.png"
        ><strong>保信云顾问</strong></div>
      <input
        type="text"
        v-model="xcxTitle"
        class="forward-title"
        placeholder="请输入转发标题"
      >
      <div class="forward-cover">
        <img :src="cardShowCoverImgsBase64">
        <input
          ref="forward-cover-imgs"
          @change="uploadBannerChange('forward-cover-imgs')"
          type="file"
          accept="image/*"
        >
      </div>
      <p class="forward-bottom">
        <i class="iconfont icon-xiaochengxu"></i>
        <span>小程序</span>
      </p>
    </div>
    <div class="btnSubmit center">
      <van-button
        type="primary"
        :loading="submitLoading"
        @click="submitUpde"
        size="large"
      >提交</van-button>
    </div>
    <div
      class="toPayHistory"
      @click="emptyTeamShareInfo"
    >
      <van-icon name="close" /><span>取消封面</span></div>
    <div class="tips">
      <van-icon name="info-o" />
      <p>转发信息将在小程序名片转发中显示</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardShowCoverImgs: "",
      cardShowCoverImgsBase64: "",
      xcxTitle: "", // 小程序转发标题
      submitLoading: false
    };
  },
  created() {
    var agentData = this.$route.params.agentData;
    if (JSON.stringify(agentData) !== "{}") {
      this.xcxTitle = agentData.xcxTitle;
      this.cardShowCoverImgsBase64 =
        agentData.coverTempletUrl + "?" + Math.random();
    }
  },
  methods: {
    // 封面图片选择改变事件
    uploadBannerChange(name) {
      var _this = this;
      var target = this.$refs[name];
      this.cardShowCoverImgs = target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.cardShowCoverImgs);
      reader.onload = function(e) {
        _this.cardShowCoverImgsBase64 = this.result;
      };
    },

    // 取消转发封面
    emptyTeamShareInfo() {
      var that = this;
      this.axios({
        method: "post",
        url: baseURL + "/api/agent/emptyAgentShareInfo"
      })
        .then(result => {
          this.$toast("转发封面已取消");
          setTimeout(function() {
            that.$router.push("/mine");
          }, 1500);
        })
        .catch(err => {
          this.$toast("取消失败");
        });
    },
    //个人秀资料提交
    submitUpde() {
      var that = this;
      if (this.xcxTitle && this.xcxTitle.length > 30) {
        this.$toast("转发标题最多30个字符");
        return;
      }

      var xcxTitle = this.xcxTitle;
      var shareImageStr = this.cardShowCoverImgsBase64;
      if (this.cardShowCoverImgsBase64.slice(0, 4) == "http") {
        shareImageStr = "";
      }
      this.submitLoading = true;

      var formDataPic = new FormData();
      // 小程序转发标题
      formDataPic.append("xcxTitle", xcxTitle);
      // 小程序转发封面
      formDataPic.append("shareImageStr", shareImageStr);

      // 修改图片信息
      function upDatePic() {
        return that.axios.post(baseURL + "/api/agent/updatePic", formDataPic);
      }

      this.axios
        .all([upDatePic()])
        .then(
          this.axios.spread(res1 => {
            if (res1.data.code == 0) {
              this.$toast.success("修改成功");
              setTimeout(function() {
                this.submitLoading = false;
                that.$router.push("/mine");
              }, 1500);
            }
          })
        )
        .catch(err => {
          console.log(err);
          this.submitLoading = false;
          this.$toast(err.response.data.error);
        });
    }
  }
};
</script>

<style scoped>
#forward {
  width: 88%;
  margin: 0.8rem /* 60/75 */ auto 0 auto;
}
.title-logo {
  width: 0.64rem /* 48/75 */;
  height: 0.613333rem /* 46/75 */;
  vertical-align: middle;
  margin-right: 0.266667rem /* 20/75 */;
}
#forward .title strong {
  color: #8e8e8e;
}
.forward-title {
  width: 100%;
  font-size: 0.4rem /* 30/75 */;
  border: none;
  padding: 0.213333rem /* 16/75 */ 0.053333rem; /* 4/75 */
}
.forward-cover {
  border: 1px dotted #8e8e8e;
  /* width: 6.666667rem 500/75; */
  height: 5.6rem /* 420/75 */;
  margin: 0 auto;
  background: url(../../assets/img/add-img.png) no-repeat center;
  background-size: 1.866667rem /* 140/75 */ 1.773333rem /* 133/75 */;
  position: relative;
  overflow: hidden;
}
.forward-cover img {
  width: 100%;
}
.forward-bottom {
  color: #4e8dee;
}
.forward-bottom span {
  color: #8e8e8e;
}
.forward-cover input {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}
.btnSubmit {
  width: 80%;
  margin-top: 0.8rem /* 60/75 */;
  text-align: center;
}
.btnSubmit .van-button--primary {
  background: #4e8cee;
  border: none;
  margin: 0 auto;
}
.toPayHistory {
  width: 2.3rem /* 150/75 */;
  margin: 0 auto;
  margin-top: 0.48rem /* 36/75 */;
  font-size: 0.4rem /* 30/75 */;
  display: block;
  text-align: center;
  border-bottom: 1px solid #aaaaaa;
  color: #aaaaaa;
  padding-bottom: 4px;
}
.toPayHistory .van-icon {
  vertical-align: text-bottom;
}
.toPayHistory span {
  padding-left: 6px;
  vertical-align: middle;
}
/* tips */
.tips {
  width: 80%;
  margin: 0 auto;
  margin-top: 0.8rem /* 60/75 */;
  display: flex;
  justify-content: center;
}
.tips p {
  margin-top: 0;
}
.tips .van-icon-info-o::before {
  vertical-align: middle;
  padding-right: 6px;
  color: #ff8a8a;
}
</style>