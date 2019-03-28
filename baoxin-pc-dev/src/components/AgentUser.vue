<template>
  <div>
    <Modal v-model="getModal.isShow" width="430" @on-cancel="cancel">
      <div style="text-align:center">
        <!-- login -->
        <div v-show="getModal.type == 'login'" class="login-warp out-container">
          <div class="title">保险顾问登录</div>
          <div class="content">
            <Tabs v-model="activeTabName">
              <TabPane label="微信登录" name="name3">
                <div id="login_container">
                  <!-- <img class="wxCodeImg" src="../assets/img/wxCode.jpg" alt=""> -->
                </div>
              </TabPane>
              <TabPane id="test" label="密码登录" name="name1">
                <Form ref="formLogin" :model="formLogin" :rules="ruleLogin">
                  <FormItem prop="user">
                    <Input type="text" size="large" v-model="formLogin.user" placeholder="请输入用户名"></Input>
                  </FormItem>
                  <FormItem prop="password">
                    <Input type="password" size="large" v-model="formLogin.password" placeholder="请输入密码"></Input>
                  </FormItem>
                  <FormItem>
                    <Button type="primary" @click="handleSubmit('formLogin')" long size="large">登陆</Button>
                  </FormItem>
                </Form>
              </TabPane>
              <TabPane label='短信' name="name2">
                <Form ref="formLoginCode" :model="formLoginCode" :rules="ruleLoginCode">
                  <FormItem prop="user">
                    <Input type="text" size="large" v-model="formLoginCode.user" placeholder="请输入手机号码"></Input>
                  </FormItem>
                  <FormItem prop="verifyCode">
                    <Input size="large" type="text" v-model="formLoginCode.verifyCode" search @on-search="sendCode('code_2',formLoginCode.user)" :enter-button="authConLogin" id="authConLogin" placeholder="请输入验证码" />
                  </FormItem>
                  <FormItem>
                    <Button type="primary" @click="handleSubmitCode('formLoginCode')" long size="large">登陆</Button>
                  </FormItem>
                </Form>
              </TabPane>
            </Tabs>
          </div>
          <div class="content point-tag">
            <a @click="handlshowRegister">立即注册</a>
            <a @click="forget">忘记密码</a>
          </div>
          <p class="toTeam">
            <div class="toTeamLogin" @click="toTeamLogin">团队登陆
              <Icon type="md-arrow-forward" />
            </div>
          </p>
        </div>
        <!-- register -->
        <div v-show="getModal.type == 'register'" class="register-warp out-container">
          <div class="title">保险顾问注册</div>
          <div class="content">
            <br>
            <p class="register-tip">请关注"晟联保信"公众号进行注册</p>
            <div class="qrCodeBox">
              <img src="../assets/img/header/erweima.jpg" alt="" srcset="">
            </div>
          </div>
           <br>
          <div class="content point-tag">
            <a @click="handlshowLogin">立即登陆</a>
          </div>
        </div>

      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getLoginQrCode();
  },
  computed: {
    getModal() {
      return this.$store.state.showAgentUser;
    }
  },
  data() {
    // 手机号验证
    const validPhone = (rule, value, callback) => {
      if (!this.$GLOBAL.isPhone(value)) {
        callback(new Error("用户名为手机号码"));
      }
      callback();
    };

    // 注册密码验证
    const validatePass = (rule, value, callback) => {
      if (this.formRegister.passwdCheck !== "") {
        // 对第二个密码框单独验证
        this.$refs.formRegister.validateField("repassword");
      }
      callback();
    };
    // 注册二次密码验证
    const validatePassCheck = (rule, value, callback) => {
      if (value !== this.formRegister.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    return {
      activeTabName:'name3',
      modal_loading: false,
      modal: true,
      authConLogin: "发送验证码",
      // 密码登陆
      formLogin: {
        user: "",
        password: ""
      },
      // 密码登陆规则
      ruleLogin: {
        user: [{ required: true, validator: validPhone, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { type: "string", min: 6, message: "密码最少为6位", trigger: "blur" }
        ]
      },
      // 验证码登陆
      formLoginCode: {
        user: "",
        verifyCode: ""
      },
      // 难证码规则
      ruleLoginCode: {
        user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      },
      // 帐户注册
      formRegister: {
        user: "",
        password: "",
        repassword: "",
        verifyCode: ""
      },
      // 帐户注册验证
      ruleRegister: {
        user: [{ required: true, validator: validPhone, trigger: "blur" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        repassword: [{ validator: validatePassCheck, trigger: "blur" }],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    cancel() {
      this.$store.commit("showAgentUser", { isShow: false });
    },
    // 提交问题
    handleSubmit(name) {},
    // 跳转团队登陆
    toTeamLogin() {
      this.$store.commit("showAgentUser", { isShow: false });
      this.$store.commit("showTeamUser", { isShow: true, type: "login" });
      this.$store.commit("loginInfo", {type: 'team',isLogin: false,});
    },
    // 获取登陆二维码
    getLoginQrCode() {
      // 获取当前网站协议 进行 动态切换地址
      var locationProtocol = window.location.protocol
      var baseURL = 'http://ii.sinelinked.com'
      if(locationProtocol === 'https:'){
          baseURL = 'https://ii.sinelinked.com';
      }else{
          baseURL = 'http://ii.sinelinked.com';
      }
      var activeUrl = baseURL+location.pathname+"?roleType=1"
      var obj = new WxLogin({
        self_redirect: false,
        id: "login_container",
        appid: "wx77a3be2b980f9c1c",
        scope: "snsapi_login",
        redirect_uri: encodeURI(activeUrl),
        state: "",
        style: "",
        href: ""
      });
    },
    // 密码登陆
    handleSubmit(name) {
      var _this = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$axios({
            method: "get",
            url: this.$GLOBAL.baseURL + "/api/user/login",
            params: {
              loginType: 1,
              roleType: 1,
              phone: this.formLogin.user,
              password: this.formLogin.password
            }
          })
            .then(result => {
              if (result.data.code == 0) {
                this.$Message.success("登陆成功");
                
                // 设置cookie
                this.$GLOBAL.cookie.set(
                  result.data.data.cookie.name,
                  result.data.data.cookie.value
                );
                // 检查本地存储是否有顾问姓名
                var agentName = localStorage.getItem('agentName')
                this.$store.commit("loginInfo", {
                  type: "agent",
                  isLogin: true,
                  phone: agentName || this.formLogin.user,
                  cookie:result.data.data.cookie.value
                });

                // 存储登录信息
                sessionStorage.setItem(
                  "isLogin",
                  JSON.stringify({
                    type: "agent",
                    isLogin: true,
                    phone: agentName || this.formLogin.user
                  })
                );

                // 登陆成功后跳转顾问页面
                this.$store.commit("showAgentUser", { isShow: false });
                setTimeout(function() {
                  _this.$router.push("/mangeAgent");
                }, 1000);
              } else {
                this.$Message.error(result.data.error);
              }
            })
            .catch(err => {
              console.log(err.response.data);
              this.$Message.error(err.response.data.error);
            });
        } else {
          this.$Message.error("登陆失败");
        }
      });
    },
    // 验证码登陆
    handleSubmitCode(name) {
      var _this = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$axios({
            method: "get",
            url: this.$GLOBAL.baseURL + "/api/user/login",
            params: {
              loginType: 2,
              roleType: 1,
              phone: this.formLoginCode.user,
              verifyCode: this.formLoginCode.verifyCode
            }
          })
            .then(result => {
              if (result.data.code == 0) {
                this.$Message.success("登陆成功");
                // 设置cookie
                this.$GLOBAL.cookie.set(
                  response.data.data.cookie.name,
                  response.data.data.cookie.value
                );
                 // 检查本地存储是否有顾问姓名
                var agentName = localStorage.getItem('agentName')
                this.$store.commit("loginInfo", {
                  type: "agent",
                  isLogin: true,
                  phone: agentName || this.formLogin.user,
                  cookie:result.data.data.cookie.value
                });
                // 登陆成功后跳转顾问页面
                this.$store.commit("showAgentUser", { isShow: false });
                setTimeout(function() {
                  _this.$router.push("/mangeAgent");
                }, 1000);
              } else {
                this.$Message.error(result.data.error);
              }
            })
            .catch(err => {
              this.$Message.error(err.response.data.error);
            });
        } else {
          this.$Message.error("登陆失败");
        }
      });
    },
    // 发送验证码
    sendCode(flag, val) {
      if (!this.$GLOBAL.isPhone(val)) {
        this.$Message.error("请输入正确的手机号码");
        return;
      }

      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/phone/message/send",
        params: {
          phone: val,
          flag: flag
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            this.$Message.info("验证码发送成功");
            this.cutDown(10, "authConLogin");
          }
        })
        .catch(err => {
          this.$Message.error("验证码发送失败");
        });
    },
    // 注册
    handleSubmitRggister(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url: this.$GLOBAL.baseURL + "/api/user/register",
            data: {
              phone: this.formRegister.user,
              password: this.formRegister.password,
              verifyCode: this.formRegister.verifyCode,
              type: 1
            }
          })
            .then(result => {
              if (result.data.code == 0) {
                this.$Message.success("Success!");
              }
            })
            .catch(err => {
              this.$Message.error(err.response.data.error);
            });
        } else {
          this.$Message.error("注册失败");
        }
      });
    },
    // 登陆，注册切换
    handlshowLogin() {
      this.$store.commit("showAgentUser", { isShow: true, type: "login" });
    },
    handlshowRegister() {
      this.$store.commit("showAgentUser", { isShow: true, type: "register" });
    },
    // 忘记密码提醒
    forget() {
      this.activeTabName = 'name2'
    },
    // 验证码倒计时
    cutDown(max, target) {
      // 防止重复点击
      this.$nextTick(function() {
        document.querySelector(".ivu-input-search").style.pointerEvents =
          "none";
      });
      var _this = this;
      var num = max;
      var timer;
      timer = setInterval(function() {
        num--;
        if (num <= 0) {
          _this[target] = "发送验证码";
          document.querySelector(".ivu-input-search").style.pointerEvents =
            "auto";
          clearInterval(timer);
          return;
        }
        _this[target] = num + " 重新发送";
      }, 1000);
    }
  }
};
</script>

<style scoped>
.event-none {
  pointer-events: none;
}
.out-container {
  padding-bottom: 20px;
  background: #fff;
}
.out-container .title {
  width: 380px;
  margin: 0 auto;
  height: 62px;
  line-height: 62px;
  text-align: center;
  font-size: 16px;
  color: #3d6cc8;
  font-weight: bold;
  cursor: default;
  border-bottom: 2px solid #3d6cc8;
}
.out-container .content {
  width: 294px;
  margin: 0 auto;
}
.out-container .contentTab {
  font-size: 16px !important;
}
.out-container .content .ivu-tabs-nav-container {
  font-size: 16px !important;
}

.content >>> .ivu-tabs-nav .ivu-tabs-tab {
  font-size: 16px;
  border-radius: 6px;
  color: #3d6cc8;
  padding: 4px 16px;
  margin-right: 0;
}
.content >>> .ivu-tabs-nav .ivu-tabs-tab:last-child{
  display: none
}
.content >>> .ivu-tabs-nav-scroll {
  display: flex;
  justify-content: center;
}
.content >>> .ivu-tabs-bar {
  border: none;
  margin-top: 8px;
}
.content >>> .ivu-tabs-nav .ivu-tabs-tab-active {
  color: #fff;
  background: #3d6cc8;
}
.content >>> .ivu-tabs-ink-bar {
  height: 0;
}
.content >>> .ivu-tabs-nav .ivu-tabs-tab:active {
  color: #fff;
}

.point-tag {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 10px;
}
.point-tag strong {
  font-weight: normal;
}
.toTeam {
  width: 280px;
  margin: 0 auto;
  padding: 20px 10px 0 10px;
}
.toTeam a {
  color: #494949;
  vertical-align: middle;
  text-decoration: underline;
  line-height: 20px;
  padding-bottom: 3px;
  margin-bottom: 3px;
}
.toTeamLogin {
  cursor: pointer;
}
.qrCodeBox img{
  width: 100%;
}
.register-tip{
  line-height: 30px;
  color: #2d8cf0;
}
</style>