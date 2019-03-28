window.onload = function() {
    var userName = document.querySelector('.userName')
    var qrCode = document.querySelector('#qrCode')
    var userId = parseUrl(location.href).userId
   
    if(userId){
        axios({
            method:'get',
            url: 'http://ii.sinelinked.com/tg_web/api/XCX/agent/search',
            params: {
                agentId:userId
            }
        }).then((result) => {
            var data = result.data[0]
            userName.innerHTML = data.userName
            qrCode.src = data.qrCodePath
        }).catch((err) => {
            console.log(err);
        });
    }


    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical', // 垂直切换选项
        loop: false, // 循环模式选项

        on: {
            init: function() {
                swiperAnimateCache(this); //隐藏动画元素 
                swiperAnimate(this); //初始化完成开始动画
            },
            slideChangeTransitionEnd: function() {
                swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
            }
        }
    })

    var consult = document.getElementById('consult');
    consult.style.width = '13.54rem';
    consult.style.height = '20.16rem';
}