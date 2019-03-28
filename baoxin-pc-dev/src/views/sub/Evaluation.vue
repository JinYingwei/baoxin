<template>
	<div class="center">
		<div class="topBar">晟联保信 > 投诉/表扬</div>
		<div class="inpWrap">
			<div class="inpBox">
				<Tabs v-model="feedbackType">
					<TabPane label="建议投诉" name="1" class="inpMain">
						<section>
							<h2>投诉建议登记</h2>
							<div>
								<label class="complaint" for="">投诉者电话 <span>*</span></label>
								<Input type="text" v-model="fbPersonPhone" size="large" placeholder="请输入投诉者电话" />
							</div>
							<div>
								<label class="complaint" for="">被投诉者电话 <span>*</span></label>
								<Input type="text" size="large" v-model="userPhone" placeholder="请输入被投诉者电话" />
							</div>
							<div>
								<label class="complaint" for="">顾问姓名 <span></span></label>
								<Input type="text" size="large" v-model="userName" placeholder="请输入顾问姓名" />
							</div>
							<div class="clearfix">
								<Row>
								<label class="complaint" for="">联系时间 <span></span></label>
								<!-- <Input type="text" size="large" v-model="contact_time_str" placeholder="yyyy--MM-dd" /> -->
								<Col span="12">
									<DatePicker type="date" v-model="contactTimeStr" placeholder="请输入联系时间" style="width: 200px"></DatePicker>
								</Col>
								</Row>
							</div>
							<div>
								<label class="complaint" for="">投诉选项 <span></span></label>
								<CheckboxGroup v-model="checkAllGroup">
									<Checkbox label="未联系"></Checkbox>
									<Checkbox label="沟通简单不顺心"></Checkbox>
									<Checkbox label="语言粗鲁无礼"></Checkbox>
									<Checkbox label="回复太慢(超过24小时)"></Checkbox>
									<Checkbox label="已联系但不能提供帮助"></Checkbox>
									<Checkbox label="电话时间不合适(太晚/太早)"></Checkbox>
									<Checkbox label="其它"></Checkbox>
								</CheckboxGroup>
							</div>
							<div>
								<label class="complaint" for="">留言内容 <span></span></label>
								<Input v-model="content" type="textarea" :rows="5" placeholder="请输入内容" />
							</div>
							<div class="btnBox">
								<Button type="primary" @click="submit">提交</Button>
							</div>
						</section>
					</TabPane>
					<TabPane label="表扬页面" name="2" class="inpMain">
						<section>
							<h2>表扬建议登记</h2>
							<div>
								<label class="complaint" for="">表扬者电话 <span>*</span></label>
								<Input type="text" v-model="fbPersonPhone2" size="large" placeholder="请输入表扬者电话" />
							</div>
							<div>
								<label class="complaint" for="">被表扬顾问电话 <span>*</span></label>
								<Input type="text" size="large" v-model="userPhone2" placeholder="请输入被表扬顾问电话" />
							</div>
							<div>
								<label class="complaint" for="">顾问姓名 <span></span></label>
								<Input type="text" size="large" v-model="userName2" placeholder="请输入顾问姓名" />
							</div>
							<div class="clearfix">
								<Row>
									<label class="complaint" for="">联系时间 <span></span></label>
									<!-- <Input type="text" size="large" v-model="contact_time_str2" placeholder="yyyy--MM-dd" /> -->
									<Col span="12">
										<DatePicker type="date" v-model="contactTimeStr2" placeholder="请输入联系时间" style="width: 200px"></DatePicker>
									</Col>
								</Row>
							</div>
							<div>
								<label class="complaint" for="">表扬选项 <span></span></label>
								<CheckboxGroup v-model="checkAllGroup">
									<Checkbox label="回复及时"></Checkbox>
									<Checkbox label="业务专业"></Checkbox>
									<Checkbox label="交流愉快"></Checkbox>
									<Checkbox label="其他"></Checkbox>
								</CheckboxGroup>
							</div>
							<div>
								<label class="complaint" for="">留言内容 <span></span></label>
								<Input v-model="content2" type="textarea" :rows="5" placeholder="请输入内容" />
							</div>
							<div class="btnBox">
								<Button type="primary" @click="submit">提交</Button>
							</div>
						</section>
					</TabPane>
				</Tabs>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				feedbackType: "1", //0 投诉  1表扬
				userPhone: "", //投诉者/表扬者电话
				userName: "", //姓名
				contactTimeStr: "", //联系时间
				content: "", //留言内容
				fbPersonPhone: "", //被投诉/表扬电话
				feedbackOptions: "", //选项
				checkAllGroup: [], //多选框
				
				userPhone2:"",
				userName2:"",
				content2:"",
				fbPersonPhone2:"",
				contactTimeStr2:"",
			}
		},
		
		methods: {
			submit() {
				var assess_optionsStr = ''
				for (var i = 0; i < this.checkAllGroup.length; i++) {
					assess_optionsStr += this.checkAllGroup[i] + ','
				}
				//正则匹配电话是否输入
				var re = /^1[34578]\d{9}$/
				if (!(re.test(this.userPhone))) {
					this.$Message.error('请输入正确的手机号');
					return
				} else if (!(re.test(this.fbPersonPhone))) {
					this.$Message.error('请输入正确的手机号');
					return
				}


				var data = {
					feedbackType: this.feedbackType,
					userName: this.userName,
					userPhone: this.userPhone,
					content: this.content,
					fbPersonPhone: this.fbPersonPhone,
					contactTimeStr: this.contactTimeStr,
					feedbackOptions: assess_optionsStr
				}
				var data2 = {
					feedbackType: this.feedbackType,
					userName: this.userName2,
					userPhone: this.userPhone2,
					content: this.content2,
					fbPersonPhon: this.fbPersonPhone2,
					contactTimeStr: this.contactTimeStr2,
					feedbackOptions: assess_optionsStr
				}

				if (this.feedbackType == 1) {
					this.$axios({
							method: "get",
							url: this.$GLOBAL.baseURL+"/api/feedback/add",
							params: data
						})
						.then(result => {
							if (result.data.code == 0) {
								this.$Message.info('提交成功');
							}
						})
						.catch(err => {
							this.$Message.error('提交失败');
						});
				}
				if (this.feedbackType == 2) {
					this.$axios({
							method: "get",
							url: this.$GLOBAL.baseURL+"/api/feedback/add",
							params: data2
						})
						.then(result => {
							if (result.data.code == 0) {
								this.$Message.info('提交成功');
							}
						})
						.catch(err => {
							this.$Message.error('提交失败');
						});
				}

			}
		}
	}
</script>

<style scoped>
.topBar {
	padding-left: 20px;
	height: 45px;
	line-height: 45px;
	background: #3d6cc8;
	color: #fff;
}
.inpWrap {
	width: 960px;
	margin: 0 auto;
	background: #fff;
	padding: 20px;
}

.inpBox {
	width: 650px;
	margin: 0 auto;
}

.tList {
	text-align: center;
}

.tList li {
	display: inline-block;
	line-height: 40px;
	font-size: 18px;
	margin: 0 10px;
	padding: 0 15px;
	cursor: pointer;
}

.active {
	color: #3d6cc8;
	border-bottom: 2px solid #3d6cc8;
}

.inpMain {
	border-radius: 6px;
	padding: 10px;
	margin-top: 40px;
	margin-left: 5px;
	width: 642px;
	border: 1px solid #ddd;
}

.inpMain section>div {
	margin-bottom: 15px;
	line-height: 36px;
}

.inpMain h2 {
	text-align: center;
	color: #3d6cc8;
	font-weight: normal;
	font-size: 16px;
	line-height: 40px;
	border-bottom: 2px solid #f6f6f6;
	margin-bottom: 36px;
}

.complaint {
	width: 130px;
	padding: 0 15px 0 0;
	display: inline-block;
	text-align: right;
	font-size: 14px;
	float: left;
}

.complaint span {
	color: #f00;
}

section>>>.ivu-input-wrapper {
	display: inline-block;
	width: 360px;
}

.ivu-checkbox-group {
	padding: 0 100px;
	font-size: 20px;
}

.ivu-checkbox-group-item {
	font-size: 16px;
}

.ivu-input-wrapper {
	vertical-align: top;
}

.inpMain .btnBox {
	text-align: center;
}

/* .ivu-tabs {
	padding-bottom: 6px;
} */

.inpBox>>>.ivu-tabs-bar {
	border-bottom: none;
}

.inpBox>>>.nav-text {
	margin-left: 200px;
	font-size: 16px;
}
>>>.ivu-checkbox-group{
	margin-left: 30px;
}
</style>
