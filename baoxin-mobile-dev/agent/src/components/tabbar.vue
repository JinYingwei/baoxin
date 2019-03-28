<template>
	<div>
		<ul id="tabbar">
			<router-link tag='li' :class="{ 'active':index == selected }" :to="{name:item.name}" @click="selectHandle(index)"  v-for="(item,index) in title" :key="index">
				<i class="iconfont" :class="item.icon"></i>
				<strong>{{ item.title }}</strong>
			</router-link>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "tabbar",
		data: function () {
			return {
				selected:2,
				title: ['学习', '展业', '接单', '消息', '我的'],
				title:[
					{title:'学习',icon:'icon-xuexi',name:'learn'},
					{title:'展业',icon:'icon-iconwoyaozhanye',name:'practiceMenu'},
					{title:'接单',icon:'icon-jiedan1',name:'takeOrder'},
					{title:'消息',icon:'icon-xiaoxi',name:'message'},
					{title:'我的',icon:'icon-wode1',name:'mineMenu'}
				],
			};
		},
		methods: {
			selectHandle(index){
				this.selected = index;
			},
			//底部导航的处理 
			changeTabBarActive() {
        var nowName = this.$route.name;
        var fullPath = this.$route.fullPath
				var fullPathItem = fullPath.split('/')
				var nowPath = this.$route.matched[0].path
				switch(true){
					case fullPathItem.includes('learn'):
						this.selected = 0;
						break;
					case fullPathItem.includes('details'):
						this.selected = 0;
						break;
					case fullPathItem.includes('message'):
					this.selected = 3;
					break;
          case fullPathItem.includes('practice'):
						this.selected = 1;
						break;
          case '/mine':
          case fullPathItem.includes('mine'):
						this.selected = 4;
					break;
					default :	
					this.selected = 2;
				}
				
			},
		},
		watch: {
			'$route'(){
				this.changeTabBarActive()
			}
		},
		created(){
			this.changeTabBarActive()
		}
	};
</script>

<style scoped>
#tabbar{
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 1.6rem /* 120/75 */;
	background: #fff;
	display: flex;
	align-items: center;
	box-shadow: 0 -0.02rem /* 6/75 */ 0.4rem /* 6/75 */ rgba(0, 0, 0, .1)
}
#tabbar .iconfont{
	font-size: .666667rem /* 50/75 */;
	color:#9399a7;
}
#tabbar li{
	text-align: center;
	flex: 1
}
#tabbar li.active{
	color: #4e8dee
}
#tabbar li.active .iconfont{
	color: #4e8dee
}
#tabbar strong{
	display: block;
	font-weight: normal
}
#tabbar li.router-link-exact-active .iconfont{
	color: #4e8dee
}
#tabbar li.router-link-exact-active .icon-jiedan1{
	font-size:.853333rem /* 64/75 */;
}
#tabbar li.router-link-exact-active strong{
	color: #4e8dee
}
.active .iconfont{
	color: #4e8dee
}
.active .icon-jiedan1{
	color: #4e8dee
}
.active strong{
	color: #4e8dee
}
#tabbar li .icon-jiedan1{
	display: block;
	margin: 0 auto;
	background: #4e8dee;
	width:1.333333rem /* 100/75 */;
	height:1.333333rem /* 100/75 */;
	line-height:1.333333rem /* 100/75 */;
	border-radius: 50%;
	position: relative;
	color: #fff !important;
	top: -.4rem /* 30/75 */;
	border: .133333rem /* 10/75 */ solid #fff;
	font-size: .8rem /* 60/75 */;
	transition: .2s linear;
}
#tabbar li .icon-jiedan1 + strong{
	position: relative;
	top: -.403333rem /* 10/75 */
}
</style>
