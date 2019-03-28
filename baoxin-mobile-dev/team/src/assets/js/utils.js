var utils = {
	//获取区域 
	//获取区域 
	getCityResult:function(cityDatas, addressStr) {
		var shengResult = ''
		var shiResult = ''
		var sheng = addressStr.split("|")[0]
		var shi = addressStr.split("|")[1]
		cityDatas.forEach(item => {
			// 匹配省
			if (item.regionId == sheng) {
				shengResult = item.regionName;
				item.children.forEach(item=>{
					if(item.regionId == shi){
						shiResult = item.regionName;
					}
				})

			}
		});
		return shengResult+' '+shiResult
	},
	  // cookie操作
		Cookie: {
			set: function (key, val, time) { //设置cookie方法
				var date = new Date(); //获取当前时间
				date.setTime(date.getTime() + 30 * 60 * 1000); //格式化为cookie识别的时间
				document.cookie = key + "=" + val + ";expires=" + date.toGMTString() + ";path=/"; //设置cookie
			},
			get: function (key) { //获取cookie方法
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
			del: function (key) { //删除cookie方法
				var date = new Date(); //获取当前时间
				date.setTime(date.getTime() - 10000); //将date设置为过去的时间
				document.cookie = key + "=v; expires =" + date.toGMTString() + ";path=/"; //设置cookie
			}
	
		},
	// 时间戳转日期格式
	timeFormat:function(time) {
		var time = String(time);
		var year = time.slice(0, 4);
		var month = time.slice(4, 6);
		var date = time.slice(6, 8);
		var hour = time.slice(8, 10);
		var minute = time.slice(10, 12);

		return year + "-" + month + "-" + date + " " + hour + ":" + minute;
	},
}
export default utils
