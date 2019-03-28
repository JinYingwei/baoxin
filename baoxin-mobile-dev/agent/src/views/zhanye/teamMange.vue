<template>
  <div>
    <div class="shadow-box center minHeight">
      <h3>团队搜索</h3>
      <van-search v-model="searchValue" placeholder="请输入团队名称" show-action @search="onSearch">
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <!-- 搜索结果 -->
      <div class="teamResult">
        <van-cell-group>
          <van-cell v-for="(item,index) in teamResultData" :key="index" :title="item.userName" >
            <span class="teamLocation">{{ addressTransForm(item.area) }}</span>
            <van-button size="mini" type="danger" @click="join(item.id)">加入</van-button>
          </van-cell>
        </van-cell-group>
      </div>
      <h3>我的团队</h3>
      <div  v-if="myTeamList.length">
        <van-cell v-for="(item,index) in myTeamList" :key="index" :title="item.userName" icon="contact" :to="{name:'teamDtails',query:{teamId:item.userId,status:item.status}}" is-link>
				<van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
			</van-cell>
      </div>
      <!-- 空空如也 -->
      <div class="null-con" v-else>
        <i class="iconfont icon-tubiaozhizuomoban"></i>
        <p>暂无团队</p>
      </div>
    </div>
  </div>
</template>

<script>

import cityData from "../../assets/js/region.js";
import utils from "../../assets/js/utils.js";
export default {
  data() {
    return {
      searchValue: "", //搜索内容
      teamResultData: [], //团队搜索结果
      myTeamList: '', //已加入团队数据
      activeTeamName: '0'
    };
  },
  methods: {
    // 团队搜索
    onSearch() {
      if(!this.searchValue){
         this.$toast("请输入团队名称~");
         return
      }
      this.axios({
        method: "get",
        url: baseURL + "/api/user/queryTeams",
        params: {
          content: this.searchValue.trim()
        }
      })
        .then(result => {
          if (result.data.code == 0 && result.data.data.list.length) {
            this.teamResultData = result.data.data.list;
          } else {
            this.$toast("没有查找到相关团队~");
             this.teamResultData = []
          }
        })
        .catch(err => {});
    },
    // 加入团队
    join(teamId) {
      this.axios({
        method: "post",
        url: baseURL + "/api/user/applyTeams",
        params: {
          teamId: teamId
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            this.$toast("成功加入,正在审核中~");
            this.getMyTeam()
            this.teamResultData = []
          }
        })
        .catch(err => {
          this.$toast(err.response.data.error);
        });
    },
   
    // 已加入团队
    getMyTeam() {
      this.axios({
        method: "get",
        url: baseURL + "/api/user/getMyTeam"
      })
        .then(result => {
          if (result.data.code == 0) {
            this.myTeamList = result.data.data.list;
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast(err.response);
        });
    },
    //转换时间
    timeFormat(sendTime) {
      var timeFormat = utils.timeFormat;
      return timeFormat(sendTime);
    },
    addressTransForm(address){
      if(!address){return}
      return utils.getCityResult(cityData,address);
    }
  },
  created(){
    this.getMyTeam()
  }
};
</script>

<style>
.minHeight {
  min-height: 83vh;
}
.teamResult {
  margin-top: 30px;
  padding-bottom: 3px;
}
.teamInfo {
  padding: 10px;
}
.teamResult .teamLocation {
  padding-right: 20px;
}
.teamResult .van-cell__value {
  flex: 2;
}
.quitTeam.van-button--mini{
  width: auto;
  padding: 0 4px;
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
.teamResult >>> .van-cell__title{
  flex: 1
}
</style>