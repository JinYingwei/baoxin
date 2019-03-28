<template>
  <div class="shadow-box center">
    <ul class="clientList" v-if="clientData.length">
      <li v-for="(item,index) in clientData" @click="backAddVisit(item.customName,item.customPhone,item.id)" :key="index" class="items" :class="{move:isMove}">
        <strong class="items-name">{{ item.customName }}</strong>
        <p class="items-tel"><i class="iconfont icon-dianhua"></i><span>{{ item.customPhone }}</span></p>
        <p class="rightArrow"><i class="iconfont icon-jiantou-copy-copy"></i></p>
      </li>
    </ul>
    <!-- 空空如也 -->
      <div class="null-con" v-else>
        <i class="iconfont icon-tubiaozhizuomoban"></i>
        <p>空空如也</p>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clientData:'',//客户数据
      isMove:false,
      toWhere:true,//跳转组件
    }
  },
  created(){
    var phone = this.$route.params.phone
      if(phone){
        this.toWhere=false,//跳转组件
        this.searchClient(phone)
      }else{
        this.searchClient()
      }
  },
  methods: {
    //查询客户列表
    searchClient(phone){
      this.axios({
        method:'get',
        url: baseURL+'/api/agent/customer/searchList',
        params: {
          sortType:1,
          customPhone:phone
        }
      }).then((result) => {
        if(result.data.code == 0){
          if(result.data.data.items.length){
            this.clientData = result.data.data.items
            this.$nextTick(function(){
             if(this.clientData.length){
              this.isMove = true;
            }
            })
            
          }
          
        }else{

        }
      }).catch((err) => {
        
      });
    },
    backAddVisit(customName,customPhone,id){
      if(this.toWhere){
        this.$router.push({name:'addVisit',params:{customName,customPhone}})
      }else{
         this.$router.push({name:'clientDtail',params:{id,id}})
      }
    }
  },
};
</script>

<style scoped>
.clientList .items {
  display: flex;
  align-items: center;
  line-height: 1.066667rem /* 80/75 */;
  border-bottom: 1px solid #e5e5e5;
  transition: .9s;
  opacity: .2;
}
.clientList .move{
  opacity: 1;
}
.items-name {
  width: 20%;
  font-size: 0.4rem /* 30/75 */;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 0.106667rem /* 8/75 */;
}
.items-tel {
  width: 30%;
  font-size: 0.32rem /* 24/75 */;
}
.rightArrow {
  flex: 2;
  text-align: right;
}
.null-con {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.null-con .icon-tubiaozhizuomoban {
  font-size: 2rem /* 150/75 */;
}
</style>