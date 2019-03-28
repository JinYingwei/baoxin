<template>
	<div>
		<div class="shadow-box center">
<br>
      <div class="balance ">
        <span>帐户余额</span>
        <strong>
          {{ money }}
          <em>元</em>
        </strong>
      </div>
      <div class="balance ">
        <span>代金券</span>
        <strong>
          {{ DDQ }}
          <em>元</em>
        </strong>
      </div>
      <div class="balance ">
        <span>订单券</span>
        <strong>
          {{ DJQ }}
          <em>单</em>
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
		<!-- <div class="center">
			<h3 class="shareTitle">充值历史</h3>
			<van-collapse v-model="activeNames" accordion>
				<van-collapse-item name="1">
					<div slot="title">历史记录
						<van-icon name="clock" />
					</div>
					<van-cell v-for="(item,index) in historyPayData" :key='index' :value="timeFormat(item.time_end)">
						<template slot="title">
							<span class="van-cell-text">{{ '+' + item.pay_money }}</span>
						</template>
					</van-cell>
				</van-collapse-item>

			</van-collapse>
		</div> -->
	</div>
</template>

<script>

export default {
  data() {
    return {
      radio: "充值50元",
      activeNames: "0",
      productPay: [], //套餐列表
      productId: "", //订单商品id
      PayWXurl: "", //跳转支付,
	  historyPayData: [], //历史支付
	  money:0,//余额
    DDQ:0,//订单券
    DJQ:0,//代金券
    };
  },
  methods: {
    radios(name, id) {
      this.radio = name;
      this.productId = id;

      this.goPayWX();
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
            this.$toast("系统错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //微信支付
    goPayWX() {
      this.axios({
        url: baseURL + "/api/pubnum/authorize",
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
    //获取历史支付
    historyPay() {
      this.axios({
        url: baseURL + "/api/pay/historyPay",
        method: "get",
        params: {
          page: 1,
          rows: 20
        }
      })
        .then(result => {
          if (result.data.code == 0 && result.data.data.length) {
            this.historyPayData = result.data.data;
          }
        })
        .catch(error => {});
	},
	//获取用户余额
	getBalance(){
		this.axios({
			method:'get',
			url: baseURL + "/api/user/getBalance",
		})
		.then((result) => {
			if(result.data.code == 0){
        this.money = result.data.data.userBasic.money
        this.DDQ = result.data.data.couponInfoList[0].couponValue
        this.DJQ = result.data.data.couponInfoList[1].couponValue
			}
		})
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
    //历史支付
	this.historyPay();
	//余额
	this.getBalance()
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

.balance{
  padding: 0 .213333rem /* 16/75 */;
  font-size: .346667rem /* 26/75 */;
 /* padding-bottom: .4rem /* 30/75 */;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5e5;
  line-height: .8rem /* 60/75 */
}
.balance span{
  color: #999999;
}
.balance em{
  font-style: normal;
  font-size: .346667rem /* 26/75 */;
  font-weight: normal;
}
.balance strong{
  font-size: .533333rem /* 40/75 */
}
.payProduct{
  display: block;
  padding-top: .266667rem /* 20/75 */;
  border: none;
}
.payProduct span{
color: #333333;
display: block;
padding-bottom: .4rem /* 30/75 */;
}
.payProduct ul{
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
}
.payProduct li{
  /* padding: 0 .373333rem 28/75; */
  width:2.4rem /* 180/75 */;
  text-align: center;
  /*line-height: .88rem /* 66/75 */;
  color: #4e8cee;
  border: 1px solid #4e8cee;
  border-radius: .106667rem /* 8/75 */;
  margin-bottom:  .24rem /* 18/75 */;
  margin-right: .24rem /* 18/75 */
}
.toPayHistory{
  width: 2rem /* 150/75 */;
  margin: 0 auto;
  margin-top: .48rem /* 36/75 */;
  font-size: .4rem /* 30/75 */;
  display: block;
  text-align: center;
  /* text-decoration: underline; */
  border-bottom: 1px solid #aaaaaa;
  color: #aaaaaa;
  padding-bottom: 4px;
}
</style>
