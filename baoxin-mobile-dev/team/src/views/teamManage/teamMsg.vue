<template>
    <div>
        <div id="mangeMsg">
            <div class="center shadow-box">
                <h3 class="shareTitle">发送通知</h3>
                <van-cell-group>
                    <!-- <van-field v-model="msgTitle" label="通知标题" placeholder="请输入通知标题" /> -->
                    <van-field style="min-height:20vh" label="通知内容" v-model="msgCon" type="textarea" placeholder="请输入通知内容" rows="3" autosize />
                </van-cell-group>
                <div class="messageBtn">
                    <van-button size="normal" @click="addTeamMsg">发送</van-button>
                </div>

                <router-link tag="div" :to="{name:'msgHistory'}">
                    <div class="msgHistory">历史通知</div>
                    <br>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      msgTitle: "", //通知标题
      msgCon: "" //通知内容
    };
  },
  methods: {
    //发送消息
    addTeamMsg() {
      this.axios({
        url: baseURL + "/api/user/addTeamMsg",
        method: "post",
        data: {
          title: this.msgTitle,
          content: this.msgCon
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            this.message = "";
            Toast.success("发送成功");
          } else {
            Toast.fail("发送失败");
          }
        })
        .catch(error => {
          Toast.fail(error.response.data.error);
        });
    }
  }
};
</script>

<style scoped>
#mangeMsg .center{
  height: 84vh;
  overflow: auto;
}
.shareTitle {
  text-align: center;
  font-weight: normal;
}
.messageBtn {
  padding-top: 15px;
  text-align: center;
}
.messageBtn .van-button--default {
  background: #4e8cee;
  color: #fff;
  padding: 0 30px;
  width: 100%;
}
.msgHistory {
  width: 2rem /* 150/75 */;
  margin: 0 auto;
  margin-top: 0.666667rem /* 50/75 */;
  font-size: 0.4rem /* 30/75 */;
  display: block;
  text-align: center;
  border-bottom: 1px solid #aaaaaa;
  color: #aaaaaa;
  padding-bottom: 4px;
}
</style>