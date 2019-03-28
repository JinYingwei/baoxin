<template>
<section>
    <div class="cost">
        <p class="money">
            <span>账户余额</span>
            <!-- <span>隐藏金额</span> -->
        </p>
        <ul class="accountList">
            <li>{{teamMoneyInfo.money}} <span>元</span></li>
            <li class="bg" @click="jump">充 值</li>
            <li class="bg" @click="draw">提 现</li>
            <!-- <li class="bg">转 账</li> -->
            <!-- <li>查看</li> -->
        </ul>
        
    </div>
   
    <Table :columns="columns1" :data="data1"></Table>
    <Page :total="totalNum" show-total @on-change="change"/>
</section>
</template>

<script>
export default {
    created() {
        this.getTeamMoneyInfo()
        this.gethistoryPay()
    },
    data() {
        return {
            teamMoneyInfo:[],   //团队余额、欠费金额、可提现金额数据
            historyPay:[],  //客户历史充值缴费记录数据
            page:1,
            totalNum:0,
            columns1: [{
                    title: '订单号 ',
                    key: 'out_trade_no'
                },
                {
                    title: '日期Age',
                    key: 'time_end'
                },
                {
                    title: '订单来源',
                    key: 'datasources'
                },
                {
                    title: '金额',
                    key: 'real_money'
                },
            ],
            data1: [
                // {
                //     "out_trade_no": "28bef6e672ea46c6855c744ac9a2a3f2", //订单号
                //     "datasources": 1,//数据来源：1 充值    2 活动   3代金券
                //     "real_money": 0.01,//实际缴费金额
                //     "pay_type": 1,//缴费方式：1 微信   2支付宝
                //     "id": "794ca13e1036417398192bc46a33ce51",//缴费历史ID
                //     "time_end": 20180827135151,//缴费时间
                //     "pay_method": "JSAPI",//缴费支付方式：SAPI--公众号支付、NATIVE--原生扫码支付、APP--app支付、MWEB--H5支付
                //     "pay_money": 0.01//应缴费金额
                // },
            ]
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
        //客户历史充值缴费记录数据
        gethistoryPay(page=1){
            this.$axios({
                method:'get',
                url:this.$GLOBAL.baseURL+'/api/pay/historyPay',
                params:{
                    page:page,
                    rows:10
                }
            }).then(result=>{
                console.log(result);
                this.data1 = result.data.data
                this.totalNum = result.data.totalNum  || 12
                this.data1.map(item=>{
                    item.datasources = this.swithType(item.datasources)
                    item.time_end = this.timeInfo(item.time_end)
                })
            }).catch(err=>{
                console.log(err);
            })
        },
        //判断数据类型
        swithType(val){
            switch (val) {
                case 1:
                    return '充值'
                    break;
                case 2:
                    return '活动'
                    break;
                case 3:
                    return '代金券'
                    break;
                default:
                    break;
            }
        },
        //时间拼接
        timeInfo(time){
            return String(time).substring(0,4)+'-'+String(time).substring(4,6)+'-'+String(time).substring(6,8)+' '+String(time).substring(8,10)+':'+String(time).substring(10,12)
        },
        //页码
        change(index){
            this.gethistoryPay(index)
        },
        //跳转到充值页面
        jump(){
            const {href} = this.$router.resolve({
                name:'TeamMoney'
            })
            window.open(href,'_blank')
        },
        //跳转到提现页面
        draw(){
            const {href} = this.$router.resolve({
                name:'TeamDrawMoney'
            })
            window.open(href,'_blank')
        }
    },
}
</script>

<style scoped>
.cost {
    font-size: 14px;
    margin-bottom: 25px;
}

.money span {
    margin-right: 10px;
}

.money span:last-child {
    color: #2b85e4;
    cursor: pointer;
}
/* .money span:last-child:hover,.accountList li:last-child:hover{
    text-decoration: underline;
} */
.accountList {
    overflow: hidden;
    margin-top: 20px;
}

.accountList li:first-child {
   color:#666;
   font-size: 24px;
}
.accountList li:first-child span{
    font-size: 14px;
}
.accountList li:not(:first-child) {
    cursor: pointer;
    font-size: 12px;
}

.accountList li {
    float: left;
    margin-right: 20px;
    line-height: 22px;
}

.accountList .bg {
    background: #f3f3f3;
    padding: 0 9px;
    border-radius: 2px;
    border: 1px solid #afafaf;
    font-weight: 700;
}

.accountList .bg:hover {
    background:#fff;
}

/* .accountList li:last-child {
    color: #2b85e4;
} */
.ivu-page{
    text-align: center;
    margin-top: 5px;
}
</style>
