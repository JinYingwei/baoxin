<template>
  <div class="readPacket">
    <div class="center">
      <div class="redPack-form">
        <!-- 现金红包 -->
        <div v-show="active == 0" class="redPack-form-xianjin">
          <div class="form-item-input">
            <label>总金额</label>
            <div class="inputs">
              <input type="number" v-model="totalMoneyHongbao" placeholder="0">
              <span>元</span>
            </div>
          </div>
          <p class="tips">请填写总金额</p>
          <div class="form-item-input">
            <label>总人数</label>
            <div class="inputs">
              <input type="number" v-model="memSize" readonly placeholder="0">
              <span>个</span>
            </div>
          </div>
          <p class="tips">
            团队共 <a>{{ memSize }}</a> 人
          </p>
          <div class="form-item-input">
            <label>收款理由</label>
            <div class="inputs">
              <input type="text" v-model="readPacketMsg" placeholder="有福同享,有难同当">
            </div>
          </div>
          <h3 class="result-money">{{ totalMoneyHongbao || 0 }}</h3>
          <van-button size="large" :disabled="totalMoneyHongbao <=0 " @click="sendRedPacket">发起AA收款</van-button>
           <p class="result-money-tip">每人需要收取{{ (totalMoneyHongbao / memSize).toFixed(2) }} 元</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  created() {
    this.getTeamMembers();
  },
  data() {
    return {
      active: 0,
      memSize: 0, //团队人数
      readPacketMsg: "",
      totalMoneyHongbao: "", //红包总额
      hongBaoNum: "", //红包个数
      hongBaoType: 2, //抢取方式: 1-money平分 2-money随机
      couponType: 1, //红包类型: 1-现金红包 2-代金券红包 3-订单券红包
      totalMoneyDaijin: "", //代金券总额
      daiJinNum: "", //代金券个数
      totalMoneyDingdan: "", //订单券总额
      dingDanNum: "" //订单券个数
    };
  },
  methods: {
    //   发起AA活动
    sendRedPacket() {
      this.axios({
        method: "post",
        url: baseURL + "/api/team/managerFee/teamActivity",
        data: {
          type:1, //活动类型： 1-AA活动  2-互助
          needMoney: this.totalMoneyHongbao,
          envelopeWords: this.readPacketMsg, //红包留言
          avgMoney:(this.totalMoneyHongbao / this.memSize).toFixed(2),
          needPerson: this.memSize //红包类型: 1-现金红包 2-代金券红包 3-订单券红包
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            Toast.success("活动发起成功");
            this.totalMoneyHongbao = 0;
            this.hongBaoNu = 0;
          }
        })
        .catch(err => {
          Toast.fail(err.response.data.error);

          if (err.response.data.code == 85) {
            setTimeout(() => {
              this.$router.push({ name: "pay" });
            }, 1000);
          }
        });
    },
    //获取团队人员接口
    getTeamMembers() {
      this.axios({
        url: baseURL + "/api/team/managerFee/getTeamMembers",
        method: "get"
      })
        .then(result => {
          if (result.data.code == 0) {
            this.memSize = result.data.data.num;
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style >
.readPacket {
  min-height: 100vh;
  background: #f2f2f2;
  box-sizing: border-box;
  padding-top: 0.266667rem /* 20/75 */;
}
.readPacket #readPacket-tabs .icon-items {
  width: 0.48rem /* 36/75 */;
}
#readPacket-tabs .van-tab span {
  line-height: 6px;
}
#readPacket-tabs > .van-tabs__wrap {
  height: 68px !important;
}
#readPacket-tabs .van-tab {
  background: none;
  color: #adadad;
}
#readPacket-tabs .van-tabs__nav {
  background: none;
}
#readPacket-tabs .van-tab--active {
  color: #333;
}
#readPacket-tabs .van-tabs__line {
  background: none;
}
#readPacket-tabs .van-tabs__content {
  padding-top: 30px;
}
/* form-item-input */
.form-item-input {
  border-radius: 0.16rem /* 12/75 */;
  background: #fff;
  line-height: 1.066667rem /* 80/75 */;
  box-sizing: border-box;
  padding: 0 0.32rem /* 24/75 */;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}
.form-item-input label,
.form-item-input span {
  font-size: 0.32rem /* 24/75 */;
  color: #333;
}
.form-item-input input {
  color: #888;
  text-align: right;
  padding-right: 0.08rem /* 6/75 */;
  border: none;
}
.tips {
  padding-left: 0.48rem /* 36/75 */;
  color: #888;
}
.tips a {
  color: #4e8cee;
}
.result-money {
  font-size: 1.333333rem /* 100/75 */;
  font-weight: normal;
  text-align: center;
  margin-top: 0.666667rem /* 50/75 */;
  margin-bottom: 0.666667rem /* 50/75 */;
}
.result-money::before {
  content: "¥";
  font-size: 0.8rem /* 60/75 */;
  vertical-align: super;
  padding-right: 0.08rem /* 6/75 */;
}
.redPack-form .van-button--default {
  background-color: #4e8cee;
  color: #fff;
  border: none;
  letter-spacing: 3px;
}
.redPack-form .van-button--disabled {
  /* background-color: #e8e8e8;
    color: #999; */
  opacity: 0.6;
}
.result-money-tip {
  text-align: center;
  color: #999;
}
.result-money-tip a {
  color: #4e8cee;
}
</style>