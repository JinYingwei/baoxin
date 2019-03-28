<template>
  <div>
    <div id="pay" class="shadow-box center">
      <br>
      <div class="balance ">
        <span>帐户余额</span>
        <strong>
          {{ money }}
          <em>元</em>
        </strong>
      </div>

      <div class="balance payProduct">
        <span>充值金额</span>
        <ul>
          <li :key="index" v-for="(item,index) in productPay" @click="radios(item.productName,item.productId)">{{ item.productName }}</li>
        </ul>
      </div>

      <router-link class="toPayHistory" :to="{name:'payHistory'}" tag="div">充值记录</router-link>

      <!-- <van-radio-group v-model="radio">
				<van-cell-group>
					<van-cell :title="item.productName" :key="index" v-for="(item,index) in productPay" clickable @click="radios(item.productName,item.productId)">
						<van-radio :name="item.productName" />
					</van-cell>

				</van-cell-group>
			</van-radio-group> -->
      <!-- <h3 class="shareTitle">支付方式</h3>
			<van-cell-group>
				<van-cell value="支付" id="payWX" is-link  @click="goPayWX">
					<template slot="title">
						<img class="payWXicon" src="../../assets/img/wechat.png">
						<span class="van-cell-text">微信支付</span>
					</template>
				</van-cell>
			</van-cell-group> -->

    </div>

  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      radio: "充值50元",
      activeNames: "0",
      productPay: [], //套餐列表
      productId: "", //订单商品id
      PayWXurl: "", //跳转支付,
      money: "" //余额
    };
  },
  methods: {
    radios(name, id) {
      this.radio = name;
      this.productId = id;

      this.goPayWX();
    },
    // 获取团队余额、欠费金额
    getTeamMoneyInfo() {
      this.axios({
        method: "get",
        url: baseURL + "/api/money/getTeamMoneyInfo"
      })
        .then(result => {
          if (result.data.code == 0) {
            this.money = result.data.data.money;
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    //获取平台提供充值商品/套餐列表接口
    getPayProduct() {
      this.axios({
        method: "get",
        url: baseURL + "/api/pay/product"
      })
        .then(result => {
          if (result.data.code == 0 && result.data.data.length) {
            var data = result.data.data;
            this.productId = data[0].productId; //默认第二个商品的ip   测试阶段
            for (var i = 0; i < data.length; i++) {
              this.productPay.push(data[i]);
            }
          } else {
            Toast("系统错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //微信支付
    goPayWX() {
      this.axios({
        url: baseURL + "/api/pubnum/teamauthorize",
        method: "get",
        params: {
          productId: this.productId
        }
      })
        .then(result => {
          if (result.data.code == 5202) {
            location.href = result.data.data.authorize_url;
          }
        })
        .catch(error => {});
    },
    // 时间戳转日期格式
    timeFormat: function(time) {
      var time = String(time);
      var year = time.slice(0, 4);
      var month = time.slice(4, 6);
      var date = time.slice(6, 8);
      var hour = time.slice(8, 10);
      var minute = time.slice(10, 12);

      return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    }
  },
  created() {
    //套餐列表接口
    this.getPayProduct();
    //余额
    this.getTeamMoneyInfo();
  }
};
</script>

<style>
#pay.center{
  height: 84vh;
  overflow: auto;
}
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
}
.payProduct span {
  color: #333333;
  display: block;
  padding-bottom: 0.4rem /* 30/75 */;
}
.payProduct ul {
  display: flex;
  /* justify-content: space-between */
  flex-wrap: wrap;
}
.payProduct li {
  width: 2.4rem;
  text-align: center;
  color: #4e8cee;
  border: 1px solid #4e8cee;
  border-radius: 0.106667rem;
  margin-bottom: 0.24rem;
  margin-right: 0.24rem;
  padding: .133333rem 0 /* 15/75 */ /* 10/75 */
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
</style>
