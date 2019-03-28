<template>
  <div id="takeOrder">

    <!-- // 金秋活动弹窗 -->
    <!-- <div class="qinqiuMain">
      <div class="closeTag"><span>3s自动关闭 </span> X</div>
      <a href="/userCenter/activity/jinqiu/index.html" target="_blank">
        <img src="../assets/img/jinqiuMask.png" alt="">
      </a>
    </div> -->
    <!-- 顶部tabs -->
    <div class="topTabs">
      <div
        class="items"
        :class="{active:topTabsActive==0}"
        @click="tabChange(0)"
      >
        <i class="iconfont icon-dingdan"></i>
        <span>咨询信息</span>
      </div>
      <div
        class="items"
        :class="{active:topTabsActive==1}"
        @click="tabChange(1)"
      >
        <i class="iconfont icon-ic_history"></i>
        <span>历史接单</span>
      </div>
    </div>
    <!--需求信息  -->

    <div
      v-show="topTabsActive == 0"
      class="takeOrderMain"
    >
      <div v-if="orderActiveData">
        <h5 class="takeOrderMainTabBar">
          <strong>个人名片咨询 :
            <em>{{ pointCount }}</em>
          </strong>
          <strong>团队名片咨询 :
            <em>{{ teampointCount }}</em>
          </strong>
        </h5>
        <!-- 接单卡片 -->
        <div class="takeOrderMainCard">
          <div class="takeOrderMainCardUp">
            <div class="left">
              <h2 class="nameOrLocation">
                <strong class="agentNameS">{{ orderActiveData.name }}</strong>
                <strong>
                  <i class="iconfont icon-dingwei"></i>
                  <span>{{ address }}</span>
                </strong>
              </h2>
              <h2 class="phone">
                <strong>{{ orderActiveData.tel }}</strong>
                <span v-show="!isReceiveOrder">接单后显示号码</span>
              </h2>
            </div>
            <div class="right">
              <div
                class="sourceIcon"
                :class="{noPay:orderActiveData.orign != '1'}"
              >
                <img :src="originImgUrl">
              </div>
              <p>{{ originResult }}</p>
            </div>
          </div>
          <div class="takeOrderMainCardDown">
            <textarea class="takeOrderMainCardDownTxt" readonly v-html="orderActiveData.content"></textarea>
            <strong>
              <span v-show="orderActiveData.needPay == 1">
                <van-icon
                  name="balance-pay"
                  style="color:red;"
                />
                <i>收费订单</i>
              </span>
              <span v-show="orderActiveData.needPay != 1">
                <van-icon
                  name="receive-gift"
                  style="color:red;"
                />
                <i>免费订单</i>
              </span>
              <span>{{ timeFormat(orderActiveData.sendTime) }}</span>
            </strong>
          </div>
        </div>

      </div>

      <!-- 无订单提示 -->
      <div
        v-else
        class="nullOrder"
      >
        <img src="../assets/img/nullOrder.png">
      </div>
      <!-- 接单按钮 -->
      <div class="takeOrderBtn">
        <button
          class="orderBtn getNextBtn"
          @click="getNext"
        >
          <span>
            <i class="iconfont icon-qiehuan"></i> 换一单</span>
        </button>
        <button
          v-show="!isReceiveOrder"
          class="orderBtn active"
          @click="receiveOrder(orderActiveData.id,orderActiveData.orign)"
        >
          <span>
            <i class="iconfont icon-right-1"></i> 接单</span>
        </button>
        <button
          v-show="isReceiveOrder"
          class="orderBtn active"
          @click="contact(orderActiveData.id,orderActiveData.orign)"
        >
          <span>
            <i class="iconfont icon-right-1"></i> 已联系</span>
        </button>
      </div>
    </div>
    <!--历史订单  -->
    <div
      v-show="topTabsActive == 1"
      class="takeOrderHistoryMain"
    >
      <h5 class="takeOrderMainTabBar">
        <strong>历史已接单数 :
          <em>{{ receivedCount }}</em>
        </strong>
        <strong>今日已接单数 :
          <em>{{ todayCount }}</em>
        </strong>
      </h5>
      <!-- 历史接单卡片 -->
      <van-list
        id="van-list"
        v-if="hasHistoryOrder"
        :finished="finished"
        @load="getHistoryOrders"
      >
        <div class="takeOrderHistory">
          <ul>
            <li
              :class="{open:activeIndex == index}"
              @click="open(index)"
              v-for="(item,index) in hitoryList"
              :key='index'
            >
              <h3>
                <strong class="agentName">{{ item.name }}</strong>
                <strong>
                  <i class="iconfont icon-weibiaoti-"></i>{{ item.tel }}</strong>
                <strong>〈 </strong>
              </h3>
              <div>
                <p class="addressTop">
                  <span><i class="iconfont icon-dingwei"></i>{{ transFormAddress(item.address) }}</span>
                  <van-button
                    class="importClient"
                    size="mini"
                    @click="importByHis(item)"
                  >一键导入</van-button>
                </p>
                <p class="historyAskCon">{{ item.content }}</p>
                <p class="timeBar">
                  <strong><i class="iconfont icon-dingdan"></i> {{ getOrigin(item.orign) }}</strong>
                  <span>时间：{{ timeFormat(item.sendTime) }}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </van-list>
      <!-- 无订单提示 -->
      <div
        v-else
        class="nullOrder"
      >
        <img src="../assets/img/nullOrder.png">
      </div>
    </div>
  </div>
</template>

<script>
import cityData from "../assets/js/region.js";
import utils from "../assets/js/utils.js";

export default {
  data() {
    return {
      topTabsActive: 0, //选项卡索引
      hasOrder: false, //是否有可接订单
      orderActiveData: "", //当前接单数据
      pointCount: 0, //个人可接单数
      teampointCount: 0, //团队可接单数
      origin: 0, //订单来源
      originResult: "", //转换后的来源
      originImgUrl: require("../assets/img/pingtai.png"), //来源对应的图片
      address: "", //转换后的地址,
      sendTimeResult: "", //转换后的时间
      sendTime: "", //上一单发送时间
      origin: 0, //订单来源
      isReceiveOrder: false, //是否接单
      startTime: "", //查询历史接单开始时间
      page: 0, //查询历史接单开始页码
      hitoryList: [], //历史订单
      hasHistoryOrder: false, //是否有历史订单
      loading: false, //加载状态
      finished: false, //是否已加载完成,
      totalPage: 0,
      todayCount: 0, //团队已接单数
      receivedCount: 0, //今日已接单数
      activeIndex: -1
    };
  },
  created() {
     this.getHistoryOrders();
  },
  mounted() {
    this.$nextTick(() => {
      // 获取当前顾问持有订单
      this.getAssignOrder();
    });

    // 屏幕调试
    var viewHeight = document.documentElement.clientHeight;
    var takeOrderMainCardDownTxt = document.querySelector(
      ".takeOrderMainCardDownTxt"
    );
    var takeOrderBtn = document.querySelector(".takeOrderBtn");
    var main = document.querySelector("#main");

  },
  methods: {
    // 接单/历史切换
    tabChange(index) {
      this.topTabsActive = index;
    },
    // 获取当前顾问持有订单
    getAssignOrder() {
      this.axios({
        method: "get",
        url: baseURL + "/api/order/getAssignOrder"
      })
        .then(result => {
          if (result.data.code == 0 && result.data.data.orderInfo) {
            this.orderActiveData = result.data.data.orderInfo;
            // pointCount: 0, //个人可接单数
            // teampointCount: 0, //团队可接单数
            this.pointCount = result.data.data.pointCount;
            this.teampointCount = result.data.data.teamCount;

            //转换地址时间
            this.address = utils.getCityResult(
              cityData,
              this.orderActiveData.address
            );
            this.sendTimeResult = utils.timeFormat(
              this.orderActiveData.sendTime
            );
            var origin = this.orderActiveData.orign;
            switch (origin) {
              case 1:
                this.originResult = "平台订单";
                this.originImgUrl = require("../assets/img/pingtai.png");
                break;
              case 2:
                this.originResult = "个人名片";
                this.originImgUrl = require("../assets/img/geren.png");
                break;
              case 3:
                this.originResult = "系统指派";
                this.originImgUrl = require("../assets/img/pingtai.png");
                break;
              case 4:
                this.originResult = "团队名片";
                this.originImgUrl = require("../assets/img/tuandui.png");
                break;
              default:
                break;
            }
          } else {
            //换一单接口
            this.getNext();
          }
        })
        .catch(err => {
          console.log(err);
          //换一单接口
          this.getNext();
        });
    },
    transFormAddress(addressTar) {
      //转换地址时间
      return utils.getCityResult(cityData, addressTar);
    },
    // 换一单
    getNext() {
      this.axios({
        method: "post",
        url: baseURL + "/api/order/getNext",
        data: {
          sendTime: this.sendTime,
          orign: this.origin
        } //sendTime 上一单发送时间 orign:订单来源
      })
        .then(result => {
          this.$toast.clear();
          this.orderActiveData = result.data.data.orderMessage;
          // pointCount: 0, //个人可接单数
            // teampointCount: 0, //团队可接单数
          this.pointCount = result.data.data.pointCount;
          this.teampointCount = result.data.data.teamCount;
          //转换地址时间
          this.address = utils.getCityResult(
            cityData,
            this.orderActiveData.address
          );
          this.sendTimeResult = utils.timeFormat(this.orderActiveData.sendTime);
          //历史接单数
          this.receivedCount = result.data.data.receivedCount;
          var origin = result.data.data.orderMessage.orign;
          switch (origin) {
            case 1:
              this.originResult = "平台订单";
              break;
            case 2:
              this.originResult = "个人名片";
              break;
            case 3:
              this.originResult = "系统指派";
              break;
            case 4:
              this.originResult = "团队订单";
              break;
            default:
              break;
          }
          // mstatus = 3 (处理中)
          if (this.orderActiveData.mstatus == 3) {
            this.$toast("当前订单还未联系");
            this.isReceiveOrder = true; //已接单状态
          } else {
            //记录当前订单的来源与发送时间
            this.isReceiveOrder = false; //已接单状态
            this.sendTime = result.data.data.orderMessage.sendTime;
            this.origin = result.data.data.orderMessage.orign;
          }
        })
        .catch(error => {
          this.hasOrder = false;
          if (error.response.data.code == 28) {
            //无可接订单
            this.isReceiveOrder = false; //已接单状态
            this.$toast.clear();
          } else {
            this.$toast(error.response.data.error);
            this.$toast.clear();
          }
        });
    },
    //接单
    receiveOrder(orderId, orign) {
      var that = this;
      //帐号是否已审核
      that
        .axios({
          url: baseURL + "/api/user/userChecked",
          method: "get"
        })
        .then(result => {
          if (result.data.code == 0) {
            if (!result.data.data.checkedStatus) {
              that.$dialog.alert({
                message: "您的帐号正在审核中,请等待审核通过~"
              });
            } else {
              that
                .axios({
                  method: "post",
                  url: baseURL + "/api/order/receiveOrder",
                  data: {
                    id: orderId,
                    orign: orign
                  }
                })
                .then(res => {
                  if (res.data.code == 0) {
                    this.$toast.success("接单成功");
                    that.isReceiveOrder = true; //已接单状态
                    that.orderActiveData = res.data.data;
                    // 加载历史订单
                    this.getHistoryOrders();
                  } else {
                    this.$toast.fail({
                      // mask: true,
                      duration: 1000,
                      message: "接单失败"
                    });
                  }
                })
                .catch(err => {
                  console.log(err);
                  if (err.response.data.code == 69) {
                    this.$toast("暂无可接订单");
                  } else {
                    this.$toast(err.response.data.error);
                  }
                });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //联系
    contact(orderId, orign) {
      this.axios({
        method: "post",
        url: baseURL + "/api/order/connect",
        data: {
          id: orderId,
          orign: orign
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            this.$toast.success("已联系");
            this.isReceiveOrder = true; //已接单状态
            this.getHistoryOrders();
            this.getNext(); //联系后切换下一单
            this.page = 0;
          } else {
            this.$toast.fail("系统错误");
          }
        })
        .catch(err => {
          // this.$toast.fail('');
        });
    },
    //历史接单加载
    getHistoryOrders() {
      this.page++;
      this.axios({
        method: "get",
        url: baseURL + "/api/order/getHistoryOrders",
        params: {
          startTime: "",
          page: this.page
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            if(result.data.data.historyList.items.length){
              this.hasHistoryOrder = true
                this.hitoryList = this.hitoryList.concat(
                      result.data.data.historyList.items
                    );
              }else{
                this.finished = true;
              }

            this.todayCount = result.data.data.todayCount; //今日已接单数
            this.receivedCount = result.data.data.receivedCount; //历史已接单数
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取订单来源
    getOrigin(origin) {
      switch (origin) {
        case 1:
          return "平台订单";
          break;
        case 2:
          return "个人名片";
          break;
        case 3:
          return "系统指派";
          break;
        case 4:
          return "团队订单";
          break;
        default:
          break;
      }
    },
    // 历史接单折叠
    open(index) {
      if(index == this.activeIndex ){
        this.activeIndex = 100
      }else{
        this.activeIndex = index;
      }
    },
    // 导出到客户管理
    importByHis(item) {
      var obj = [];
      obj.push({
        customName: item.name,
        customPhone: item.tel,
        customArea: item.address //地域以'|'拼接，直接给我拼接好的也可以，或者传下面的省市区我会自己拼接
      });
      this.axios({
        method: "post",
        url: baseURL + "/api/importByHis",
        data: obj
      })
        .then(result => {
          if (result.data.code == 0) {
            this.$toast(item.name + " 客户信息已导入客户管理中");
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
i {
  font-style: normal;
  vertical-align: middle;
}
.topTabs {
  width: 100%;
  height: 1.066667rem /* 80/75 */;
  line-height: 1.066667rem /* 80/75 */;
  display: flex;
  color: #333333;
  box-sizing: border-box;
  border-bottom: 0.013333rem /* 1/75 */ solid #dddddd;
}
.agentNameS {
  max-width: 2rem /* 150/75 */;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block
}
.topTabs .items {
  width: 50%;
  text-align: center;
  vertical-align: middle;
}
.topTabs .items .iconfont {
  line-height: 1.066667rem /* 80/75 */;
}
.topTabs .items span {
  padding-left: 0.16rem /* 12/75 */;
}

.topTabs .active {
  color: #4e8cee;
  border-bottom: 0.013333rem /* 1/75 */ solid #4e8cee;
}
.takeOrderMain {
  padding-top: 0.293333rem /* 22/75 */;
}
.takeOrderHistoryMain {
  padding-top: 0.293333rem /* 22/75 */;
}
.takeOrderMainTabBar {
  width: 8.64rem /* 648/75 */;
  margin: 0 auto;
  background: #f1f1f1;
  border-radius: 0.426667rem /* 32/75 */;
  box-sizing: border-box;
  padding: 0 0.666667rem /* 50/75 */;
  line-height: 0.96rem /* 72/75 */;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.48rem /* 36/75 */;
}
.takeOrderMainTabBar em {
  font-style: normal;
  color: #505050;
}
.takeOrderMainTabBar strong {
  font-weight: normal;
  color: #999999;
}
.takeOrderMainCard {
  width: 8.64rem /* 648/75 */;
  margin: 0 auto;
  border-radius: 0.426667rem /*32/75*/;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0 0.333333rem /* 25/75 */ rgba(0, 0, 0, 0.3);
}
.takeOrderMainCardUp {
  background: #4e8cee;
  height: 3.013333rem /* 226/75 */;
  padding-top: 0.533333rem /* 40/75 */;
  padding-left: 0.48rem /* 36/75 */;
  padding-right: 0.48rem /* 36/75 */;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  color: #fff;
}
.takeOrderMainCardUp .left h2,
.takeOrderMainCardUp .left h3,
.takeOrderMainCardUp .left strong,
.takeOrderMainCardUp .left i {
  font-weight: normal;
  font-style: normal;
}
.takeOrderMainCardUp .left {
  min-width: 5.333333rem /* 400/75 */;
  max-width: 5.6rem /* 420/75 */;
}
.nameOrLocation {
  line-height: 0.48rem /* 36/75 */;
  display: flex;
  justify-content: space-between;
}
.nameOrLocation strong {
  font-weight: bold;
  font-size: 0.48rem /* 36/75 */;
}
.nameOrLocation strong:nth-child(2) {
  font-size: 0.293333rem /* 22/75 */;
}
.takeOrderMainCardUp .left .phone {
  font-size: 0.346667rem /* 26/75 */;
  width: 100%;
  display: flex;
  justify-content: space-between;
  line-height: 0.56rem /* 42/75 */;
}
.takeOrderMainCardUp .left .phone strong {
  font-size: 0.346667rem /* 26/75 */;
}
.takeOrderMainCardUp .left .phone span {
  font-size: 0.24rem /* 18/75 */;
}
.takeOrderMainCardUp .sourceIcon {
  width: 1.6rem /* 120/75 */;
  height: 1.6rem /* 120/75 */;
  border-radius: 50%;
  background: #fff;
  text-align: center;
  position: relative;
}

.takeOrderMainCardUp .sourceIcon img {
  width: 80%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.takeOrderMainCardUp .right p {
  color: #fff;
  line-height: 0.533333rem /* 40/75 */;
  font-size: 0.266667rem /* 20/75 */;
  margin: 0;
  text-align: center;
}
.takeOrderMainCardDown {
  font-size: 0.293333rem /* 22/75 */;
  color: #555555;
  line-height: 0.666667rem /* 50/75 */;
  padding: 0 0.506667rem; /* 38/75 */
}
.takeOrderMainCardDownTxt {
  resize: none;
  border: none;
  width: 100%;
  padding-top: .133333rem /* 10/75 */;
  box-sizing: border-box;
  outline: none;
  border-bottom: 0.013333rem /* 1/75 */ dotted #ddd;
  /* min-height: 5.333333rem; /* 400/75 */
  min-height: 27vh;
}
.takeOrderMainCardDown strong {
  border-top: 1px dotted #dddddd;
  display: flex;
  font-weight: normal;
  justify-content: space-between;
  line-height: 1.066667rem /* 80/75 */;
}
.takeOrderBtn {
  width: 8rem /* 600/75 */;
  margin: 0 auto;
  margin-top: 1.333333rem /* 100/75 */;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 80px;
  width: 100%;
}
.takeOrderBtn .orderBtn {
  background: #fff;
  width: 3.786667rem /* 284/75 */;
  height: 1.413333rem /* 106/75 */;
  border-radius: 0.16rem /* 12/75 */;
  border: none;
  box-shadow: 0 0 0.333333rem /* 25/75 */ rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 0;
  font-size: 0.4rem /* 30/75 */;
  color: #868892;
}
.takeOrderBtn .orderBtn:active{
  opacity: .8;
   box-shadow: inset 0 2px 2px 0 rgba(0,0,0,0.2);
}
.takeOrderBtn .getNextBtn:active{
  /* opacity: .8; */
   box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2);
}
.takeOrderBtn .active {
  background: #4e8cee;
  color: #fff;
}
.nullOrder {
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
.nullOrder img {
  width: 100%;
}
/* 历史订单 */
.takeOrderHistory {
  width: 9.333333rem /* 700/75 */;
  margin: 0 auto;
  min-height: 98%;
  background: #fff;
  box-shadow: 0 0 0.333333rem /* 25/75 */ rgba(0, 0, 0, 0.2);
  border-radius: 0.266667rem /* 20/75 */;
  padding: 0.266667rem /* 20/75 */ 0.506667rem /* 38/75 */;
  /* padding-top: 0; */
  box-sizing: border-box;
  margin-top: 6px;
}
.takeOrderHistory li > h3 {
  line-height: 1.466667rem /* 110/75 */;
  height: 1.466667rem /* 110/75 */;
  margin: 0;
}
#van-list {
  height: 70vh;
  overflow: scroll;
}
.takeOrderHistory li > h3 strong {
  color: #666666;
  font-size: 0.24rem /* 18/75 */;
  display: inline-block;
  font-weight: normal;
  vertical-align: middle;
}
.takeOrderHistory li > h3 strong .iconfont {
  font-size: 0.24rem /* 18/75 */;
}
.takeOrderHistory li > h3 strong:nth-child(1) {
  color: #333333;
  font-size: 0.4rem /* 30/75 */;
  width: 2.133333rem /* 160/75 */;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.takeOrderHistory li > h3 strong:nth-child(3) {
  float: right;
  transform: rotateZ(-90deg);
  padding-right: 12px;
  transition: 0.3s;
}
.takeOrderHistory li {
  max-height: 1.466667rem /*110/75*/;
  overflow: hidden;
  border-bottom: 1px solid #e5e5e5;
  transition: 0.3s;
}
.takeOrderHistory li.open {
  max-height: 26.666667rem; /* 2000/75 */
}
.takeOrderHistory li.open > h3 strong:nth-child(3) {
  transform: rotateZ(90deg);
}
.historyAskCon {
  font-size: 0.266667rem /* 20/75 */;
  color: #555555;
  line-height: 0.48rem /* 36/75 */;
}
.timeBar {
  border-top: 1px dotted #e5e5e5;
  display: flex;
  justify-content: space-between;
  padding-top: 0.08rem /* 6/75 */;
  line-height: 0.666667rem /* 50/75 */;
  margin-bottom: 0;
}
.timeBar strong {
  color: #888894;
  font-weight: normal;
}
.timeBar span {
  font-size: 0.24rem /* 18/75 */;
  color: #888894;
}
.addressTop {
  display: flex;
  justify-content: space-between;
}
.addressTop .van-button--mini {
  width: 60px;
  color: #fff;
  border-radius: 4px;
  background-color: #4e8dee;
}
.timeBar .van-button--mini {
  width: 60px;
  color: #fff;
  border-radius: 4px;
  background-color: #4e8dee;
}
</style>