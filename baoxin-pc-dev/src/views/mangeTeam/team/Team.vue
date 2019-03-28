<template>
    <div id="agent">
        <div class="center agentWrap">
            <div class="leftBar">
                <h4 class="_title">团队中心</h4>
                <Menu id="leftMenu" active-name='nameType' @on-select="selName">
                    <MenuItem :to="{path:'/MangeTeam'}" name="1-1">业务统计</MenuItem>
                    <MenuItem :to="{name:'Members'}" name="1-2">成员管理</MenuItem>
                    <!-- <MenuItem :to="{name:'TeamManage'}" name="1-3">团队管理</MenuItem> -->
                    <Submenu name="5">
                        <template slot="title">
                            <Icon type="ios-paper" />
                            团队管理
                        </template>
                        <!-- <MenuItem name="1-7">红包</MenuItem>
                        <MenuItem name="1-11">收费</MenuItem> -->
                        <MenuItem :to="{name:'TeamDataShare'}" name="1-8">资料分享</MenuItem>
                        <MenuItem :to="{name:'TeamMessage0'}" name="1-20"  >消息通知</MenuItem>
                    </Submenu>
                     <Submenu name="6">
                        <template slot="title">
                            <Icon type="logo-yen" />
                            费用管理
                        </template>
                        <MenuItem :to="{name:'AccountBalance'}" name="1-7">账户余额(元)</MenuItem>
                        <MenuItem :to="{name:'BankCard'}" name="1-4">银行卡</MenuItem>
                    </Submenu>
                    <MenuItem :to="{name:'TeamUserinfo'}" name="1-5">团队中心</MenuItem>
                     
                    <!-- <MenuItem name="1-8">意见反馈</MenuItem> -->
                </Menu>
            </div>
            <router-view id="agent-main"></router-view>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.selName()
    },
    data(){
        return{
            nameType:'1-1'
        }
    },
    methods: {
        selName(name){
            this.nameType = name
            console.log(this.nameType);
        }
    },
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
.leftBar{
    margin-right: 30px;
    border-radius: 6px;
    position: relative;
    z-index: 6;
}
.leftBar ._title{
    text-align: center;
    line-height: 60px;
    background: #fff;
    font-size: 16px;
    border-bottom: 1px solid #e1e1e1
}
#leftMenu{
    text-align: center;
}
#agent-main{
    width: 100%;
    background: #fff;
    padding: 20px 40px;
    border-radius: 6px;
    overflow: hidden;
}
>>>.ivu-menu a:hover{
    background: #f0f7ff;
}
</style>