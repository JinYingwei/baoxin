<template>
  <div id="app">
    <div class="snow-mask"></div>
    <Header></Header>
		
    <router-view />
		
    <Bottom></Bottom>
    <BackTop></BackTop>
    <Consulting></Consulting>
    <AgentUser></AgentUser>
    <TeamUser></TeamUser>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Bottom from "@/components/Bottom";
// 咨询弹框
import Consulting from "./components/Consulting";
// 注册登陆弹框
import TeamUser from "./components/TeamUser";
import AgentUser from "./components/AgentUser";

export default {
  name: "App",
  watch:{
    "$route"(to,from){
      // console.log(to);
    }
  },
  created(){
    var wxCode = this.parseUrl(location.href).code
    var roleType = this.parseUrl(location.href).roleType
    if(wxCode){
      this.$axios({
        method:'get',
        url: this.$GLOBAL.baseURL+'/api/wx/callback',
        params:{
        code:wxCode,
        type:roleType,
        loginType:'pc'
      }
      }).then((result) => {
        if(result.data.code == 0){
        var loginInfo = result.data.data
        sessionStorage.setItem('openid',loginInfo.wxUserInfo.openid)
        sessionStorage.setItem('unionid',loginInfo.wxUserInfo.unionid)
        if(loginInfo.cookie){this.$GLOBAL.cookie.set(loginInfo.cookie.name,loginInfo.cookie.value)}
           // 自动登陆 跳转项目
            if(roleType == 1){
              // 存储登录信息
                this.$store.commit("loginInfo", {type: "agent",isLogin: true,phone: loginInfo.wxUserInfo.nickname});
                this.$router.push({path:'/mangeAgent'})
            }else if(roleType == 2){
              // 存储登录信息
                this.$store.commit("loginInfo", {type: "team",isLogin: true,phone: loginInfo.wxUserInfo.nickname});
                this.$router.push({path:'/mangeTeam'})
            }
        }
      }).catch((err) => {
        
      });
    }
  },
  methods: {
    parseUrl(url) {
      return this.$GLOBAL.parseUrl(url)
    }
  },
  components: {
    Header,
    Bottom,
    Consulting,
    AgentUser,
    TeamUser
  }
};
</script>

<style>
em,
i {
  font-style: normal;
}
ul,
li,
ol,
li {
  list-style: none;
}
.center {
  width: 1200px;
  margin: 0 auto;
}
.clearfix:after {
  content: " ";
  display: block;
  line-height: 0;
  height: 0;
  visibility: hidden;
  clear: both;
}
.public-title {
  font-size: 15px;
  line-height: 40px;
  margin-bottom: 10px;
  cursor: default;
}
.public-title::before {
  content: "";
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3d6cc8;
}
.null {
  display: block;
  margin: 0 auto;
  padding: 40px 0;
  /* display: none; */
}
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  background-color: #eaeaea;
  border-left: 1px solid #ccc;
}
::-webkit-scrollbar-thumb {
  background-color: #ccc;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #aaa;
}
::-webkit-scrollbar-thumb:active {
  background-color: #333;
}
.topBar {
  padding-left: 20px;
  height: 45px;
  line-height: 45px;
  background: #3d6cc8;
  color: #fff;
}
/* snow-mask */
.snow-mask{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: url(http://ii.sinelinked.com/miniProgramAssets/snow1.png),url(http://ii.sinelinked.com/miniProgramAssets/snow2.png);
	pointer-events: none;
	animation: 10s snow linear infinite;
  z-index: 1000;
}
@keyframes snow{
	0%{
		background-position: 0 0,0 0;
	}
	100%{
		background-position: 500px 500px,1000px 650px;
	}
}
</style>
