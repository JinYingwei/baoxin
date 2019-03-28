<template>
  <div>
    
    <div class="top">
      <div class="wrap clearfix">
        <div id="tp-weather-widget"></div>
        <div class="qualification-query">
          <a href="http://iir.circ.gov.cn/web/" target="_blank">保险资质查询</a>
          <a class="topSliderTip" href="javascript:;" target="_blank"><img style="width:14px" src="https://img.zcool.cn/community/012d2059accd89a8012028a9d9bf43.gif"><span>新人如何开首单？用通知法，新人轻松出首单！</span></a>
        </div>
        <ul class="topRight">
          
          <Breadcrumb separator="|">
            <BreadcrumbItem to="/">你好 ,{{ isLogin.phone }} <Badge v-show="isLogin.isLogin" :text="isLogin.type == 'agent'?'顾问':'团队'" id="role-tag" type="primary"></Badge>
            </BreadcrumbItem>
            <BreadcrumbItem v-if="isLogin.isLogin" @click.native="logout" id="layout">安全退出</BreadcrumbItem>
            <BreadcrumbItem class="user" @click.native="ShowlogoIn" v-else>登录</BreadcrumbItem>
            <BreadcrumbItem class="user" @click.native="ShowRegister">注册</BreadcrumbItem>
            <BreadcrumbItem :to="{name:'Evaluation'}">投诉/表扬</BreadcrumbItem>
            <BreadcrumbItem :to="{name:'Help'}">操作指南</BreadcrumbItem>
             <!-- {{ isLogin }} -->
          </Breadcrumb>
        </ul>
      </div>
    </div>
    <div class="header">
      <div class="wrap clearfix">
        <router-link to="/" tag="a" class="logo"><img src="../assets/img/header/logo.png"> </router-link>
        <div class="head_main">
          <div class="seach">
            <div class="team-search" size='large'>
              <Input id="team-search-main" placeholder="选择顾问/团队后搜索" v-model="seachVal">
              <Select @on-change="selectChange" v-model="selectType" slot="prepend" style="width: 80px">
                <Option value="agent">顾问</Option>
                <Option value="team">团队</Option>
              </Select>
              <span slot="append" @click="search" id="search-btn">搜索</span>
              <!-- <Button slot="append" icon="ios-search"></Button> -->
              </Input>
            </div>
          </div>
          <Card @mouseleave.native="outHiden" v-show="searchResultShow" class="search-result">
            <p class="result-num"> <em>
                <Icon type="ios-arrow-back" /></em>1/1<em>
                <Icon type="ios-arrow-forward" /></em></p>
            <ul>
              <!-- 顾问结果 -->
              <li v-if="selectType == 'agent'">
                <Row>
                  <Col span="12">
                  <Icon type="ios-contact" /> 姓名: {{ searchResult.userName }}</Col>
                </Row>
                <Row>
                  <Col span="12">
                  <Icon type="ios-call" /> 电话: {{ searchResult.phone }}</Col>
                </Row>
                <Row>
                  <Col span="12">
                  <Icon type="ios-people" /> 所属公司: {{ searchResult.companyName }}</Col>
                </Row>
                <p class="result-more"><a>查看详情 >></a></p>
              </li>
              <!-- 团队结果 -->
              <li v-else>
                <Row>
                  <Col span="12">
                  <Icon type="ios-contact" /> 名称: {{ searchResult.userName }}</Col>
                </Row>
                <Row>
                  <Col span="12">
                  <Icon type="ios-people" /> 人数: {{ searchResult.teamNum }}</Col>
                </Row>
                <Row>
                  <Col span="12">
                  <Icon type="ios-call" /> 电话: {{ searchResult.phone }}</Col>
                </Row>
                <p class="result-more"><a>查看详情 >></a></p>
              </li>
            </ul>
          </Card>
        </div>
        <div class="logoErwei">
          <img src="../assets/img/header/erweima.jpg">
          <p>晟联保信</p>
        </div>
      </div>
    </div>
    <Menu mode="horizontal" :active-name="activeName">
      <div class="wrap" id="navBar">
        <div class="fix-logo"><img src="../assets/img/header/fix-logo.png"></div>
        <MenuItem name="1" to="/">首页</MenuItem>
        <MenuItem name="2" to="/school"><!-- <Icon type="ios-school-outline" /> -->保险学堂</MenuItem>
        <MenuItem name="3" to="/consult"><!-- <Icon type="ios-chatbubbles-outline" /> -->在线咨询</MenuItem>
        <!-- <MenuItem name="4">保险方案</MenuItem> -->
        <MenuItem v-if="isLogin.type == 'team'" name="6" to="/mangeTeam">
          <Icon type="ios-stats" />管理中心
        </MenuItem>
        <MenuItem v-else name="5" to="/mangeAgent">
         <Icon type="ios-stats" />管理中心
        </MenuItem>
      </div>
    </Menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName:"1",
      isLoginInfo: {},
      seachVal: "", //搜索内容
      selectType: "agent", //搜索角色
      searchResult: {}, //搜索结果
      searchResultShow: false
    };
  },
  watch:{
    "$route":"changeTabBarActive"
  },
  created() {
    this.changeTabBarActive()
    // 获取session中登陆信息
    // var sessionStorageData = sessionStorage.getItem("isLogin");
    // if (sessionStorageData) {
    //   this.isLoginInfo = JSON.parse(sessionStorageData);
    // }
    // // 如果session中登陆有效，则持久化vuex,否则删除cookie
    // if (this.isLoginInfo.isLogin) {
    //   this.$store.commit("isLogin", {
    //     type: this.isLoginInfo.type,
    //     isLogin: true,
    //     phone: this.isLoginInfo.phone
    //   });
    // } else {
    //   this.$store.commit("isLogin", {
    //     type: 'agent',
    //     isLogin: false,
    //   });
    //   this.$GLOBAL.cookie.del('_auth')
    // }
  },
  methods: {
    // 搜索
    search() {
      var url = "/api/agent/searchByNameOrTel";
      if (this.selectType == "team") {
        url = "/api/team/searchByNameOrTel";
      }
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + url,
        params: {
          nameOrTel: this.seachVal
        }
      })
        .then(result => {
          if (result.data.code == 0 && result.data.data.length) {
            this.searchResult = result.data.data[0];
            this.searchResultShow = true;
          } else {
            this.$Message.error("没有搜索到结果");
            this.searchResult = {};
            this.searchResultShow = false;
          }
        })
        .catch(err => {
          this.$Message.error("没有搜索到结果");
          this.searchResultShow = false;
          this.searchResult = {};
        });
    },
    // 搜索类型改变
    selectChange(value) {
      this.searchResult = {};
      this.searchResultShow = false;
    },
    outHiden(){
      var _this = this
      setTimeout(()=>{
       _this.searchResultShow = false;
      },3000)
    },
    ShowlogoIn(){
      this.$store.commit('showAgentUser',{isShow:true,type:'login'})
    },
    ShowRegister(){
      this.$store.commit('showAgentUser',{isShow:true,type:'register'})
    },
    // 退出
    logout() {
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/user/logout"
      })
        .then(result => {
          this.$store.commit("loginInfo", {
            type: this.isLoginInfo.type,
            isLogin: false,
            phone: this.isLoginInfo.phone
          });
          sessionStorage.removeItem("isLogin");
          this.$router.push('/')
        })
        .catch(err => {});
    },
    //导航的处理
    changeTabBarActive() {
      var nowName = this.$route.name;
      var fullPath = this.$route.fullPath
      var fullPathItem = fullPath.split('/')
      switch (true) {
        case fullPathItem.includes('Index'):
          this.activeName = '1';
          break;
        case fullPathItem.includes('school'):
          this.activeName = '2';
          break;
        case fullPathItem.includes('consult'):
          this.activeName = '3';
          break;
        case fullPathItem.includes('mangeAgent'):
          this.activeName = '5';
          break;
        default :
          this.activeName = '1';
      }
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.loginInfo;
    }
  },
  mounted() {
    //吸顶导航功能
    var nav = document.getElementById("navBar");
    var head_main = document.querySelector("header .head_main");
    window.addEventListener("scroll", function() {
      nav.id = window.pageYOffset > nav.offsetTop + 120 ? "navFix" : "navBar";
    });
  }
};

//心知天气
(function(T, h, i, n, k, P, a, g, e) {
  g = function() {
    P = h.createElement(i);
    a = h.getElementsByTagName(i)[0];
    P.src = k;
    P.charset = "utf-8";
    P.async = 1;
    a.parentNode.insertBefore(P, a);
  };
  T["ThinkPageWeatherWidgetObject"] = n;
  T[n] ||
    (T[n] = function() {
      (T[n].q = T[n].q || []).push(arguments);
    });
  T[n].l = +new Date();
  if (T.attachEvent) {
    T.attachEvent("onload", g);
  } else {
    T.addEventListener("load", g, false);
  }
})(
  window,
  document,
  "script",
  "tpwidget",
  "//widget.seniverse.com/widget/chameleon.js"
);
tpwidget("init", {
  flavor: "slim",
  location: "WX4FBXXFKE4F",
  geolocation: "enabled",
  language: "zh-chs",
  unit: "c",
  theme: "chameleon",
  container: "tp-weather-widget",
  bubble: "enabled",
  alarmType: "badge",
  uid: "U530F72177",
  hash: "e1ad05b075b283a6cec091b0d3f30b3a"
});
tpwidget("show");
</script>

<style scoped>
.ivu-menu {
  z-index: 12;
}
.ivu-breadcrumb {
  font-size: 12px;
}
.ivu-menu-item {
  font-size: 16px;
}
.ivu-menu-horizontal.ivu-menu-light:after {
  background: none;
}

#team-search-main {
  height: 100%;
  border: none;
  top: 0;
}
#team-search-main >>> .ivu-input-group-prepend {
  border-radius: 0;
}
#team-search-main >>> .ivu-input {
  height: 100%;
}
#team-search-main >>> .ivu-input-group-append {
  border: none;
  padding: 0;
}
#team-search-main >>> .ivu-input-group-append span {
  background: #3d6cc8;
  color: #fff;
  border-radius: 0;
  border: none;
  cursor: pointer;
  /* padding: 4px 20px; */
  height: 40px;
  padding-left: 23px;
  padding-right: 23px;
  line-height: 40px;
  display: block;
}

/*---------------顶部-------------*/
.top #tp-weather-widget {
  float: left;
  display: inline-block;
  vertical-align: middle;
  margin-left: 30px;
  margin-top: 5px;
  min-width: 90px;
}
.wrap {
  width: 1200px;
  margin: 0 auto;
}
.top {
  height: 40px;
  background: #f2f2f2;
}
#register {
  background: none !important;
}
.top .topRight {
  float: right;
  height: 40px;
  line-height: 40px;
}
.wap-login {
  display: none;
}
.top .topRight li {
  display: inline;
  border-left: 1px solid #ccc;
  height: 40px;
  font-size: 12px;
}
.safe-out {
  display: none;
}
.login {
  display: none;
}
#register {
  display: none;
}
.top .topRight li:hover a {
  color: #3d6cc8;
}

.top .topRight li:nth-child(1) {
  border: none;
}
#navBar {
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.navBar .active {
  color: #3c6dc9;
  border-bottom: 3px solid #3d6cc8;
}
.navBar .active a {
  color: #3c6dc9 !important;
}
.cart-num {
  display: inline-block;
  width: 8px;
  height: 8px;
  vertical-align: text-top;
  line-height: 16px;
  background: #e24953;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
  margin-left: 4px;
}

.top .topRight .login {
  font-size: 12px;
  color: #333;
}
.out {
  color: #666;
  margin: 0 12px;
  cursor: pointer;
}
.top .topRight .login a {
  height: 40px;
  line-height: 40px;
  color: #666;
  font-size: 12px;
  margin: 0 12px;
}

.top .topRight .register a {
  margin: 0 12px;
  color: #666;
  font-size: 12px;
}

.top .topRight .message a {
  margin: 0 12px;
  color: #666;
  font-size: 12px;
}

.top .topRight .guide a {
  color: #666;
  margin: 0 12px;
}

.top .topRight .service a {
  color: #666;
  margin: 0 12px;
}
.tpwthwidt .text_1vUR5ag,
.tpwthwidt .title_2I35arv {
  font-size: 12px;
}
.top .topRight .userName {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.top .topRight .userName a {
  color: #666;
  font-size: 12px;
  padding: 0 12px;
}

.top .topRight .userName .out {
  position: absolute;
  left: 0px;
  top: 38px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  background: #ccc;
  color: #004974;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}

/*---------------头部-------------*/

.header {
  margin-top: 40px;
  height: 78px;
}

.header .logo {
  width: 360px;
  height: 72px;
  float: left;
  margin-top: -14px;
}

.header .logo > img {
  width: 269px;
}

.header .head_main {
  float: left;
  width: 600px;
  position: relative;
}

#search {
  width: 600px;
  height: 42px;
  float: left;
}

.header .head_main .seach {
  width: 480px;
  height: 42px;
  border: 1px solid #3d6cc8;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
  float: left;
}

.header .head_main .seach input {
  width: 330px;
  height: 40px;
  line-height: 40px;
  text-indent: 20px;
}

.header .head_main .btn {
  width: 120px;
  height: 42px;
  float: left;
  background: #3d6cc8;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  display: none;
}

.header .head_main .seach_list {
  float: left;
  height: 34px;
  margin-left: 5px;
}

.header .head_main .seach_list li {
  height: 34px;
  line-height: 34px;
  padding-right: 20px;
  float: left;
}

.header .head_main .seach_list li a {
  color: #333;
  font-size: 12px;
}

.header .head_main .seach_list li a:hover {
  color: red;
}

.header .wrap {
  position: relative;
}

.logoErwei {
  position: absolute;
  right: 30px;
  top: -10px;
  width: 100px;
  text-align: center;
}

.logoErwei > img {
  width: 100px;
}

.logoErwei p {
  color: #3d6cc8;
  font-size: 14px;
  text-align: center;
}

#navBar {
  margin-top: 7px;
  margin-bottom: 22px;
  text-align: center;
}

.navBar {
  /*height: 25px;*/
  display: inline-block;
}

.blue {
  width: 100%;
  height: 1px;
  background: #3d6cc8;
}

.qualification-query {
  line-height: 40px;
  padding-left: 20px;
  float: left;
  height: 40px;
  overflow: hidden;
}

.qualification-query a {
  color: #0464d5;
  padding-right: 9px;
  padding-left: 9px;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  font-size: 12px;
  vertical-align: top;
}
.topSliderTip {
  border: none !important;
  overflow: hidden;
  display: inline-block;
}
.topSliderTip img {
  width: 14px;
}
.topSliderTip span {
  color: #666;
  padding-left: 6px;
  display: inline-block;
  /*transition: .5s;*/
}
@keyframes tipslider {
  75% {
    transform: translateY(0);
    opacity: 1;
  }
  /*100%{translateY(40px)}*/
}
.team-search {
  width: 100%;
  height: 100%;
  line-height: 40px;
  position: relative;
  background: #fff;
  font-size: 16px;
  z-index: 13;
}
.team-resault {
  position: absolute;
  box-sizing: border-box;
  background: #fff;
  width: 350px;
  left: 0px;
  top: 41px;
  padding-top: 6px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  z-index: 12;
  border: 1px solid #eee;
  transition: 0.2s;
  transform: scale(0);
  transform-origin: center top;
}
.resault-succ {
  display: none;
}
.resault-err {
  font-size: 14px;
  padding-left: 16px;
}
.team-search-wrap {
  height: 22px;
}
.team-resault-num {
  text-align: center;
  color: #838383;
  font-size: 12px;
  line-height: 12px;
  display: none;
}
.team-resault-num span {
  padding: 0 8px;
}
.team-resault-num em {
  cursor: pointer;
}
.team-resault-content {
  padding-top: 10px;
  position: relative;
  color: #838383;
  padding-bottom: 20px;
}
.team-search-input {
  color: #909090;
  float: left;
  border: none;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  height: 100%;
  display: block;
  background: none;
  width: 110px;
  padding-left: 8px;
  font-size: 14px;
}
.authentication-icon {
  position: absolute;
  right: 0;
  top: 10px;
}
.team-resault-more {
  position: absolute;
  font-size: 12px;
  color: #3d6cc8;
  right: 0;
  bottom: 0;
}
.resault-content-header {
  font-size: 14px;
  line-height: 14px;
  padding-left: 20px;
  font-weight: normal;
  background: url(../assets/img/header/tearm-h-ico.png) no-repeat left center;
}
.team-resault-content p {
  font-size: 12px;
  line-height: 24px;
  padding-left: 20px;
}
.team-search-type {
  float: right;
  color: #fff;
  padding-right: 6px;
  background: #3d6cc8;
}

.team-search-type strong {
  padding: 0 16px;
  font-weight: normal;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
}

/* 搜索结果 begin*/
.search-result {
  position: absolute;
  width: 328px;
  top: 40px;
  left: 82px;
  z-index: 20;
}
.search-result .ivu-row {
  line-height: 30px;
}
.result-num {
  text-align: center;
  letter-spacing: 6px;
  cursor: default;
}
.result-num em {
  cursor: pointer;
}
.result-more {
  text-align: right;
  font-size: 12px;
}
/* 搜索结果end */

/*吸顶导航样式*/
#navFix {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 300;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  animation: navMove 0.5s;
  background: #fff;
  margin-top: 0;
  margin-bottom: 0;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: center;
}
@keyframes navMove {
  0% {
    top: -60px;
  }
  100% {
    top: 0;
  }
}
.fix-logo {
  display: none;
}
#navFix .fix-logo {
  display: inline-block;
  margin-right: 50px;
}
.fix-logo img {
  width: 140px;
  vertical-align: middle;
}
#layout >>> span:nth-child(1) {
  color: #515a6e;
  cursor: pointer;
}
.user >>> span:nth-child(1) {
  color: #515a6e;
  cursor: pointer;
}

/* role-tag */
#role-tag {
  margin-left: 3px;
  margin-right: -15px;
}
#role-tag >>> .ivu-badge-count {
  transform: scale(0.8);
  padding: 0 10px;
}
</style>