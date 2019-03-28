<template>
	<div>
		<div class="shadow-box center">
			<h3 class="shareTitle">分享显示选项</h3>

			<van-cell-group>

				<!-- <van-switch-cell @change="jiTangCheckHandle" v-model="sharItems.jiTangCheck" shareId="sharItems.jiTangCheck" title="每日鸡汤" /> -->
				<!-- <van-switch-cell @change="yiTuCheckHandle" v-model="sharItems.yiTuCheck" shareId="21" title="每日一图" />
				<van-switch-cell @change="yaoWenCheckHandle" v-model="sharItems.yaoWenCheck" shareId="22" title="每日要闻" />
				<van-switch-cell @change="huangLiCheckHandle" v-model="sharItems.huangLiCheck" shareId="19" title="黄历" />
				<van-switch-cell @change="guanDianCheckHandle" v-model="sharItems.guanDianCheck" shareId="18" title="观点" />
				<van-switch-cell @change="wenDaCheckHandle" v-model="sharItems.wenDaCheck" shareId="24" title="问答" /> -->

				<van-switch-cell @change="CheckHandle(item.shareId,item.checked)" v-for="(item,index) in sharItems" :key="index" v-model="item.checked" :title="item.title" />
			</van-cell-group>
		</div>
	</div>
	
</template>

<script>
import Vue from 'vue'
	import {Toast} from 'vant'
	import { Switch } from 'vant';
	Vue.use(Switch);
	export default {
		data() {
			return {
				categoryIds:'',//分享选项
				jiTangCheck: false, //每日鸡汤
				yiTuCheck: false, //每日一图
				yaoWenCheck: true, //每日要闻
				huangLiCheck: false, //黄历
				// liNianCheck: false, //理念
				guanDianCheck: false, //观点
				wenDaCheck: false, //问答
				sharItems:[
					{checked: false,shareId:'20',title:'每日鸡汤'},
					{checked: false,shareId:'21',title:'每日一图'},
					{checked: true,shareId:'22',title:'每日要闻'},
					{checked: false,shareId:'19',title:'黄历'},
					{checked: false,shareId:'18',title:'观点'},
					{checked: false,shareId:'24',title:'问答'},
				],
				updateUserColConfArr: [] //已选择的选项
			}
		},
		methods: {
			CheckHandle(id,checked) {
				if(checked){
					this.updateUserColConfArr.push(id)
				}else{
					this.updateUserColConfArr.splice(this.getIndex(id),1) 
				}
			},
			// 获取所选下选
			getIndex(val) {
				console.log(this.updateUserColConfArr)
				for (var i = 0; i < this.updateUserColConfArr.length; i++) {
					if (this.updateUserColConfArr[i] == val) {
						return i
					}
				}
			}
		},
		beforeRouteLeave(to, from, next) {
			for (var i = 0; i < this.updateUserColConfArr.length; i++) {
				this.categoryIds += this.updateUserColConfArr[i] + ','
			}

			if (to.name != 'share') {
				if (this.categoryIds) {
					this.axios({
							url: baseURL + '/api/user/updateUserColConf',
							method: "post",
							data: {
								categoryIds: this.categoryIds
							}
						})
						.then(result => {
							if (result.data.code == 0) {

							} else {
								this.$toast('配置出错');
							}
							next()
						})
						.catch(error => {
							this.$toast('配置出错');
							next()
						})
				}else{
					next()
				}

			}

		},
		created() {
			this.axios({
				url: baseURL + '/api/user/searchOrAddUserColConf',
				method: "post",
			})
			.then((result) => {
				if (result.data.code == 0) {
					var categoryIdsArr = result.data.data.categoryIds.split(',')
					for (let index = 0; index < categoryIdsArr.length-1; index++) {
						const element = categoryIdsArr[index];
						for(let index = 0; index < this.sharItems.length; index++){
							if(element ==  this.sharItems[index].shareId){
								this.sharItems[index].checked = true
							}
						}

					}
				}
			}).catch((err) => {
				
			});
		}
	}
</script>

<style scoped>
	.shareTitle {
		text-align: center;
	}
</style>
