<template>
    <div class="charge">
        <div class="center">
            <div class="charge-info">
                <van-cell-group>
                    <van-switch-cell @change="handelchargeSwitch" size='22px' v-model="chargeSwitch" title="成员缴费" />
                </van-cell-group>
                <br>
                <van-radio-group v-model="chargeRadio">
                    <van-cell-group>
                        <van-cell value='shop'>
                            <van-radio :disabled="!chargeSwitch" name="1">成员预收费 ( {{ actionsheetVal }}元 人/月 )</van-radio>
                        </van-cell>
                        <van-cell>
                            <van-radio :disabled="!chargeSwitch" name="2">成员后收费 ( {{ actionsheetVal }}元 人/月 )</van-radio>
                        </van-cell>

                    </van-cell-group>
                </van-radio-group>
            </div>
            <br>
            <div id="myChart" style="height: 350px;width: 100%;"></div>
        </div>

        <van-actionsheet v-model="actionsheet" title="设置收费金额">
            <div class="actionsheet">
                <br>
                <van-stepper v-model="actionsheetVal" />
                <p>（ {{ actionsheetVal }}元 人/月 ）</p>
                <br>
            </div>
        </van-actionsheet>
    </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/line");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
export default {
  mounted() {
    var that = this;
    this.$nextTick(function() {
      that.drawLine();
    });
  },
  data() {
    return {
      chargeSwitch: false,
      chargeRadio: "1",
      actionsheet: false,
      actionsheetVal: 0,
      //假数据
      xAxis: "", //统计日期
      pointListData: "", //点单数量
      receiveListData: "" //接单数量
    };
  },
  methods: {
    handelchargeSwitch() {
      console.log(this.chargeSwitch);
      if (this.chargeSwitch) {
        this.actionsheet = true;
      }
    },
    drawLine() {
      var that = this;
      this.axios({
        method: "get",
        // url:'https://www.easy-mock.com/mock/5baef22ab793604807ec54ae/loffery/census',
        url: baseURL + "/api/team/mobile/census"
      })
        .then(result => {
          //整理数据格式
          var pointListDataObj = result.data.data.pointList;
          if (pointListDataObj.length) {
            this.xAxis = [];
            this.pointListData = [];
            pointListDataObj.map(item => {
              this.xAxis.push(item.time);
              this.pointListData.push(item.count);
            });
          }

          var receiveListDataObj = result.data.data.receiveList;
          if (receiveListDataObj.length) {
            this.receiveListData = [];
            receiveListDataObj.map(item => {
              this.receiveListData.push(item.count);
            });
          }

          // 初始化echarts实例
          var myChart = echarts.init(document.getElementById("myChart"));
          // 绘制图表
          myChart.setOption({
            title: {
            //   text: "一周业绩变化",
              textStyle: {
                fontSize: 12
              },
              left: "center"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: ["缴费金额", "欠费金额"],
              top: 16
            },

            xAxis: {
              type: "category",
              boundaryGap: false,
              data: that.xAxis || [
                "周一",
                "周二",
                "周三",
                "周四",
                "周五",
                "周六",
                "周日"
              ]
            },
            yAxis: [
              {
                type: "value"
              }
            ],
            series: [
              {
                name: "缴费金额",
                type: "line",
                data: this.receiveListData || [0]
              },
              {
                name: "欠费金额",
                type: "line",
                data: this.pointListData || [0]
              }
            ]
          });
        })
        .catch(err => {});
    },
  }
};
</script>

<style scoped>
.charge {
  min-height: 90vh;
  background: #f2f2f2;
  box-sizing: border-box;
  padding-top: 0.533333rem /* 40/75 */;
  overflow: hidden;
}
.charge-info {
  margin-top: 0.533333rem /* 40/75 */;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  padding: 0.346667rem /* 26/75 */ 0.533333rem /* 40/75 */;
  background: #fff;
  border-radius: 0.16rem; /* 12/75 */
}
.actionsheet {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}

</style>