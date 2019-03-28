<template>
  <div>
    <div class="shadow-box center">
      <van-radio-group v-if="loginType" v-model="loginType" @change="loginTypeHandle">
        <van-cell-group>
          <van-cell title="自动登陆" clickable @click="loginType = 'wxauto'">
            <van-radio name="wxauto" />
          </van-cell>
          <van-cell title="密码登陆" clickable @click="loginType = 'account'">
            <van-radio name="account" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="shadow-box center" v-show="loginType == 'account'">
      <h3>修改密码</h3>
      <van-cell-group>
        <p class="err-tip"></p>
        <form id="form-wrap">
          <label class="form-item"><input placeholder="请输入原密码" type="password"></label>
          <label class="form-item"><input placeholder="请输入新密码(6-16位,英文、数字或者常用字符)" type="password"></label>
          <label class="form-item"><input placeholder="确认密码" type="password"></label>
          <!-- <label id="auth-code-wrap" class="form-item"><input placeholder="请输入验证码" type="text"><a href="javascript:;" class="auth-code">获取验证码</a></label> -->
          <button type="button" class="submit disabled">立即提交</button>
        </form>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      loginType: "",//wxauto account
      phone:'',
    };
  },
  created(){
    var phone = this.$route.query.phone
    if(phone){
      this.phone = phone
    }
    this.getLoginType()
  },
  methods: {
    //获取用户当前优先登录方式 
    getLoginType(){
      this.axios({
        method:'get',
        url: baseURL+'/api/user/getLoginType',
      }).then((result) => {
        if(result.data.code == 0){
          this.loginType = result.data.data.loginType
        }
      }).catch((err) => {

      })
    },
    //登陆方式
    loginTypeHandle(val) {
      if(val == 'account'){
        this.modifyLoginType('account').then(result=>{
          this.$toast('将使用密码登陆');
        })
       
      }else{
        this.modifyLoginType('wxauto').then(result=>{
            this.$toast('将使用微信帐户自动登陆');
        })
      
       
      }
    },
    // 修改用户登录方式
    modifyLoginType(loginType){
      return new Promise((resolve,reject)=>{
        this.axios({
        method:'post',
        url: baseURL+'/api/user/modifyLoginType',
        data: {
          loginType:loginType
        }
      }).then((result) => {
        if(result.data.code == 0){
          resolve(result.data.code)
        }
      }).catch((err) => {
        reject()
      });
      })
    }
  },
  mounted() {
    var self = this
    var errTip = document.querySelector('.err-tip')
     var submit = document.querySelector('.submit')
    var formWrap = document.getElementById("form-wrap");
    var formItemInputFirst = document.querySelector("#form-wrap input");
    var lastInput = formItemInputFirst;
    formWrap.addEventListener("focus",function(e) {
        var target = e.target;
        lastInput.className = "";
        if (target.nodeName.toLocaleLowerCase() === "input") {
          target.className = "focus";
          lastInput = target;
        }
      },true);

    var formItemInput = document.querySelectorAll('#form-wrap input')
    // 获取验证码
    var authCode = document.querySelector('.auth-code')
    formItemInput[2].addEventListener('input', function () {
      if(!formItemInput[0].value){
        errTip.innerHTML = '请输入原密码'
      }else if (!regPas(formItemInput[1].value)) {
      errTip.innerHTML = '密码为6-20个字母、数字、下划线'
      submit.classList.add('disabled')
      return
    } else if (formItemInput[2].value !== formItemInput[1].value) {
      errTip.innerHTML = '两次密码不一致'
      submit.classList.add('disabled')
      return
    } else {
      errTip.innerHTML = ''
      submit.classList.remove('disabled')
    }

     })

     submit.addEventListener('click',function(){
       self.axios({
          method: 'post',
          url: baseURL+'/api/user/updateUserPwd',
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          },
          data: qs.stringify({
            oldpassword: formItemInput[0].value,
            password: formItemInput[1].value
          })
        }).then((result) => {
          if (result.data.code == 0) {
             self.$toast('修改成功');
             formItemInput[0].value = ''
             formItemInput[1].value = ''
             formItemInput[2].value = ''
          }
        }).catch((err) => {
          self.$toast(err.response.data.error);
        });
     })

      // 验证密码
    function regPas(val) {
      var myreg = /^(\w){6,20}$/ //'密码只能输入6-20个字母、数字、下划线'
      if (!myreg.test(val)) {
        return false
      } else {
        return true
      }
    }
    // 倒计时
    function cutDown() {
      var sum = 10;
      var timer = null;
      timer = setInterval(function () {
        sum--
        if (sum <= 0) {
          sum = 0
          clearInterval(timer)
          authCode.classList.remove('disabled')
          authCode.innerHTML = '重新发送';
        } else {
          authCode.classList.add('disabled')
          authCode.innerHTML = '重新发送(' + sum + ')';
        }
      }, 1000)
    }
  }

  
};
</script>

<style scoped>
/* form-item */
.form-item {
  line-height: 0.8rem;
  /* height: 0.8rem; */
  margin-top: 0.26rem;
  display: block;
}
.form-item input {
  width: 100%;
  line-height: 0.8rem;
  height: 0.8rem;
  display: block;
  padding-left: 0.04rem;
  border: none;
  border-bottom: 0.01rem solid #ebebeb;
  transition: 0.6s;
  outline: none;
}
.form-item input.focus {
  border-bottom-color: #4e8cee;
}
.submit {
  background: #4e8cee;
  width: 100%;
  height: 1.3rem;
  border: none;
  color: #fff;
  outline: none;
  display: block;
  margin: 0 auto;
  border-radius: .133333rem /* 10/75 */;
  margin-top: 0.9rem;
}
.disabled {
  opacity: 0.6;
  pointer-events: none;
}
.protocol {
  color: #fff;
  font-size: 0.24rem;
  text-align: center;
  line-height: 1.1rem;
}
.protocol a {
  text-decoration: none;
  color: #3e3e3e;
}
.err-tip {
  font-size: 0.24rem;
  color: red;
  height: 0.24rem;
}
#auth-code-wrap {
  position: relative;
}
.auth-code {
  font-size: 0.24rem;
  color: #4e8cee;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  text-decoration: none;
}
</style>