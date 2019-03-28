<template>
    <div style="background:#fff;padding: 20px">
        <Card :bordered="true" >
           
            <p class="tit">账户可提取余额</p>
            <p slot="extra"><strong>{{teamMoneyInfo.extraMoney}}</strong> 元</p>
            <div class="bdBox">
                <p>提现金额</p>
                <p>￥ <Input v-model="value3" placeholder="输入需要提现的金额" style="width:300px;" /></p>
            </div>
            <RadioGroup v-model="vertical" vertical>
                <Radio label="1">
                    <Icon type="social-apple"></Icon>
                    <span>提现至微信钱包</span>
                </Radio>
                <Radio label="2">
                    <Icon type="social-android"></Icon>
                    <span>提现至银行卡</span>
                </Radio>
                <p class="btn">
                    <Button type="primary" @click="submit">提 交</Button>
                    <!-- <Button type="dashed" @click.native="annal">提现记录</Button> -->
                </p>
            </RadioGroup>
            <Table :columns="columns1" :data="data1"></Table>
        </Card>
        
    </div>
</template>

<script>

export default {
    created() {
        this.getTeamMoneyInfo()
        this.annal()
    },
    data(){
        return{
            vertical:'1',      //微信钱包\银行卡
            value3:'',  //提现值
            teamMoneyInfo:[], //团队余额\欠费金额\可提现金额
            page:1, //页码
            columns1:[
                {
                   title:'流水号',
                   key: 'serialNo'
                },
                {
                    title:'时间',
                    key:'createTime'
                },
                {
                    title:'金额',
                    key: 'money'
                },
                {
                    title:'状态',
                    key: 'status'
                },
            ],
            data1:[]
        }
    },
    methods: {
        //团队余额、欠费金额、可提现金额数据
        getTeamMoneyInfo(){
            this.$axios({
                method:'get',
                url:this.$GLOBAL.baseURL+'/api/money/getTeamMoneyInfo'
            }).then(result=>{
                this.teamMoneyInfo = result.data.data
                //console.log(this.teamMoneyInfo);
            }).catch(err=>{
                console.log(err);
            })
        },
        //提现
        submit(){
            if(this.value3<100){
                this.$Message.error('提取金额最少100起')
                return
            }
            this.$axios({
                method:'post',
                url:this.$GLOBAL.baseURL+'/api/money/withdraw',
                data:{
                    money:this.value3,
                    type:this.vertical
                }
            }).then(result=>{
                console.log(result);
            }).catch(err=>{
                this.$Message.error('没有可提现的余额')
            })
        },
        //提现记录
        annal(page=1){
            console.log(page);
            this.$axios({
                method:'get',
                url:this.$GLOBAL.baseURL+'/api/money/getTeamApplyRecord',
                params:{
                    page:page,
                    rows:10
                }
            }).then(result=>{
                this.data1 = result.data.data.items
                this.data1.map(item=>{
                    item.status = this.statusType(item.status)
                })
            }).catch(err=>{
                console.log(err);
            })
        },
        //提现状态1-申请中 2-提现成功 3-提现失败
        statusType(val){
            switch (val) {
                case 1:
                    return '申请中'
                case 2:
                    return '提现成功'
                case 3:
                    return '提现失败'
                default:
                    break;
            }
        }
    },
}
</script>

<style scoped>
.bdBox{
    border-top:1px solid #eee;
    border-bottom:1px solid #eee;
    padding-top: 10px;
}
p{
    padding-bottom: 14px;
}
.tit{
    color: #999;
}
strong{
    font-size: 18px;
}
>>>.ivu-input{
    border:none;
    border-bottom: 1px solid #dcdee2;
    border-radius: 0; 
}
>>>.ivu-input:focus{
    outline:none;
    border:0;
}
.btn{
    margin-top: 10px;
}
.ivu-radio-group{
    padding-top: 10px;
}
</style>
