<template>
  <div class="shadow-box center">
      <img
        :src="agentData.headImg"
        class="card-banner-img"
      >

      <div class="selfShowSummary">
       <textarea class="card-info-intro" v-model="agentData.teamShowSummary" @input="selfShowSummaryInput" placeholder="点击编辑团队签名"></textarea>
      </div>

      <div class="personSummary-title">
        <span class="jianjie">团队秀</span>
      </div>

    <!-- show-img -->
    <div class="card-show-imgs center">
      <ul>
        <li
          v-show="cardShowImgsBase64.length<9"
          id="add-img"
          class="imgs"
        >
          <input
            ref="card-show-imgs"
            @change="uploadImgChange('card-show-imgs')"
            class="upload-control"
            type="file"
            accept="image/*"
            multiple
          >
        </li>
        <li
         @click="preview(item)"
          v-for="(item,index) in cardShowImgsBase64"
          :key="index"
          class="imgs"
        ><img :src="item" /></li>
      </ul>
    </div>
    <div class="btnSubmit center">
      <van-button
        :loading="submitLoading"
        type="primary"
        @click="submitUpde"
        size="large"
      >提交</van-button>
    </div>
    <div class="tips">
        <van-icon name="info-o" />
        <p>团队秀将展示在小程序名片中。</p>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  created() {
    //查询顾问信息
    this.search();
  },
  data() {
    return {
      agentData: {}, //顾问信息
      cardShowCoverImgs: "", //个人秀封面图片
      cardShowImgs: [], //个人秀图片
      cardShowImgsBase64: [],
       submitLoading: false
    };
  },
  methods: {
    preview(item) {
      ImagePreview({
        images:[item],
        startPosition:0
      });
    },
    //查询顾问信息
    search() {
      this.axios({
        method: "get",
        url: baseURL + "/api/team/search"
      })
        .then(result => {
          if (result.data[0]) {
            this.agentData = result.data[0];
            if (this.agentData.selfShowSummary == "null") {
              this.agentData.selfShowSummary = " ";
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 个人秀图片选择改变事件
    uploadImgChange(name) {
       var _this = this;
      var target = this.$refs[name];
      var files = target.files
      // 将file对象进行遍历，将每项file文件push数据中
      for (const key in files) {
        if (files.hasOwnProperty(key)) {
          const element = files[key];
           this.cardShowImgs.push(element)
        }
      }
    // 最多上传9张
      if (this.cardShowImgs.length > 9) {
        this.$toast.fail("最多上传9张");
        return;
      }

       // 将用户选择的文件转换为base64 进行本地预览
      _this.cardShowImgsBase64 = [] //预览数组 ，每次遍历前清空，避免重复数据
      for (const key in this.cardShowImgs) {
        if (this.cardShowImgs.hasOwnProperty(key)) {
          const element = this.cardShowImgs[key];
          var reader = new FileReader();
          reader.readAsDataURL(element);
          reader.onload = function(e) {
            _this.cardShowImgsBase64.push(this.result);
          };
        }
      }
    },
    selfShowSummaryInput(){
      if (this.agentData.teamShowSummary && this.agentData.teamShowSummary.length > 30) {
        this.agentData.teamShowSummary = this.agentData.teamShowSummary.slice(0,30)
				 this.$toast("个人秀签名最多30个字符");
				return;
			}
    },
    //个人秀资料提交
    submitUpde() {
      var that = this;
      var formDataPic = new FormData();
      //个人秀封面
      formDataPic.append("teamShowCoverFile", this.cardShowCoverImgs);
      //个人秀此刻的想法
      formDataPic.append("teamShowSummary", this.agentData.teamShowSummary);
      //个人秀图片（多图）
      for (var i = 0; i < this.cardShowImgs.length; i++) {
        formDataPic.append("teamShowImage", this.cardShowImgs[i]);
      }
      if (!this.agentData.teamShowSummary) {
         this.$toast("请输入团队秀签名");
        return;
      }

      this.submitLoading = true;
      // 修改图片信息
      function upDatePic() {
        return that.axios.post(baseURL + "/api/team/updatePic", formDataPic);
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
              }, 3000);
            }
          })
        )
        .catch(err => {
          console.log(err);
           this.$toast(err.response.data.error);
          this.submitLoading = false;
        });
    }
  }
};
</script>

<style scoped>
.card-banner-img {
  display: block;
  width: 2.666667rem /* 200/75 */;
  height: 2.666667rem /* 200/75 */;
  border: 0.08rem /* 6/75 */ solid #fff;
  border-radius: 50%;
  margin: 0.266667rem /* 20/75 */ auto;
}
.personSummary-title {
  margin-top: 0.213333rem /* 16/75 */;
  height: 0.4rem /* 30/75 */;
  border-top: 1px solid #ccc;
  position: relative;
}
.personSummary-title .jianjie {
  display: inline-block;
  position: absolute;
  left: 50%;
  top: -0.336667rem /* 20/75 */;
  background: #fff;
  padding: 0 0.4rem /* 30/75 */;
  transform: translateX(-50%);
  font-size: 0.48rem /* 36/75 */;
}
.card-info-name {
  padding-left: 2.4rem /* 180/75 */;
  font-size: 0.453333rem /* 34/75 */;
  color: #333;
  font-weight: normal;
}
.selfShowSummary{
	font-size: .346667rem /* 26/75 */;
	padding: .133333rem /* 10/75 */ .8rem /* 60/75 */;
	box-sizing: border-box;
  padding-left: 0;
}
.card-info-intro {
  display: block;
  width: 100%;
  border: none;
  font-size: 0.32rem /* 24/75 */;
  resize: none;
  box-sizing: border-box;
}
.card-show-imgs ul {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  min-height: 30vh;
}
/* tips */
.tips {
  width: 80%;
  margin: 0 auto;
  margin-top: 0.8rem /* 60/75 */;
  display: flex;
  justify-content: center
}
.tips p {
  margin-top: 0;
}
.tips .van-icon-info-o::before {
  vertical-align: middle;
  padding-right: 6px;
  color: #ff8a8a;
}
.imgs {
  width: 2.4rem /* 180/75 */;
  height: 2.4rem /* 180/75 */;
  overflow: hidden;
  margin-right: .16rem /* 12/75 */;
  margin-bottom: .16rem /* 12/75 */;
  position: relative;
}
.imgs img {
  width: 100%;
}
#add-img {
  background: url(../../assets/img/add-img.png) no-repeat center;
  background-size: 1.866667rem /* 140/75 */ 1.773333rem /* 133/75 */;
  border: 1px dotted #e5e5e5;
}
.upload-control {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.btnSubmit {
  text-align: center;
}
.btnSubmit .van-button--primary {
  background: #4e8cee;
  border: none;
  margin: 0 auto;
}
</style>