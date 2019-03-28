<template>
<div>
    <div class="public-title">发送给团队成员消息</div>
    <Form :model="formItem" :label-width="0">
        <FormItem>
            <Input v-model="formItem.textMessage" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="发送给你的团队成员消息..."></Input>
        </FormItem>
        <FormItem id="btnWrap">
            <Button @click="cancel">取消</Button>
            <Button @click="send" type="success" style="margin-left: 8px">发送</Button>
        </FormItem>
    </Form>
    <div class="public-title">团队消息</div>
    <div class="team-msg">
        <ul class="msg-list">
            <li v-for="(item,index) in teamMsg" :key="index">
                <Icon type="md-volume-up" size="18" />
                <div class="notification-body">
                    <!-- 【{{ item.title }}】  -->
                    <a>{{ item.content }}</a>
                </div>

                <p class="notification-time">{{ $GLOBAL.timeFormat(item.publishTime) }}</p>
            </li>
        </ul>
        <img v-if="teamMsg.length == 0"  class="null" src="../../../assets/img/null.png">
        </div>
        <Page v-show="sum" :total="sum" show-total @on-change="pageChange" />
    </div>
</template>

<script>
export default {
    created() {
        this.getTeamMsg()
    },
    data() {
        return {
            teamMsg: '',
            sum: 0,
            page: 1,
            formItem: {
                textMessage: ''
            }
        }
    },
    methods: {
        getTeamMsg(page = '1') {
            this.$axios({
                method: 'get',
                url: this.$GLOBAL.baseURL + '/api/user/getTeamManageMsg',
                params: {
                    //startTime: startTime,
                    page: page
                }
            }).then(result => {
                this.teamMsg = result.data.data.items
                this.sum = result.data.data.totalNum
            }).catch(err => {
                this.$Notice.error({
                    title: "消息提示",
                    desc: err.response.data.error
                });
            });
        },
        pageChange(sum) {
            this.getTeamMsg(sum)
        },
        cancel() {
            this.formItem.textMessage = ''
        },
        send() {
            if (!this.formItem.textMessage) {
                this.$Message.error('消息不能为空');
            }
            this.$axios({
                method: 'post',
                url: this.$GLOBAL.baseURL + '/api/user/addTeamMsg',
                data: {
                    content: this.formItem.textMessage
                }
            }).then(result => {
                this.$Message.success('消息发送成功')
                this.getTeamMsg(this.page)
                this.formItem.textMessage = ''
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
.msg-list li {
    margin-bottom: 12px;
    font-size: 14px;
    border-bottom: 1px dashed #ddd;
}

.msg-list li p {
    line-height: 30px;
}

.notification-body {
    display: inline-block;
}

.msg-list>>>.ivu-icon-md-close {
    float: right;
    color: #f00;
    cursor: pointer;
    border: 1px solid #f00;
    border-radius: 50%;
}

.ivu-page {
    text-align: center;
}

>>>.ivu-input {
    min-height: 90px;
}

#btnWrap {
    text-align: right;
}
</style>
