window.onload = function () {

  var baseURL = 'http://ii.sinelinked.com/tg_web';
// 获取当前网站协议 进行 动态切换地址
  var locationProtocol = window.location.protocol
  if(locationProtocol === 'https:'){
      baseURL = 'https://ii.sinelinked.com/tg_web';
  }else{
      baseURL = 'http://ii.sinelinked.com/tg_web';
  }

  // 获取指定url参数
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

var role = GetQueryString('role') //登陆角色

if(role){
  if(role == 'agent'){
    role = 1;
    sessionStorage.setItem('role',1)
  }else if(role == 'team'){
    role = 2
    sessionStorage.setItem('role',2)
  }
}

  // cookie操作
var Cookie = {
  set: function (key, val) { //设置cookie方法
    var date = new Date(); //获取当前时间
    date.setTime(date.getTime() + 30 * 60 * 1000); //格式化为cookie识别的时间
    document.cookie = key + "=" + val + ";expires=" + date.toGMTString() + ";path=/"; //设置cookie
  }
}

  var errTip = document.querySelector('.err-tip')
  var layer = document.querySelector('.layer')
  var submit = document.querySelector('.submit')
  var roleType = sessionStorage.getItem('role') || 1 //过渡页已将用户类型存入session 1顾问 2团队

  var formWrap = document.getElementById('form-wrap')
  var formItemInputFirst = document.querySelector('input')
  var lastInput = formItemInputFirst;

  var formItemInput = document.querySelectorAll('#form-wrap input')
  var accountPhoneInput = document.querySelector('.accountPhone input')
  var passwordItemInput = document.querySelector('.passwordItem input')
  var authCodeItemInput = document.querySelector('.authCodeItem input')

  var forget = document.querySelector('.forget')
  var authCodeItem = document.querySelector('.authCodeItem')
  var passwordItem = document.querySelector('.passwordItem')
  var authCode = document.querySelector('.authCode')
  var accountLogin = document.querySelector('.accountLogin')


  

var loginType = 'account' //登陆方式 account帐号密码  authCode验证码

  // 如果本地有登陆用户名
var loginUserName = localStorage.getItem('loginUserName')
if(loginUserName){
  accountPhoneInput.value = loginUserName
}

  formWrap.addEventListener('focus', function (e) {
    var target = e.target
    lastInput.className = ''
    if (target.nodeName.toLocaleLowerCase() === 'input') {
      target.className = 'focus'
      lastInput = target
      // 处理移动端键盘遮挡
      var inputTextBox = this;
      docmentScollResize()
      function docmentScollResize() {
        setTimeout(function () {
            inputTextBox.scrollIntoView(true);
        },100)
     }
    }

  }, true)



  // 验证手机号
  accountPhoneInput.addEventListener('input', function () {
    if(this.value.length >= 11){
      if (!regPhone(accountPhoneInput.value)) {
        errTip.innerHTML = '请输入正确的手机号码'
        return
      }else{
        errTip.innerHTML = ''
        if (regPhone(accountPhoneInput.value) && regPas(passwordItemInput.value)) {
          submit.classList.remove('disabled')
        }else{
          submit.classList.add('disabled')
        }
      }
    }
  })
  accountPhoneInput.addEventListener('blur', function () {
    if (!regPhone(accountPhoneInput.value)) {
      errTip.innerHTML = '请输入正确的手机号码'
      return
    }else{
      errTip.innerHTML = ''
      if (regPhone(accountPhoneInput.value) && regPas(passwordItemInput.value)) {
        submit.classList.remove('disabled')
      }else{
        submit.classList.add('disabled')
      }
    }
  })
    // 验证密码
    passwordItemInput.addEventListener('input', function () {
      if (!regPhone(accountPhoneInput.value)) {
        errTip.innerHTML = '请输入正确的手机号码'
      }else if(this.value.length>=6){
        if (!regPas(passwordItemInput.value)) {
          errTip.innerHTML = '密码6-20位,英文、数字或者常用字符'
        }else{
          errTip.innerHTML = ''
          submit.classList.remove('disabled')
        }
      }else{
        errTip.innerHTML = '密码6-20位,英文、数字或者常用字符'
        submit.classList.add('disabled')
      }
    })

    // 验证码
    authCodeItemInput.addEventListener('input', function () {
      if (!regPhone(accountPhoneInput.value)) {
        errTip.innerHTML = '请输入正确的手机号码'
      }else if(!authCodeItemInput.value){
        errTip.innerHTML = '请输入验证码'
      }else{
        errTip.innerHTML = ''
        submit.classList.remove('disabled')
      }
    })

    // 忘记密码按钮
    forget.children[0].addEventListener('click',function(){
      loginType = 'authCode'
      layers('请使用手机验证码登陆');
      authCodeItem.style.display = 'block'
      passwordItem.style.display = 'none'
      forget.style.display = 'none'
      accountLogin.style.display = 'block'
    })
    // 帐号密码按钮
    accountLogin.children[0].addEventListener('click',function(){
      loginType = 'account'
      layers('请使用帐号密码登陆');
      authCodeItem.style.display = 'none'
      passwordItem.style.display = 'block'
      forget.style.display = 'block'
      accountLogin.style.display = 'none'
    })

    // 发送验证码
    authCode.addEventListener('click',function(){
      sendPhoneCode(accountPhoneInput.value)
    })

  // 提交
  submit.addEventListener('click', function () {
    var params = {}
    if(loginType == 'account'){
      params = {
          loginType: 1,
          roleType:roleType || 1,
          phone: accountPhoneInput.value,
          password: passwordItemInput.value,
      }
    }else if(loginType == 'authCode'){
      params = {
        loginType: 2,
        roleType:roleType || 1,
        phone: accountPhoneInput.value,
        verifyCode: authCodeItemInput.value,
    }
    }
    axios({
        method: 'get',
        url: baseURL+"/api/user/login",
        params: params
      })
      .then(function (result) {
        if (result.data.code == 0) {
          Cookie.set(result.data.data.cookie.name,result.data.data.cookie.value)
          // 存储登陆用户名，记住用户名
          localStorage.setItem('loginUserName',accountPhoneInput.value)
          layers('登录成功');
          if(roleType == 1){
            location.href = 'http://ii.sinelinked.com/mobile/agent/#/'
          }else{
            location.href = 'http://ii.sinelinked.com/mobile/team/#/'
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        layers(error.response.data.error);
      })
  })


  // layer
  var timer;
  function layers(tip) {
    clearTimeout(timer)
    layer.classList.add('show')
    layer.innerHTML = tip
    timer = setTimeout(function () {
      layer.classList.remove('show')
    }, 2000)
  }

  /* Reg */
  // 验证手机号
  function regPhone(val) {
    var myreg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
    if (!myreg.test(val)) {
      return false
    } else {
      return true
    }
  }
  // 验证密码
  function regPas(val) {
    var myreg = /^(\w){6,20}$/ //'密码只能输入6-20个字母、数字、下划线'
    if (!myreg.test(val)) {
      return false
    } else {
      return true
    }
  }
  // 发送验证码
  function sendPhoneCode(phone){
    if(!regPhone(phone)){
      layers('手机号码不正确');
      return
    }
    axios({
      method:'get',
      url: baseURL+"/api/phone/message/send",
      params: {
        phone: phone,
				flag: 'code_2'
      }
    }).then((result) => {
      if(result.data.code == 0){
        layers('发送成功');
        settime(authCode)
      }
    }).catch((err) => {
      layers(err.response.data.error);
    });
  }

		//发送验证码倒计时
		var countdown = 120;
		function settime(obj) {
			if (countdown == 0) {
				obj.classList.remove("disabled");
				obj.innerText = "验证码";
				countdown = 90;
				return;
			} else {
				obj.classList.add("disabled");
				obj.innerText = "重新发送(" + countdown + ")";
				countdown--;
			}
			setTimeout(function () {
				settime(obj)
			}, 1000)
		}

}