// 获取指定url参数
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

// cookie操作
var Cookie = {
  set: function (key, val) { //设置cookie方法
    var date = new Date(); 
    date.setTime(date.getTime() + 30 * 60 * 1000); 
    document.cookie = key + "=" + val + ";expires=" + date.toGMTString() + ";path=/"; 
  }
}
/* 
  顾问/团队入口链接
    - http://ii.sinelinked.com/mobile/transition/?role=agent 
    - http://ii.sinelinked.com/mobile/transition/?role=team 
  1、将role参数存入session以便其它其它页面调用识别角色 role:1 顾问  role：2 团队
*/
var wxCode = GetQueryString('code')
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


if (wxCode) {
  var roleType = sessionStorage.getItem('role')
  axios({
      url: 'https://ii.sinelinked.com/tg_web/api/wx/callback',
      method: 'get',
      params:{
        code:wxCode,
        type:roleType,
        loginType:'mobile'
      }
    })
    .then(result => {
      if(result.data.code == 0){
        var loginInfo = result.data.data
        sessionStorage.setItem('openid',loginInfo.wxUserInfo.openid)
        sessionStorage.setItem('unionid',loginInfo.wxUserInfo.unionid)
        if(loginInfo.cookie){Cookie.set(loginInfo.cookie.name,loginInfo.cookie.value)}
        if(loginInfo.needReg){
          location.href = 'http://ii.sinelinked.com/mobile/account/register/index.html'
        }else{
          if(loginInfo.loginType == 'account'){
            // 密码登陆 跳转项目
              location.href = 'http://ii.sinelinked.com/mobile/account/login/index.html'
          }else{
            // 自动登陆 跳转项目
            if(roleType == 1){
              location.href = 'http://ii.sinelinked.com/mobile/agent/#/'
            }else{
              location.href = 'http://ii.sinelinked.com/mobile/team/#/'
            }
            
          }
        }
      }
    })
    .catch(error => {
      // alert('系统错误')
      axios({
        url: 'https://ii.sinelinked.com/tg_web/api/wx/wxLogin',
        method: 'get',
      })
      .then(result => {
        var url = result.data.data.url;
        location.href = url;
        
      })
      .catch(error => {
  
      })
    })
} else {
  axios({
      url: 'https://ii.sinelinked.com/tg_web/api/wx/wxLogin',
      method: 'get',
    })
    .then(result => {
      var url = result.data.data.url;
      location.href = url;
      
    })
    .catch(error => {

    })
}
