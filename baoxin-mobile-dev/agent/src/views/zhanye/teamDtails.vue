<template>
  <div>
    <div class="shadow-box center minHeight">
      <h3 class="shareTitle">团队信息</h3>
      <van-cell-group>
        <van-field
          v-model="teamData.userName"
          readonly
          label="团队名"
        />
        <van-field
          :value="timeFormat(teamData.createTime)"
          readonly
          label="成立时间"
        />
        <van-field
          v-model="teamData.teamNum"
          readonly
          label="团队人数"
        />
        <van-field
          v-model="teamData.phone"
          readonly
          label="联系方式"
        />
        <van-field
          v-model="teamData.teamSummary"
          type="textarea"
          rows="1"
          autosize
          readonly
          label="团队简介"
        />
        <van-cell
          title="团队状态"
          class="teamStatus"
        >
          <strong>{{ status == 0?'审核中':'已加入' }}</strong>
          <van-button
            size="mini"
            class="quitTeam"
            @click="quitTeam"
            type="danger"
          >退出团队</van-button>
        </van-cell>
      </van-cell-group>
      <div
        class="qrCode"
        v-if="teamData.qrCodePath"
      >
        <p>长按识别进入团队名片</p>
        <img
          class="qrCodePath"
          :src="teamData.qrCodePath"
        />
      </div>
    </div>
  </div>
</template>

<script>
import cityData from "../../assets/js/region.js";
import utils from "../../assets/js/utils.js";
export default {
  created() {
    var query = this.$route.query;
    this.teamId = query.teamId;
    this.status = query.status;
    this.getTeamData();
  },
  data() {
    return {
      teamId: "",
      value: 1,
      status: 0, //是否已加入团队 0审核中，1已加入
      teamData: []
    };
  },
  methods: {
    getTeamData() {
      this.axios({
        method: "get",
        url: baseURL + "/api/XCX/team/search",
        params: {
          teamId: this.teamId
        }
      })
        .then(result => {
          this.teamData = result.data[0];
        })
        .catch(err => {
          console.log(err);
          //   this.$toast(err.response);
        });
    },
    //退出团队
    quitTeam() {
      this.axios({
        method: "post",
        url: baseURL + "/api/user/quitTeam",
        data: {
          teamId: this.teamId,
          type: "normal" //"normal"-正常退出 "force"-强制退出，不需要团队退回管理费
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            this.$toast("退出团队成功~");
            this.$router.push({ name: "teamMange" });
          }
        })
        .catch(err => {
          if (err.response.data.code && err.response.data.code == 162) {
            this.$dialog
              .confirm({
                title: "退出团队",
                message:
                  "当前团队已欠费，如继续退出，将无法退还管理费，请确认是否退出！"
              })
              .then(() => {
                this.axios({
                  method: "post",
                  url: baseURL + "/api/user/quitTeam",
                  data: {
                    teamId: this.teamId,
                    type: "force" //"normal"-正常退出 "force"-强制退出，不需要团队退回管理费
                  }
                })
                  .then(result => {
                    this.$toast("退出团队成功~");
                  })
                  .catch(err => {
                    this.$toast(err.response.data.error);
                  });
              })
              .catch(() => {
                // on cancel
              });
          } else {
            this.$toast(err.response.data.error);
          }
        });
    },
    //转换时间
    timeFormat(sendTime) {
      var timeFormat = utils.timeFormat;
      return timeFormat(sendTime);
    },
    addressTransForm(address) {
      if (!address) {
        return;
      }
      return utils.getCityResult(cityData, address);
    }
  }
};
</script>

<style scoped>
.shareTitle {
  text-align: center;
}
.minHeight {
  min-height: 83vh;
}
.qrCode {
  text-align: center;
}
.teamStatus >>> .van-cell__value{
  flex: 2
}
.qrCodePath {
  width: 60%;
  display: block;
  margin: 0 auto;
  margin-top: 10px;
}
.teamStatus >>> .van-cell__value {
  display: flex;
  justify-content: space-between;
}
</style>