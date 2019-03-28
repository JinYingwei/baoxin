<template>
	<div>
		<div class="shadow-box center">
			<router-link tag="div" :to="{name:'person'}" class="mineUp">
				<img class="headImg" :src="agentData.headImg+'&'+Math.random()">
				<div class="headCon">
					<h3>{{ agentData.userName }}</h3>
					<p>修改个人信息</p>
				</div>
				<div class="toPerson">></div>
			</router-link>
			<van-cell title="个人介绍" icon="pending-orders" :to="{name:'introduce',params:{personIntro:agentData.personIntro}}" is-link>
				<van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
			</van-cell>
			<van-cell title="个人秀" icon="star-o" :to="{name:'show'}" is-link>
				<van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
			</van-cell>
			<van-cell title="转发封面" icon="exchange-record" :to="{name:'forward',params:{agentData:agentData}}" is-link>
				<van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
			</van-cell>
			<van-cell title="产品" icon="pending-orders" :to="{name:'product'}" is-link>
				<van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
			</van-cell>
			<van-cell title="充值" icon="after-sale" :to="{name:'pay'}" is-link>
				<van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
			</van-cell>
			<van-cell title="登陆方式" icon="tosend" :to="{name:'loginType',query:{phone:agentData.phone}}" is-link>
				<van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
			</van-cell>
			<van-cell title="帮助" icon="question" :to="{name:'help'}" is-link>
				<van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
			</van-cell>
			<p class="wxCodeTitle">{{ showQrCodePath == true ? '长按识别进入顾问名片' :'完善资料后生成专属太阳码' }}</p>
			<div v-show="showQrCodePath" class="wxCodeBox" @touchstart.stop.prevent="hideWxcode" :class="{scale:isScale}">
				<img @touchstart.stop="codeScale" class="wxCode"  :src="qrCodePath">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				qrCodePath: '', //二维码
				agentData: {}, //顾问信息
				showQrCodePath:false,
				isScale:false
			}
		},
		methods: {
			//查询顾问信息
			search() {
				var that = this;
				this.axios({
						method: "get",
						url: baseURL + '/api/agent/search',
					})
					.then(result => {
						this.agentData = result.data[0]
						var img = document.createElement('img')
						if(result.data[0].qrCodePath){
							img.src = that.qrCodePath = 'http://bxpt-bucket.oss-cn-beijing.aliyuncs.com/bx/user/agent/'+result.data[0].userId+'/qrCode/code_white.jpg'
							img.onload = function(){
								that.qrCodePath = 'http://bxpt-bucket.oss-cn-beijing.aliyuncs.com/bx/user/agent/'+result.data[0].userId+'/qrCode/code_white.jpg'
								that.showQrCodePath = true
							}
							img.onerror = function(){
								that.qrCodePath = ''
								that.showQrCodePath = false
							}

						}else{
							that.showQrCodePath = false
						}
						
						
						
					})
					.catch(err => {
						console.log(err)
					})
			},
			codeScale(){
				this.isScale = true;
			},
			hideWxcode(){
				this.isScale = false;
			}
		},
		created() {
			this.search()
		}
	}
</script>

<style scoped>
	.mineUp {
		background: #4e8cee;
		height: 3.013333rem
			/* 226/75 */
		;
		padding-left: 0.48rem
			/* 36/75 */
		;
		padding-right: 0.48rem
			/* 36/75 */
		;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: relative;
		border-top-left-radius:  0.426667rem /*32/75*/	;
		border-top-right-radius:  0.426667rem /*32/75*/	;	
		/* border-radius: 0.426667rem */
	}

	.shadow-box {
		padding: 0;
		border-radius: 0.426667rem
			/*32/75*/
		;
		overflow: hidden;
	}

	.headImg {
		width: 1.813333rem
			/* 136/75 */
		;
		height: 1.813333rem
			/* 136/75 */
		;
		border-radius: 50%;
		border: 2px solid #fff;
		margin-left: .6rem
			/* 45/75 */
		;
		display: inline-block;
		/* background: url(../../assets/img/crm-head.png); */
		/* background-size: cover; */
	}

	.headCon {
		display: inline-block;
		margin-left: .586667rem
			/* 44/75 */
		;
	}

	.headCon h3 {
		font-size: .48rem
			/* 36/75 */
		;
		color: #fff;
		font-weight: normal;
		margin: 0;
	}

	.headCon p {
		margin: 0;
		font-size: .293333rem
			/* 22/75 */
		;
		line-height: .933333rem
			/* 70/75 */
		;
		color: #fff;
		opacity: .5;
		display:none;
	}

	.toPerson {
		color: #fff;
		position: absolute;
		right: .4rem
			/* 30/75 */
		;
		font-family: serif;
		font-size: .666667rem
			/* 50/75 */
	}
	.wxCode{
		transition: .3s;
	}
	.wxCodeBox.scale{
		width: 100%;
		height: 100%;		
		background: rgba(0, 0, 0, .5);
		position: fixed;
		top: 0;
		left: 0;
	}
	.scale img{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%);
		border-radius: 50%;
		box-shadow: 0 0 .266667rem /* 20/75 */ rgba(0, 0, 0, .4)
	}
</style>
