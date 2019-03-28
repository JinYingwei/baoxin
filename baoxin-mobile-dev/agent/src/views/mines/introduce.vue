<template>
  <div>

    <div class="card-info shadow-box center">
      <!-- header-img -->
      <img
        :src="agentData.headImg"
        class="card-banner-img"
      >
      <div class="personSummary-title">
        <span class="jianjie">简介</span>
      </div>
      <textarea
        id="textarea"
        ref="intro"
        v-model="intro"
        class="card-info-intro"
        placeholder="点击编辑个人简介内容"
      ></textarea>
    </div>
    <div class="btnSubmit center">
      <van-button
        :loading="submitLoading"
        type="primary"
        @click="updatePersonIntro"
        size="large"
      >提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    //查询顾问信息
    this.search();
    var personIntro = this.$route.params.personIntro;
    if (personIntro) {
      this.intro = personIntro;
    }
  },
  mounted() {
    var textArea = document.getElementById("textarea");
    this.$nextTick(() => {
      this.autoTextarea(textArea);
    });
  },
  data() {
    return {
      agentData: {}, //顾问信息
      intro: "",
      submitLoading: false
    };
  },
  methods: {
    //查询顾问信息
    search() {
      this.axios({
        method: "get",
        url: baseURL + "/api/agent/search"
      })
        .then(result => {
          if (result.data[0]) {
            this.agentData = result.data[0];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updatePersonIntro() {
      var result = this.ReplaceSeperator(this.intro);
      this.submitLoading = true;
      this.axios({
        method: "post",
        url: baseURL + "/api/agent/updatePersonIntro",
        data: {
          personIntro: this.intro
        }
      })
        .then(result => {
          this.submitLoading = false;
          if (result.data.code == 0) {
            this.$toast("个人介绍修改成功");
          }
        })
        .catch(err => {
          this.submitLoading = false;
          this.$toast("个人介绍修改失败");
        });
    },
    autoTextarea(el) {
      var setStyle = function(el) {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
        // console.log(el.scrollHeight);
      };
      var delayedResize = function(el) {
        window.setTimeout(function() {
          setStyle(el);
        }, 0);
      };
      if (el.addEventListener) {
        el.addEventListener(
          "input",
          function() {
            setStyle(el);
          },
          false
        );
        setStyle(el);
      } else if (el.attachEvent) {
        el.attachEvent("onpropertychange", function() {
          setStyle(el);
        });
        setStyle(el);
      }
      if (window.VBArray && window.addEventListener) {
        //IE9
        el.attachEvent("onkeydown", function() {
          var key = window.event.keyCode;
          if (key == 8 || key == 46) delayedResize(el);
        });
        el.attachEvent("oncut", function() {
          delayedResize(el);
        }); //处理粘贴
      }
    },
    // textarear换行转br
    ReplaceSeperator(mobiles) {
      var i;
      var result = "";
      var c;
      for (i = 0; i < mobiles.length; i++) {
        c = mobiles.substr(i, 1);
        if (c == ";" || c == "," || c == "，" || c == "\n")
          result = result + "<br/>";
        else if (c != "\r") result = result + c;
      }
      return result;
    }
  }
};
</script>

<style scoped>
.card-banner {
  height: 3.253333rem /* 244/75 */;
  overflow: hidden;
  position: relative;
}
.card-banner-img {
  display: block;
  width: 2.666667rem /* 200/75 */;
  height: 2.666667rem /* 200/75 */;
  border: 0.08rem /* 6/75 */ solid #fff;
  border-radius: 50%;
  margin: 0.266667rem /* 20/75 */ auto;
  margin-bottom: 0.8rem /* 60/75 */;
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
.card-info {
  min-height: 70vh;
}
.card-info-name {
  font-size: 0.453333rem /* 34/75 */;
  color: #333;
  font-weight: normal;
}
.card-info-intro {
  margin-top: 0.4rem /* 30/75 */;
  display: block;
  width: 100%;
  border: none;
  font-size: 0.4rem /* 30/75 */;
  line-height: 0.666667rem /* 50/75 */;
  resize: none;
  box-sizing: border-box;
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