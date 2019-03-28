<template>
  <div class="readPacket">
    <div class="center">
      <van-tabs id="readPacket-tabs" v-model="active" @change="onTabsClick">
        <van-tab :title="item.title" v-for="(item,index) in tabBarData" :key="index">
          <div slot="title">
            <div>
              <img class="icon-items" :src="active==index?item.iconA:item.icon" alt="">
              <span>{{ item.title }}</span>
            </div>
          </div>
        </van-tab>
      </van-tabs>
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
          <p class="tips" @click="changeHongbaoType">
            {{ hongBaoType==2?'每人抽到的金额随机，':'每人平分红包总额，' }}<a>{{ hongBaoType==2?'改为普通红包':'改为随机红包' }}</a>
          </p>
          <div class="form-item-input">
            <label>红包个数</label>
            <div class="inputs">
              <input type="number" v-model="hongBaoNum" placeholder="0">
              <span>个</span>
            </div>
          </div>
          <p class="tips">
            团队共 <a>{{ memSize }}</a> 人
          </p>
          <div class="form-item-input">
            <label>留言</label>
            <div class="inputs">
              <input type="text" v-model="readPacketMsg" placeholder="恭喜发财,大吉大利">
            </div>
          </div>
          <h3 class="result-money">{{ totalMoneyHongbao || 0 }}</h3>
          <van-button size="large" :disabled="totalMoneyHongbao <=0 || hongBaoNum <= 0 " @click="sendRedPacket">塞钱进红包</van-button>
          <p class="result-money-tip">24小时内未被领取红包金额将被退回</p>
        </div>
        <!-- 代金券 -->
        <div v-show="active == 1" class="redPack-form-daijinquan">
          <div class="form-item-input">
            <label>总金额</label>
            <div class="inputs">
              <input type="number" v-model="totalMoneyHongbao" placeholder="0">
              <span>元</span>
            </div>
          </div>
          <p class="tips" @click="changeHongbaoType">
            {{ hongBaoType==2?'每人抽到的金额随机，':'每人平分代金券总额，' }}<a>{{ hongBaoType==2?'改为普通代金券':'改为随机代金券' }}</a>
          </p>
          <div class="form-item-input">
            <label>代金券个数</label>
            <div class="inputs">
              <input type="number" v-model="hongBaoNum" placeholder="0">
              <span>个</span>
            </div>
          </div>
          <p class="tips">
            团队共 <a>{{ memSize }}</a> 人
          </p>
          <div class="form-item-input">
            <label>留言</label>
            <div class="inputs">
              <input type="text" v-model="readPacketMsg" placeholder="恭喜发财,大吉大利">
            </div>
          </div>
          <h3 class="result-money">{{ totalMoneyHongbao || 0 }}</h3>
          <van-button :disabled="totalMoneyHongbao <=0 || hongBaoNum <= 0 " @click="sendRedPacket" size="large">发送</van-button>
          <p class="result-money-tip"><a>目前充值享9折优惠</a></p>
        </div>
        <!-- 订单券 -->
        <div v-show="active == 2" class="redPack-form-dingdan">
          <div class="form-item-input">
            <label>总金额</label>
            <div class="inputs">
              <input type="number" v-model="totalMoneyHongbao" placeholder="0">
              <span>元</span>
            </div>
          </div>
          <p class="tips" @click="changeHongbaoType">
            {{ hongBaoType==2?'每人抽到的金额随机，':'每人平分订单券总额，' }}<a>{{ hongBaoType==2?'改为普通订单券':'改为随机订单券' }}</a>
          </p>
          <div class="form-item-input">
            <label>订单券个数</label>
            <div class="inputs">
              <input type="number" v-model="hongBaoNum" placeholder="0">
              <span>个</span>
            </div>
          </div>
          <p class="tips">
            团队共 <a>{{ memSize }}</a> 人
          </p>
          <div class="form-item-input">
            <label>留言</label>
            <div class="inputs">
              <input type="text" v-model="readPacketMsg" placeholder="恭喜发财,大吉大利">
            </div>
          </div>
          <h3 class="result-money">{{ totalMoneyHongbao || 0 }}</h3>
          <van-button size="large" @click="sendRedPacket" :disabled="totalMoneyHongbao <=0 || hongBaoNum <= 0 ">发送</van-button>
          <p class="result-money-tip"><a>目前充值享9折优惠</a></p>
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
      tabBarData: [
        {
          title: "现金红包",
          iconA: require("../../assets/img/hongbao-icon-a.png"),
          icon: require("../../assets/img/hongbao-icon.png")
        },
        {
          title: "代金券",
          iconA: require("../../assets/img/daijin-icon-a.png"),
          icon: require("../../assets/img/daijin-icon.png")
        },
        {
          title: "订单券",
          iconA: require("../../assets/img/dingdan-icon-a.png"),
          icon: require("../../assets/img/dingdan-icon.png")
        }
      ],
      memSize: 0, //团队人数
      readPacketMsg: "恭喜发财，大吉大利",
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
    // 标签页监听
    onTabsClick(index, title) {
      this.hongBaoType = 1;
      this.hongBaoNum = 0;
      this.totalMoneyHongbao = 0;

      this.readPacketMsg = "恭喜发财，大吉大利";
      if (title == "代金券") {
        this.couponType = 2;
      } else if (title == "订单券") {
        this.couponType = 3;
      } else if (title == "现金红包") {
        this.couponType = 1;
      }
    },
    //   改变抢取方式（随机、平分）
    changeHongbaoType() {
      if (this.hongBaoType == 1) {
        this.hongBaoType = 2;
      } else {
        this.hongBaoType = 1;
      }
    },
    //   发红包
    sendRedPacket() {
      this.axios({
        method: "post",
        url: baseURL + "/api/team/redEnvelope/send",
        data: {
          money: this.totalMoneyHongbao,
          num: this.hongBaoNum,
          type: this.hongBaoType, //抢取方式: 1-money平分 2-money随机
          envelopeWords: this.readPacketMsg, //红包留言
          couponType: this.couponType //红包类型: 1-现金红包 2-代金券红包 3-订单券红包
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            Toast.success("发送成功");
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
        url: baseURL + "/api/user/getTeamMembers",
        method: "get"
      })
        .then(result => {
          if (result.data.code == 0) {
            this.memSize = result.data.data.memSize;
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