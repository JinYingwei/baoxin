<template>
  <div class="client">
    <!-- 标签栏 -->
    <van-tabs v-show="tabShow" v-model="activeTabIndex" @change="getTabIndex" color="#4e8cee" swipeable>
      <van-tab title='今日待办'></van-tab>
      <van-tab title='客户管理'></van-tab>
    </van-tabs>

    <transition name="move">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
export default {
  created() {
    this.hiddenTab();
  },
  watch: {
    $route(to, from) {
      this.hiddenTab();
    }
  },
  data() {
    return {
      tabShow: true,
      activeTabIndex: "0" //顶部当前激活的标签索引
    };
  },
  methods: {
    // 隐藏不不需要顶部tab的页面
    hiddenTab() {
      var routeName = this.$route.name;
      var hiddenArr = ["addVisit", "clientList", "addClient"];
      if (hiddenArr.includes(routeName)) {
        this.tabShow = false;
      } else {
        this.tabShow = true;
      }
    },
    // 标签索引与标题
    getTabIndex(index, title) {
      switch (title) {
        case "今日待办":
          this.$router.push({ name: "agenda" });
          break;
        case "客户管理":
          this.$router.push({ name: "clientManage" });
          break;
        default:
          this.$router.push({ name: "agenda" });
          break;
      }
    }
  }
};
</script>

<style scoped>
  /* .move-enter-active, .food .move-leave-active {
    transition: all 0.5s linear;
    transform: translate3d(0, 0, 0);
  }
  .move-enter, .food .move-leave {
    transform: translate3d(100%, 0, 0);
  } */
</style>