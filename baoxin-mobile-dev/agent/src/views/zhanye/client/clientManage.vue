<template>
  <div>
    <div class="search">
      <van-search placeholder="搜索客户" @search="getFileByName" v-model="searchVal" />
      <div class="sort">
        <h4 class="sort-head" @click="showFilter"><strong class="iconfont icon-paixu"></strong><span>排序</span></h4>
        <ul class="sort-filter" v-show="filter">
          <li v-for="(item,index) in sortFilter" @click="searchClient(item.sortType)" :key="index">{{ item.text }}</li>
        </ul>
      </div>
    </div>
    <div class="shadow-box center">
      <div class="common-top">
        <div>
          <i class="iconfont icon-tuandui"></i>
          <span>客户人数: {{ clientTotalNum }}</span>
        </div>
        <van-button class="btn-warp" size="small" @click="toAddClient" type="default"><i class="iconfont icon-xinzenghuiyuan"></i>添加</van-button>
      </div>
      <div class="swipe-cell-warp" v-if="clientData.length">
          <van-cell v-for="(item,index) in clientData" :key="index" :to="{name:'clientDtail',query:{id:item.id}}" is-link>
            <template slot="title">
              <strong class="title">{{ item.customName }}</strong>
              <span class="tel">
                <i class="iconfont icon-dianhua"></i>
                <em>{{ item.customPhone }}</em>
              </span>
            </template>
          </van-cell>
      </div>
      <!-- 空空如也 -->
      <div class="null-con" v-else>
        <i class="iconfont icon-tubiaozhizuomoban"></i>
        <p>空空如也</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchVal: "",
      sortFilter: [
        { text: "最近添加", sortType: 1 },
        { text: "最早添加", sortType: 2 },
        { text: "生日", sortType: 3 },
        { text: "保单到期", sortType: 4 }
        // {text:'拜访',sortType:1}
      ],
      filter:false,
      clientData: "", //客户数据
      clientTotalNum: 0 //客户数量
    };
  },
  watch:{
    searchVal(val,val2){
      if(val.length == 0){
        this.searchClient();
      }
    }
  },
  created() {
    this.searchClient();
  },
  methods: {
    getFileByName(val) {
      this.searchClient(1,val);
    },
    //查询客户列表
    searchClient(sortType=1,customName) {
      var searchVal = customName
      if(searchVal){
        searchVal.trim()
      }
      this.axios({
        method: "get",
        url: baseURL + "/api/agent/customer/searchList",
        params: {
          sortType: sortType || 1,
          customNameOrPhone:searchVal
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            this.clientTotalNum = result.data.data.totalNum || result.data.data.items.length;
            // if (result.data.data.items.length) {
              this.clientData = result.data.data.items;
            // }
          }
          this.filter = false
        })
        .catch(err => {});
    },
    showFilter(){
      this.filter = !this.filter;
      setTimeout(()=>{
        this.filter = false
      },3000)
    },
    toAddClient() {
      this.$router.push({ name: "addClient" });
    }
  }
};
</script>

<style scoped>
/* search */
.search {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.search >>> .van-field__control {
  text-align: center;
}
.search >>> .van-cell {
  border-radius: 14px;
  background: #e9e9e9;
}
.search >>> .van-search {
  padding: 20px 15px;
  background: none !important;
  flex: 3;
}
.search .sort {
  flex: 1;
  text-align: center;
  color: #4e8dee;
  position: relative;
}
.search .sort h4 {
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search .sort h4 .iconfont {
  padding-right: 0.106667rem /* 8/75 */;
}
.search .sort-filter {
  padding: 0.133333rem /* 10/75 */ 0;
  position: absolute;
  width: 100%;
  line-height: 0.933333rem /* 70/75 */;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0.16rem /* 12/75 */;
  color: #fff;
  z-index: 20;
}
.search .sort-filter li {
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
}
.search .sort-filter li:last-child {
  border: none;
}
.common-top {
  display: flex;
  align-items: center;

  justify-content: space-between;
}
.common-top .iconfont {
  vertical-align: middle;
}
.common-top span {
  vertical-align: middle;
}
.btn-warp.van-button--default {
  background: #4e8cee;
  color: #fff;
  width: 22%;
}
.btn-warp.van-button--disabled {
  background: #4e8cee;
  opacity: 0.7;
  color: #fff;
  width: 20%;
}
.swipe-cell-warp >>> .van-swipe-cell__left,
.swipe-cell-warp >>> .van-swipe-cell__right {
  display: inline-block;
  background: #f44;
  width: 65px;
  text-align: center;
  line-height: 44px;
  height: 44px;
  color: #fff;
}
.swipe-cell-warp >>> .van-cell__title {
  flex: 2;
  align-items: center;
}
.swipe-cell-warp .title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 2rem /* 150/75 */;
  display: inline-block;
  vertical-align: middle;
}
.swipe-cell-warp .tel {
  padding-left: 0.266667rem /* 20/75 */;
  vertical-align: middle;
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