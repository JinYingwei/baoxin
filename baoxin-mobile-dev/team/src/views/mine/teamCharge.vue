<template>
  <div class="charge">
    <div class="center">
      <div class="charge-info">
        <van-cell-group>
          <van-cell id='balance' title="账户余额 (元)" icon="points" :value="money > 0?money:arrearage==0?arrearage:'-'+ arrearage">
          </van-cell>
          <van-cell title="充值" icon="after-sale" :to="{name:'pay'}" is-link>
            <van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
          </van-cell>
          <van-cell title="提现" icon="sign" :to="{name:'tixian'}" is-link>
            <van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
          </van-cell>
          <van-cell title="银行卡" icon="idcard" :to="{name:'bankCard'}" is-link>
            <van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
          </van-cell>
          <van-cell title="收支记录" icon="records" :to="{name:'teamChargeHistory'}" is-link>
            <van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
          </van-cell>
        </van-cell-group>
      </div>
      <!-- <div class="charge-info">
        <div class="startCharge">
          <div class="left">
            <i class="iconfont icon-shoufei"></i>
            <div class="leftInfo">
              <strong>团队缴费</strong>
              <span class="openPayStats"><i class="iconfont" :class="teamInfo.paymentFunctionStatus == 0?'icon-tingzhi':'icon-chenggong'"></i>{{ teamInfo.paymentFunctionStatus == 0?'未启用':'已开启' }}</span>
            </div>
          </div>
          <div class="right">
            <van-button @click="showPayTypeWin" size="small" type="default">开启</van-button>
          </div>
        </div>
      </div> -->
      <!-- <div class="tips">
        <van-icon name="info-o" />
        <p> 团队缴费开启后，系统功能将全部提供给缴费的团队使用。</p>
      </div> -->
    </div>
    <!-- 缴费方式弹窗 -->
    <van-popup :close-on-click-overlay="false" v-model="payTypeShow">
      <van-radio-group id="payTypeRadio" v-model="payTypeRadio" @change="payTypeRadioChange">
        <van-radio name="1">
          <h4>预付费<span class="biaozhuan">({{ feeStandardTxt }})</span></h4>
          <br>
          <!-- <p>600元/月,半年付</p> -->
          <p id="preStandard"><van-slider :disabled="preStandardDisabled"  :step="50" v-model="preStandardVal" @change="onpreStandardChange" /></p>
          
        </van-radio>
        <van-radio name="2">
          <h4>后付费</h4>
          <p>按团队成员，{{ paymentStandard.standard }}元/人/日,每月1日收取上月费用，开启后次日可取消</p>
        </van-radio>
        
      </van-radio-group>
      <div class="btnWarp">
        <van-button @click="payTypeShow = false" class="cancelBtn" plain type="default">取消</van-button>
        <van-button class="enterBtn" @click="managerFeeOpen" type="default">确认</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  created() {
    this.getTeamMoneyInfo();
    this.getTeamInfo()
    // 获取收费标准
    this.getPaymentStandard();
  },
  data() {
    return {
      teamInfo:'',//团队缴费相关信息
      money: 0, //帐户余额
      arrearage: 0, //欠费金额
      paymentStandard: {}, //收费标准（后付费）
      feeStandard: {}, //收费标准（预付费）
      feeStandardTxt:'',//收费标准文本
      preStandardVal:0,//预付费slider值
      preStandardDisabled:true,//预付费slider是否可点击
      isMask: false,
      standardType:'PRE_PAYMENT_MONTH',//预付费缴费方式 默认月
      isOpen: 0, //缴费状态
      chargeSwitch: false,
      payTypeShow: false, //缴费方式弹窗
      payTypeRadio: "1" //缴费方式 1：预付费   2：后付费
    };
  },
  methods: {
    // 获取团队缴费信息、面向成员收费信息
    getTeamInfo(){
      this.axios({
        method:'get',
        url: baseURL+'/api/user/getTeamInfo',
      }).then((result) => {
        console.log(result);
        if(result.data.code == 0){
          this.teamInfo = result.data.data.teamInfo
          if(this.teamInfo.teamPayType){
            if(this.teamInfo.teamPayType == 'PRE'){
              this.payTypeRadio = '1'
              this.preStandardDisabled = false
            }else{
              this.payTypeRadio = '2'
            }
          }
        }
      }).catch((err) => {
        // this.teamInfo = err.response.data.data.teamInfo
        
      });
    },
    // 缴费方式开关
    payTypeRadioChange(name){
      if(name == 1){
        this.preStandardDisabled = false
      }else{
        this.preStandardDisabled = true
      }
    },
    // 缴费弹窗
    showPayTypeWin() {
      this.payTypeShow = !this.payTypeShow;
      this.getPaymentStandard(1)
      this.getPaymentStandard(2)
    },
    // 预付费slider
    onpreStandardChange(value){
      switch (value) {
        case 0:
          this.$toast('按月付费/' + this.feeStandard.PRE_PAYMENT_MONTH);
          this.standardType = 'PRE_PAYMENT_MONTH'
          this.feeStandardTxt = '月/'+this.feeStandard.PRE_PAYMENT_MONTH
          break;
        case 50:
          this.$toast('按半年付费/' + this.feeStandard.PRE_PAYMENT_HALF_YEAR);
           this.standardType = 'PRE_PAYMENT_HALF_YEAR'
           this.feeStandardTxt =  '半年/'+this.feeStandard.PRE_PAYMENT_HALF_YEAR
          break;
        case 100:
          this.$toast('按一年付费/' + this.feeStandard.PRE_PAYMENT_YEAR);
           this.standardType = 'PRE_PAYMENT_YEAR'
           this.feeStandardTxt =  '一年/'+this.feeStandard.PRE_PAYMENT_YEAR
          break;
        default:
          break;
      }
      
    },
    // 开启缴费
    managerFeeOpen() {
      // 1：预付费   2：后付费
      switch (this.payTypeRadio) {
        case '1':
        this.managerFeeClose().then((result) => {
          this.axios({
              method: "post",
              url: baseURL + "/api/team/managerFee/openPre",
              data:{
                standard:this.standardType
              }
            })
              .then(result => {
                if (result.data.code == 0) {
                  this.axios({
              method: "post",
              url: baseURL + "/api/team/managerFee/openPre",
              data:{
                standard:this.standardType
              }
            })
              .then(result => {
                if (result.data.code == 0) {
                  this.$toast("已开启预缴费模式");
                }
              })
              .catch(err => {
                Toast.fail(err.response.data.error);
              });
                  this.$toast("已开启预缴费模式");
                }
              })
              .catch(err => {
                Toast.fail(err.response.data.error);
              });
          }).catch((err) => {
            console.log(err);
          });

          
          break;
        case '2':
          this.axios({
            method: "post",
            url: baseURL + "/api/team/managerFee/open"
          })
            .then(result => {
              if (result.data.code == 0) {
                this.$toast("已开启后缴费模式");
              }
            })
            .catch(err => {
              Toast.fail(err.response.data.error);
            });
          break;
      
        default:
          break;
      }
      
    },
    // 获取收费标准
    getPaymentStandard(type) {
      // 1：预付费   2：后付费
      switch (type) {
        case 1: 
          this.axios({
            method: "get",
            url: baseURL + "/api/team/managerFee/getPaymentStandard"
          }).then(result => {
            if (result.data.code == 0) {
              this.paymentStandard = result.data.data;
            }
          });
          break;
        case 2:
          this.axios({
            method: "get",
            url: baseURL + "/api/team/managerFee/getFeeStandard"
          }).then(result => {
            if (result.data.code == 0) {
              this.feeStandard = result.data.data;
              this.feeStandardTxt = '月/'+this.feeStandard.PRE_PAYMENT_MONTH
            }
          });
          break;

        default:
          break;
      }
      if(this.teamInfo.teamPayType == 'SUF'){
          this.payTypeRadio = '2'
        }else if(this.teamInfo.teamPayType == 'PRE'){
          this.payTypeRadio = '1'
          this.preStandardDisabled = true
        }
    },
    // 关闭缴费
    managerFeeClose() {
      return new Promise((resolve,reject)=>{
          this.axios({
           method: "post",
           url: baseURL + "/api/team/managerFee/close"
        })
          .then(result => {
            if (result.data.code == 0) {
              resolve('已关闭缴费')
              // this.$toast("已关闭缴费");
            }
          })
          .catch(err => {
            reject('关闭缴费失败')
            // this.$toast("关闭缴费失败");
          });
      })
      
    },
    // 获取团队余额、欠费金额,缴费状态
    getTeamMoneyInfo() {
      this.axios({
        method: "get",
        url: baseURL + "/api/money/getTeamMoneyInfo"
      })
        .then(result => {
          if (result.data.code == 0) {
            this.money = result.data.data.money;
            this.arrearage = result.data.data.arrearage;
            this.isOpen = result.data.data.isOpen;
            if (this.isOpen == 1) {
              this.chargeSwitch = true;
            } else {
              this.chargeSwitch = false;
            }
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>

<style scoped>
.charge {
  min-height: 90vh;
  /* background: #f2f2f2; */
  box-sizing: border-box;
  padding-top: 0.533333rem /* 40/75 */;
  overflow: hidden;
}
.charge-info {
  margin-top: 0.2rem /* 15/75 */;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  padding: 0.346667rem /* 26/75 */ 0.533333rem /* 40/75 */;
  background: #fff;
  border-radius: 0.16rem; /* 12/75 */
}
/* teamBalance */
.teamBalance {
  text-align: center;
  padding: 0.4rem /* 30/75 */ 0;
}
.teamBalance span {
  display: block;
  font-size: 0.266667rem /* 20/75 */;
  color: #888888;
}
.teamBalance h4 {
  padding: 0;
  margin: 0;
  font-weight: normal;
  font-size: 0.933333rem /* 70/75 */;
  color: #333333;
  line-height: 1.466667rem /* 110/75 */;
}
.van-hairline--top-bottom::after {
  border: none;
}
/* tips */
.tips {
  width: 94%;
  margin: 0 auto;
  margin-top: 0.8rem /* 60/75 */;
  display: flex;
}
.tips p {
  margin-top: 0;
  color: #888888;
}
.tips .van-icon-info-o::before {
  vertical-align: middle;
  padding-right: 6px;
  color: #ff8a8a;
}
#balance >>> .van-cell__value span {
  font-size: 0.48rem /* 36/75 */;
  color: #4e8cee;
}
.startCharge {
  display: flex;
  justify-content: space-between;
}
.startCharge .icon-shoufei {
  color: #4e8cee;
  display: inline-block;
  vertical-align: middle;
  font-size: 0.8rem /* 60/75 */;
  padding-right: 0.133333rem /* 10/75 */;
}
.startCharge .icon-tingzhi {
  color: #ccc;
  font-size: 0.266667rem /* 20/75 */;
  padding-right: 0.066667rem /* 5/75 */;
}
.startCharge .leftInfo {
  display: inline-block;
  vertical-align: middle;
}
.startCharge .leftInfo strong {
  display: block;
}
.startCharge .van-button--default {
  /* width: 90%; */
  background-color: #4e8cee;
  color: #fff;
  border: none;
  letter-spacing: 3px;
}
.startCharge .van-button--disabled {
  opacity: 0.6;
}
.van-popup {
  border-radius: 0.266667rem /* 20/75 */;
}
#payTypeRadio {
  width: 7.2rem /* 550/75 */;
  /* height: 6.8rem 522/75; */
  box-sizing: border-box;
  padding: 0.8rem 0.426667rem /* 32/75 */;
  padding-top: 0.8rem /* 60/75 */;
  overflow: hidden;
}
#payTypeRadio >>> .van-radio__input {
  vertical-align: top;
}
#payTypeRadio h4,
#payTypeRadio p {
  margin: 0;
}
#payTypeRadio h4 {
  font-size: 0.4rem /* 30/75 */;
  font-weight: normal;
}
#payTypeRadio p {
  font-size: 0.32rem /* 24/75 */;
  color: #666;
}
#payTypeRadio >>> .van-radio__label {
  width: 80%;
}
#payTypeRadio >>> .van-radio {
  margin-bottom: 0.533333rem /* 40/75 */;
}
.btnWarp {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.066667rem /* 80/75 */;
}
.btnWarp >>> .van-button--normal {
  letter-spacing: 6px;
  padding: 0 20px;
}
.btnWarp >>> .cancelBtn {
  border-color: #4e8cee;
  color: #4e8cee;
}
.btnWarp >>> .enterBtn {
  border-color: #4e8cee;
  background: #4e8cee;
  color: #fff;
}
#payTypeRadio >>> .van-radio .van-icon-checked {
  color: #4e8cee;
}
#preStandard >>> .van-slider__button{
  background: #4e8dee;
}
#payTypeRadio >>> .van-radio{
  overflow: visible
}
.biaozhuan{
  padding-left:.16rem /* 12/75 */ ;
  font-size: .24rem /* 18/75 */;
  color: #666
}
.openPayStats {
  display: block;
  padding-top: .053333rem /* 4/75 */;
}
.openPayStats .icon-chenggong{
  color: #4e8cee;
  padding-top: .16rem /* 12/75 */;
  padding-right: .133333rem /* 10/75 */;
}
</style>