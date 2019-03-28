<template>
  <div>
    <div class="public-title">帐户资产</div>
    <div class="flex-box">
      <Card class="money-item">
        <div style="text-align:center">
          <span>帐户余额</span>
          <h3>{{ money.toFixed(2) }}</h3>
          <img src="../../../assets/img/mange/yue.png">
        </div>
      </Card>

      <Card class="money-item">
        <div style="text-align:center">
          <span>代金券</span>
          <h3>{{ DDQ }}</h3>
          <img src="../../../assets/img/mange/yue5.png">
        </div>
      </Card>
      <Badge text="new">
        <Card class="money-item">
          <div style="text-align:center">
            <span>订单券</span>
            <h3>{{ DJQ || '0.00' }}</h3>
            <img src="../../../assets/img/mange/yue4.png">
          </div>
        </Card>
      </Badge>
    </div>
    <br>
    <div class="public-title">帐户充值</div>
    <div class="recharge">
      <RadioGroup
        v-model="rechargeVal"
        type="button"
        size="large"
      >
        <Radio
          v-for="(item,index) in productPay"
          :key="index"
          :label="item.productPrice"
        ></Radio>
      </RadioGroup>
    </div>
    <br>
    <div class="public-title">支付方式</div>
    <div class="pay-type">
      <!--微信支付 -->
      <div
        class="pay-type-items wechat-type"
        @click="atPay('wechat')"
      >
        <img src="../../../assets/img/mange/wechat-ico.jpg">
      </div>
      <!--支付宝支付 -->
      <div
        class="pay-type-items alipay-type"
        @click="atPay('alipay')"
      >
        <img src="../../../assets/img/mange/alipay-ico.jpg">
      </div>
    </div>
    <Modal
      v-model="payModal"
      width="360"
    >
      <p
        slot="header"
        style="color:#3d6cc8;text-align:center"
      >
        <Icon type="ios-information-circle"></Icon>
        <span>扫码支付</span>
      </p>
      <div style="text-align:center">
        <img :src="payCode">
      </div>
      <div slot="footer">
        <Button
          type="primary"
          size="large"
          @click="payModal = false"
          long
        >确认</Button>
      </div>
    </Modal>
    <br>
    <div class="public-title">充值历史</div>
    <div class="payHistory">
      <Table
        :columns="columns"
        :data="historyPayData"
      ></Table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productPay: [], //套餐列表
      productId: "", //订单商品id
      payCode: "", //跳转支付,
      money: 0, //余额
      DDQ: 0, //订单券
      DJQ: 0, //代金券
      rechargeVal: "500",
      payModal: false,
      columns: [
        {
          title: "时间",
          key: "date"
        },
        {
          title: "金额",
          key: "money"
        },
        {
          title: "操作",
          key: "type"
        }
      ],
      //历史支付
      historyPayData: [
        {
          money: 18,
          type: "帐户充值",
          date: ""
        }
      ]
    };
  },
  methods: {
    //获取平台提供充值商品/套餐列表接口
    getPayProduct() {
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/pay/product"
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
    // 支付
    atPay(type = "wechat") {
      this.$Message.loading({
        content: "Loading...",
        duration: 0
      });
      var self = this;
      var payUrl;
      if (type == "wechat") {
        payUrl = "/api/scan/order";
      } else if (type == "alipay") {
        payUrl = "/api/alipc/order";
      }
      var productId;
      this.productPay.map(item => {
        if (this.rechargeVal == item.productPrice) {
          console.log(item);
          productId = item.productId;
        }
      });

      this.$axios({
        url: this.$GLOBAL.baseURL + payUrl,
        method: "get",
        params: {
          productId: productId
        }
      })
        .then(result => {
          if (result.data.code == 5191) {
            var codeUrl = `http://qr.liantu.com/api.php?text=${
              result.data.data.code_url
            }`;
            var img = new Image();
            img.src = codeUrl;
            img.onload = function() {
              self.$Message.destroy()
              self.payModal = true;
              self.payCode = codeUrl;
            };
          }
        })
        .catch(error => {});
    },
    //微信支付
    goPayWX() {
      this.$axios({
        url: this.$GLOBAL.baseURL + "/api/pubnum/authorize",
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
      this.$axios({
        url: this.$GLOBAL.baseURL + "/api/pay/historyPay",
        method: "get",
        params: {
          page: 1,
          rows: 20
        }
      })
        .then(result => {
          if (result.data.code == 0 && result.data.data.length) {
            var historyPayData = result.data.data;
            var newHistory = [];
            historyPayData.map(item => {
              newHistory.push({
                money: item.pay_money,
                type: "帐户充值",
                date: this.timeFormat(item.time_end)
              });
            });
            this.historyPayData = newHistory;
          }
        })
        .catch(error => {});
    },
    //获取用户余额
    getBalance() {
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/user/getBalance"
      })
        .then(result => {
          if (result.data.code == 0) {
            this.money = result.data.data.userBasic.money;
            this.DDQ = result.data.data.couponInfoList[0].couponValue;
            this.DJQ = result.data.data.couponInfoList[1].couponValue;
          }
        })
        .catch(err => {});
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
    this.getBalance();
  }
};
</script>

<style scoped>
.flex-box {
  display: flex;
}
.money-item {
  width: 100px;
  display: inline-block;
  margin-left: 20px;
}
.money-item img {
  width: 50%;
}
.recharge {
  margin-left: 20px;
}
.recharge ul {
  display: flex;
}
.recharge li {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 16px;
}
.ivu-radio-group-button.ivu-radio-group-large .ivu-radio-wrapper {
  margin-right: 20px;
}
/* pay-type */
.pay-type {
  margin-left: 20px;
}
.pay-type-items.active {
  border-color: #3d6cc8;
}
.pay-type-items {
  width: 160px;
  height: 50px;
  border-radius: 6px;
  overflow: hidden;
  display: inline-block;
  border: 1px solid #dcdcdc;
  margin-right: 30px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  transition: 0.5s;
}
.pay-type-items:after {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.pay-type-items img {
  vertical-align: middle;
  width: 93%;
}
.alipay-type img {
  width: 80%;
}
</style>