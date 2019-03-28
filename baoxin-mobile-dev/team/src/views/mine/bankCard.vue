<template>
  <div class="bankCard" v-show="renderer">
    <div class="bankCardList" v-if="hasCard">
      <ul>
        <li>
          <div class="bankIcon">
            <i class="iconfont icon-yinxing-copy"></i>
          </div>
          <div class="bankName">
            <strong>{{ bankCard.bankName }}</strong>
            <span>储蓄卡</span>
          </div>
          <div class="bankNumber" v-if="bankCard">
            **** *** ***** {{ bankCard.bankAccount.substring(bankCard.bankAccount.length-4) }}
          </div>
          <div class="delBankBt">
            <van-button plain @click="deleteBankCard" size="mini">删除</van-button>
          </div>
        </li>
      </ul>
      <div class="tips">
        <van-icon name="info-o" />
        <p>银行卡只能绑定一个，如需更换银行卡，请删除原先绑定银行卡，重新绑定。</p>
      </div>
    </div>
    <div v-else>
      <div class="center">
        <h3 class="shareTitle">添加卡号</h3>
        <van-cell-group>
          <van-field @blur="auth(bankAccount,'bankAccountError')" :error-message='bankAccountError' placeholder="请输入银行卡号" type='number' required label="银行卡号" v-model="bankAccount" />
          <van-field @click="bankPickerShow = true" placeholder="请选择开户行" readonly required label="开户行" :error-message='bankNameError' v-model="bankName" />
          <van-field @blur="auth(depositBank,'depositBankError')" placeholder="请输入开户支行" required label="开户支行" :error-message='depositBankError' v-model="depositBank" />
          <van-field @blur="auth(accountHolderName,'accountHolderNameError')" placeholder="请输入开户人" required label="开户人" :error-message='accountHolderNameError' v-model="accountHolderName" />
          <van-field @blur="validateIdCard(holderIdCard)" placeholder="请输入身份证号" required label="身份证号" :error-message='holderIdCardError' v-model="holderIdCard" />
          <van-field @blur="auth(holderPhone,'holderPhoneError')" placeholder="请输入手机号" required label="手机号" :error-message='holderPhoneError' v-model="holderPhone" />
          <van-field v-model="verifyCode" required center clearable label="验证码" placeholder="短信验证码">
            <van-button slot="button" @click="sendCode" :disabled='codeDisabled' size="small" type="default">{{ codeBtnTxt }}</van-button>
          </van-field>
        </van-cell-group>

      </div>
      <div class="btnSubmit">
        <van-button :disabled='isClick' @click="addBankCard" size="large">确定</van-button>
      </div>
      <div class="tips">
        <van-icon name="info-o" />
        <p>银行卡只能绑定一个，如需更换银行卡，请删除原先绑定银行卡，重更新绑定。</p>
      </div>
    </div>
    <!-- 银行选择器 -->
    <van-picker id="bank-picker"
      v-show="bankPickerShow"
      show-toolbar
      title="选择银行"
      :columns="columns"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
export default {
  created() {
    this.getBankCard();
    this.getBanks()
  },
  data() {
    return {
      renderer:false,
      hasCard: true, //是否已有银行卡
      bankAccount: "", //银行卡号
      bankAccountError: "",
      bankName: "", //银行名称
      bankCode:"",//银行代码
      depositBank:'',//开启行，支行
      depositBankError:'',
      bankNameError: "",
      accountHolderName: "", //开启姓名
      accountHolderNameError: "",
      holderIdCard: "", //身份证号
      holderIdCardError: "",
      holderPhone: "", //手机号
      holderPhoneError: "",
      verifyCode: "", //验证码verifyCode
      isClick: true,
      codeDisabled: false,
      codeBtnTxt: "发送",
      bankCard: '', //银行卡数据，
      banks:[],//银行数据
      columns: [],//银行数据
      bankPickerShow:false,//显示银行选择器

    };
  },
  methods: {
    // 添加银行卡
    addBankCard() {
      this.axios({
        method: "post",
        url: baseURL + "/api/team/addBankCard",
        data: {
          bankAccount: this.bankAccount, //银行卡号
          bankCode:this.bankCode,//银行代码
          bankName: this.bankName, //银行名称
          depositBank:this.depositBank,//开启行（支行）
          accountHolderName: this.accountHolderName, //开启姓名
          holderIdCard: this.holderIdCard, //身份证号
          holderPhone: this.holderPhone, //手机号
          verifyCode: this.verifyCode
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            this.$toast.success("添加成功");
            this.getBankCard();
            this.hasCard = true;
          }
        })
        .catch(err => {});
    },
    // 团队银行卡列表获取
    getBankCard() {
      this.axios({
        method: "get",
        url: baseURL + "/api/team/getBankCard"
      })
        .then(result => {
          this.renderer = true
          if (result.data.data.length) {
            this.hasCard = true;
            this.bankCard = result.data.data[0];
          } else {
            this.hasCard = false;
          }
        })
        .catch(err => {});
    },
    // 团队删除银行卡
    deleteBankCard() {
      this.$dialog
        .confirm({
          title: "删除提示",
          message: "请确认是否删除本张银行卡"
        })
        .then(result => {
          this.axios({
            method: "post",
            transformRequest: [
              function(data) {
                let ret = "";
                for (let it in data) {
                  ret +=encodeURIComponent(it) +"=" +encodeURIComponent(data[it]) +"&";
                }
                return ret;
              }
            ],
            url: baseURL + "/api/team/deleteBankCard",
            data: {
              id: this.bankCard.id
            }
          })
            .then(result => {
              if (result.data.code == 0) {
                this.$toast.success('删除成功');
                this.hasCard = false;
              }
            })
            .catch(err => {
              this.$toast.fail('删除失败');
            });
        })
        .catch(err => {});
      return;
    },
    // 选择银行完成
     onConfirm(value, index) {
       this.bankName = value
       this.bankCode = this.banks[index].bankCode
       this.bankPickerShow = false
       this.auth(this.bankName,'bankNameError')
    },
    // 选择银行取消
    onCancel() {
       this.bankPickerShow = false
       this.auth(this.bankName,'bankNameError')
    },
    // 获取提现银行列表
    getBanks(){
      this.axios({
        method:'get',
        url: baseURL + "/api/money/getBanks",
      }).then((result) => {
        if(result.data.code == 0){
          this.banks = result.data.data.bankList
          this.columns = this.banks.map((item)=>{
            return item.bankName
          })
        }
      }).catch((err) => {
        
      });
    },
    // 必填验证
    auth(value, err, event) {
      if (!value) {
        this[err] = "请正确输入此项内容..";
      } else {
        this[err] = "";
      }
    },
    validateIdCard(idCard) {
      //15位和18位身份证号码的正则表达式
      var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

      //如果通过该验证，说明身份证格式正确，但准确性还需计算
      if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
          var idCardWi = new Array(
            7,
            9,
            10,
            5,
            8,
            4,
            2,
            1,
            6,
            3,
            7,
            9,
            10,
            5,
            8,
            4,
            2
          ); //将前17位加权因子保存在数组里
          var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
          var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
          for (var i = 0; i < 17; i++) {
            idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
          }

          var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
          var idCardLast = idCard.substring(17); //得到最后一位身份证号码

          //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
          if (idCardMod == 2) {
            if (idCardLast == "X" || idCardLast == "x") {
              this.holderIdCardError ="";
               return true;
            } else {
              this.holderIdCardError ="身份证号码错误！";
               return false;
            }
          } else {
            //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
            if (idCardLast == idCardY[idCardMod]) {
              this.holderIdCardError ="";
               return true;
            } else {
               this.holderIdCardError ="身份证号码错误！";
              return false;
            }
          }
        }else{
          this.holderIdCardError ="";
          return true;
        }
      } else {
         this.holderIdCardError ="身份证格式不正确";
        return false;
      }
    },
    // 发送验证码
    sendCode() {
      var cutDown = 10;
      var timer;
      var phone = this.holderPhone;
      var myreg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
      if (!myreg.test(phone)) {
        this.$toast.fail("请输入正确的手机号");
        return false;
      }

      this.axios({
        method: "get",
        url: baseURL + "/api/phone/message/send",
        params: {
          phone: this.holderPhone,
          flag: "code_11"
        }
      })
        .then(result => {
          this.$toast("发送成功");
          this.codeDisabled = true;
          this.isClick = false;
          timer = setInterval(() => {
            cutDown--;
            this.codeBtnTxt = cutDown;
            if (cutDown <= 0) {
              clearInterval(timer);
              this.codeBtnTxt = "发送";
              this.codeDisabled = false;
            }
          }, 1000);
        })
        .catch(err => {
          this.$toast("发送失败");
        });
    }
  },
  computed: {
    authVal(value) {
      return "value";
    }
  }
};
</script>

<style scoped>
.center {
  margin-top: 0.533333rem /* 40/75 */;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  padding: 0.346667rem /* 26/75 */ 0.533333rem /* 40/75 */;
  background: #fff;
  border-radius: 0.16rem; /* 12/75 */
  box-sizing: border-box;
}
.bankCardList ul {
  min-height: 70vh;
}
.bankCard {
  min-height: 90vh;
  /* background: #f2f2f2; */
  box-sizing: border-box;
  /* padding-top: 0.533333rem 40/75; */
  overflow: hidden;
}

/* tips */
.tips {
  width: 80%;
  margin: 0 auto;
  margin-top: 0.8rem /* 60/75 */;
  display: flex;
}
.tips p {
  margin-top: 0;
}
.bankCard .van-button--default {
  width: 90%;
  background-color: #4e8cee;
  color: #fff;
  border: none;
  letter-spacing: 3px;
}
.bankCard .van-button--disabled {
  /* background-color: #e8e8e8;
    color: #999; */
  opacity: 0.6;
}
.tips .van-icon-info-o::before {
  vertical-align: middle;
  padding-right: 6px;
  color: #ff8a8a;
}
.btnSubmit {
  margin-top: 0.533333rem /* 40/75 */;
  text-align: center;
}
.btnSubmit .van-button--primary {
  width: 40%;
  background: #4e8cee;
  border: none;
  margin: 0 auto;
}
.bankCardList ul {
  margin: 0 auto;
  width: 8.96rem /* 672/75 */;
}
.bankCardList li {
  width: 8.96rem /* 672/75 */;
  height: 3.56rem /* 267/75 */;
  background: url(../../assets/img/card-bg.jpg) no-repeat;
  background-size: cover;
  position: relative;
  padding-left: 2.133333rem /* 160/75 */;
  box-sizing: border-box;
}
.bankCardList .bankIcon {
  width: 1.333333rem /* 100/75 */;
  height: 1.333333rem /* 100/75 */;
  background: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 1.333333rem /* 100/75 */;
  color: #0f3193;
  position: absolute;
  top: 0.48rem /* 36/75 */;
  left: 0.44rem /* 33/75 */;
}
.bankCardList .bankIcon .iconfont {
  font-size: 0.8rem; /* 60/75 */
}
.bankCardList .bankName {
  padding-top: 0.48rem /* 36/75 */;
  box-sizing: border-box;
  color: #fff;
}
.bankCardList .bankName strong {
  padding-top: 0.133333rem /* 10/75 */;
  display: block;
  font-size: 0.4rem /* 30/75 */;
}
.bankCardList .bankName span {
  display: block;
  font-size: 0.266667rem /* 20/75 */;
  opacity: 0.8;
}
.bankCardList .bankNumber {
  color: #fff;
  font-size: 0.533333rem /* 40/75 */;
  position: absolute;
  top: 2.4rem /* 180/75 */;
}
.bankCardList .delBankBt {
  /* width: 1.333333rem 100/75; */
  /* height: .56rem 42/75; */
  top: 0.48rem /* 36/75 */;
  right: 0.533333rem /* 40/75 */;
  position: absolute;
}
.bankCardList .van-button--default {
  background: none;
  border: 1px solid #fff;
  width: 1.546667rem /* 116/75 */;
  padding: 0;
}
#bank-picker{
  width: 100%;
  position: fixed;
  bottom: 0
}
</style>