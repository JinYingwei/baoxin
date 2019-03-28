// 正式环境
var baseURL = 'http://ii.sinelinked.com/tg_web';

// var baseURL = 'http://192.168.0.117:8080/tg_web';
// 获取当前网站协议 进行 动态切换地址
var locationProtocol = window.location.protocol
if (locationProtocol === 'https:') {
    baseURL = 'https://ii.sinelinked.com/tg_web';
} else {
    baseURL = 'http://ii.sinelinked.com/tg_web';
}

// 验证手机号
function isPhone(phone) {
    var myreg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
    if (myreg.test(phone)) {
        return true;
    } else {
        return false;
    }
}

// cookie操作
var cookie = {
    set: function(key, val, time) { //设置cookie方法
        var date = new Date(); //获取当前时间
        date.setTime(date.getTime() + 30 * 60 * 1000); //格式化为cookie识别的时间
        document.cookie = key + "=" + val + ";expires=" + date.toGMTString() + ";path=/"; //设置cookie
    },
    get: function(key) { //获取cookie方法
        /*获取cookie参数*/
        var getCookie = document.cookie.replace(/[ ]/g, ""); //获取cookie，并且将获得的cookie格式化，去掉空格字符
        var arrCookie = getCookie.split(";") //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        var tips; //声明变量tips
        for (var i = 0; i < arrCookie.length; i++) { //使用for循环查找cookie中的tips变量
            var arr = arrCookie[i].split("="); //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
            if (key == arr[0]) { //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                tips = arr[1]; //将cookie的值赋给变量tips
                break; //终止for循环遍历
            }
        }
        return tips;
    },
    del: function(key) { //删除cookie方法
        var date = new Date(); //获取当前时间
        date.setTime(date.getTime() - 10000); //将date设置为过去的时间
        document.cookie = key + "=v; expires =" + date.toGMTString() + ";path=/"; //设置cookie
    }

}

// 时间转日期格式
function timeFormat(time) {
    var time = String(time);
    var year = time.slice(0, 4);
    var month = time.slice(4, 6);
    var date = time.slice(6, 8);
    var hour = time.slice(8, 10);
    var minute = time.slice(10, 12);

    return year + "-" + month + "-" + date + " " + hour + ":" + minute;
}
// 时间转日期格式
function timeFormat2(time) {
    var time = String(time);
    var year = time.slice(0, 4);
    var month = time.slice(4, 6);
    var date = time.slice(6, 8);

    return year + "/" + month + "/" + date + "/";
}

//获取区域 
function getCityResult(cityDatas, addressStr) {
    var shengResult = '';
    var shiResult = '';
    if (!addressStr) {
        return
    }
    var sheng = addressStr.split("|")[0];
    var shi = addressStr.split("|")[1];
    cityDatas.forEach(item => {
        // 匹配省
        if (item.regionId == sheng) {
            shengResult = item.regionName;
            item.children.forEach(item => {
                if (item.regionId == shi) {
                    shiResult = item.regionName;
                }
            })

        }
    });
    return shengResult + ' ' + shiResult
}
//时间戳转化成日期格式=>2018-12-8
function timestampToTime(timestamp) {
    if (!timestamp) {
        return '';
    }
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return Y + M + D;
}
//把url后面的参数解析成对象
function parseUrl(url) {
    var reg = /(\w+)=(\w+)/ig;
    var result = {};

    url.replace(reg, function(a, b, c) {
        result[b] = c;
    });

    return result;
}


const GLOBAL = {
    baseURL: baseURL,
    isPhone: isPhone,
    cookie: cookie,
    timeFormat: timeFormat,
    timeFormat2: timeFormat2,
    getCityResult: getCityResult,
    parseUrl: parseUrl,
    timestampToTime
}
export default GLOBAL;