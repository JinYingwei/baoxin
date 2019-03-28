// 正式环境
var baseURL = 'http://ii.sinelinked.com/tg_web';
// 获取当前网站协议 进行 动态切换地址
var locationProtocol = window.location.protocol

if(locationProtocol === 'https:'){
    baseURL = 'https://ii.sinelinked.com/tg_web';
}else{
    baseURL = 'http://ii.sinelinked.com/tg_web';
}

// 未登录
function noLogin(targetUrl) {
	location.href = targetUrl;
}

