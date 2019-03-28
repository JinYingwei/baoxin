<template>
  <div class="pan">
    <!-- 标签栏 -->
    <van-tabs v-model="activeTabIndex" @change="getTabIndex" color="#4e8cee" swipeable>
      <van-tab title='资料分享'></van-tab>
      <van-tab title='分享统计'></van-tab>
    </van-tabs>
    <!-- 搜索 -->
    <div class="search" v-show="activeTabIndex != 1">
      <van-search placeholder="搜索分享文件" @search="getFileByName" v-model="searchVal" />
    </div>

    <router-view :searchResult='searchResult'></router-view>

  </div>
</template>

<script>
export default {
  created() {
    var activeTabIndex = this.activeTabIndex
    switch (activeTabIndex) {
        case '0':
          this.$router.push({name:'panMain'})          
          break;
        case '1':
          this.$router.push({name:'panStat'})          
          break;
        default:
          this.$router.push({name:'panMain'}) 
          break;
      }
  },
  data() {
    return {
      dataText:'',
      activeTabIndex: "0", //顶部当前激活的标签索引
      searchVal: "", //搜索内容
      searchResult:[]
    };
  },
  methods: {
    // 标签索引与标题
    getTabIndex(index, title) {
      switch (title) {
        case '资料分享':
          this.$router.push({name:'panMain'})          
          break;
        case '分享统计':
          this.$router.push({name:'panStat'})          
          break;
        default:
          this.$router.push({name:'panMain'}) 
          break;
      }
    },
    // 文件搜索
    getFileByName() {
      if(!this.searchVal){
        this.$toast("请输入搜索内容");
        return
      }
      this.axios({
        method: "get",
        url: baseURL + "/api/teamMeans/teamGetFileByName",
        params: {
          fileName: this.searchVal
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            if (result.data.data.length) {
              this.searchResult = result.data.data;
            } else {
              this.searchResult = []
              this.$toast("没有匹配到内容");
            }
          }
        })
        .catch(err => {});
    },
  }
};
</script>

<style scoped>
.pan .shadow-box {
  background: #f9f9f9;
  min-height: 63vh;
  position: relative;
}
.pan {
  background: #f2f2f2;
  min-height: 100vh;
}
/* search */
.search >>> .van-field__control {
  text-align: center;
}
.search >>> .van-cell {
  border-radius: 14px;
  background: #e9e9e9;
}
.search >>> .van-search {
  padding: 20px 15px;
}
/* breadcrumb */
.breadcrumb {
  width: 92%;
  margin: 0 auto;
  display: flex;
}
.breadcrumb > a {
  color: #666666;
  padding-right: 3px;
}
.breadcrumb > a strong {
  display: inline-block;
  vertical-align: middle;
  font-weight: normal;
  color: #666666;
  max-width: 2.466667rem /* 200/75 */;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.breadcrumb > a span {
  display: inline-block;
  vertical-align: middle;
}
.breadcrumb > a::after {
  /* content: ">"; */
  padding-left: 3px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>