window.onload = function () {

  // 判断微信内置浏览器
  function is_weixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
      return true;
     } else {
      return false;
    }
  }



  var baseURL = 'http://ii.sinelinked.com/tg_web';
  // 获取当前网站协议 进行 动态切换地址
    var locationProtocol = window.location.protocol
    if(locationProtocol === 'https:'){
        baseURL = 'https://ii.sinelinked.com/tg_web';
    }else{
        baseURL = 'http://ii.sinelinked.com/tg_web';
    }

  var errTip = document.querySelector('.err-tip')
  var layer = document.querySelector('.layer')
  var submit = document.querySelector('.submit')
  var roleType = sessionStorage.getItem('role') //过渡页已将用户类型存入session 1顾问 2团队

  var formWrap = document.getElementById('form-wrap')
  var formItemInputFirst = document.querySelector('input')
  var lastInput = formItemInputFirst;
  if(!is_weixin()){
    alert('请在微信内打开搜索"保信云顾问"公众号进行注册')
    return
  }

  formWrap.addEventListener('focus', function (e) {
    errTip.innerHTML = ''
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

  formWrap.addEventListener('blur', function (e) {
    var target = e.target
    if (target.nodeName.toLocaleLowerCase() === 'input') {
     if (!regPhone(formItemInput[0].value)) {
      errTip.innerHTML = '请输入正确的手机号码'
      return
    } else if (!regPas(formItemInput[1].value)) {
      errTip.innerHTML = '密码为6-16位,英文、数字或者常用字符'
      return
    } else if (formItemInput[1].value !== formItemInput[2].value) {
      errTip.innerHTML = '两次密码不一致'
      return
    } else {
      errTip.innerHTML = ''
    }
    }
  }, false)

  var formItemInput = document.querySelectorAll('#form-wrap input')

  // 获取验证码
  var authCode = document.querySelector('.auth-code')
  authCode.addEventListener('click', function () {
    if (!regPhone(formItemInput[0].value)) {
      errTip.innerHTML = '请输入正确的手机号码'
      return
    } else if (!regPas(formItemInput[1].value)) {
      errTip.innerHTML = '密码为6-16位,英文、数字或者常用字符'
      return
    } else if (formItemInput[1].value !== formItemInput[2].value) {
      errTip.innerHTML = '两次密码不一致'
      return
    } else {
      errTip.innerHTML = ''
    }

    axios({
      method: 'get',
      url: baseURL+"/api/user/isRegister",
      params: {
        phone: formItemInput[0].value,
        roleType: roleType || 1
      }
    }).then((result) => {
      if (result.data.code == 0) {

        if (result.data.data.isRegister == true) {
          layers('此手机号码已注册');
        } else {
          axios({
            method: 'get',
            url: baseURL+'/api/phone/message/send',
            params: {
              phone: formItemInput[0].value,
              flag: 'code_1'
            }
          }).then((result) => {
            if (result.data.code == 0) {
              layers('发送成功')
              submit.classList.remove('disabled')
              cutDown()
            }
          }).catch((err) => {
            layers('发送失败')
          });
        }
      }
    }).catch((err) => {
      // layer.msg('此手机号码已注册,请使用其它号码');
    });
  })

  var openId = sessionStorage.getItem('openid')
  var unionId = sessionStorage.getItem('unionid')

  // 注册提交
  submit.addEventListener('click', function () {
    axios({
        method: 'post',
        url: baseURL+"/api/user/register",
        data: {
          phone: formItemInput[0].value,
          password: formItemInput[1].value,
          verifyCode: formItemInput[3].value,
          type:roleType || 1,
          openId: openId,
          unionId: unionId
        }
      })
      .then(function (result) {
        console.log(result)
        if (result.data.code == 0) {
          console.log('注册成功')
          layers('注册成功');
          setInterval(function() {
            console.log('注册成功,跳转')
            // 自动登陆 跳转项目
            if(roleType == 1){
              location.href = 'http://ii.sinelinked.com/mobile/transition/?role=agent'
            }else{
              location.href = 'http://ii.sinelinked.com/mobile/transition/?role=team'
            }
          }, 3000)
        }
      })
      .catch(function (error) {
        console.log(error);
        layers(error.response.data.error);
      })
  })

  // 注册协议
  var gvrp = document.getElementById('gvrp')
  var gvrpWrap = document.querySelector('.gvrp-wrap')
  gvrp.addEventListener('click', function () {
    gvrpWrap.style.display = 'block'
  })

    // 注册协议关闭
    var close = document.getElementById('close')
    close.addEventListener('click', function () {
      gvrpWrap.style.display = 'none'
    })

  // layer
  function layers(tip) {
    layer.classList.add('show')
    layer.innerHTML = tip
    setTimeout(function () {
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
  // 倒计时
  function cutDown() {
    var sum = 120;
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