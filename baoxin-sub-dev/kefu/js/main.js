// selecter
function $(selecter) {
    return document.querySelector(selecter)
}

function $A(selecter) {
    return document.querySelectorAll(selecter)
}

// 选项切换
var option = $('.option')
var last = $('.option-items')
option.addEventListener('click', function (e) {
    var target = e.target;
    if (target.dataset.type == 'option') {
        last.classList.remove('active')
        target.classList.add('active')
        last = target
        $('.main-con .top-title').innerText = target.dataset.tip

        $('.main-con').classList.add('show')
    }
})


$('.open-tip').classList.add('show')


setTimeout(() => {
    $('.options-set').classList.add('show')
}, 600);



var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
// 输入咨询内容后判断是否关闭软键盘
$('.main-con textarea').addEventListener('focus', function () {
    $('.main-con textarea').classList.remove('error')
    window.addEventListener('resize', function () {
        var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if (clientHeight > nowClientHeight) {
            //键盘弹出的事件处理

        } else {
            //键盘收起的事件处理
            $('.contact').classList.add('show')
            var advisoryContentVal = $('#advisoryContent').value
            if (!advisoryContentVal) {
                $('.main-con textarea').classList.add('error')
            }
        }
    })
    $('.main-con textarea').addEventListener('blur', function () {
        //软键盘收起的事件处理
        $('.contact').classList.add('show')
        var advisoryContentVal = $('#advisoryContent').value
        if (!advisoryContentVal) {
            $('.main-con textarea').classList.add('error')
        }
    });

})


// 输入电话后判断是否关闭软键盘
$('#phone').addEventListener('focus', function () {
    $('#phone').classList.remove('error')

    window.addEventListener('resize', function () {
        var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if (clientHeight > nowClientHeight) {
            //键盘弹出的事件处理

        } else {
            //键盘收起的事件处理
            // $('.submit-btn').classList.add('show')
            var advisoryPhoneVal = $('#phone').value
            var myreg = /^1(3|4|5|7|8)[0-9]\d{8}$/;

            if (!myreg.test(advisoryPhoneVal)) {
                $('#phone').classList.add('error')
                $('#phone').placeholder = '请输入正确的手机号码'
            } else {
                submitFn()
            }

        }
    })
    $('#phone').addEventListener('blur', function () {
        //软键盘收起的事件处理
        // $('.submit-btn').classList.add('show')
        var advisoryPhoneVal = $('#phone').value
        var myreg = /^1(3|4|5|7|8)[0-9]\d{8}$/;

        if (!myreg.test(advisoryPhoneVal)) {
            $('#phone').classList.add('error')
            $('#phone').placeholder = '请输入正确的手机号码'
        } else {
            submitFn()
        }
    });

})


function submitFn(){
    $('#phone').classList.remove('error')
    var advisoryContentVal = $('#advisoryContent').value
    var advisoryNameVal = $('#name').value
    var advisoryPhoneVal = $('#phone').value
    axios({
            method: 'post',
            url: 'http://ii.sinelinked.com/tg_web/api/advisory/add',
            data: {
                "advisoryContent": advisoryContentVal, //咨询内容
                "advisoryName": advisoryNameVal, //客服咨询人姓名
                "advisoryPhone": advisoryPhoneVal, //联系电话
                "openIdOrWechart": "1234567ceshiceshi", //微信号或是OpenId
                "origin": "1", //来源（1：公众号；2：PC端）
                "type": "1" //资讯类型（1、咨询；2：建议）
            }
        })
        .then((result) => {
            if (result.data.code == 0) {
                $('.end-tip').classList.add('show')
                $('.end-tip').style.maxHeight = '600rem';
                $('.end-tip').style.overflow = 'visible';
                setTimeout(function () {
                    $('#advisoryContent').value = ''
                    $('#name').value = ''
                    $('#phone').value = ''
                    $('#phone').placeholder = '请输入您的联系方式'

                    $('.main-con').classList.remove('show')
                    $('.contact').classList.remove('show')
                    $('.end-tip').classList.remove('show')

                }, 2000)
            }
        }).catch((err) => {

        });
}