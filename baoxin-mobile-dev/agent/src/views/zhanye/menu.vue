<template>
	<div>
		<div class="qinqiu">
      <a href="javascript:;" target="_blank">
        <img src="../../assets/img/reg_welfare.jpg" alt="">
      </a>
    </div>
		<ul class="zhenye-box">
			<li>
				<router-link to="/practice/client" tag='div'>
					<img src="../../assets/img/khgl.png" alt="">
					<p>客户管理</p>
				</router-link>
			</li>
			<!-- <li>
				<router-link to="/practice/law" tag='div'>
					<img src="../../assets/img/flgw.png" alt="">
					<p>法律顾问</p>
				</router-link>
			</li> -->
			<li>
				<router-link to="/practice/custom" tag='div'>
					<img src="../../assets/img/hb.png" alt="">
					<p>分享</p>
				</router-link>
			</li>
			<!-- <li @click="developing">
					<img src="../../assets/img/jhs.png" alt="">
					<p>计划书</p>
			</li> -->
			<li>
				<router-link to="/practice/teamMange" tag='div'>
					<img src="../../assets/img/team.png" alt="">
					<p>我的团队</p>
				</router-link>
			</li>
			<li>
				<router-link to="/practice/pan" tag='div'>
					<img src="../../assets/img/pan.png" alt="">
					<p>资料库</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>

	export default {
		name:'practiceMenu',
		methods: {
			developing() {
				 this.$toast('敬请期待~');
			}
		},
	}
</script>

<style scoped>
.zhenye-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding-top: 20px;
		padding-left: 30px;
		padding-right: 30px;
	}

	.zhenye-box li {
		text-align: center;
		width: 40%;
		padding-top: 20px;
		padding-bottom: 36px;
		border-radius: 12px;
		background: #fff;
		box-shadow: 0 0 10px rgba(0, 0, 0, .2);
		box-sizing: border-box;
		margin-bottom: 20px;
		/* margin-left:22px; */
		position: relative;
	}

	.zhenye-box li img {
		/* height: 80px; */
		width: 54%
	}

	.zhenye-box li p {
		position: absolute;
		width: 100%;
		text-align: center;
		bottom: 0;
	}
.qinqiu {
  margin: 0 auto;
}
.qinqiu img {
  width: 100%;
}
</style>