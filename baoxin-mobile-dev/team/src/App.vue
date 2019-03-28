<template>
	<div id="app" v-cloak  :class="{pb:tabbarShow}">
    <van-nav-bar v-show="!tabbarShow"  :title="headerTitle" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
		<router-view id="main"/>
		<tabbar v-show="tabbarShow"></tabbar>
	</div>
</template>

<script>
import bus from './components/eventBus.js'
// 底部导航t
import tabbar from "@/components/tabbar";
export default {
  name: "App",
  data() {
    return {
      headerTitle: "接单",
      tabbarShow:true
    };
  },
  components: {
    tabbar
  },
  watch: {
    $route(to, from) {
      var nowName = this.$route.name;
      var rootMenu = ['statistical','manage','teamManageMenu','menu']
      this.headerTitle = this.$route.meta.title
      if(rootMenu.includes(nowName)){
        this.tabbarShow = true
      }else{
        this.tabbarShow = false
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/");
    }
  },
  mounted() {
    bus.$on("upOne", (c) => {
      if(c){
        console.log(c);
        this.headerTitle = c
      }
    });
    // // 加载完成后，让组件显示，loading隐藏
    this.$nextTick(function () {
        document.getElementById("app").style.display = "block";
       document.getElementById("boot").style.display = "none";
    })
  },
};
</script>

<style>
[v-cloak] {
  display: none;
}
html,
body {
  position: relative;
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
}
#app {
  width: 100%;
  position: relative;
  left: 0;
  top: 0;
  padding-bottom: .533333rem /* 40/75 */;
}
#app.pb{
  padding-bottom: 70px;
}
#main {
  width: 100%;
  min-height: 87vh;
}
.van-tabbar {
  height: 60px;
}
.center {
  width: 94%;
  margin: 0 auto;
}
.shadow-box {
  padding: 14px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  margin-top: 14px;
  /* margin-bottom: 14px; */
}
#main {
  /* padding-top: .4rem 30/75; */
  box-sizing: border-box;
  /* margin-bottom: 80px; */
  overflow: hidden;
  padding-bottom: .266667rem /* 20/75 */;
}
.shareTitle{
  text-align: center
}
.van-nav-bar__title{
  max-width: 56%;
}
.nullTip{
  text-align: center;
  line-height: 60px;
}
</style>
