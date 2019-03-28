window.onload = function(){
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        
        on:{
            init: function(){
                swiperAnimateCache(this); //隐藏动画元素 
                swiperAnimate(this); //初始化完成开始动画
            }, 
            slideChangeTransitionEnd: function(){ 
                swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
            } 
        }
    })     
	
	  //把url后面的参数解析成对象
		function parseUrl(url){		
			var reg=/(\w+)=(\w+)/ig;
			var result={};
			
			url.replace(reg,function(a,b,c){
				result[b]=c;
			});
			
			return result;
		}
		
	var type = parseUrl(location.href).type || ''
	var value = ''
	switch (type){
		case 'china':
		value = ''
			break;
		case 'japan':
		value = '日本'
			break;
		case 'korea':
		value = '韩国'
			break;
		case 'singapore':
		value = '新加坡'
			break;
		case 'pension':
		value = '赴日养老院介护人才派遣'
			break;
		default:
			break;
	}
	   
	var shareConfig = {}
	let currentUrl = window.location.href;
	axios({
			method: "get",
			url: "http://ii.sinelinked.com/tg_web/api/cms/shareArt",
			params: {
				url: currentUrl
			}
		})
		.then((result) => {
			if (result.data.code == 0) {
				shareConfig = result.data.data
				share(shareConfig)
			}
		}).catch((err) => {
	
		});
		   
		   // 分享
		   function share(data) {
		   	var that = this;
			console.log(data);
		   	wx.config({
		   		debug: false,
		   		// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		   		appId: "wxe606548e5709ce55", // 必填，公众号的唯一标识
		   		timestamp: data.timestamp, // 必填，生成签名的时间戳
		   		nonceStr: data.nonce_str, // 必填，生成签名的随机串
		   		signature: data.sha1Data, // 必填，签名，见附录1
		   		jsApiList: [
		   			"onMenuShareTimeline",
		   			"onMenuShareAppMessage",
		   			"updateAppMessageShareData"
		   		] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		   	});
		   
		   	wx.ready(function () {
				
				wx.onMenuShareAppMessage({
					title: '出国劳务-项目介绍-'+value, // 分享标题
					desc: '出国劳务-韩国、日本、新加坡...', // 分享描述
					link: currentUrl,
					imgUrl: "http://ii.sinelinked.com/lib/img/hezuo.png",  // 分享图标
					success: function () {
					  // 设置成功
					  // alert("转发成功1");
					}
					});


				wx.updateAppMessageShareData({ 
					title: '出国劳务-项目介绍-'+value, // 分享标题
					desc: '出国劳务-韩国、日本、新加坡...点击进入了解详情', // 分享描述
					link: currentUrl,
					imgUrl: "http://ii.sinelinked.com/lib/img/hezuo.png",  // 分享图标
					success: function () {
					  // 设置成功
					  // alert("转发成功2");
					}
				})
	
		   	});
		   
		   	wx.error(function (res) {
		   		alert("微信验证失败");
		   		alert(JSON.stringify(res));
		   	});
		   }
	   
		//音乐开关
		let audio_btn = document.getElementById('audio_btn'),
				 bgm = document.getElementById('media'),
				 onOff = true;

		(function(){
				document.addEventListener("WeixinJSBridgeReady", function() {
					bgm.play();
					// bgm.pause();
				})
		})();

		//点击音乐btn
		audio_btn.addEventListener('click',function(){
			if(onOff){
				bgm.pause();
				onOff = false;
				audio_btn.className = ''
			}else{
				bgm.play();
				audio_btn.className = 'rotate'
				onOff = true
			}
		})

}
