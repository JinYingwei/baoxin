<template>
<Row>
    <Col span="10" offset="6">
        <!-- 已绑定银行卡 -->
        <section v-if="bankCard.length>0">
            <h3>银行卡</h3>
            <div class="cardWrap">
                <div class="top">
                    <div class="pic"><img src="../../../assets/img/house.png"></div>
                    <div class="box">
                        <h4>{{bankCard[0].bankName}}</h4>
                        <!-- <p>储蓄卡</p> -->
                    </div>
                    <div class="del" @click="deleteBankCard"><span>删 除</span></div>
                </div>
                <p class="cardNo">**** *** ***** {{bankCard[0].bankAccount.substring(bankCard[0].bankAccount.length-4)}}</p>
            </div>
             
            <div class="caveat">
                <img src="../../../assets/img/warn.png" >
                <p>银行卡只能绑定一个，如需更换银行卡，请删除原先绑定银行卡，重新绑定。</p>
            </div>
        </section>
        <!-- 添加绑定银行卡 -->
        <section v-else>
            <h3>添加卡号</h3>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="真实姓名" prop="name">
                    <Input v-model="formValidate.name" placeholder="" style="width:220px"></Input>
                </FormItem>
                <FormItem label="身份证号" prop="idCard">
                    <Input v-model="formValidate.idCard" placeholder="" style="width:220px"></Input>
                </FormItem>
                <FormItem label="银行卡号" prop="bankCard">
                    <Input v-model="formValidate.bankCard" placeholder="" style="width:220px"></Input>
                </FormItem>
                <FormItem label="开户行" prop="bank">
                    <Select v-model="formValidate.bank" style="width:220px" @on-change="selectBank">
                            <Option 
                                :value="item.bankCode"
                                v-for="(item,index) in bankList" :key="index"
                            >
                                {{item.bankName}}
                            </Option>
                        </Select>
                </FormItem>
                <FormItem label="开户支行" prop="supBank">
                    <Input v-model="formValidate.supBank" placeholder="" style="width:220px"></Input>
                </FormItem>
                <FormItem label="手机号码" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="" style="width:220px"></Input>
                </FormItem>
                <FormItem label="验证码" prop="cation" id="cation">
                    <Input v-model="formValidate.cation" placeholder="" style="width:220px"></Input>
                    <Button type="primary" size="small" @click="clickHandle">发 送</Button>
                </FormItem>
                <FormItem>
                    <Button size="large" type="warning" @click="handleSubmit('formValidate')">确 定</Button>
                </FormItem>
            </Form>
        </section>
    </Col>
</Row>
</template>

<script>
export default {
    data() {
        return {
            formValidate: {
                name: '',
                idCard: '',
                bankCard: '',
                phone: '',
                cation: '',
                bank: '',
                supBank: ''
            },
            bankList: [], //开户行数据
            bankCode: '', //
            bankName: '', //哪个银行
            bankCard:[],  //存绑定的银行卡
            bankCardId:'', //存绑定的银行卡ID
            addBankCard:[], //点击绑定银行卡
            ruleValidate: {
                name: [{
                    required: true,
                    message: '姓名不能为空',
                    trigger: 'blur'
                }],
                idCard: [{
                    required: true,
                    message: '身份证号不能为空',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    min: 18,
                    message: '身份证号有误',
                    trigger: 'blur'
                }],
                bankCard: [{
                    required: true,
                    message: '银行卡号不能为空',
                    trigger: 'blur'
                }],
                bank: [{
                    required: true,
                    message: '开户行不能为空',
                    trigger: 'blur'
                }],
                supBank: [{
                    required: true,
                    message: '开户支行不能为空',
                    trigger: 'blur'
                }],
                phone: [{
                    required: true,
                    message: '手机号不能为空',
                    trigger: 'blur'
                }],
                cation: [{
                    required: true,
                    message: '验证码不能为空',
                    trigger: 'blur'
                }],
            }
        }
    },
    created() {
        this.getBanks()
        this.getBankCard()
    },
    methods: {
        //发送验证码
        clickHandle() {
            if (!(/^1[34578]\d{9}$/.test(this.formValidate.phone))) {
                this.$Message.error("手机号码有误，请重填");
                return false;
            }
            this.$axios({
                method: 'get',
                url: this.$GLOBAL.baseURL + '/api/phone/message/send',
                params: {
                    phone: this.formValidate.phone,
                    flag: 'code_11'
                }
            }).then(result => {
                this.$Message.success('发送成功')
            }).catch(err => {
                this.$Message.error('不要频繁向同一个手机号发送短信')
            })
        },
        //获取提现银行列表
        getBanks() {
            this.$axios({
                method: 'get',
                url: this.$GLOBAL.baseURL + '/api/money/getBanks'
            }).then(result => {
                this.bankList = result.data.data.bankList
            }).catch(err => {
                console.log(err)
            })
        },
        //绑定银行卡
        handleSubmit() {
            if (!this.formValidate.bankCard || !this.bankCode || !this.bankName.bankName || !this.formValidate.supBank || !this.formValidate.name || !this.formValidate.idCard || !this.formValidate.phone || !this.formValidate.cation) {
                this.$Message.error('输入框不能为空')
                return
            }
            this.$axios({
                method: 'post',
                url: this.$GLOBAL.baseURL + '/api/team/addBankCard',
                data: {
                    bankAccount: this.formValidate.bankCard, //银行卡卡号
                    bankCode: this.bankCode, //选中银行的code
                    bankName: this.bankName.bankName, //选中的银行名称
                    depositBank: this.formValidate.supBank, //开户行
                    accountHolderName: this.formValidate.name, //姓名
                    holderIdCard: this.isCardNo(this.formValidate.idCard), //身份证
                    holderPhone: this.formValidate.phone, //手机号
                    verifyCode: this.formValidate.cation //验证码
                }
            }).then(result=>{
                //this.addBankCard = result.data.data
                console.log(result);
                this.getBankCard()
                this.$Message.success('绑定成功')
            }).catch(err=>{
                this.$Message.error('验证码有误')
            })
        },
        //选择银行卡
        selectBank(code) {
            this.bankCode = code
            this.bankName = this.bankList.find(item => {
                return item.bankCode == code
            })
        },
        //匹配身份证号
        isCardNo(card) {
            // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (reg.test(card) === false) {
                this.$Message.error("身份证输入不合法");
                return;
            }
            return card
        },
        //团队银行卡列表获取
        getBankCard(){
            this.$axios({
                method:'get',
                url:this.$GLOBAL.baseURL+'/api/team/getBankCard'
            }).then(result=>{
                this.bankCard = result.data.data
                console.log( this.bankCard);
                // this.bankCardId = this.bankCard.id
                //console.log( this.bankCard);
            }).catch(err=>{
                console.log(err);
            })
        },
        //删除银行卡
        deleteBankCard(){
            this.$axios({
                method:'post',
                url:this.$GLOBAL.baseURL+'/api/team/deleteBankCard',
                params:{
                    id: this.bankCard[0].id
                }
            }).then(result=>{
                this.$Message.success('已成功移除银行卡')
                this.getBankCard()
            }).catach(err=>{
                this.$Message.error('移除银行卡失败')
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
#cation {
    position: relative;
}

#cation .ivu-btn-primary {
    position: absolute;
    left: 172px;
    top: 5px;
}

h3 {
    text-align: center;
    margin-bottom: 5px;
}
.cardWrap{
    height: 150px;
    background: url(../../../assets/img/card-bg.jpg) no-repeat;
    background-size: 100% 100%;
}
.top{
    padding: 10px 10px 0 10px;
    overflow: hidden;
    position: relative;
}
.pic{
    width: 50px;
    height: 50px;
    float: left;
    border-radius: 50%;
    background: #fff;
    justify-content: center;
    display: flex;
    align-items: center;
}
.pic img{
   width: 80%;  
}
.box{
    float: left;
    margin-left: 10px;
    color: #fff;
    margin-top: 7px;
}
.box h4{
    font-weight: normal;
}
.box p{
    font-size: 12px;
}
.del{
    position: absolute;
    line-height: 20px;
    color:#fff;
    border: 1px solid #fff;
    right: 10px;
    padding: 0 10px;
    border-radius: 3px;
    cursor: pointer;
}
.cardNo{
    text-align: center;
    color:#fff;
    font-size:18px;
    margin-top: 45px;
}
.caveat{
    display: flex;
    margin-top: 100px;
    color: #999;
}

.caveat img{
    width: 30px;
    height: 30px;
}
</style>
