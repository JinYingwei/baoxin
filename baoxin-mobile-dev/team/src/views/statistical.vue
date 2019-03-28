<template>
  <div>
    <div id="statisical" class="center shadow-box">
      <!-- <h3 class="publicTitle">业务统计</h3> -->
      <van-tabs id="member-rank" color="#4e8cee" swipeable>
        <van-tab title='业绩统计'>
          <div id="myChart" style="height: 350px;width: 100%;"></div>
        </van-tab>
        <van-tab title='业绩排行'>
          <div v-if="!hasRank">
            <div>
              <h3 class="publicTitle">接单排行</h3>
              <van-cell-group>
                <van-cell :value="item.totalRankCount || 0" v-for="(item,index)  in rankList" :key="index">
                  <template slot="title">
                    <img :src="item.totalRankHead || 'http://iconfont.alicdn.com/t/1531748288851.jpeg@100h_100w.jpg'" alt="">
                    <span class="van-cell-text van-cell-text-name">{{ item.totalRankName }}</span>
                  </template>
                </van-cell>
              </van-cell-group>
            </div>
            <div>
              <h3 class="publicTitle">点单排行</h3>
              <van-cell-group>
                <van-cell :value="item.singleRankCount || 0" v-for="(item,index)  in rankList" :key="index">
                  <template slot="title">
                    <img :src="item.totalRankHead || 'http://iconfont.alicdn.com/t/1531748288851.jpeg@100h_100w.jpg'" alt="">
                    <span class="van-cell-text van-cell-text-name">{{ item.singleRankName }}</span>
                  </template>
                </van-cell>
              </van-cell-group>
            </div>
          </div>
          <span class="null-tip" v-if="hasRank">
            <van-icon name="info-o" />
            <span>暂无排行数据</span>
          </span>
        </van-tab>

      </van-tabs>

    </div>
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
  name: "statistical",
  data() {
    return {
      memSize: 0, //团队人数
      rankList: [], //成员排行
      hasRank: true, //是否有排行数据
      xAxis: "", //统计日期
      pointListData: "", //点单数量
      receiveListData: "" //接单数量
    };
  },
  methods: {
    drawLine() {
      var that = this;
      this.axios({
        method: "get",
        // url:'https://www.easy-mock.com/mock/5baef22ab793604807ec54ae/loffery/census',
        url: baseURL + "/api/team/mobile/census"
      })
        .then(result => {
          // this.receiveList = result.data.data.receiveList//接单数量
          // this.pointList = result.data.data.pointList//点单数量
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
              text: "一周业绩变化",
              textStyle: {
                fontSize: 12
              },
              left: "center"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: ["接单数", "点单数"],
              bottom: 0
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
                name: "接单数",
                type: "line",
                data: this.receiveListData || [0]
              },
              {
                name: "点单数",
                type: "line",
                data: this.pointListData || [0]
              }
            ]
          });
        })
        .catch(err => {});
    },
    //获取团队人员接口
    getTeamMembers() {
      this.axios({
        url: baseURL + "/api/user/getTeamMembers",
        method: "get"
      })
        .then(result => {
          if (result.data.code == 0 && result.data.data.memList.length) {
            this.TeamMembers = result.data.data.memList;
            this.rankList = result.data.data.rankList.splice(0, 3);
            if (this.rankList.length == 0) {
              this.hasRank = true;
            } else {
              this.hasRank = false;
            }
            this.memSize = result.data.data.memSize;
          } else {
            this.hasTeamMembers = false;
          }
        })
        .catch(error => {
          this.hasRank = false;
        });
    }
  },
  mounted() {
    var that = this;
    this.$nextTick(function() {
      that.drawLine();
    });
    //获取团队人员接口
    this.getTeamMembers();
  }
};
</script>

<style >
#myChart {
  margin-top: 16px;
}
.publicTitle {
  text-align: center;
}
#statisical {
  min-height: 84vh;
}
.null-tip {
  margin-top: 10px;
  padding: 10px;
  line-height: 22px;
  display: block;
  text-align: center;
}

.null-tip span {
  padding-left: 10px;
  line-height: 22px;
}
#member-rank .van-cell {
  padding: 6px 15px;
  line-height: 1;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#member-rank .van-cell__title {
  flex: 4;
}

#member-rank .van-cell__value {
  line-height: 38px;
}
</style>
