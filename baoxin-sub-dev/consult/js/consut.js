var area2 = new LArea();
area2.init({
    'trigger': '#demo2',
    'valueTo': '#address',
    'keys': {
        id: 'value',
        name: 'text'
    },
    'type': 2,
    'data': [provs_data, citys_data, dists_data]
});

var submit = document.querySelector('.submit');

function $(id) {
    return document.getElementById(id)
}
submit.onclick = function () {
    var addressStr = ''


    if(!$('content').value){
        layer.open({
            content: '请填写咨询内容',
            time: 2,
            skin: 'msg'
        });
        return
    }

    if(!$('name').value){
        layer.open({
            content: '请填写咨询姓名',
            time: 2,
            skin: 'msg'
        });
        return
    }

    if($('tel').value){
        var phone = $('tel').value
        var myreg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
        if (!myreg.test(phone)) {
            layer.open({
                content: '请输入有效的手机号码',
                time: 2,
                skin: 'msg'
            });
            return false;
        }
    }else{
        layer.open({
            content: '请填写手机号码',
            time: 2,
            skin: 'msg'
        });
        return
    }


    if($('address').value){
        addressStr = $('address').value.split(',')[0]+'|'+$('address').value.split(',')[1]
    }else{
        layer.open({
            content: '请选择地址',
            time: 2,
            skin: 'msg'
        });
        return
    }

    if(!$('verifyCode').value){
        layer.open({
            content: '请填写验证码',
            time: 2,
            skin: 'msg'
        });
        return
    }

    axios({
            method: 'post',
            url: `https://ii.sinelinked.com/tg_web/api/order/publishbxOrders`,
            data: {
                name: $('name').value,
                tel: $('tel').value,
                address: addressStr,
                content: $('content').value,
                // proxyId: 'b42bfd7df1ea4bcab4f85e15f04a2',
                orign: '1',
                mtype: '1',
                verifyCode: $('verifyCode').value
            }
        })
        .then((result) => {
            if (result.data.code == 0) {
                layer.open({
                    content: '提交成功',
                    time: 2,
                    skin: 'msg'
                });
                setTimeout(()=>{
                    location.reload()
                },1000)
            }
        }).catch((err) => {
            layer.open({
                content: err.response.data.error,
                time: 2,
                skin: 'msg'
            });
        });
}

var sendCode = document.getElementById('sendCode')
var isClick = true

sendCode.onclick = function(){
    var phone = $('tel').value
    var myreg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
    if (!myreg.test(phone)) {
        layer.open({
            content: '请输入有效的手机号码',
            time: 2,
            skin: 'msg'
        });
        return false;
    }
    
    if(isClick){
        sendAuthCode()
    }else{

    }
}
function sendAuthCode() {
    var that = this;
    axios({
        method:'GET',
        url: "https://ii.sinelinked.com/tg_web/api/phone/message/send",
        params: {
            phone:$('tel').value,
            flag: "code_7"
        }
    })
    .then((result) => {
        if(result.data.error == 0){
            layer.open({
                content: '已发送',
                time: 2,
                skin: 'msg'
            });
            isClick = false
            // 倒计时
            countdown()
        }
        
    }).catch((err) => {
        layer.open({
            content: err.response.data.error,
            time: 2,
            skin: 'msg'
        });
    });

}

// 倒计时
function countdown(e) {
    var that = this;
    var timer;
    var countdownNum = 90

    function settime() {
        if (countdownNum <= 0) {
            sendCode.innerHTML = '发送验证码'
            clearInterval(timer)
            countdownNum = 90;
            isClick = true

            return;
        } else {
            isClick = false
            sendCode.innerHTML = '重新发送'+countdownNum
            countdownNum--;
        }
    }

    timer = setInterval(function () {
        settime()
    }, 1000)
}