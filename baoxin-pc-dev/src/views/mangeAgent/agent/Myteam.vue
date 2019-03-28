<template>
  <div>
    <div class="public-title">我的团队</div>
    <Collapse accordion v-model="activeName">
      <Panel :name="index+''" v-for="(item,index) in myTeam" :key="index">
        <span class="collapse-title-bar"> <em>
            <Icon type="ios-bookmark" /> <i> {{ item.userName }}</i></em> <em>
            <Icon type="ios-contact" /> <i>  {{ item.phone }}</i></em><em>
            <Icon type="md-pin" /> <i> {{ getCityResult(item.area) }}</i></em></span>
        <div slot="content">
          <ul class="cell-cust-wrap">
            <li class="cell-cust">
              <label class="cell-title">团队名称</label>
              <div class="cell-con"> {{ item.userName }}</div>
            </li>
            <li class="cell-cust">
              <label class="cell-title">成立时间</label>
              <div class="cell-con">{{ $GLOBAL.timeFormat(item.addTime) }}</div>
            </li>
            <li class="cell-cust">
              <label class="cell-title">团队人数</label>
              <div class="cell-con">{{ item.teamNum }}</div>
            </li>
            <li class="cell-cust">
              <label class="cell-title">所在区域</label>
              <div class="cell-con"> {{ getCityResult(item.area) }}</div>
            </li>
            <li class="cell-cust">
              <label class="cell-title">联系方式</label>
              <div class="cell-con"> {{ item.phone }}</div>
            </li>
            <li class="cell-cust">
              <label class="cell-title">团队简介</label>
              <div class="cell-con">{{ item.teamSummary }}</div>
            </li>
            <li class="cell-cust">
              <label class="cell-title">加入进度</label>
              <div class="cell-con" style="color:red"><strong>【{{ item.mates != 1 ?'审核中':'已加入' }}】</strong></div>
            </li>
          </ul>
          <div class="function-btn-warp">
            <ButtonGroup id="function-btn">
              <Button type="default" @click="quitTeam(item.userId)">
                <Icon type="md-paper" />
                退出团队
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Panel>
    </Collapse>
    <br>
    <!-- 团队成员 -->
    <div class="public-title">团队成员</div>
    <Collapse accordion v-model="activeMember" @on-change="getTeamMember">
      <Panel :name="index+''" v-for="(item,index) in myTeam" :key="index"  >
        <span class="collapse-title-bar"> <em>
            <Icon type="ios-bookmark" /> <i> {{ item.userName }}</i></em> <em>
            <Icon type="ios-contact" /> <i>  {{ item.phone }}</i></em><em>
            <Icon type="md-pin" /> <i> {{getCityResult(item.area) }}</i></em></span>
        <div slot="content">
          <ul class="cell-cust-wrap userList" >
            <li class="cell-cust" 
              v-for="(item,index) in teamMember" 
              :key="index" 
              @click="modal1=true;showInformation(item)"
            >
              <div class="cell-con cell-pic"><img :src="item.headImg" /></div>
              <div class="cell-con cell-text"> {{ item.userName }}</div>
              <div class="cell-con cell-text"> {{ getCityResult(item.area) }}</div>  

            </li>

          </ul> 
          <Modal v-model="modal1" title="团队成员信息">
            <p><span class="canIntro">姓&emsp;&emsp;名：</span>{{informationName}}</p>
            <p><span class="canIntro">联系电话：</span>{{informationPhone}}</p>
            <p><span class="canIntro">所属公司：</span>{{informationCompany}}</p>
            <p><span class="canIntro">个人简介：</span>{{informationSummary}}</p>
            <p v-if="modal1"><span class="canIntro">二&nbsp;&nbsp;维&nbsp;&nbsp;码：</span><img class="qrcode" :src="'http://bxpt-bucket.oss-cn-beijing.aliyuncs.com/bx/user/agent/'+informationQRcode+'/qrCode/code.jpg'" ></p>
          </Modal>
        </div>
      </Panel>
    </Collapse>
    <br></br>
    <!-- 团队统计 -->
    <div class="public-title">团队统计</div>
    <div id="myChart" style="height: 350px;width: 100%;"></div>
    <!-- 团队消息 -->
    <!-- <div class="public-title">团队消息</div>
    <div class="team-msg">
      <ul class="msg-list">
        <li v-for="(item,index) in userMsg" :key="index">
          <Icon type="md-volume-up" />
          <div class="notification-body">
            【{{ item.teamName }}】 <a>{{ item.content }}</a>
          </div>
          <p class="notification-time">{{ $GLOBAL.timeFormat(item.publishTime) }}</p>
        </li>
      </ul>
    </div> -->
    <!-- 加入团队 -->
    <div class="public-title">加入团队</div>
    <div class="search-team">
      <Input class="search-team-input" v-model="searchValue" size="large" @on-search = "queryTeams" search enter-button="搜索" placeholder="请输入团队名称..." />
      <div class="search-result">
        <Card v-for="(item,index) in queryTeamsData" :key="index">
          <p slot="title">
            <Icon type="md-contacts" />
            {{ item.userName }}
          </p>
          <a href="#" slot="extra" @click.prevent="join(item.id)">
            <Icon type="ios-loop-strong"></Icon>
            <Button type="primary" size="small">加入</Button>
          </a>
          <ul class="cell-cust-wrap">
            <li class="cell-cust">
              <label class="cell-title">团队名称</label>
              <div class="cell-con">{{ item.userName }}</div>
            </li>
            <li class="cell-cust">
              <label class="cell-title">成立时间</label>
              <div class="cell-con">{{ $GLOBAL.timeFormat(item.createTime) }}</div>
            </li>
            <!-- <li class="cell-cust">
              <label class="cell-title">团队人数</label>
              <div class="cell-con">{{ item.userName }}</div>
            </li> -->
            <li class="cell-cust">
              <label class="cell-title">所在区域</label>
              <div class="cell-con">{{ getCityResult(item.area) }}</div>
            </li>
            <!-- <li class="cell-cust">
              <label class="cell-title">联系方式</label>
              <div class="cell-con">{{ item.userName }}</div>
            </li> -->
            <!-- <li class="cell-cust">
              <label class="cell-title">团队简介</label>
              <div class="cell-con">{{ item.userName }}</div>
            </li> -->
          </ul>
        </Card>
      </div>
    </div>
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
  created() {
    this.getUserMsg();
    this.cityData = cityData;
    
  },
  mounted() {
    this.getMyTeam();
    this.drawLine();
  },
  data() {
    return {
      activeName: "1",
      activeMember: "1",
      myTeam: [], //已加入团队
      userMsg: [], //用户信息
      searchValue:'',//搜索团队内容
      queryTeamsData:[],//团队搜索结果
      xAxis: "", //统计日期
      pointListData: "", //点单数据
      receiveListData: "", //接单数据
      cityData: [],
      //teamId:'' //团队id
      teamMember:[],
      modal1: false,
      informationName:'',   //用户姓名
      informationPhone:'',  //用户手机
      informationCompany:'',  //用所属公司
      informationSummary:'', //用户简介
      informationQRcode:''  //二维码
    };
  },
  methods: {
    getCityResult(area){
      return this.$GLOBAL.getCityResult(this.cityData,area)
    },
    // 所属团队
    getMyTeam() {
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/user/getMyTeam"
      })
        .then(result => {
          if (result.data.code == 0) {
            var data = result.data.data.list;
            if (data.length) {
              this.myTeam = data;
            }else{
              this.myTeam = ''
            }
          }
        })
        .catch(err => {
          this.$Notice.error({
            title: "异常提示",
            desc: err.response.data.error
          });
        });
    },
    // 获取全部消息
    getUserMsg() {
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/user/getUserMsg"
      })
        .then(result => {
          if (result.data.code == 0) {
            if (result.data.data.items.length) {
              this.userMsg = result.data.data.items;
            }
          }
        })
        .catch(err => {
          this.$Notice.error({ title: "消息提示",desc:err.response.data.error  });
        });
    },

    // 团队搜索
    queryTeams(){
      if(!this.searchValue){
        this.$Message.error('搜索内容不能为空')
        return
      }
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/user/queryTeams",
        params: {
          content: this.searchValue
        }
      }).then((result) => {
        if(result.data.code == 0){
          if(result.data.data.list.length){
            this.queryTeamsData = result.data.data.list
          }else{
            this.queryTeamsData = []
            this.$Notice.error({ title: "消息提示",desc:'没有搜索到相关团队'  });
          }
        }
      }).catch((err) => {
        console.log(err);
        this.$Notice.error({ title: "消息提示",desc:err.response.data.error  });
      });
    },
     // 加入团队
    join(teamId) {
      this.$axios({
        method: "post",
        url: this.$GLOBAL.baseURL + "/api/user/applyTeams",
        params: {
          teamId: teamId
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            this.$Notice.success({ title: "加入通知",desc:'申请成功,正在审核中~'  });
            this.getMyTeam()
           
          }
        })
        .catch(err => {
          this.$Notice.error({ title: "消息提示",desc:err.response.data.error  });
        });
    },
    //退出团队
    quitTeam(teamId){
      this.$axios({
        method:'post',
        url:this.$GLOBAL.baseURL+'/api/user/quitTeam',
        data:{
          teamId:teamId,
          type:'normal'
        }
      }).then(result => {
        if(result.data.code == 0){
          this.getMyTeam()
          this.$Message.success('退出团队成功')
        }
      }).catch(err =>{
        this.$Message.info(err.response.data.error);
      })
    },
    //获取团队成员
    getTeamMember(teamId){
      //teamId长度为0，就不执行以下代码
      if(teamId.length==0){
        return
      }
      var userId = this.myTeam[teamId[0]].userId
      var teamId = userId
      this.$axios({
        method:'get',
        url:this.$GLOBAL.baseURL+'/api/user/XCX/getTeamAgent',
        params:{
          teamId:teamId
        }
      }).then(result=>{
        if(result.data.code==0){
          this.teamMember = result.data.data.memList
        }
      }) 
    },
    //绘制统计拆线图
    drawLine() {
      var that = this
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
    //团员信息
    showInformation(user){
      this.$axios({
        method:'get',
        url:this.$GLOBAL.baseURL+'/api/user/searchBrief',
        params:{
          id:user.userId
        }
      }).then(result =>{
        this.informationName = result.data.userName
        this.informationPhone = result.data.phone
        this.informationCompany = result.data.companyName
        this.informationSummary = result.data.personSummary
        this.informationQRcode = result.data.userId
      })
    },
  }
};
</script>

<style scoped>
/* cell-cust */
.collapse-title-bar em {
  display: inline-block;
  width: 23%;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* overflow: hidden; */
}
.collapse-title-bar em i {
  vertical-align: middle;
}
.search-result .cell-cust-wrap {
  padding-left: 0px;
}
.cell-cust-wrap {
  padding-left: 46px;
}
.cell-cust {
  line-height: 24px;
  margin-bottom: 6px;
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

.function-btn-warp {
  text-align: center;
}
.msg-list .ivu-icon {
  font-size: 18px;
}
.msg-list li {
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 12px;
}
.notification-body {
  vertical-align: middle;
  font-size: 14px;
  display: inline-block;
}
.notification-time {
  line-height: 30px;
  padding-left: 30px;
}
.search-team-input {
  width: 400px;
  margin-bottom: 10px;
}
.search-result {
  display: flex;
  flex-wrap: wrap;
}
.search-result .ivu-card {
  width: 270px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.search-team .cell-cust .cell-con {
  max-width: 220px;
}
.search-team .cell-cust {
  margin-bottom: 10px;
}
.cell-cust .cell-pic{
  width: 65px;
  height: 65px;
}
.cell-cust .cell-pic img{
  width: 100%; 
  height: 100%;
  border-radius: 50%;
}
.cell-cust .cell-text{
  font-size: 12px;
  display: block;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.userList{
  padding-left: 0;
  display: flex;
  flex-wrap:wrap; 
}
.userList li{
  padding: 16px;
  width: 158px;
  border:1px solid #e8eaec;
  border-radius: 4px;
  text-align: center;
  margin-right: 6px;
  cursor: pointer;
}
.userList li:nth-of-type(5n){
  margin-right:0; 
}
.userList li .cell-pic{
  display: block;
  margin: 5px auto;
  cursor: pointer;
}
.canIntro{
  width: 80px;
  display: inline-block;
  margin-right: 20px;
  text-align:justify;
}
.ivu-modal-wrap *{
  font-size: 14px;
  line-height: 40px;
}
>>>.ivu-modal-mask{
  background: transparent;
}
.qrcode{
  width: 200px;
  vertical-align: top;
}
>>>.ivu-modal-footer{
  display: none;
}
>>>.ivu-modal-wrap{
  background: rgba(0,0,0,.3);
  opacity: .7;
}
</style>