<template>
    <div>
        <div class="public-title">成员数量</div>
        <Badge :text="memChangeSize">
            <Card class="money-item">
                <div style="text-align:center">
                    <h3>{{teamMember.length}}</h3>
                    <span>总人数</span>
                    <!-- <img src="../../../assets/img/mange/yue4.png"> -->
                </div>
            </Card>
        </Badge>
        <div class="public-title">成员列表</div>
        <div class="member-main">
            <div class="crm-list">
                <Card 
                  style="width:158px" 
                  @click.native="getMemberInformation(index)" 
                  v-for="(item,index) in teamMember"
                  :key="index"
                >
                  <div style="text-align:center">
                      <img class="default-head" :src="item.headImg">
                      <h4>{{item.userName}}</h4>
                      <h4 class="area">{{$GLOBAL.getCityResult(cityData,item.area)}}</h4>
                  </div>
                  <img class="star" src="../../../assets/img/star.png" v-show="item.userId === starShow">
                </Card>
            </div>
            <Drawer width="640" v-model="value4">
                <p :style="pStyle">成员信息</p>
                <p :style="pStyle">基本资料</p>
                <div class="demo-drawer-profile">
                    <Row>
                        <Col span="12">
                        姓名: {{memberInformation.userName}}
                        </Col>
                        <Col span="12">
                        手机: {{memberInformation.phone}}
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                        地区: {{$GLOBAL.getCityResult(cityData,memberInformation.area)}}
                        </Col>
                        <Col span="12">
                        工号: {{memberInformation.jobNumber}}
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                        职业证书编号: <a target="_blank" href="http://iir.circ.gov.cn/web/">{{memberInformation.certificateNo}}</a>
                        </Col>
                        <Col span="12">
                        所属公司:{{memberInformation.companyName}}
                        </Col>
                    </Row>
                    <Row>
                        <Col span="18">
                        介绍: {{memberInformation.personSummary}}
                        </Col>
                    </Row>
                </div>
                <Divider />
                <p :style="pStyle">业务信息</p>
                <Row>
                    <Col span="12">
                    历史接单/点单：<a>{{memberRanking.totalRankCount}} / {{!memberRanking.singleRankCount ? 0 : memberRanking.singleRankCount}}</a>
                    </Col>
                    <Col span="12" v-if="0">
                    今日接单/点单：<a>825/485</a>
                    </Col>
                </Row>
                <Divider />
                <p :style="pStyle">成员操作</p>
                <Button 
                  size="large" 
                  type="info"
                  @click="goStar(memberInformation.userId)"
                >
                  指定团队明星
                </Button>
                <Button 
                  size="large" 
                  type="warning"
                  @click="deleteMember(memberInformation.userId)"
                >
                  删除成员
                </Button>
                <Divider />
                <p :style="pStyle">发送通知</p>
                <Input v-model="msgVal" type="textarea" :rows="4" placeholder=" 输入通知内容..." />
                <br><br>
                <Button 
                  size="large" 
                  type="info"
                  @click="sendMessage(memberInformation.userId)"
                >
                  发送
                </Button>
                <Divider />
            </Drawer>
        </div>
        <div class="public-title">申请通知</div>
        <Table border :columns="columns7" :data="getApplicationRecordList"></Table>

    </div>
</template>

<script>
//引入地区代码文件
import cityData from "../../../assets/lib/region.js";
export default {
  created() {
    this.getTeamPerson()
    this.getApplicationRecord()
    this.cityData = cityData
    this.getTeamStar()
  },
  data() {
    return {
      value4: false,
      getApplicationRecordList:[],  //申请记录
      teamMember:[],  //团队成员
      cityData:'', 
      memberInformation:'', //团队成员信息
      leaderboard:[],   //排行榜信息
      memberRanking:'', //团队成员信息接单数量
      memChangeSize:'',
      starSum:'',
      starShow:'',
      pStyle: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "24px",
        display: "block",
        marginBottom: "16px"
      },
      msgVal: "", //通知内容
      columns7: [
        {
          title: "姓名",
          key: "userName",
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "申请时间",
          key: "addTime"
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "同意"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "拒绝"
              )
            ]);
          }
        }
      ],
    };
  },
  methods: {
    //申请同意
    show(index) {
      this.$axios({
        method:'post',
        url: this.$GLOBAL.baseURL + '/api/user/applyTeamOperate',
        data:{
          id:this.getApplicationRecordList[index].id,
          operateType:1
        }
      })
      .then(result=>{
        if(result.data.code === 0){
          this.getApplicationRecord()
          this.getTeamPerson()
        }
      })
      .catch(error=>{
        console.log(error);
      })
    },
    //拒绝申请
    remove(index) {
      this.$Modal.confirm({
        title:`是否拒绝 ${this.getApplicationRecordList[index].userName}的申请`,
        onOk: () => {
          this.$axios({
            method:'post',
            url: this.$GLOBAL.baseURL + '/api/user/applyTeamOperate',
            data:{
              id:this.getApplicationRecordList[index].id,
              operateType:2
            }
          })
          .then(result=>{
            if(result.data.code === 0){
              this.getApplicationRecord()
            }
          })
          .catch(error=>{
            console.log(error);
          })
        },
        onCancel: () => {
          
        }
      });
    },
    //获取团队人员
    getTeamPerson(){
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/user/getTeamMembers"
      })
      .then(result=>{
        if(result.data.code === 0){
          this.teamMember = result.data.data.memList
          this.leaderboard = result.data.data.rankList
          this.memChangeSize = String(result.data.data.memChangeSize)
        }
      })
      .catch(error=>{
        console.log(error);
      })
    },
    //获取申请记录
    getApplicationRecord(){
      this.$axios({
        method:'get',
        url:this.$GLOBAL.baseURL + '/api/user/teamManage'
      })
      .then(result=>{ 
        this.getApplicationRecordList = result.data.data.list
        for(var attr in this.getApplicationRecordList){
          var time = this.getApplicationRecordList[attr].addTime.toString()
          time = time.substring(0,4) + '-' + time.substring(4,6) + '-' + time.substring(6,8)+' '+ time.substring(8,10) + ':'+ time.substring(10,12)
          this.getApplicationRecordList[attr].addTime = time
        }
      })
    },
    //获取成员信息
    getMemberInformation(index){
      this.value4 = true
      this.memberInformation = this.teamMember[index]
      this.memberRanking = this.leaderboard[index]
      // this.starSum = index
    },
    //指定团队明星
    goStar(id){
      this.$axios({
        method:'post',
        url:this.$GLOBAL.baseURL+'/api/user/pointTeamStar',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        params:{
          agentId:id,
        },
      })
      .then(result=>{
        if(result.data.code === 0){
          this.$Message.success('指定团队明星成功');
          this.getTeamStar()
        }
      })
      .catch(err=>{
        this.$Message.error('该成员已经是团队明星');
      })
    },
    // 获取团队明星
    getTeamStar(){
      let teamId
      this.$axios({
        method:'get',
        url:this.$GLOBAL.baseURL+'/api/team/search'
      }).then(result=>{
        teamId = result.data[0].userId
      }).then(()=>{
        this.$axios({
          method:'get',
          url:this.$GLOBAL.baseURL+'/api/user/XCX/getTeamStar',
          params:{
            teamId:teamId
          }
        }).then(result=>{
          this.starShow = result.data.data.starAgent.userId
          // this.getTeamStar()
        }).catch(err=>{
          console.log(err);
        })
      })
    },
    //删除成员
    deleteMember(id){
      this.$axios({
        method:'post',
        url: this.$GLOBAL.baseURL + '/api/user/delTeamMember',
        params:{
          agentId:id,
        }
      })
      .then(result=>{
        if(result.data.code === 0){
          this.getTeamPerson()
          this.value4 = false
          this.$Message.success('删除成功');
        }
      })
      .catch(err=>{
        this.$Message.error('删除失败');
      })
    },
    //成员信息发送
    sendMessage(id){
      this.$axios({
        method:'post',
        url:this.$GLOBAL.baseURL + '/api/user/addTeamMsg',
        data:{
          title:'标题test',
          content:this.msgVal,
          megForwardId:id
        }
      })
      .then(result=>{
        if(result.data.code === 0){
          this.$Message.success('发送成功');
        }
      })
      .catch(err=>{
        this.$Message.error('消息不能为空');
      })
    }
  }
};
</script>

<style scoped>
.money-item {
  width: 100px;
  display: inline-block;
  margin-left: 20px;
}
.money-item img {
  width: 50%;
}
/* .crm-list  */
.crm-list {
  display: flex;
  flex-wrap: wrap;
}
.crm-list .ivu-card {
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.crm-list .default-head {
  border-radius: 50%;
  width: 65px;
  height: 50px;
}

.crm-list h4 {
  cursor: pointer;
  font-weight: normal;
}
.demo-drawer-profile {
  font-size: 14px;
}
.demo-drawer-profile .ivu-col {
  margin-bottom: 12px;
}
.star{
  position: absolute;
  width: 25px;
  right: -13px;
  top: -13px;
}
.area{
  height: 21px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>