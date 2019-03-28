<template>
  <div>
    <!-- now-date -->
    <div class="shadow-box center now-date">
      <div class="data-card shadow-item">
        <strong></strong>
        <h2>{{ currentTime.day }}</h2>
      </div>
      <div class="data-main">
        <p><strong>{{ currentTime.dateStr }}</strong><span>{{ currentTime.weeks }}</span></p>
        <span>农历 {{ currentTime.lunarDate }}</span>
      </div>
      <router-link :to="{name:'addVisit'}" class="add-visit">
        添加拜访
      </router-link>
    </div>
    <!-- 今日拜访 -->
    <div class="shadow-box center now-visit">
      <div class="common-top">
        <i class="iconfont icon-baifangjilu"></i>
        <span>今日拜访</span>
      </div>
      <ul class="visit-list">
        <li v-show="todayVisit.length" @click="toDetail(item.visitPersonPhone)"  v-for="(item,index) in todayVisit" :key="index">
          <div class="visit-info">
            <p>
              <strong>{{ item.visitPersonName}}</strong>
              <span> <i class="iconfont icon-dianhua"><em>{{ item.visitPersonPhone}}</em></i></span>
            </p>
            <p>备注：{{ item.remark}}</p>
          </div>
          <div class="to-details">
            <i class="iconfont icon-jiantou-copy-copy"></i>
          </div>
        </li>
        <div v-show="!todayVisit.length" class="null-tip"><van-icon name="warn" /><span>无今日拜访客户</span></div>
      </ul>
    </div>
        <!-- 今日生日 -->
    <div class="shadow-box center now-visit">
      <div class="common-top">
        <i class="iconfont icon-shengri"></i>
        <span>今日生日</span>
      </div>
      <ul class="visit-list">
        <li v-show="todayBirthday.length" @click="toDetail(item.customPhone)"  v-for="(item,index) in todayBirthday" :key="index">
          <div class="visit-info">
            <p>
              <strong>{{ item.customName }}</strong>
              <span> <i class="iconfont icon-dianhua"><em>{{ item.customPhone }}</em></i></span>
            </p>
          </div>
          <div class="to-details">
            <i class="iconfont icon-jiantou-copy-copy"></i>
          </div>
        </li>
        <div v-show="!todayBirthday.length" class="null-tip"><van-icon name="warn" /><span>无今日生日客户</span></div>
      </ul>
    </div>
        <!-- 到期保单 -->
    <div class="shadow-box center now-visit">
      <div class="common-top">
        <i class="iconfont icon-daoqitongji"></i>
        <span>到期保单</span>
      </div>
      <ul class="visit-list">
        <li v-show="todayExpire.length" @click="toDetail(item.customPhone)" v-for="(item,index) in todayExpire" :key="index">
          <div class="visit-info">
            <p>
              <strong>{{ item.customName }}</strong>
              <span> <i class="iconfont icon-dianhua"><em>{{ item.customPhone }}</em></i></span>
            </p>
             <p>到期时间：{{ timeFormat(item.policyExpireTime) }}</p>
          </div>
          <div class="to-details">
            <i class="iconfont icon-jiantou-copy-copy"></i>
          </div>
        </li>
        <div v-show="!todayExpire.length" class="null-tip"><van-icon name="warn" /><span>无到期保单客户</span></div>
      </ul>
    </div>
  </div>
</template>

<script>
import utils from '../../../assets/js/utils.js'
export default {
  data() {
    return {
      todayVisit: '',//拜访
      todayBirthday: '',//生日
      todayExpire: '',//保单
      currentTime:{}
    }
  },
  created(){
    // 获取当前日期，农历日期等
    this.getCurrentTime()
    // 获取今日待办
    this.getTodayPending()
  },
  methods: {
    // 获取今日待办
    getTodayPending() {
      this.axios({
        method:'get',
        url: baseURL+'/api/agent/getTodayPending',
        // url:"https://www.easy-mock.com/mock/5baef22ab793604807ec54ae/loffery/getTodayPending",
      }).then((result) => {
        if(result.data.code == 0){
           
          if(result.data.data.todayVisit.length){
           
            this.todayVisit = result.data.data.todayVisit
          }
          if(result.data.data.todayBirthday.length){
            this.todayBirthday = result.data.data.todayBirthday
          }
          if(result.data.data.todayExpire.length){
            this.todayExpire = result.data.data.todayExpire
          }
        }
      }).catch((err) => {
        
      });
    },
    toDetail(phone){
      this.$router.push({name:'clientList',params:{phone:phone}})
    },
    getCurrentTime(){
      this.axios({
        method:'get',
        url: baseURL+'/api/sys/getCurrentTime',
      }).then((result) => {
        if(result.data.code == 0){
          this.currentTime = result.data.data
        }
      }).catch((err) => {
        
      });
    },
    timeFormat(val){
      return utils.timeFormat(val,2)
    }
  },
};
</script>

<style scoped>
.shadow-item {
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}
.data-card {
  width: 1.066667rem /* 80/75 */;
  border-radius: 0.16rem /* 12/75 */;
  text-align: center;
  overflow: hidden;
}
.data-card strong {
  display: block;
  background: #ff5d61;
  height: 0.266667rem /* 20/75 */;
}
.data-card h2 {
  margin: 0;
  line-height: 0.666667rem /* 50/75 */;
  font-size: 0.4rem /* 30/75 */;
}
.now-date {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.data-main {
  margin-left: 0.32rem /* 24/75 */;
}
.data-main p {
  line-height: 0.4rem /* 30/75 */;
}
.data-main strong {
  font-size: 0.4rem /* 30/75 */;
  padding-right: 0.4rem /* 30/75 */;
}
.data-main span {
  font-size: 0.293333rem /* 22/75 */;
}
.data-main p {
  margin: 0;
}
.add-visit {
  width: 2rem /* 150/75 */;
  height: 0.72rem /* 54/75 */;
  border: 1px solid #4e8dee;
  color: #4e8dee;
  border-radius: 0.16rem /* 12/75 */;
  text-align: center;
  line-height: 0.72rem /* 54/75 */;
  margin-left: 1.066667rem /* 80/75 */;
}
.now-visit .iconfont{
   color: #4e8dee;
   font-size: .533333rem /* 40/75 */;
}

.common-top .iconfont{
  vertical-align: middle
}
.common-top span{
  vertical-align: middle
}
.visit-list li{
  height: 1.733333rem /* 130/75 */;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
}
.visit-info p{
  margin: 0;
  margin-top: .133333rem /* 10/75 */;
}
.visit-info .iconfont{
  font-size: .4rem /* 30/75 */;
}
.visit-info strong{
  font-size: .4rem /* 30/75 */;
  padding-right: .533333rem /* 40/75 */;
}
.visit-info em{
  font-style: normal;
  font-size: .32rem /* 24/75 */;
  color: #666
}
.to-details .icon-jiantou-copy-copy{
  color: #888894
}
.null-tip{
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: .773333rem /* 58/75 */;
  color: rgb(189, 171, 171)
}
.null-tip span{
  padding-left: .08rem /* 6/75 */;
}
</style>