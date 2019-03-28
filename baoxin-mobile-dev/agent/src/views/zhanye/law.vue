<template>
	<div class="top-bg">
		.
		<div class="shadow-box center" id="law" style="height:80vh">
			<h3 class="shareTitle">法律咨询</h3>
			<van-cell-group>
				<van-field style="min-height:20vh" v-model="message" type="textarea" placeholder="您的专业法律咨询师，您在工作中有什么关于法律的需求，或者问题，欢迎咨询。" rows="2" autosize />
				<van-field v-model="username" clearable placeholder="请输入姓名" />
				<van-field v-model="phone" type="password" placeholder="请输入手机号码" />
				<van-field @focus="showAreaPick" placeholder="请选择地区" readonly v-model="address" />
				<van-area v-show="isShowAreaPick" :area-list="areaList" columns-num='2' @confirm="chooseOk" @cancel="chooseNo" />
			</van-cell-group>
			<div class="btnSubmit">
				<br>
			<van-button type="primary" size="large" @click="lawSubmit">提交</van-button>
			<br>
			<br>
		</div>
		</div>
		<br>
		
	</div>
</template>

<script>
import AreaList from "@/assets/js/area";


export default {
  data() {
    return {
      message: "",
      username: "",
      phone: "",
      address: "",
      areaList: AreaList, //地区数据
      isShowAreaPick: false //是否显示地区选择器
    };
  },
  methods: {
    //展示地区选择器
    showAreaPick() {
      this.isShowAreaPick = true;
    },
    //地址选择完成
    chooseOk(data) {
      console.log(data);
      this.address = data[0].name + " " + data[1].name;
      this.isShowAreaPick = false;
    },
    //隐藏地区选择器
    chooseNo() {
      this.isShowAreaPick = false;
    },
    // 提交
    lawSubmit() {
      this.$toast.fail("完善中...");
    }
  }
};
</script>

<style scoped>
.shareTitle {
  text-align: center !important;
  font-weight: bold;
}
.center {
  width: 88%;
  /* margin-top: 1.333333rem  */
  padding-top:6px;
  margin-top: 6px;
}
.top-bg {
  background: url(../../assets/img/top_bg.png) no-repeat;
  background-size: 100%;
  min-height: 100vh;
}
.btnSubmit {
  text-align: center;
}
.btnSubmit .van-button--primary {
  background: #4e8cee;
  border: none;
  /* width: 4.08rem */ /* 306/75 */
  margin: 0 auto;
}

#law .van-field{
	border: 1px solid #eee;
	border-radius: .213333rem /* 16/75 */;
	margin-bottom: .213333rem /* 16/75 */;
}
#law .van-field::after{
	border: none
}
</style>
