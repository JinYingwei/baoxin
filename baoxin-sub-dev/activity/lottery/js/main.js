function $(target) {
	return document.querySelector(target)
}


// 开场动画
var lofferyTitle = $('.lofferyTitle')
lofferyTitle.classList.add('down')

var eggBox = $('.eggBox')
var chuizi = $('.chuizi')
var noloffery = $('.noloffery')
var alleryLoffery = $('.alleryLoffery')
var rules = $('.rules')
var numbers = $('.numbers')
var lofferyOk = $('.lofferyOk')

// 中奖金额图片
var inLofferyImg = {
	'egg10': 'http://ii.sinelinked.com/sub/activity/lottery/img/lofferyOk10.jpg',
	'egg100': 'http://ii.sinelinked.com/sub/activity/lottery/img/lofferyOk100.jpg',
	'egg1000': 'http://ii.sinelinked.com/sub/activity/lottery/img/lofferyOk1000.jpg'
}

var inLofferyEggImg = {
	'egg10': 'http://ii.sinelinked.com/sub/activity/lottery/img/open10.png',
	'egg100': 'http://ii.sinelinked.com/sub/activity/lottery/img/open100.png',
	'egg1000': 'http://ii.sinelinked.com/sub/activity/lottery/img/open1000.png'
}
// 砸蛋
eggBox.addEventListener('click', clickEgg)

// 已砸蛋
function alleryClickEgg() {
	layer.open({
		content: '抽奖次数已达上限',
		skin: 'msg',
		time: 2 //2秒后自动关闭
	});
}



// 砸蛋方法
function clickEgg(e) {
	layer.open({
		type: 2,
		shadeClose: false,
		shade: false,
		content: '好运加载中'
	});

	// 奖品ID
	var proId = e.target.getAttribute('proId')
	var luckProduct; //区分哪个蛋
	switch (proId) {
		case '5baef22ab793604807ec54ae1':
			luckProduct = 1
			break;
		case '5baef22ab793604807ec54ae10':
			luckProduct = 2
			break;
		case '5baef22ab793604807ec54ae100':
			luckProduct = 3
			break;
		default:
			break;
	}
	// luckdraw 
	var luckdraw = document.querySelector('#luckdraw')
	var luckdrawVal = ''
	if (luckdraw) {
		luckdrawVal = luckdraw.value
	}

	axios({
			url: 'http://ii.sinelinked.com/tg_web/api/recharge/luck',
			method: 'get',
			params: {
				luckdraw: luckdrawVal,
				luckProduct: luckProduct
			}
		})
		.then(result => {
			// alert(JSON.stringify(result.data.data.data))
			layer.closeAll()
			// 是否有抽奖机会
			// code = 1007 没有抽奖机会
			if (result.data.data.return_code == 1007) {
				layer.open({
					content: '活动已结束',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
				// 没有抽奖机会
				lofferyTitle.src = 'http://ii.sinelinked.com/sub/activity/lottery/img/alleryLoffery.png'

			} else if (result.data.data.return_code == 1001) {
				layer.open({
					content: '请关注"保信云顾问"公众号进行抽奖',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			} else if (result.data.data.return_code == 1003) {
				layer.open({
					content: '请关注"保信云顾问"公众号进行抽奖',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			} else if (result.data.data.return_code == 1004) {
				// 标记是否已达上限
				sessionStorage.setItem('isFiver', 'true')
				layer.open({
					content: '每日一次抽奖机会,请明日再来',
					skin: 'msg',
					mask: false,
					time: 2 //2秒后自动关闭
				});
				lofferyTitle.src = 'http://ii.sinelinked.com/sub/activity/lottery/img/alleryLoffery.png'
				getNumber(result, luckProduct)
			} else if (result.data.data.return_code == 1002) {
				// alert(sessionStorage.getItem('isFiver'))
				if (sessionStorage.getItem('isFiver') == 'true') {
					layer.open({
						content: '每日一次抽奖机会,请明日再来',
						skin: 'msg',
						mask: false,
						time: 2 //2秒后自动关闭
					});
				} else {
					layer.open({
						content: '请关注"保信云顾问"公众号进行抽奖',
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
				}

				lofferyTitle.src = 'http://ii.sinelinked.com/sub/activity/lottery/img/alleryLoffery.png'
				// getNumber(result)
			} else {
				// 有抽奖机会
				// code = 1008 中奖
				if (result.data.data.return_code == 1008) {
					var money = result.data.data.money
					// 中奖
					switch (money) {
						case 1:
							chuizi.style.transform = 'rotateZ(0)'
							chuizi.style.left = '1.6rem'
							chuizi.style.top = '3.0rem'
							setTimeout(function () {
								chuizi.style.top = '5.0rem'
								chuizi.style.transform = 'rotateZ(-30deg)'

								hidden('egg10', e)

							}, 500)
							break;
						case 10:
							chuizi.style.transform = 'rotateZ(0)'
							chuizi.style.left = '3.72rem'
							chuizi.style.top = '3.0rem'
							setTimeout(function () {
								chuizi.style.top = '5.0rem'
								chuizi.style.transform = 'rotateZ(-30deg)'
								hidden('egg100', e)
							}, 500)
							break;
						case 100:
							chuizi.style.transform = 'rotateZ(0)'
							chuizi.style.left = '5.72rem'
							chuizi.style.top = '3.0rem'
							setTimeout(function () {
								chuizi.style.top = '5.0rem'
								chuizi.style.transform = 'rotateZ(-30deg)'
								hidden('egg1000', e)
							}, 500)
							break;
						default:
							break;
					}

					getNumber(result, luckProduct)

				} else if (result.data.data.return_code == 1005) {

					// 未中奖
					noLoffery(e)
					getNumber(result, luckProduct)
				}

			}
		})


}

function getNumber(result, luckProduct) {

	rules.style.display = 'none'
	numbers.style.display = 'block'
	var numbersData = result.data.data.data


	var totalNum = document.querySelector('.totalNum')
	var totalNum_person = document.querySelector('.totalNum_person')
	var nickName = ''
	var totalCount,ten1,ten10,ten100,totalCount_person
	var type
	switch (luckProduct) {
		case 1:
			type = 1
			totalCount = numbersData[1].n1
			totalCount_person = numbersData[1].n1+numbersData[1].n2+numbersData[1].n3
			ten1 = numbersData[1].n11
			ten10 = numbersData[2].n11
			ten100 = numbersData[3].n11
			nickName = `小帅蛋`
			break;
		case 2:
			type = 10
			totalCount = numbersData[2].n2
			totalCount_person = numbersData[1].n1+numbersData[1].n2+numbersData[1].n3
			ten1 = numbersData[1].n22
			ten10 = numbersData[2].n22
			ten100 = numbersData[3].n22
			nickName = `霹雳蛋`
			break;
		case 3:
			type = 100
			totalCount = numbersData[3].n3
			totalCount_person = numbersData[1].n1+numbersData[1].n2+numbersData[1].n3
			ten1 = numbersData[1].n33
			ten10 = numbersData[2].n33
			ten100 = numbersData[3].n33
			nickName = `乖乖蛋`
			break;
		default:
			break;
	}
	var sent = 0;
	numbersData.map(item=>{
		sent += item.sent
	})
	totalNum_person.innerText=`已砸蛋${totalCount_person}人次，砸出金蛋${sent}个`
	totalNum.innerText = `${nickName}已抽奖${totalCount}人次，共砸出100元金蛋${ten100}个，10元金蛋${ten10}个，1元金蛋${ten1}个`
}

// 砸蛋后
/* 添加ID
 *	隐藏锤子
 * 禁用砸蛋事件
 */
// 中奖
function hidden(money, e) {
	// 显示中奖弹窗
	lofferyOk.src = inLofferyImg[money]
	e.target.previousElementSibling.src = inLofferyEggImg[money]
	e.target.previousElementSibling.style.display = 'block'
	e.target.style.display = 'none'
	setTimeout(function () {
		alleryLoffery.style.transform = 'scale(1)'
		chuizi.style.display = 'none'
	}, 300)
}
// 未中奖
function noLoffery(e) {

	switch (e.target.id) {
		case 'egg10':
			chuizi.style.transform = 'rotateZ(0)'
			chuizi.style.left = '1.6rem'
			chuizi.style.top = '3.0rem'
			setTimeout(function () {
				chuizi.style.top = '5.0rem'
				chuizi.style.transform = 'rotateZ(-30deg)'
				setTimeout(function () {
					call(e)
				}, 300)
			}, 500)
			break;
		case 'egg100':
			chuizi.style.transform = 'rotateZ(0)'
			chuizi.style.left = '3.72rem'
			chuizi.style.top = '3.0rem'
			setTimeout(function () {
				chuizi.style.top = '5.0rem'
				chuizi.style.transform = 'rotateZ(-30deg)'
				setTimeout(function () {
					call(e)
				}, 300)
			}, 500)
			break;
		case 'egg1000':
			chuizi.style.transform = 'rotateZ(0)'
			chuizi.style.left = '5.72rem'
			chuizi.style.top = '3.0rem'
			setTimeout(function () {
				chuizi.style.top = '5.0rem'
				chuizi.style.transform = 'rotateZ(-30deg)'
				setTimeout(function () {
					call(e)
				}, 300)
			}, 500)
			break;
		default:
			break;
	}




	function call(e) {
		noloffery.style.transform = 'scale(1)'
		e.target.previousElementSibling.src = 'http://ii.sinelinked.com/sub/activity/lottery/img/noLofferyEgg.png'
		e.target.previousElementSibling.style.display = 'block'
		e.target.style.display = 'none'

		chuizi.style.display = 'none'
		rules.style.display = 'none'
		numbers.style.display = 'block'
	}
}

noloffery.onclick = function (e) {

	noloffery.style.display = 'none'
	noloffery.style.transform = 'scale(0)'

	setTimeout(function () {
		noloffery.style.display = 'block'
		chuizi.style.display = 'block'
		chuizi.style.left = '83%'
	}, 1000)

}

// 收红包
/*
 * 隐藏规则，显示统计
 */

alleryLoffery.onclick = function () {

		alleryLoffery.style.display = 'none'
		alleryLoffery.style.transform = 'scale(0)'
		rules.style.display = 'none'
		numbers.style.display = 'block'

		setTimeout(function () {
			alleryLoffery.style.display = 'block'
			chuizi.style.display = 'block'
			chuizi.style.left = '83%'
		}, 1000)
	}


	! function (e, n) {
		"function" == typeof define && (define.amd || define.cmd) ? define(function () {
			return n(e)
		}) : n(e, !0)
	}(this, function (e, n) {
		function i(n, i, t) {
			e.WeixinJSBridge ? WeixinJSBridge.invoke(n, o(i), function (e) {
				c(n, e, t)
			}) : u(n, t)
		}

		function t(n, i, t) {
			e.WeixinJSBridge ? WeixinJSBridge.on(n, function (e) {
				t && t.trigger && t.trigger(e), c(n, e, i)
			}) : t ? u(n, t) : u(n, i)
		}

		function o(e) {
			return e = e || {}, e.appId = C.appId, e.verifyAppId = C.appId, e.verifySignType = "sha1", e.verifyTimestamp = C.timestamp + "", e.verifyNonceStr = C.nonceStr, e.verifySignature = C.signature, e
		}

		function r(e) {
			return {
				timeStamp: e.timestamp + "",
				nonceStr: e.nonceStr,
				package: e.package,
				paySign: e.paySign,
				signType: e.signType || "SHA1"
			}
		}

		function a(e) {
			return e.postalCode = e.addressPostalCode, delete e.addressPostalCode, e.provinceName = e.proviceFirstStageName, delete e.proviceFirstStageName, e.cityName = e.addressCitySecondStageName, delete e.addressCitySecondStageName, e.countryName = e.addressCountiesThirdStageName, delete e.addressCountiesThirdStageName, e.detailInfo = e.addressDetailInfo, delete e.addressDetailInfo, e
		}

		function c(e, n, i) {
			"openEnterpriseChat" == e && (n.errCode = n.err_code), delete n.err_code, delete n.err_desc, delete n.err_detail;
			var t = n.errMsg;
			t || (t = n.err_msg, delete n.err_msg, t = s(e, t), n.errMsg = t), (i = i || {})._complete && (i._complete(n), delete i._complete), t = n.errMsg || "", C.debug && !i.isInnerInvoke && alert(JSON.stringify(n));
			var o = t.indexOf(":");
			switch (t.substring(o + 1)) {
				case "ok":
					i.success && i.success(n);
					break;
				case "cancel":
					i.cancel && i.cancel(n);
					break;
				default:
					i.fail && i.fail(n)
			}
			i.complete && i.complete(n)
		}

		function s(e, n) {
			var i = e,
				t = v[i];
			t && (i = t);
			var o = "ok";
			if (n) {
				var r = n.indexOf(":");
				"confirm" == (o = n.substring(r + 1)) && (o = "ok"), "failed" == o && (o = "fail"), -1 != o.indexOf("failed_") && (o = o.substring(7)), -1 != o.indexOf("fail_") && (o = o.substring(5)), "access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != o || (o = "permission denied"), "config" == i && "function not exist" == o && (o = "ok"), "" == o && (o = "fail")
			}
			return n = i + ":" + o
		}

		function d(e) {
			if (e) {
				for (var n = 0, i = e.length; n < i; ++n) {
					var t = e[n],
						o = h[t];
					o && (e[n] = o)
				}
				return e
			}
		}

		function u(e, n) {
			if (!(!C.debug || n && n.isInnerInvoke)) {
				var i = v[e];
				i && (e = i), n && n._complete && delete n._complete, console.log('"' + e + '",', n || "")
			}
		}

		function l(e) {
			if (!(k || w || C.debug || x < "6.0.2" || V.systemType < 0)) {
				var n = new Image;
				V.appId = C.appId, V.initTime = A.initEndTime - A.initStartTime, V.preVerifyTime = A.preVerifyEndTime - A.preVerifyStartTime, N.getNetworkType({
					isInnerInvoke: !0,
					success: function (e) {
						V.networkType = e.networkType;
						var i = "https://open.weixin.qq.com/sdk/report?v=" + V.version + "&o=" + V.isPreVerifyOk + "&s=" + V.systemType + "&c=" + V.clientVersion + "&a=" + V.appId + "&n=" + V.networkType + "&i=" + V.initTime + "&p=" + V.preVerifyTime + "&u=" + V.url;
						n.src = i
					}
				})
			}
		}

		function p() {
			return (new Date).getTime()
		}

		function f(n) {
			T && (e.WeixinJSBridge ? n() : S.addEventListener && S.addEventListener("WeixinJSBridgeReady", n, !1))
		}

		function m() {
			N.invoke || (N.invoke = function (n, i, t) {
				e.WeixinJSBridge && WeixinJSBridge.invoke(n, o(i), t)
			}, N.on = function (n, i) {
				e.WeixinJSBridge && WeixinJSBridge.on(n, i)
			})
		}

		function g(e) {
			if ("string" == typeof e && e.length > 0) {
				var n = e.split("?")[0],
					i = e.split("?")[1];
				return n += ".html", void 0 !== i ? n + "?" + i : n
			}
		}
		if (!e.jWeixin) {
			var h = {
					config: "preVerifyJSAPI",
					onMenuShareTimeline: "menu:share:timeline",
					onMenuShareAppMessage: "menu:share:appmessage",
					onMenuShareQQ: "menu:share:qq",
					onMenuShareWeibo: "menu:share:weiboApp",
					onMenuShareQZone: "menu:share:QZone",
					previewImage: "imagePreview",
					getLocation: "geoLocation",
					openProductSpecificView: "openProductViewWithPid",
					addCard: "batchAddCard",
					openCard: "batchViewCard",
					chooseWXPay: "getBrandWCPayRequest",
					openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
					startSearchBeacons: "startMonitoringBeacons",
					stopSearchBeacons: "stopMonitoringBeacons",
					onSearchBeacons: "onBeaconsInRange",
					consumeAndShareCard: "consumedShareCard",
					openAddress: "editAddress"
				},
				v = function () {
					var e = {};
					for (var n in h) e[h[n]] = n;
					return e
				}(),
				S = e.document,
				I = S.title,
				y = navigator.userAgent.toLowerCase(),
				_ = navigator.platform.toLowerCase(),
				k = !(!_.match("mac") && !_.match("win")),
				w = -1 != y.indexOf("wxdebugger"),
				T = -1 != y.indexOf("micromessenger"),
				M = -1 != y.indexOf("android"),
				P = -1 != y.indexOf("iphone") || -1 != y.indexOf("ipad"),
				x = function () {
					var e = y.match(/micromessenger\/(\d+\.\d+\.\d+)/) || y.match(/micromessenger\/(\d+\.\d+)/);
					return e ? e[1] : ""
				}(),
				A = {
					initStartTime: p(),
					initEndTime: 0,
					preVerifyStartTime: 0,
					preVerifyEndTime: 0
				},
				V = {
					version: 1,
					appId: "",
					initTime: 0,
					preVerifyTime: 0,
					networkType: "",
					isPreVerifyOk: 1,
					systemType: P ? 1 : M ? 2 : -1,
					clientVersion: x,
					url: encodeURIComponent(location.href)
				},
				C = {},
				L = {
					_completes: []
				},
				B = {
					state: 0,
					data: {}
				};
			f(function () {
				A.initEndTime = p()
			});
			var O = !1,
				E = [],
				N = {
					config: function (e) {
						C = e, u("config", e);
						var n = !1 !== C.check;
						f(function () {
							if (n) i(h.config, {
								verifyJsApiList: d(C.jsApiList)
							}, function () {
								L._complete = function (e) {
									A.preVerifyEndTime = p(), B.state = 1, B.data = e
								}, L.success = function (e) {
									V.isPreVerifyOk = 0
								}, L.fail = function (e) {
									L._fail ? L._fail(e) : B.state = -1
								};
								var e = L._completes;
								return e.push(function () {
									l()
								}), L.complete = function (n) {
									for (var i = 0, t = e.length; i < t; ++i) e[i]();
									L._completes = []
								}, L
							}()), A.preVerifyStartTime = p();
							else {
								B.state = 1;
								for (var e = L._completes, t = 0, o = e.length; t < o; ++t) e[t]();
								L._completes = []
							}
						}), m()
					},
					ready: function (e) {
						0 != B.state ? e() : (L._completes.push(e), !T && C.debug && e())
					},
					error: function (e) {
						x < "6.0.2" || (-1 == B.state ? e(B.data) : L._fail = e)
					},
					checkJsApi: function (e) {
						var n = function (e) {
							var n = e.checkResult;
							for (var i in n) {
								var t = v[i];
								t && (n[t] = n[i], delete n[i])
							}
							return e
						};
						i("checkJsApi", {
							jsApiList: d(e.jsApiList)
						}, (e._complete = function (e) {
							if (M) {
								var i = e.checkResult;
								i && (e.checkResult = JSON.parse(i))
							}
							e = n(e)
						}, e))
					},
					onMenuShareTimeline: function (e) {
						t(h.onMenuShareTimeline, {
							complete: function () {
								i("shareTimeline", {
									title: e.title || I,
									desc: e.title || I,
									img_url: e.imgUrl || "",
									link: e.link || location.href,
									type: e.type || "link",
									data_url: e.dataUrl || ""
								}, e)
							}
						}, e)
					},
					onMenuShareAppMessage: function (e) {
						t(h.onMenuShareAppMessage, {
							complete: function (n) {
								"favorite" === n.scene ? i("sendAppMessage", {
									title: e.title || I,
									desc: e.desc || "",
									link: e.link || location.href,
									img_url: e.imgUrl || "",
									type: e.type || "link",
									data_url: e.dataUrl || ""
								}) : i("sendAppMessage", {
									title: e.title || I,
									desc: e.desc || "",
									link: e.link || location.href,
									img_url: e.imgUrl || "",
									type: e.type || "link",
									data_url: e.dataUrl || ""
								}, e)
							}
						}, e)
					},
					onMenuShareQQ: function (e) {
						t(h.onMenuShareQQ, {
							complete: function () {
								i("shareQQ", {
									title: e.title || I,
									desc: e.desc || "",
									img_url: e.imgUrl || "",
									link: e.link || location.href
								}, e)
							}
						}, e)
					},
					onMenuShareWeibo: function (e) {
						t(h.onMenuShareWeibo, {
							complete: function () {
								i("shareWeiboApp", {
									title: e.title || I,
									desc: e.desc || "",
									img_url: e.imgUrl || "",
									link: e.link || location.href
								}, e)
							}
						}, e)
					},
					onMenuShareQZone: function (e) {
						t(h.onMenuShareQZone, {
							complete: function () {
								i("shareQZone", {
									title: e.title || I,
									desc: e.desc || "",
									img_url: e.imgUrl || "",
									link: e.link || location.href
								}, e)
							}
						}, e)
					},
					updateTimelineShareData: function (e) {
						i("updateTimelineShareData", {
							title: e.title,
							link: e.link,
							imgUrl: e.imgUrl
						}, e)
					},
					updateAppMessageShareData: function (e) {
						i("updateAppMessageShareData", {
							title: e.title,
							desc: e.desc,
							link: e.link,
							imgUrl: e.imgUrl
						}, e)
					},
					startRecord: function (e) {
						i("startRecord", {}, e)
					},
					stopRecord: function (e) {
						i("stopRecord", {}, e)
					},
					onVoiceRecordEnd: function (e) {
						t("onVoiceRecordEnd", e)
					},
					playVoice: function (e) {
						i("playVoice", {
							localId: e.localId
						}, e)
					},
					pauseVoice: function (e) {
						i("pauseVoice", {
							localId: e.localId
						}, e)
					},
					stopVoice: function (e) {
						i("stopVoice", {
							localId: e.localId
						}, e)
					},
					onVoicePlayEnd: function (e) {
						t("onVoicePlayEnd", e)
					},
					uploadVoice: function (e) {
						i("uploadVoice", {
							localId: e.localId,
							isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
						}, e)
					},
					downloadVoice: function (e) {
						i("downloadVoice", {
							serverId: e.serverId,
							isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
						}, e)
					},
					translateVoice: function (e) {
						i("translateVoice", {
							localId: e.localId,
							isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
						}, e)
					},
					chooseImage: function (e) {
						i("chooseImage", {
							scene: "1|2",
							count: e.count || 9,
							sizeType: e.sizeType || ["original", "compressed"],
							sourceType: e.sourceType || ["album", "camera"]
						}, (e._complete = function (e) {
							if (M) {
								var n = e.localIds;
								try {
									n && (e.localIds = JSON.parse(n))
								} catch (e) {}
							}
						}, e))
					},
					getLocation: function (e) {},
					previewImage: function (e) {
						i(h.previewImage, {
							current: e.current,
							urls: e.urls
						}, e)
					},
					uploadImage: function (e) {
						i("uploadImage", {
							localId: e.localId,
							isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
						}, e)
					},
					downloadImage: function (e) {
						i("downloadImage", {
							serverId: e.serverId,
							isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
						}, e)
					},
					getLocalImgData: function (e) {
						!1 === O ? (O = !0, i("getLocalImgData", {
							localId: e.localId
						}, (e._complete = function (e) {
							if (O = !1, E.length > 0) {
								var n = E.shift();
								wx.getLocalImgData(n)
							}
						}, e))) : E.push(e)
					},
					getNetworkType: function (e) {
						var n = function (e) {
							var n = e.errMsg;
							e.errMsg = "getNetworkType:ok";
							var i = e.subtype;
							if (delete e.subtype, i) e.networkType = i;
							else {
								var t = n.indexOf(":"),
									o = n.substring(t + 1);
								switch (o) {
									case "wifi":
									case "edge":
									case "wwan":
										e.networkType = o;
										break;
									default:
										e.errMsg = "getNetworkType:fail"
								}
							}
							return e
						};
						i("getNetworkType", {}, (e._complete = function (e) {
							e = n(e)
						}, e))
					},
					openLocation: function (e) {
						i("openLocation", {
							latitude: e.latitude,
							longitude: e.longitude,
							name: e.name || "",
							address: e.address || "",
							scale: e.scale || 28,
							infoUrl: e.infoUrl || ""
						}, e)
					},
					getLocation: function (e) {
						e = e || {}, i(h.getLocation, {
							type: e.type || "wgs84"
						}, (e._complete = function (e) {
							delete e.type
						}, e))
					},
					hideOptionMenu: function (e) {
						i("hideOptionMenu", {}, e)
					},
					showOptionMenu: function (e) {
						i("showOptionMenu", {}, e)
					},
					closeWindow: function (e) {
						i("closeWindow", {}, e = e || {})
					},
					hideMenuItems: function (e) {
						i("hideMenuItems", {
							menuList: e.menuList
						}, e)
					},
					showMenuItems: function (e) {
						i("showMenuItems", {
							menuList: e.menuList
						}, e)
					},
					hideAllNonBaseMenuItem: function (e) {
						i("hideAllNonBaseMenuItem", {}, e)
					},
					showAllNonBaseMenuItem: function (e) {
						i("showAllNonBaseMenuItem", {}, e)
					},
					scanQRCode: function (e) {
						i("scanQRCode", {
							needResult: (e = e || {}).needResult || 0,
							scanType: e.scanType || ["qrCode", "barCode"]
						}, (e._complete = function (e) {
							if (P) {
								var n = e.resultStr;
								if (n) {
									var i = JSON.parse(n);
									e.resultStr = i && i.scan_code && i.scan_code.scan_result
								}
							}
						}, e))
					},
					openAddress: function (e) {
						i(h.openAddress, {}, (e._complete = function (e) {
							e = a(e)
						}, e))
					},
					openProductSpecificView: function (e) {
						i(h.openProductSpecificView, {
							pid: e.productId,
							view_type: e.viewType || 0,
							ext_info: e.extInfo
						}, e)
					},
					addCard: function (e) {
						for (var n = e.cardList, t = [], o = 0, r = n.length; o < r; ++o) {
							var a = n[o],
								c = {
									card_id: a.cardId,
									card_ext: a.cardExt
								};
							t.push(c)
						}
						i(h.addCard, {
							card_list: t
						}, (e._complete = function (e) {
							var n = e.card_list;
							if (n) {
								for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {
									var o = n[i];
									o.cardId = o.card_id, o.cardExt = o.card_ext, o.isSuccess = !!o.is_succ, delete o.card_id, delete o.card_ext, delete o.is_succ
								}
								e.cardList = n, delete e.card_list
							}
						}, e))
					},
					chooseCard: function (e) {
						i("chooseCard", {
							app_id: C.appId,
							location_id: e.shopId || "",
							sign_type: e.signType || "SHA1",
							card_id: e.cardId || "",
							card_type: e.cardType || "",
							card_sign: e.cardSign,
							time_stamp: e.timestamp + "",
							nonce_str: e.nonceStr
						}, (e._complete = function (e) {
							e.cardList = e.choose_card_info, delete e.choose_card_info
						}, e))
					},
					openCard: function (e) {
						for (var n = e.cardList, t = [], o = 0, r = n.length; o < r; ++o) {
							var a = n[o],
								c = {
									card_id: a.cardId,
									code: a.code
								};
							t.push(c)
						}
						i(h.openCard, {
							card_list: t
						}, e)
					},
					consumeAndShareCard: function (e) {
						i(h.consumeAndShareCard, {
							consumedCardId: e.cardId,
							consumedCode: e.code
						}, e)
					},
					chooseWXPay: function (e) {
						i(h.chooseWXPay, r(e), e)
					},
					openEnterpriseRedPacket: function (e) {
						i(h.openEnterpriseRedPacket, r(e), e)
					},
					startSearchBeacons: function (e) {
						i(h.startSearchBeacons, {
							ticket: e.ticket
						}, e)
					},
					stopSearchBeacons: function (e) {
						i(h.stopSearchBeacons, {}, e)
					},
					onSearchBeacons: function (e) {
						t(h.onSearchBeacons, e)
					},
					openEnterpriseChat: function (e) {
						i("openEnterpriseChat", {
							useridlist: e.userIds,
							chatname: e.groupName
						}, e)
					},
					launchMiniProgram: function (e) {
						i("launchMiniProgram", {
							targetAppId: e.targetAppId,
							path: g(e.path),
							envVersion: e.envVersion
						}, e)
					},
					miniProgram: {
						navigateBack: function (e) {
							e = e || {}, f(function () {
								i("invokeMiniProgramAPI", {
									name: "navigateBack",
									arg: {
										delta: e.delta || 1
									}
								}, e)
							})
						},
						navigateTo: function (e) {
							f(function () {
								i("invokeMiniProgramAPI", {
									name: "navigateTo",
									arg: {
										url: e.url
									}
								}, e)
							})
						},
						redirectTo: function (e) {
							f(function () {
								i("invokeMiniProgramAPI", {
									name: "redirectTo",
									arg: {
										url: e.url
									}
								}, e)
							})
						},
						switchTab: function (e) {
							f(function () {
								i("invokeMiniProgramAPI", {
									name: "switchTab",
									arg: {
										url: e.url
									}
								}, e)
							})
						},
						reLaunch: function (e) {
							f(function () {
								i("invokeMiniProgramAPI", {
									name: "reLaunch",
									arg: {
										url: e.url
									}
								}, e)
							})
						},
						postMessage: function (e) {
							f(function () {
								i("invokeMiniProgramAPI", {
									name: "postMessage",
									arg: e.data || {}
								}, e)
							})
						},
						getEnv: function (n) {
							f(function () {
								n({
									miniprogram: "miniprogram" === e.__wxjs_environment
								})
							})
						}
					}
				},
				b = 1,
				R = {};
			return S.addEventListener("error", function (e) {
				if (!M) {
					var n = e.target,
						i = n.tagName,
						t = n.src;
					if (("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) && -1 != t.indexOf("wxlocalresource://")) {
						e.preventDefault(), e.stopPropagation();
						var o = n["wx-id"];
						if (o || (o = b++, n["wx-id"] = o), R[o]) return;
						R[o] = !0, wx.ready(function () {
							wx.getLocalImgData({
								localId: t,
								success: function (e) {
									n.src = e.localData
								}
							})
						})
					}
				}
			}, !0), S.addEventListener("load", function (e) {
				if (!M) {
					var n = e.target,
						i = n.tagName;
					n.src;
					if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {
						var t = n["wx-id"];
						t && (R[t] = !1)
					}
				}
			}, !0), n && (e.wx = e.jWeixin = N), N
		}
	});

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
		wx.updateAppMessageShareData({
				title: '试试手气,红包砸出来', // 分享标题
				desc: '关注"晟联保信"公众号，免费抽现金红包', // 分享描述
				link: "http://ii.sinelinked.com/sub/activity/lottery/",
				imgUrl: "http://ii.sinelinked.com/lib/img/logo.png" // 分享图标
			},
			function (res) {
				alert("成功");
				//这里是回调函数
			}
		);
	});

	wx.error(function (res) {
		alert("微信验证失败");
		alert(JSON.stringify(res));
	});
}