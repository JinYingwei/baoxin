<template>
  <div>
    <div id="historyPay" class="shadow-box center" v-if="historyPayData">
      <ul class="historyPay" v-if="historyPayData.length">
        <li v-for="(item,index) in historyPayData" :key='index'>
          <div class="left">
            <div class="payTypeIc">
              <i class="iconfont" :class="payTypeFormat(item.category).icon"></i>
            </div>
            <div class="payInfo">
              <strong> {{ payTypeFormat(item.category).text }}</strong>
              <span>{{ item.createTime }}</span>
            </div>
          </div>
          <div class="right"><strong>{{ payTypeFormat(item.category).type }} {{ item.money }} 元</strong></div>
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
      historyPayData: '', //历史支付
      category: 1 //类别: 1-管理费  2-红包  3-充值 4-提现 5-代金券红包 6-订单券红包 7-团队AA 8-团队互助
    };
  },
  created() {
    this.historyPay();
  },
  methods: {
    //获取历史支付
    historyPay() {
      this.axios({
        url: baseURL + "/api/team/managerFee/getTeamAllDetail",
        // url: baseURL + "/api/pay/historyPay",
        method: "get",
        params: {
          page: 1,
          rows: 20
        }
      })
        .then(result => {
          if (result.data.code == 0 && result.data.data.items.length) {
            this.historyPayData = result.data.data.items;
          }else{
             this.historyPayData = []
          }
        })
        .catch(error => {});
    },
    // 收支类型
    payTypeFormat(type){
      switch (type) {
        case 1:
          return {
            text:'管理费',
            type:'-',
            icon:'icon-guanli'
          }
          break;
        case 2:
          return {
            text:'红包',
            type:'-',
            icon:'icon-hongbao'
          }
          break;
        case 3:
          return {
            text:'充值',
            type:'+',
            icon:'icon-chongzhi'
          }
          break;
        case 4:
          return {
            text:'提现',
            type:'-',
            icon:'icon-tx'
          }
          break;
        case 5:
          return {
            text:'代金券红包',
            type:'-',
            icon:'icon-quan'
          }
          break;
        case 6:
          return {
            text:'订单券红包',
            type:'-',
            icon:'icon-quan'
          }
          break;
        case 7:
          return {
            text:'团队AA',
            type:'-',
            icon:'icon-jiaofei'
          }
          break;
        case 8:
          return {
            text:'团队互助',
            type:'+',
            icon:'icon-jiaofei'
          }
          break;
        default:
          break;
      }
    },
    // 时间戳转日期格式
    timeFormat: function(time) {
      var time = String(time);
      var year = time.slice(0, 4);
      var month = time.slice(4, 6);
      var date = time.slice(6, 8);
      var hour = time.slice(8, 10);
      var minute = time.slice(10, 12);

      return month + "-" + date + " " + hour + ":" + minute;
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
  line-height: 1.6rem /* 120/75 */;
}
.historyPay li {
  display: flex;
  padding-left: .266667rem /* 20/75 */
  ;
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
.payInfo{
  display: inline-block;
  vertical-align: middle;
}
.payTypeIc {
  display: inline-block;
  margin-right: .266667rem /* 20/75 */;
}
.payTypeIc .iconfont {
  color: #4e8dee;
  font-size: .72rem /* 54/75 */;
}
.payTypeIc .icon-guanli{
  color: #4ecaf3;
}
.payTypeIc .icon-hongbao{
  color: red;
}
.payTypeIc .icon-quan{
  color: #fcba51;
}
</style>