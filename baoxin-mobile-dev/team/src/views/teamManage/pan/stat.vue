<template>
    <div>
        <!-- 存储概况 -->
        <div class="stored-info center shadow-box">
            <div class="circle">
                <van-circle v-model="currentRate" :rate="teamSpace.userdPercentage" :speed="100" size="60px" layer-color="#bad4ff" :stroke-width="60" :text="circleText" />
            </div>
            <div class="stored-text">
                <p class="stored-text-head">共 {{ teamSpace.transTotalSize }}，可用 {{ teamSpace.transUsable+teamSpace.usableUnit }} <a class="update-stored" @click="toTeamCharge" v-if="teamSpace.totalSize < 5000" href="javascript:;">扩容至5G</a></p>
                <p class="stored-text-info">包含：{{ statistics.totalFileNum }} 个文件，{{ statistics.folderNum }} 个文件夹</p>
            </div>
        </div>
        <!-- 存储类目 -->
        <div class="stored-class center shadow-box">
            <div class="class-item">
                <div class="class-icon">
                    <i class="iconfont icon-wenjianjia"></i>
                </div>
                <h3>文件夹</h3>
                <h5>{{ statistics.folderNum }}</h5>
            </div>
            <div class="class-item">
                <div class="class-icon">
                    <i class="iconfont icon-wendangcopy"></i>
                </div>
                <h3>文档</h3>
                <h5>{{ statistics.docNum }}</h5>
            </div>
            <div class="class-item">
                <div class="class-icon">
                    <i class="iconfont icon-tupian"></i>
                </div>
                <h3>图片</h3>
                <h5>{{ statistics.picNum }}</h5>
            </div>
            <div class="class-item">
                <div class="class-icon">
                    <i class="iconfont icon-tupian"></i>
                </div>
                <h3>视频</h3>
                <h5>{{ statistics.videoNum }}</h5>
            </div>
        </div>
        <!-- 下载排行 -->
        <div class="center shadow-box down-load-rank">
            <h5 class="down-load-rank-head">
                <strong>排行</strong>
                <strong>文件名</strong>
                <strong>下载次数</strong>
            </h5>
            <ul class="down-load-rank-list" v-if="fileRank">
                <li v-for="(item,index) in fileRank" :key="index">
                    <strong>{{ index+1 }}</strong>
                    <strong>{{ item.name }}</strong>
                    <strong>{{ item.downloadTimes }}</strong>
                </li>
            </ul>
            <p v-else>暂无排行数据</p>
        </div>
    </div>
</template>

<script>
import qs from "qs";
export default {
  created(){
    this.search()
    this.getTeamSpace()
    this.getStatistics()
    this.getFileRank()
  },
  data() {
    return {
      currentRate: 0,
      teamData:'',//团队信息
      teamSpace:{},//空间信息
      statistics:{},//统计信息
      fileRank:'',//下载top10
    };
  },
  computed: {
    circleText() {
      return this.currentRate.toFixed(1) + "%";
    }
  },
  methods: {
    // 获取当前团队已用空间和可用空间
    getTeamSpace() {
      this.axios({
        method:'get',
        url: baseURL+'/api/teamMeans/getTeamSpace',
      }).then((result) => {
        if(result.data.code == 0){
          this.teamSpace = result.data.data
          this.currentRate = this.teamSpace.userdPercentage
        }

      }).catch((err) => {

      });
    },
    // 获取团队的各种统计信息
    getStatistics() {
      this.axios({
        method:'get',
        url: baseURL+'/api/teamMeans/getStatistics',
      }).then((result) => {
        if(result.data.code == 0){
          this.statistics = result.data.data
        }
      }).catch((err) => {
        
      });
    },
    // 获取下载量Top10的文件
    getFileRank() {
      this.axios({
        method:'get',
        url: baseURL+'/api/teamMeans/getFileRank',
      }).then((result) => {
        if(result.data.code == 0){
          this.fileRank = result.data.data
        }
      }).catch((err) => {
        
      });
    },
    //查询团队信息
    search() {
      this.axios({
        method: "get",
        url: baseURL + "/api/team/search"
      })
        .then(result => {
          if (result.data[0]) {
            this.teamData = result.data[0];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 跳转团队缴费
    toTeamCharge(){
      this.$router.push({name:'teamCharge'})
    }
  },
};
</script>

<style scoped>
.stored-info {
  display: flex;
  align-items: center;
}
.update-stored {
  color: #4e8cee;
  padding-left: 0.133333rem /* 10/75 */;
  font-weight: bold;
}
.stored-text {
  margin-left: 0.346667rem /* 26/75 */;
}
.stored-text-head {
  font-size: 0.373333rem /* 28/75 */;
  color: #666;
}
.stored-text-info {
  color: #999;
}
.stored-text p {
  margin: 0;
}
.stored-class{
    display: flex;
    justify-content: space-around
}
.class-icon{
    width: .933333rem /* 70/75 */;
    height: .933333rem /* 70/75 */;
    border: 1px solid #999;
    border-radius: 50%;
    text-align: center;
    line-height: .933333rem /* 70/75 */;
    margin: 0 auto;
    color: #333333;
}
.class-item{
    text-align: center;
    width: 1.066667rem /* 80/75 */;
}
.class-item h3,.class-item h5{
    margin: 0;
    font-weight: normal;
}
.class-item h3{
    font-size: .32rem /* 24/75 */;
    line-height: .533333rem /* 40/75 */;
    padding-top: .133333rem /* 10/75 */;
}
.class-item h5{
    font-size: .266667rem /* 20/75 */;
    color: #999;
}
.down-load-rank-head{
    margin: 0;
    color: #999;
    display: flex;
    justify-content: space-between
}
.down-load-rank-list{
  padding-top: .133333rem /* 10/75 */;
}
.down-load-rank-list li{
    display: flex;
    line-height: 1.093333rem /* 82/75 */;
    color: #333
}
.down-load-rank-list li strong{
    color: #333;
    font-weight: normal
}
.down-load-rank-list li strong:nth-child(1){
    flex: 1
}
.down-load-rank-list li strong:nth-child(2){
    flex: 6
}
.down-load-rank-list li strong:nth-child(3){
    flex: 1
}
</style>