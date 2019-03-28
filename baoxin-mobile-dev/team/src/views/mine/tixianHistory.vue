<template>
    <div>
       	<div class="shadow-box center" v-if="historyPayData">
               <ul class="historyPay" v-if="historyPayData.length">
                   <li v-for="(item,index) in historyPayData" :key='index'>
                       <div class="left">
                           <strong>提现</strong>
                           <span>{{ item.createTime }}</span>
                           <span class="status">{{ status(item.status) }}</span>
                           </div>
                       <div class="right">{{ item.money || 0 }}</div>
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
  created(){
      this.historyPay()
  },
  methods: {
    //获取历史支付
    historyPay() {
      this.axios({
        url: baseURL + "/api/money/getTeamApplyRecord",
        url:'https://www.easy-mock.com/mock/5baef22ab793604807ec54ae/loffery/getTeamApplyRecord',
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
    status(status){
      if(status == 1){
        return '申请中'
      }else if(status == 2){
         return '提现成功'
      }else if(status == 3){
        return '提现失败'
      }
    }
  }
};
</script>

<style scoped>
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
.status{
  color: chocolate
}
</style>