<template>
  <div>
    <div id="historyPay" class="shadow-box center" v-if="historyPay">
      <ul class="historyPay" v-if="historyPay.length">
        <li v-for="(item,index) in historyPayData" :key='index'>
          <div class="left">
            <strong>微信充值</strong>
            <span>{{ timeFormat(item.time_end) }}</span>
          </div>
          <div class="right">{{ item.pay_money }}</div>
        </li>
      </ul>
      <div v-else class="nullTip">
            暂无数据
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      historyPayData: '' //历史支付
    };
  },
  created() {
    this.historyPay();
  },
  methods: {
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
          }else{
            this.historyPayData = []
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
  }
};
</script>

<style scoped>
#historyPay.center {
  height: 84vh;
  overflow: auto;
}
.historyPay {
  line-height: 2.106667rem /* 158/75 */;
}
.historyPay li {
  padding-left: 1.626667rem /* 122/75 */;
  background: url(../../assets/img/pay.png) no-repeat;
  background-size: 0.8rem /* 60/75 */ 0.8rem /* 60/75 */;
  background-position: 0.466667rem /* 35/75 */ center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
}
.historyPay .left strong {
  display: block;
  line-height: 0.533333rem /* 40/75 */;
}
.historyPay .left span {
  display: block;
  line-height: 0.533333rem /* 40/75 */;
}
.historyPay .right {
  padding-right: 0.16rem /* 12/75 */;
}
</style>