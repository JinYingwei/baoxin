<template>
	<div>
		<div class="shadow-box center">
			<h3 class="shareTitle">名片产品显示选项</h3>

			<van-cell-group v-if="productShowType">
				<van-switch-cell @change="CheckHandle(item.productId,item.checked,index)" v-for="(item,index) in productItems" :key="index" v-model="item.checked" :title="item.title" />
			</van-cell-group>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				productItems:[
					{checked: false,productId:1,title:'公司产品'},
					{checked: false,productId:2,title:'免费产品'},
					{checked: false,productId:3,title:'自选产品'},
					{checked: true,productId:4,title:'平台优选'},
				],
				productChecked:4,
				productShowType:''
			}
		},
		methods: {
			CheckHandle(id,checked,index) {
				if(checked){
					this.productChecked = id
					for (var i = 0; i < this.productItems.length; i++) {
						if (this.productItems[i].productId != id) {
							  this.productItems[i].checked = false
						}
					}
					this.axios({
							url: baseURL + '/api/user/updateUserColConf',
							method: "post",
							data: {
								productShowType: this.productChecked
							}
						})
						.then(result => {
							if (result.data.code == 0) {

							} else {
								this.$toast('配置出错');
							}
						})
						.catch(error => {
							this.$toast('配置出错');
						})
				}

			},
		},
		created(){
			this.axios({
				url: baseURL + '/api/user/searchOrAddUserColConf',
				method: "post",
			})
			.then((result) => {
				if (result.data.code == 0) {
					var ids = result.data.data.productShowType
					this.productShowType =result.data.data.productShowType 
					if(this.productShowType){
						console.log(this.productShowType);
						for (var i = 0; i < this.productItems.length; i++) {
							this.productItems[i].checked = false
						if (this.productItems[i].productId == ids) {
							this.productItems[i].checked = true
						}
					}
					}
					
				}
			}).catch((err) => {
				
			});
		},
		// beforeRouteLeave(to, from, next) {
		// 	console.log(to, from)
		// 	if (to.name != 'product') {
		// 		if (this.productChecked) {
		// 			this.axios({
		// 					url: baseURL + '/api/user/updateUserColConf',
		// 					method: "post",
		// 					data: {
		// 						productShowType: this.productChecked
		// 					}
		// 				})
		// 				.then(result => {
		// 					if (result.data.code == 0) {

		// 					} else {
		// 						this.$toast('配置出错');
		// 					}
		// 					next()
		// 				})
		// 				.catch(error => {
		// 					this.$toast('配置出错');
		// 					next()
		// 				})
		// 		}else{
		// 			next()
		// 		}

		// 	}

		// },

	}
</script>

<style>
	.shareTitle{
		text-align: center;
	}
	.van-switch--on{
		background-color: #4e8cee;
	}
	.van-cell-group .van-switch-cell:nth-child(1) .van-cell__title :before{
		content: '';
		display: inline-block;
		width: 16px;
		height: 16px;
		background: #000;
		vertical-align: middle;
		margin-right: 6px;
		background:url(../../assets/img/ceng.png) no-repeat;
		background-size: cover
	}
	.van-cell-group .van-switch-cell:nth-child(2) .van-cell__title :before{
		content: '';
		display: inline-block;
		width: 16px;
		height: 16px;
		background: #000;
		vertical-align: middle;
		margin-right: 6px;
		background:url(../../assets/img/product.png) no-repeat;
		background-size: cover
	}
	.van-cell-group .van-switch-cell:nth-child(3) .van-cell__title :before{
		content: '';
		display: inline-block;
		width: 16px;
		height: 16px;
		background: #000;
		vertical-align: middle;
		margin-right: 6px;
		background:url(../../assets/img/zixuan.png) no-repeat;
		background-size: cover
	}
	.van-cell-group .van-switch-cell:nth-child(4) .van-cell__title :before{
		content: '';
		display: inline-block;
		width: 16px;
		height: 16px;
		background: #000;
		vertical-align: middle;
		margin-right: 6px;
		background:url(../../assets/img/youxuan.png) no-repeat;
		background-size: cover
	}
	
</style>
