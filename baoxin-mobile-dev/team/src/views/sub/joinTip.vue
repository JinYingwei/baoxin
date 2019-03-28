<template>
    <div>
    <div class="center shadow-box member-list-wrap">
      <h3 class="shareTitle">申请加入通知</h3>
      <div id="member-list">
          <ul>
              <li v-for="(item,index) in teamManageList" :key="index">
                  <div class="left">
                      <img src="http://iconfont.alicdn.com/t/1531748288851.jpeg@100h_100w.jpg">
                      <div class="leftInfo">
                          <strong>{{ item.userName }}</strong>
                          <span>{{ item.phone }}</span>
                      </div>
                  </div>
                  <div class="right">
                      <strong @click="applyTeamOperate(item.id,2)">拒绝</strong>
                      <div @click="applyTeamOperate(item.id,1)">同意</div>
                  </div>
              </li>
          </ul>
        <span v-if="teamManageListNull" class="null-tip">
          <van-icon name="info-o" />
          <span>暂无加入申请</span>
        </span>
      </div>
    </div>
    </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      teamManageList: [], //申请列表
      teamManageListNull: true
    };
  },
  created() {
    this.teamManage();
  },
  watch: {
    teamManageList(newValue, oldValue) {
      if(newValue.length == 0){
        this.teamManageListNull = true
      }
    }
  },
  methods: {
    //获取团队申请记录接口
    teamManage() {
      this.axios({
        url: baseURL + "/api/user/teamManage",
        method: "get"
      })
        .then(result => {
          if (result.data.code == 0 && result.data.data.list.length) {
            this.teamManageList = result.data.data.list;
            this.teamManageListNull = false;
          }else{
            this.teamManageList = []
          }
        })
        .catch(error => {});
    },
    //同意/拒绝加入团队
    applyTeamOperate(id, operateType) {
      this.axios({
        url: baseURL + "/api/user/applyTeamOperate",
        method: "post",
        data: {
          id: id,
          operateType: operateType
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            Toast("成功加入~");
            this.teamManage()
          } else {
            Toast("拒绝加入~");
          }
          this.teamManage();
        })
        .catch(error => {
          Toast("系统错误~");
        });
    }
  }
};
</script>

<style scoped>
.center {
  width: 94%;
}
.shareTitle {
  text-align: center;
}
#member-list .van-panel__footer {
  text-align: left;
  overflow: hidden;
}

#member-list .van-panel__footer span {
  padding: 0 8px;
}
#member-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.373333rem /* 28/75 */;
  border-bottom: 0.013333rem /* 1/75 */ solid #e5e5e5;
  margin-bottom: 0.426667rem /* 32/75 */;
}
#member-list .left img {
  width: 1.2rem /* 90/75 */;
  height: 1.2rem /* 90/75 */;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
#member-list .right div {
  display: inline-block;
  font-size: 0.32rem /* 24/75 */;
  padding: 0 0.373333rem /* 28/75 */;
  color: #fff;
  background: #4e8cee;
  border-radius: 0.16rem /* 12/75 */;
  line-height: 0.6rem /* 45/75 */;
}
#member-list .right strong {
  display: inline-block;
  font-size: 0.32rem /* 24/75 */;
  color: #4e8cee;
  padding: 0.533333rem; /* 40/75 */
}
.leftInfo {
  margin-left: 0.373333rem /* 28/75 */;
  display: inline-block;
  vertical-align: middle;
  /* width: 3.733333rem 380/75; */
  overflow: hidden;
}
.leftInfo strong {
  display: block;
  font-size: 0.4rem /* 30/75 */;
}
.leftInfo span {
  font-size: 0.293333rem /* 22/75 */;
  color: #999999;
}
.infiLeft {
  display: inline-block;
  width: 52%;
}

#member-list .van-panel {
  border-bottom: 1px solid #e5e5e5;
}

#member-list .van-hairline--top-bottom::after {
  border: none;
}

#member-list [class*="van-hairline"]::after {
  border: none;
}

.null-tip {
  line-height: 22px;
  display: block;
  text-align: center
}

.null-tip span {
  padding-left: 10px;
  line-height: 22px;
}
.member-list-wrap{
  min-height:84vh;
}
</style>