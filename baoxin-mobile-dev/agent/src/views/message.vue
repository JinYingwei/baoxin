<template>
  <div>
    <!-- <br> -->
    <div class="qinqiu">
      <a
        href="/sub/activity/jinqiu/index.html"
        target="_blank"
      >
        <img
          src="../assets/img/jinqiu.png"
          alt=""
        >
      </a>
    </div>
    <br>
    <div class="msgBox">
      <ul
        id="van-list"
        v-show="UserMeg.length"
      >
        <van-list
          :finished="finished"
          @load="getUserMeg"
        >
          <li
            @click="updateSingleMeg(item.isRead,item.id,index,item.teamId,item.envelopeSerialNo,item.megType)"
            :class="{noRead:item.isRead == 2,isReadPacket:item.megType == 3 || item.megType == 4 || item.megType == 5}"
            v-for="(item,index) in UserMeg"
            :key="index"
          >
            <p class="msgCon">
              <span class="tag">{{ megType(item.megType) }}</span>
              <span class="time">{{ timeFormat(item.publishTime) }}</span>
            </p>
            <a
              class="title"
              href="javascript:;"
            >{{ item.content }}</a>
          </li>
        </van-list>
      </ul>
      <!-- 无订单提示 -->
      <div
        v-show="!UserMeg.length"
        class="nullMsg"
      >
        <img src="../assets/img/nullMsg.png">
      </div>
      <div class="isReadNav">
        <div
          @click="noRead"
          v-show="noReadOnOff"
        >
          <i class="iconfont icon-weidu"></i>
          <span>只看未读</span>
        </div>
        <div
          @click="getUserMegRest"
          v-show="!noReadOnOff"
        >
          <i class="iconfont icon-dingdan"></i>
          <span>查看全部</span>
        </div>
        <div @click="allRead">
          <i class="iconfont icon-info-read"></i>
          <span>全部已读</span>
        </div>
        <div @click="cleanMeg">
          <i class="iconfont icon-tubiaozhizuomoban"></i>
          <span>清空消息</span>
        </div>
      </div>

    </div>
    <!-- 红包弹窗 -->
    <div
      @click="showRedEnvelopeWr = false"
      v-show="showRedEnvelopeWr"
      class="redEnvelopeWr"
    >
      <div class="redEnvelopeMa">
        <h3 class="redEnvelopeMaTit">恭喜您获得{{describeTitle}}</h3>
        <h2 class="redEnvelopeMoney">{{grabMoney}}</h2>
        <img
          class="redEnvelopeImg"
          src="../assets/img/redEnvelope-bg.png"
        >
      </div>
    </div>
  </div>
</template>

<script>
import utils from "../assets/js/utils.js";


export default {
  data() {
    return {
      hasMsg: false, //是否有消息
      UserMeg: [], //用户消息,
      redEnvelope: [], //红包数据
      allData: [], //所有消息
      noReadOnOff: true,
      loading: true, //是否显示加载中提示
      finished: false, //是否已加载完成,
      page: 0, //当前页数,
      totalPage: 0,
      // 红包弹窗
      showRedEnvelopeWr: false,
      describeTitle: "",
      grabMoney: 0
    };
  },
  created() {
    this.getUserMeg();
    this.getREnvelope();
  },
  mounted() {
    // 屏幕调试
    var viewHeight = document.body.clientHeight;
    this.$nextTick(function() {
      var vanList = document.querySelector("#van-list");
      if (viewHeight <= 480) {
        vanList.style.height = "63vh";
      }
    });
  },
  methods: {
    // 未读消息
    getUserMegRest() {
      this.page = 0;
      this.finished = false;
      this.getUserMeg()
      this.noReadOnOff = true;
    },
    // 消息类型
    megType(megType) {
      // 1：系统消息；2：团队消息； 3：现金红包；4：代金券红包；5：订单券红包
      switch (megType) {
        case 1:
          return "系统消息";
          break;
        case 2:
          return "团队消息";
          break;
        case 3:
          return "现金红包";
          break;
        case 4:
          return "代金券红包";
          break;
        case 5:
          return "订单券红包";
          break;
        default:
          break;
      }
    },
    // 获取所有消息
    getUserMeg() {
      this.page++;
      this.axios({
        url: baseURL + "/api/user/getUserMsg",
        method: "get",
        params: {
          page: this.page
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            if(result.data.data.items.length){
                this.hasMsg = true;
                this.UserMeg = this.UserMeg.concat(
                      result.data.data.items
                    );
              }else{
                this.finished = true;
              }
          }
        })
        .catch(error => {});
    },
    // 清空用户消息
    cleanMeg() {
      this.$dialog
        .confirm({
          message: "确定清空信息吗？"
        })
        .then(result => {
          this.axios({
            method: "post",
            url: baseURL + "/api/user/cleanMeg"
          })
            .then(result => {
              if (result.data.code == 0) {
                this.page = 1;
                this.UserMeg = [];
              }
            })
            .catch(err => {});
        })
        .catch(err => {});
    },
    //将全部消息已读
    allRead() {
      this.axios({
        url: baseURL + "/api/user/updateBatchMeg",
        method: "post"
      })
        .then(result => {
          if (result.data.code == 0) {
            this.UserMeg.map((item, index) => {
              if (item.isRead == 2) {
                this.UserMeg[index].isRead = 1;
                this.$set(this.UserMeg[index], "isRead", 1);
              }
            });
          }
        })
        .catch(error => {});
    },
    // 将单条消息置为已读
    updateSingleMeg(isRead, megId, index, teamId, serialNo, envelopeType) {
      // 红包条件
      var type = 0;
      if (envelopeType == 3 || envelopeType == 4 || envelopeType == 5) {
        switch (envelopeType) {
          case 3:
            type = 1;
            break;
          case 4:
            type = 2;
            break;
          case 5:
            type = 3;
            break;

          default:
            break;
        }
        // 抢红包
        this.hasRrab(teamId, serialNo, type);
        this.axios({
          method: "post",
          url: baseURL + "/api/user/updateSingleMeg",
          data: {
            megId: megId
          }
        })
          .then(result => {
            this.UserMeg[index].isRead = 1;
          })
          .catch(err => {});
      } else {
        if (isRead == 2) {
          this.axios({
            method: "post",
            url: baseURL + "/api/user/updateSingleMeg",
            data: {
              megId: megId
            }
          })
            .then(result => {
              this.UserMeg[index].isRead = 1;
            })
            .catch(err => {});
        }
      }
    },
    // 抢红包
    hasRrab(teamId, serialNo, envelopeType) {
      // 判断顾问是否已抢该红包
      this.axios({
        method: "get",
        url: baseURL + "/api/team/redEnvelope/hasGrab",
        params: {
          teamId: teamId,
          serialNo: serialNo,
          envelopeType: envelopeType
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            if (result.data.data.hasGrab) {
              // console.log("已抢");
              this.$toast("该红包已被领取或已过期");
            } else {
              // console.log("未抢");
              //  顾问抢红包
              this.axios({
                method: "post",
                url: baseURL + "/api/team/redEnvelope/grab",
                data: {
                  teamId: teamId,
                  serialNo: serialNo
                }
              })
                .then(result => {
                  // 抢红包成功
                  if (result.data.code == 0) {
                    // this.$toast("红包领取成功");
                    switch (result.data.data.type) {
                      case 1:
                        this.describeTitle = "现金红包";
                        this.grabMoney = result.data.data.grabMoney;
                        break;
                      case 2:
                        this.describeTitle = "代金券";
                        this.grabMoney = result.data.data.couponSingleMoney;
                        break;
                      case 3:
                        this.describeTitle = "订单券";
                        this.grabMoney = result.data.data.couponSingleMoney;
                        break;
                      default:
                        break;
                    }
                    this.showRedEnvelopeWr = true;
                  }
                })
                .catch(err => {
                  this.$toast(err.response.data.error);
                });
            }
          }
        })
        .catch(err => {});
    },
    //noRead过滤未读消息
    noRead() {
      this.axios({
        method: "get",
        url: baseURL + "/api/user/getUnreadUserMsg"
      })
        .then(result => {
          if (result.data.code == 0) {
            this.UserMeg = result.data.data.items;
            this.noReadOnOff = false;
            if (result.data.data.items.length) {
              this.hasMsg = true;
            } else {
              this.hasMsg = false;
            }
          }
        })
        .catch(err => {});
    },
    // 获取团队红包
    getREnvelope() {
      this.axios({
        method: "get",
        url: baseURL + "/api/team/redEnvelope/get"
        // url:"https://www.easy-mock.com/mock/5baef22ab793604807ec54ae/loffery/getREnvelope"
      })
        .then(result => {
          if (result.data.code == 0) {
            this.redEnvelope = result.data.data.list;
            this.UserMeg = this.redEnvelope.concat(this.UserMeg);
          }
        })
        .catch(err => {});
    },
    //转换时间
    timeFormat(sendTime) {
      var timeFormat = utils.timeFormat;
      return timeFormat(sendTime);
    }
  }
};
</script>

<style scoped>
.qinqiu {
  width: 9.466667rem /* 710/75 */;
  margin: 0 auto;
}
.qinqiu img {
  width: 100%;
}
.msgBox {
  width: 9.333333rem /* 700/75 */;
  margin: 0 auto;
  /* margin-top: 0.4rem */
  /* 30/75 */
  border-radius: 0.426667rem /*32/75*/;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0 0.333333rem /* 25/75 */ rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding: 0.4rem /* 30/75 */;
  position: relative;
  min-height: 75vh;
}

.isReadNav {
  width: 5.333333rem /* 400/75 */;
  height: 1.28rem /* 96/75 */;
  position: fixed;
  /*bottom: 2.666667rem /* 200/75 */
  bottom: 18vh;
  background: #fff;
  box-shadow: 0 0 0.333333rem /* 25/75 */ rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  border-radius: 0.533333rem /* 40/75 */;
  left: 50%;
  margin-left: -2.666667rem /* 200/75 */;
}

.msgBox li {
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 0.266667rem /* 20/75 */;
  position: relative;
  padding-left: 0.266667rem /* 20/75 */;
  padding-bottom: 0.266667rem /* 20/75 */;
}

.msgBox li.noRead::before {
  position: absolute;
  content: "";
  width: 0.106667rem /* 8/75 */;
  height: 0.106667rem /* 8/75 */;
  border-radius: 50%;
  background: #ff4444;
  left: 0.053333rem /* 4/75 */;
  top: 0.2rem /* 15/75 */;
}

.msgBox .title {
  font-size: 0.373333rem /* 28/75 */;
  color: #333333;
}

.msgCon {
  display: flex;
  justify-content: space-between;
}

.msgCon .tag {
  padding: 0 0.16rem /* 12/75 */;
  font-size: 0.213333rem /* 16/75 */;
  color: #4e8cee;
  line-height: 0.533333rem /* 40/75 */;
  border: 1px solid #4e8cee;
  border-radius: 0.106667rem;
  /* 8/75 */
}

.msgCon .time {
  font-size: 0.266667rem /* 20/75 */;
  color: #999999;
}

.isReadNav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}

.isReadNav .iconfont {
  color: #87b4ff;
  font-size: 0.48rem /* 36/75 */;
  font-weight: bold;
}

.isReadNav span {
  display: block;
  font-size: 0.24rem /* 18/75 */;
}

.nullMsg {
  text-align: center;
  width: 3.533333rem /* 265/75 */;
  height: 3.786667rem /* 284/75 */;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.nullMsg img {
  width: 100%;
}

.isReadNav .icon-weidu {
  font-size: 0.613333rem /* 46/75 */;
}
#van-list {
  height: 67vh;
  overflow: scroll;
}
/* isReadPacket */
.isReadPacket {
  background: url(../assets/img/redPacket.png) no-repeat center top;
  background-size: 14%;
}
.redEnvelopeWr {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: 0.3s;
}
.redEnvelopeMa {
  position: relative;
  overflow: hidden;
  height: 100%;
}
.redEnvelopeMaTit {
  text-align: center;
  position: absolute;
  width: 100%;
  color: #cb8219;
  top: 3.4rem;
}
.redEnvelopeMoney {
  text-align: center;
  position: absolute;
  width: 100%;
  font-weight: bold;
  font-size: 1rem;
  color: red;
  top: 4.2rem;
}
.redEnvelopeImg {
  display: block;
  margin: 0 auto;
  margin-top: 2.9rem /* 120/75 */;
  width: 60%;
}
</style>
