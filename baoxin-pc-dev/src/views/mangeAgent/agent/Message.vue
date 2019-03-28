<template>
    <div>
        <div class="public-title">团队消息</div>
        <div class="team-msg">
            <ul class="msg-list">
                <li v-for="(item,index) in userMsg" :key="index">
                    <Icon type="md-volume-up" size="18"/>
                    <div class="notification-body">
                        【{{ item.teamName }}】 <a>{{ item.content }}</a>
                    </div>
                    
                    <p class="notification-time">{{ $GLOBAL.timeFormat(item.publishTime) }}</p>
                </li>
            </ul>
            <Page v-if="totalNum" :total="totalNum" show-total @on-change="change"/>    
            <img v-else  class="null" src="../../../assets/img/null.png">
        </div>
    </div>
</template>

<script>
export default{
    created() {
        this.getUserMsg()
    },
    data(){
        return{
            userMsg:'',
            totalNum:1
        }
    },
    methods:{
        getUserMsg(page){
            this.$axios({
                method:'get',
                url:this.$GLOBAL.baseURL+'/api/user/getUserMsg',
                params:{
                    page:page
                }
            }).then(result =>{
                if(result.data.code===0){
                    this.userMsg = result.data.data.items
                    this.totalNum = result.data.data.totalNum
                }
                
            }).catch(err => {
                this.$Notice.error({title: "消息提示",desc:err.response.data.error});
            });
        },
        change(page){
            this.getUserMsg(page)
        }
    }
}
</script>

<style scoped>
    .msg-list li{
        margin-bottom: 12px;
        font-size: 14px;
        border-bottom: 1px dashed #ddd;
    }
    .msg-list li p{
        line-height: 30px;
    }
    .notification-body{
        display: inline-block;
    }
    .msg-list >>>.ivu-icon-md-close{
        float: right;
        color: #f00;
        cursor: pointer;
        border:1px solid #f00;
        border-radius: 50%;
    }
    .ivu-page{
        text-align: center;
    }
</style>
