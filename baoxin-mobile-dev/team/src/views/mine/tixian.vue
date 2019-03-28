<template>
  <div>
    <div class="shadow-box center">
      <br>

      <div class="balance ">
        <span>帐户可提现余额</span>
        <strong>
          {{ money }}
          <em>元</em>
        </strong>
      </div>

      <div class="balance payProduct">
        <span>提现金额</span>

        <div class="inputMoney">
          ¥ <input type="number" v-model="withdrawNum" value="100">
        </div>
        <ul>
          <!--  @click="radios(item.productName,item.productId) -->
          <!-- <li :key="index" v-for="(item,index) in productPay" >{{ item.productName }}</li> -->
        </ul>
      </div>
      <van-radio-group class="tixianType" v-model="tixianType">
        <van-radio name="1">提现至微信钱包</van-radio>
        <van-radio name="2">提现至银行卡</van-radio>
      </van-radio-group>
      <div class="btnSubmit center">
        <van-button type="primary" @click="withdraw" size="large">提交</van-button>
      </div>
      <router-link class="toPayHistory" :to="{name:'tixianHistory'}" tag="div">提现记录</router-link>

    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      money: 0 ,//余额
      withdrawNum:100,
      tixianType:'1',//提现方式： 1-提现到微信  2-提现到银行卡号
    };
  },
  methods: {
    // 获取团队余额、欠费金额
    getTeamMoneyInfo() {
      this.axios({
        method: "get",
        url: baseURL + "/api/money/getTeamMoneyInfo"
      })
        .then(result => {
          if (result.data.code == 0) {
            this.money = result.data.data.extraMoney;
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    // 团队申请提现
    withdraw() {
      // if(this.withdrawNum < 100){
      //   Toast('提现金额最低100元')
      //   return
      // }
      this.axios({
        method:'post',
        url: baseURL + "/api/money/withdraw",
        data: {
          money:this.withdrawNum,
          type:this.tixianType
        }
      })
      .then((result) => {
        if(result.data.code == 0){
          Toast.success('提现申请已提交');
        }
      }).catch((err) => {
        Toast(err.response.data.error)
      });
    }
  },
  created() {
    this.getTeamMoneyInfo()
  }
};
</script>

<style>
.shareTitle {
  text-align: center !important;
}

.payWXicon {
  vertical-align: middle;
}

#payWX .van-cell__right-icon {
  line-height: 46px;
}

#payWX .van-cell__value {
  line-height: 46px;
}
.tixianType .van-radio{
  height: 30px;
}
.balance {
  padding: 0 0.213333rem /* 16/75 */;
  font-size: 0.346667rem /* 26/75 */;
  padding-bottom: 0.4rem /* 30/75 */;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5e5;
}
.balance span {
  color: #999999;
}
.balance em {
  font-style: normal;
  font-size: 0.346667rem /* 26/75 */;
  font-weight: normal;
}
.balance strong {
  font-size: 0.533333rem; /* 40/75 */
}
.payProduct {
  display: block;
  padding-top: 0.266667rem /* 20/75 */;
  border: none;
  padding-bottom: 0;
}
.payProduct span {
  color: #333333;
  display: block;
  padding-bottom: 0.266667rem /* 20/75 */;
}
.payProduct ul {
  display: flex;
  justify-content: space-between;
}
.payProduct li {
  padding: 0 0.373333rem /* 28/75 */;
  text-align: center;
  line-height: 0.88rem /* 66/75 */;
  color: #4e8cee;
  border: 1px solid #4e8cee;
  border-radius: 0.106667rem; /* 8/75 */
}
.toPayHistory {
  width: 2rem /* 150/75 */;
  margin: 0 auto;
  margin-top: 0.48rem /* 36/75 */;
  font-size: 0.4rem /* 30/75 */;
  display: block;
  text-align: center;
  /* text-decoration: underline; */
  border-bottom: 1px solid #aaaaaa;
  color: #aaaaaa;
  padding-bottom: 4px;
}
.inputMoney {
  line-height: 1.066667rem /* 80/75 */;
  padding-bottom: 0.266667rem /* 20/75 */;
  border-bottom: 1px solid #eee;
  margin-bottom: 0.4rem /* 30/75 */;
}
.inputMoney input {
  border: none;
  font-size: 0.56rem /* 42/75 */;
}
.btnSubmit {
  text-align: center;
}
.btnSubmit .van-button--primary {
  background: #4e8cee;
  border: none;
  /* width: 4.08rem */ /* 306/75 */
  margin: 0 auto;
  margin-top: 0.266667rem /* 20/75 */;
}
</style>