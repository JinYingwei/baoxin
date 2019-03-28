<template>
  <div id="app" :class="{pb:tabbarShow}">
    <van-nav-bar v-show="!tabbarShow"  :title="headerTitle" left-text="返回" right-text="首页" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <router-view id="main" />
    <tabbar v-show="tabbarShow"></tabbar>
  </div>
</template>

<script>
// 底部导航t
import tabbar from "@/components/tabbar";
export default {
  name: "App",
  data: function() {
    return {
      headerTitle: "接单",
      tabbarShow:true
    };
  },
  watch: {
    $route(to, from) {
      var nowName = this.$route.name;
      var rootMenu = ['learn','practiceMenu','takeOrder','message','mineMenu']
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
  components: {
    tabbar
  },
  created() {

  },
  mounted() {
    this.$nextTick(function() {
       document.getElementById("app").style.display = "block";
      setTimeout(()=>{
         document.getElementById("boot").style.display = "none";
      },300)
     
    });
  }
};
</script>

<style>
html,
body {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  min-height: 100%;
  background: #f9f9f9;
  scroll-behavior: smooth;
}
em,
i {
  font-style: normal;
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.van-tabbar {
  height: 60px;
}
.center {
  width: 95%;
  margin: 0 auto;
}
.shadow-box {
  padding: 14px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  margin-top: 14px;
  margin-bottom: 14px;
}

/* // 金秋活动 */
.qinqiuMain {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 20;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.qinqiuMain img {
  width: 80%;
}
.closeTag {
  position: absolute;
  font-size: 0.533333rem /* 40/75 */;
  color: #fff;
  top: 0.4rem /* 30/75 */;
  right: 0.4rem; /* 30/75 */
}
.closeTag span {
  font-size: 0.266667rem /* 20/75 */;
  opacity: 0.8;
}
</style>
