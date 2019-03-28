<template>
	<div>
		<van-tabbar v-model="selected">
			<van-tabbar-item icon="completed" :to="{name:'statistical'}">业务统计</van-tabbar-item>
			<van-tabbar-item icon="contact" :to="{name:'manage'}">成员管理</van-tabbar-item>
			<van-tabbar-item icon="discount" :to="{path:'/teamManage'}">团队管理</van-tabbar-item>
			<van-tabbar-item icon="edit" :to="{path:'/mine'}">团队中心</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
  name: "tabbar",
  data: function() {
    return {
      selected: 0
    };
  },
  methods: {
    //底部导航的处理
    changeTabBarActive() {
      var nowName = this.$route.name;
      var fullPath = this.$route.fullPath
      var fullPathItem = fullPath.split('/')
      switch (true) {
        case fullPathItem.includes('manage'):
          this.selected = 1;
          break;
        case fullPathItem.includes('teamManage'):
          this.selected = 2;
          break;
        case fullPathItem.includes('mine'):
          this.selected = 3;
          break;
      }
    }
  },
  '$route'(){
				this.changeTabBarActive()
			},
  created() {
    this.changeTabBarActive();
  }
};
</script>

<style scoped>
</style>
