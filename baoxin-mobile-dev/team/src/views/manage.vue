<template>
  <div>
        <div>

          <div class="center shadow-box" id="members">
            <div class="membersTar">
            <div class="memberChange">
              <i class="iconfont icon-tuandui"></i>
              <span>
                团队人数: {{ memSize }}
                <em>↑</em>
              </span>
            </div>
            <router-link  tag="div" to="/joinTip" class="memberChange memberNumbers">
              <em class="hint" v-show="teamManageListNull"></em>
              <i class="iconfont icon-bianji" style="color:#38f"></i>
              <span>
                加入申请
              </span>
            </router-link>
          </div>
            <van-swipe id="memberList">
              <van-swipe-item>
                <ul class="memberList">
                  <li v-for="(item,index) in TeamMembers" :key="index">
                    <i v-show="starAgentId == item.userId" class="iconfont icon-tuijianmingxing" style="color:gold"></i>
                    <router-link tag='div' :to='/memberDetail/+item.userId'>
                      <img :src="item.headImg || 'http://iconfont.alicdn.com/t/1531748288851.jpeg@100h_100w.jpg'" alt="">
                      <strong>{{ item.userName }}</strong>
                    </router-link>
                   
                  </li>
                </ul>
              </van-swipe-item>

            </van-swipe>
            <span v-show="hasTeamMembers" class="null-tip">
              <van-icon name="info-o" />
              <span>暂无成员</span>
            </span>
          </div>
        </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import utils from "../assets/js/utils.js";
export default {
  data() {
    return {
      active: 0,
      message: "", //通知内容
      teamManageListNum: 0, //申请数量
      teamManageListNull: false,
      TeamMembers: [], //团队成员
      memSize: 0,
      hasTeamMembers: true, //是否有团队成员
      teamId:'',
      starAgentId:'',//明星队员ID
    };
  },
  methods: {
    //转换时间
    timeFormat(sendTime) {
      var timeFormat = utils.timeFormat;
      return timeFormat(sendTime);
    },
    // 获取团队明星
    getTeamStar(){
      var that = this;
      this.axios({
        method: "get",
        url: baseURL + "/api/team/search"
      })
        .then(result => {
          if (result.data[0]) {
            this.teamId = result.data[0].userId
            this.axios({
              method: "get",
              url: baseURL + "/api/user/XCX/getTeamStar",
              params:{
                teamId:this.teamId
              }
            }).then((result) => {
              this.starAgentId = result.data.data.starAgent.userId
            }).catch((err) => {
              
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取团队申请记录接口
    teamManage() {
      this.axios({
        url: baseURL + "/api/user/teamManage",
        method: "get"
      })
        .then(result => {
          if (result.data.code == 0 && result.data.data.list.length) {
            this.teamManageListNum = result.data.data.list.length;
            this.teamManageListNull = true;
          }
        })
        .catch(error => {});
    },

    //获取团队人员接口
    getTeamMembers() {
      this.axios({
        method: "get",
        url: baseURL + "/api/user/getTeamMembers",
      })
        .then(result => {
          if (result.data.code == 0 && result.data.data.memList.length) {
            this.hasTeamMembers = false;
            this.TeamMembers = result.data.data.memList;
            this.rankList = result.data.data.rankList;
            this.memSize = result.data.data.memSize;
          } else {
            this.hasTeamMembers = true;
          }
        })
        .catch(error => {});
    }

  },
  created() {
    this.getTeamMembers();
    this.timeFormat();
    this.teamManage();
    this.getTeamStar()
  }
};
</script>

<style>
#mangeMsg .center {
  width: 94%;
  height: 77vh;
}
.memberNumbers{
  border-radius: 0.426667rem ;
  padding: 0 0.4rem /* 50/75 */;
  position: relative;
}
.memberNumbers .hint{
  position: absolute;
  width: .266667rem /* 20/75 */;
  height:  .266667rem /* 20/75 */;
  border-radius: 50%;
  background: red;
  right: .16rem /* 12/75 */;
  top: -.053333rem /* 4/75 */;
}
.memberNumbers span{
 color: #38f;
}
.membersTar {
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 0.666667rem /* 50/75 */;
  line-height: 0.96rem /* 72/75 */;
  margin-bottom: 0.373333rem /* 28/75 */;
  margin-top: 0.373333rem /* 28/75 */;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: .213333rem /* 16/75 */;
}
.shareTitle {
  text-align: center;
}
.btnBox {
  display: inline-block;
}

.messageBtn {
  padding-top: 15px;
  text-align: center;
}
.messageBtn .van-button--default {
  background: #4e8cee;
  color: #fff;
  padding: 0 30px;
  width: 100%;
}
#mainTab .van-tabs__line {
  background-color: #4e8cee;
}

.history-msg .van-field__control {
  text-align: right;
}

.history-msg .van-field .van-cell__title {
  flex: 3;
  max-width: 180px;
  word-wrap: break-word;
}

.null-tip {
  line-height: 22px;
}

.null-tip span {
  padding-left: 10px;
  line-height: 22px;
}

.memberList {
  display: flex;
  flex-wrap: wrap;
}

.memberList li {
  width: 25%;
  text-align: center;
  margin-bottom: 10px;
  position: relative;
}
.memberList li .icon-tuijianmingxing{
  position: absolute;
  right: 3px;
}
.memberList li img {
  width: 50px;
  max-height: 50px;
  border-radius: 50%;
}

.memberList li strong {
  display: block;
  font-weight: normal;
}

#member-rank img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
}

#member-rank .van-cell-text {
  padding: 0 10px;
  display: inline-block;
  width: 46%;
}

#member-rank .van-cell-text-name {
  text-align: center;
}

#member-rank .van-cell__title {
  flex: 4;
}

#member-rank .van-cell__value {
  line-height: 50px;
}

.null-tip {
  line-height: 22px;
  display: block;
  text-align: center;
}

.null-tip span {
  padding-left: 10px;
  line-height: 22px;
}

/*  new */
#members {
  width: 94%;
  min-height: 84vh;
}
.joinTips {
  width: 3.56rem /* 267/75 */;
  height: 0.64rem /* 48/75 */;
  text-align: center;
  line-height: 0.64rem /* 48/75 */;
  color: #4e8cee;
  margin: 0.506667rem /* 38/75 */ auto;
  border: 0.026667rem /* 2/75 */ solid #4e8cee;
  border-radius: 0.346667rem; /* 26/75 */
}
.icon-tuandui,
.icon-jinbi {
  color: #4e8cee;
}
.membersTar {
  display: flex;
  font-size: 0.346667rem /* 26/75 */;
  justify-content: space-between;
}
.membersTar em {
  font-style: normal;
  color: #e82d2d;
}
#memberList {
  margin-top: 0.533333rem /* 40/75 */;
}
#memberList li img {
  width: 1.6rem /* 120/75 */;
  height: 1.6rem /* 120/75 */;
  max-height: 1.6rem; /* 120/75 */
}
.history-msg li p {
  font-size: 0.373333rem /* 28/75 */;
  color: #333333;
}
.msgBottom {
  display: flex;
  justify-content: space-between;
}
.history-msg li {
  padding-bottom: 0.346667rem /* 26/75 */;
  border-bottom: 0.026667rem /* 2/75 */ solid #e5e5e5;
  margin-bottom: 0.373333rem /* 28/75 */;
}
.history-msg .msgBottom span {
  width: 1.6rem /* 120/75 */;
  height: 0.4rem /* 30/75 */;
  line-height: 0.4rem /* 30/75 */;
  text-align: center;
  color: #4e8cee;
  border: 1px /* 1/75 */ solid #4e8cee;
  border-radius: 0.106667rem /* 8/75 */;
  font-size: 0.16rem; /* 12/75 */
}
.msgBottom strong {
  font-weight: normal;
}
.msgHistory {
  width: 2rem /* 150/75 */;
  margin: 0 auto;
  margin-top: 0.666667rem /* 50/75 */;
  font-size: 0.4rem /* 30/75 */;
  display: block;
  text-align: center;
  border-bottom: 1px solid #aaaaaa;
  color: #aaaaaa;
  padding-bottom: 4px;
}
</style>
