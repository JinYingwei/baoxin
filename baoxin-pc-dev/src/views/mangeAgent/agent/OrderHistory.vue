<template>
  <div>
    <div class="public-title">历史记录</div>
    <!-- 过滤条件 -->
    <Breadcrumb class="filter-trem">
      <BreadcrumbItem class="filter-items" @click.native="orderHistory(1)">全部</BreadcrumbItem>
      <BreadcrumbItem class="filter-items" @click.native="weekHandle">近一周</BreadcrumbItem>
      <BreadcrumbItem class="filter-items" @click.native="monthHandle">近一月</BreadcrumbItem>
      <BreadcrumbItem class="filter-items" @click.native="download">导出</BreadcrumbItem>
    </Breadcrumb>
    <Collapse accordion v-model="activeName">
      <Panel :name="index+''" v-for="(item,index) in historyList" :key="index">
        <span class="collapse-title-bar"> <em>
            <Icon type="ios-bookmark" /> <i> {{ item.productName }}</i></em> <em>
            <Icon type="ios-contact" /> <i> {{ item.name }}</i></em><em>
            <Icon type="md-pin" /> <i> {{ $GLOBAL.getCityResult(cityData,item.address) }}</i></em>
				</span>
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
      <!-- <img v-show="historyList.length == 0 " class="null" src="../../../assets/img/null.png"> -->
    </Collapse>
    <br>
    <Page v-show="totalNum" :total="totalNum"  show-total @on-change="change"/>
    <!-- 接单统计 -->
    <div class="public-title">接单统计</div>
    <div id="myChart" style="height: 350px;width: 100%;"></div>
  </div>
</template>

<script>
// 引入地区代码文件
import cityData from "../../../assets/lib/region.js";
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/line");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/toolbox");

export default {
  mounted() {
    this.drawLine();
    this.orderHistory();
    this.cityData = cityData;
  },
  data() {
    return {
      cityData: [],
      activeName: "1",
      xAxis: "", //统计日期
      pointListData: "", //点单数据
      receiveListData: "", //接单数据
      historyList: [], //接单历史数据
      page:1,  //接受页码长度
      totalNum:0,//
      downTime:'',  //记录导出的时间
    };
  },
  
  methods: {
    //接单历史
    orderHistory(page="1",startTime="") {
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/order/getHistoryOrders",
        params: {
          startTime: startTime,
          // rows:rows,
          page:page
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            console.log(result)
            this.totalNum = result.data.data.historyList.totalNum
            var data = result.data.data.historyList.items;
            this.historyList = data;
          }
        })
        .catch(err => {
          this.$Notice.error({
            title: "异常提示",
            desc: err.response.data.error
          });
        });
    },
    //绘制统计拆线图
    drawLine() {
      var that = this;
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
            toolbox: {
              show: true, //是否显示工具栏组件
              orient: "vertical", //工具栏icon的布局朝向
              itemSize: 18, //工具栏icon的大小
              itemGap: 20, //item之间的间距
              right: 20, //toolbox的定位位置
              feature: {
                saveAsImage: { show: true }, //导出图片
                dataView: { show: true }, //数据视图
                magicType: {
                  //动态类型切换
                  type: ["line", "bar"]
                },
                dataZoom: { show: true }, //数据区域缩放
                restore: { show: true } //重置
              }
            },
            legend: {
              data: ["接单数", "点单数"]
              //   bottom: 0
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
    //当前时间戳转日期格式
    timestampToTime(timestamp) {
      var date = new Date(timestamp);
      var Y = date.getFullYear() + '';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '';
      var D = date.getDate() + ' ';
      return Y+M+D;
    },
    //近一周
    weekHandle(){
      //当前时间戳
      var currentTime = new Date().getTime()
      //7天前的时间戳
      var beforeTime = currentTime - (60*60*24*1000*7)
      //将7天前的时间戳转成日期格式
      var beforeDate = this.timestampToTime(beforeTime)
      this.orderHistory(1,beforeDate)

      this.downTime = beforeDate
    },
    //近一个月
    monthHandle(){
      //当前时间戳
      var currentTime = new Date().getTime()
      //30天前时间戳
      var beforeTime = currentTime - (60*60*24*1000*30)
      //将30天前的时间戳转成日期格式
      var beforeDate = this.timestampToTime(beforeTime)
      this.orderHistory(1,beforeDate)

      this.downTime = beforeDate
    },
    //导出
    download(){
      var times;
      if(!this.downTime){
        var currentTime = new Date().getTime()
        var beforeTime = currentTime - (60*60*24*1000*30)
        var beforeDate = this.timestampToTime(beforeTime)
        times = beforeTime
      }else{
        times = this.downTime
      }
      var url = `${this.$GLOBAL.baseURL}/api/order/historyOrdersExport?startTime`;
      var xhr = new XMLHttpRequest();
      xhr.open('get',url, true); // 也可以使用POST方式，根据接口
      xhr.setRequestHeader("Accept", `text/plain, text/html,application/json,text/javascript, application/javascript;${document.cookie}`); // 可以定义请求头带给后端

      xhr.responseType = "blob"; // 返回类型blob

      // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑

      xhr.onload = function() {

        // 请求完成

        if(this.status === 200) {

          // 返回200

          var blob = this.response;

          var reader = new FileReader();

          reader.readAsDataURL(blob); // 转换为base64，可以直接放入a表情href

          reader.onload = function(e) {

            // 转换完成，创建一个a标签用于下载

            var a = document.createElement('a');

            a.download = 'data.xlsx';

            a.href = e.target.result;

            // $("body").append(a); // 修复firefox中无法触发click

            a.click();

            // $(a).remove();
          }

        }

      };

      // 发送ajax请求

      xhr.send()

    },
    //翻页
    change(page){
      this.orderHistory(page)
    }

  }
};
</script>

<style scoped>
/* cell-cust */
.collapse-title-bar em {
  display: inline-block;
  width: 24%;
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
.filter-trem {
  text-align: right;
  padding-right: 6px;
  margin-bottom: 14px;
  margin-top: -36px;
}
/* filter-items */
.filter-items {
  cursor: pointer;
  color: #515a6e;
}
 /*   Page  */
.ivu-page{
  text-align: center;
}
.filter-items >>>.ivu-breadcrumb-item-link:hover{
  color:#3d6cc8;
}
</style>