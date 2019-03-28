<template>
    <div>
        <div class="public-title">业绩统计</div>
        <div id="myChart" style="height: 350px;width: 100%;"></div>
        <div class="public-title">业绩排行</div>
        <div class="rank">
            <Table id="rankTable" :columns="columns" :data="rankHistory"></Table>
        </div>
    </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/line");
require("echarts/lib/chart/bar");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/toolbox");
export default {
  created() {
    this.getTeamMembers()
  },
  mounted() {
    this.drawLine();
  },
  data() {
    return {
      xAxis: "", //统计日期
      pointListData: "", //点单数据
      receiveListData: "", //接单数据
      columns: [
        {
          title: "人员",
          key: "name"
        },
        {
          title: "接单排行",
          key: "totalRankCount",
          sortable: true
        },
        {
          title: "点单排行",
          key: "singleRankCount",
          sortable: true
        }
      ],
      rankHistory: [
        // {
        //   name: "John Brown",
        //   singleRankCount: 18,
        //   totalRankCount: 20
        // },
        // {
        //   name: "贤心",
        //   singleRankCount: 19,
        //   totalRankCount: 6
        // },
        // {
        //   name: "老农",
        //   singleRankCount: 28,
        //   totalRankCount: 40
        // },
        // {
        //   name: "贤心",
        //   singleRankCount: 39,
        //   totalRankCount: 6
        // }
      ]
    };
  },
  methods: {
    //绘制统计拆线图
    drawLine() {
      var that = this;
      // 初始化echarts实例
          var myChart = echarts.init(document.getElementById("myChart"));
          // 绘制图表
          myChart.setOption({
            title: {
              text: "业绩变化统计",
              left: "center"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: ["接单数", "点单数"],
              left: "15%"
            },
            toolbox: {
              show: true,
              feature: {
                magicType: {
                  show: true,
                  type: ["bar", "line"]
                },
                restore: {
                  show: true
                },
                saveAsImage: {
                  show: true
                }
              }
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
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
                data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
              },
              {
                name: "点单数",
                type: "line",
                data: [2.6, 4, 5, 26.4, 57, 70.7, 175.6]
              }
            ]
          });
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/team/mobile/census"
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

        })
        .catch(err => {});
    },
    getTeamMembers(){
      this.$axios({
        method:'get',
        url:this.$GLOBAL.baseURL + '/api/user/getTeamMembers'
      })
      .then(result=>{
        var data = result.data.data.rankList
        data.forEach(item=>{
          this.rankHistory.push(
            {
              name:item.singleRankName,
              totalRankCount:item.totalRankCount,
              singleRankCount:!item.singleRankCount ? '0' : item.singleRankCount
            }
          )
        })
        console.log(this.rankHistory);
      })
    }
  }
};
</script>

<style scoped>
#rankTable{
    width: 700px;
    margin: 0 auto;
}
</style>