<template>
    <div id="agent">
        <div class="center agentWrap">
            <div class="leftBar">
                <h4 class="_title">顾问中心</h4>
                <Menu id="leftMenu" active-name='1-1'>
                    <MenuItem :to="{path:'/mangeAgent'}" name="1-1">需求信息</MenuItem>
                    <MenuItem :to="{name:'OrderHistory'}" name="1-2">接单历史</MenuItem>
                    <MenuItem :to="{name:'Myteam'}" name="1-3">我的团队</MenuItem>
                    <MenuItem :to="{name:'Message'}" name="1-4">我的消息</MenuItem>
                    <MenuItem :to="{name:'Crm'}" name="1-5">客户管理</MenuItem>
                    <MenuItem :to="{name:'Userinfo'}" name="1-6">个人信息</MenuItem>
                    <MenuItem :to="{name:'DataShare'}" name="1-7">资料分享</MenuItem>
                    <!-- <MenuItem name="1-7">产品管理</MenuItem> -->
                    <MenuItem :to="{name:'Money'}" name="1-8">充值/缴费</MenuItem>
                </Menu>
            </div>
            <router-view id="agent-main"></router-view>
        </div>
    </div>
</template>

<script>
export default {
  
};
</script>

<style scoped>
#agent {
  background: #f5f5f5;
  padding-top: 16px;
  padding-bottom: 16px;
}
.agentWrap {
  display: flex;
}
.leftBar {
  margin-right: 30px;
  border-radius: 6px;
  position: relative;
  z-index: 6;
}
.leftBar ._title {
  text-align: center;
  line-height: 60px;
  background: #fff;
  font-size: 16px;
  border-bottom: 1px solid #e1e1e1;
}
#leftMenu {
  text-align: center;
}
#agent-main {
  width: 100%;
  background: #fff;
  padding: 20px 40px;
  border-radius: 6px;
  overflow: hidden;
}
a:hover{
  background: #f0f7ff;
}
.ivu-menu{
  padding-bottom: 10px;
}
</style>