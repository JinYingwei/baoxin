<template>
    <div>
        <div class="public-title">需求信息</div>
        <Card style="width:100%">
            <p slot="title">
                <Icon type="ios-paper-outline" />
                <strong class="ml20px mr60px">个人待接订单: <span>{{ pointCount || 0 }}</span> </strong>
                <strong class="ml20px">团队待接订单: <span>{{ teampointCount || 0 }}</span> </strong>
            </p>
            <a href="#" slot="extra" @click="getNext">
                <Icon type="md-repeat" />
                换一单
            </a>
            <ul class="cell-cust-wrap">
                <li class="cell-cust">
                    <label class="cell-title">产品信息</label>
                    <div class="cell-con">{{ orderActiveData.productName }}</div>
                </li>
                <li class="cell-cust">
                    <label class="cell-title">联系人</label>
                    <div class="cell-con">{{ orderActiveData.name }}</div>
                </li>
                <li class="cell-cust">
                    <label class="cell-title">联系方式</label>
                    <div class="cell-con">{{ orderActiveData.tel }}</div>
                </li>
                <li class="cell-cust">
                    <label class="cell-title">所在区域</label>
                    <div v-if="orderActiveData" class="cell-con">{{ $GLOBAL.getCityResult(cityData,orderActiveData.address) }}</div>
                </li>
                <li class="cell-cust">
                    <label class="cell-title">咨询内容</label>
                    <div class="cell-con">{{ orderActiveData.content }}</div>
                </li>
                <li class="cell-cust">
                    <label class="cell-title">咨询时间</label>
                    <div class="cell-con">{{ $GLOBAL.timeFormat(orderActiveData.sendTime) }}</div>
                </li>

            </ul>
            <div class="function-btn-warp">
                <ButtonGroup id="function-btn" size="large">
                    <Button v-show="isReceiveOrder" type="primary" @click.native="contact(orderActiveData.id,orderActiveData.orign)">
                        <Icon type="md-call" />
                        已联系
                    </Button>
                    <Button v-show="!isReceiveOrder"  type="primary"  @click.native="receiveOrder(orderActiveData.id,orderActiveData.orign)">
                        <Icon type="md-paper" />
                        接单
                    </Button>
                </ButtonGroup>
            </div>
        </Card>
        <br>
        <div class="public-title">今日接单历史</div>
        <Collapse accordion>
           <img v-if="TodayOrders.length == 0"  class="null" src="../../../assets/img/null.png">
            <Panel v-else :name="index+''" v-for="(item,index) in TodayOrders" :key="index">
                <span class="collapse-title-bar"> <em>
                        <Icon type="ios-bookmark" /> <i> {{ item.productName }}</i></em> <em>
                        <Icon type="ios-contact" /> <i>  {{ item.name }}</i></em><em>
                        <Icon type="md-pin" /> <i>  {{ $GLOBAL.getCityResult(cityData,item.address) }}</i></em></span>
                <p slot="content">
                    <ul class="cell-cust-wrap">
                        <li class="cell-cust">
                            <label class="cell-title">产品信息</label>
                            <div class="cell-con"> {{ item.productName }}</div>
                        </li>
                        <li class="cell-cust">
                            <label class="cell-title">联系人</label>
                            <div class="cell-con">{{ item.name }}</div>
                        </li>
                        <li class="cell-cust">
                            <label class="cell-title">联系方式</label>
                            <div class="cell-con">{{ item.tel }}</div>
                        </li>
                        <li class="cell-cust">
                            <label class="cell-title">所在区域</label>
                            <div class="cell-con">{{ $GLOBAL.getCityResult(cityData,item.address) }}</div>
                        </li>
                        <li class="cell-cust">
                            <label class="cell-title">咨询内容</label>
                            <div class="cell-con">{{ item.content }}</div>
                        </li>
                        <li class="cell-cust">
                            <label class="cell-title">咨询时间</label>
                            <div class="cell-con">{{ $GLOBAL.timeFormat(item.sendTime) }}</div>
                        </li>
                    </ul>
                </p>
            </Panel>
        </Collapse>
    </div>
</template>

<script>
// 引入地区代码文件
import cityData from "../../../assets/lib/region.js";
export default {
  created() {
    // 获取当前顾问持有订单
    this.getAssignOrder();
    this.cityData = cityData;
    this.getTodayOrders()
  },
  data() {
    return {
      cityData: [],
      orderActiveData: "", //当前接单数据
      onoff: true,
      pointCount: 0, //个人可接单数
      teampointCount: 0, //团队可接单数
      sendTime: "", //上一单发送时间
      origin: 0, //订单来源
      originResult: "", //订单来源文字
      isReceiveOrder: false, //是否接单
      TodayOrders:[],//今日接单
    };
  },
  methods: {
    // 获取当前顾问持有订单
    getAssignOrder() {
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/order/getAssignOrder"
      })
        .then(result => {
          if (result.data.code == 0 && result.data.data.orderInfo) {
            this.orderActiveData = result.data.data.orderInfo;
            // this.onoff = true
            // pointCount: 0, //个人可接单数
            // teampointCount: 0, //团队可接单数
            this.pointCount = result.data.data.pointCount;
            this.teampointCount = result.data.data.teamCount;
          } else {
            //换一单接口
            this.getNext();
          }
        })
        .catch(err => {
          //换一单接口
          this.getNext();
        });
    },
    // 换一单
    getNext() {
      this.$axios({
        method: "post",
        url: this.$GLOBAL.baseURL + "/api/order/getNext",
        data: {
          sendTime: this.sendTime,
          orign: this.origin
        }
      })
        .then(result => {
          this.orderActiveData = result.data.data.orderMessage;
          //   格式化来源
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
            // this.$Message.error("当前订单还未联系");
            this.$Notice.error({ title: "当前订单还未联系" });
            this.isReceiveOrder = true; //已接单状态
          } else {
            this.$Notice.success({ title: "新订单切换成功"});
            // this.$Message.success("切换成功");
            //记录当前订单的来源与发送时间
            this.isReceiveOrder = false; //已接单状态
            this.sendTime = result.data.data.orderMessage.sendTime;
            this.origin = result.data.data.orderMessage.orign;
          }
        })
        .catch(error => {
          console.log(error);
          if(error.response){
            if (error.response.data.code == 28) {
            //无可接订单
            this.isReceiveOrder = false; //已接单状态
          } else {
             this.$Notice.error({ title: "消息提示",desc:error.response.data.error  });
          }
          }
          
        });
    },
    //接单
    receiveOrder(orderId, orign) {
      var that = this;
      //帐号是否已审核
      this.$axios({
        url: this.$GLOBAL.baseURL + "/api/user/userChecked",
        method: "get"
      })
        .then(result => {
          if (result.data.code == 0) {
            if (!result.data.data.checkedStatus) {
              this.$Modal.warning({
                title: '帐号状态',
                content: "您的帐号正在审核中,请等待审核通过~"
              });
            } else {
              that
                .$axios({
                  method: "post",
                  url: this.$GLOBAL.baseURL + "/api/order/receiveOrder",
                  data: {
                    id: orderId,
                    orign: orign
                  }
                })
                .then(res => {
                  if (res.data.code == 0) {
                    this.$Notice.success({ title: "接单成功",desc:'请尽快联系客户'  });
                    that.isReceiveOrder = true; //已接单状态
                    that.orderActiveData = res.data.data;
                  } else {
                    this.$Notice.error({ title: "接单失败" });
                  }
                })
                .catch(err => {
                  if (err.response.data.code == 69) {
                    this.$Notice.error({ title: "暂无可接订单" });
                  } else {
                     this.$Notice.error({ title: "消息提示",desc:err.response.data.error  });
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
      this.$axios({
        method: "post",
        url: this.$GLOBAL.baseURL + "/api/order/connect",
        data: {
          id: orderId,
          orign: orign
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            this.$Notice.success({ title: "已联系" });
            this.isReceiveOrder = true; //已接单状态
            this.getNext(); //联系后切换下一单
            this.getHistoryOrders();
          } else {
            this.$Notice.error({ title: "系统错误" });
          }
        })
        .catch(err => {
           this.$Notice.error({ title: "消息提示",desc:err.response.data.error  });
        });
    },
    //顾问今日接单
    getTodayOrders(){
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/order/getTodayOrders",
      }).then((result) => {
        var data = result.data
        if(data.length){
          this.TodayOrders = data
        }else{

        }
      }).catch((err) => {
         this.$Notice.error({ title: "消息提示",desc:err.response.data.error  });
      });
    }
  }
};
</script>

<style scoped>
.mr60px {
  margin-right: 60px;
}
.ml20px {
  margin-left: 20px;
}
@keyframes gradient {
  50% {
    background-position: 100% 20%;
  }
}
#agent-main >>> .ivu-card{
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    border-color: #eee;
}
#agent-main >>> .ivu-card-head {
  /* background: #f2f2f2 !important; */
  /* background-image: linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 100%); */
  /* background: linear-gradient(
    45deg,
    /* #5a3694 0, */
  /* #13bdce 33%, */
  /* #3d6cc8 100% */
  /* ); */
  /* background-size: 400%; */
  /* background-position: 0 100%; */
  /* animation: gradient 7.5s ease-in-out infinite; */
  /* background: rgba(61, 108, 200, 0.2); */
  background: #3a67be;
}
#agent-main >>> .ivu-card-head p{
  color: #fff;
}
#agent-main >>> .ivu-card-extra a{
  color: #fff;
}
/* cell-cust */
.collapse-title-bar em {
  display: inline-block;
  width: 24%;
  /* overflow: hidden; */
}
.collapse-title-bar em i {
  vertical-align: middle;
}
.cell-cust-wrap {
  padding-left: 46px;
}
.cell-cust {
  line-height: 24px;
  margin-bottom: 20px;
}
.cell-cust .cell-title {
  display: inline-block;
  width: 80px;
  color: #999;
}
.cell-cust .cell-con {
  display: inline-block;
  cursor: default;
  max-width: 646px;
  vertical-align: top;
}
/* function-btn-warp */
.function-btn-warp {
  text-align: right;
}
</style>