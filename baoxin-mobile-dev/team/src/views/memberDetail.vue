<template>
	<div>
		<div class="center shadow-box" id="memberDetails">
			<!-- <h3 class="shareTitle">成员详情</h3>
			<van-cell-group>
				<van-field label="姓名" :placeholder="agentData.userName" disabled />
				<van-field label="电话" :placeholder="agentData.phone" disabled />
				<van-field label="工号" :placeholder="agentData.jobNumber" disabled />
				<van-field label="区域" :placeholder="address" disabled />
				<van-field label="职业证书编号" :placeholder="agentData.certificateNo" disabled />
				<van-field label="所属代理公司" :placeholder="agentData.companyName" disabled />
				<van-field type="textarea" :placeholder="agentData.personSummary" v-model="agentData.personSummary" rows="1" autosize disabled/>
			</van-cell-group>
			<br>
			<div class="btnbox">
				<van-button size="normal" @click="pointTeamStar" type="primary">指定团队明星</van-button>
				<van-button size="normal" @click="delTeamMember" type="warning">删除该成员</van-button>
			</div> -->

			<div class="member-center">
				<div class="top-con">
					<h5><strong>{{ agentData.userName }}</strong><span>{{ address }}</span></h5>
					<h4>
						<a :href="'tel:'+ agentData.phone ">TEL:{{ agentData.phone }}</a>
						<div class="send-msg" @click="showMsgLayer">
							<van-icon name="chat" class="baseColor" />
							<span class="baseColor">发消息</span>
						</div>
					</h4>
				</div>
				<div class="mid-con">
					<li><label>执业证书编号</label><span>{{ agentData.certificateNo }}</span></li>
					<li><label>所属公司</label><span>{{ agentData.companyName }}</span></li>
					<li><label>工号</label><span>{{ agentData.jobNumber }}</span></li>
				</div>
				<div class="bottom-con">
					{{ agentData.personSummary }}
				</div>
				<!-- <div class="order-con">
					<p class="baseColor">历史接单/点单：825/485</p>
					<p class="orange">今日接单/点单：135/102</p>
				</div> -->
				<div class="btn-con">
					<van-button size="normal" @click="pointTeamStar">指定团队明星</van-button>
					<van-button size="normal" @click="delTeamMember">删除该成员</van-button>
				</div>
			</div>
		</div>
		<!-- 发送消息弹层 -->
			<van-popup id="mangeMsgLayer" v-model="msgLayer" position="right"  :overlay="false" :close-on-click-overlay="false">
				<div id="mangeMsg">
          <div class="center shadow-box">
            <h3 class="shareTitle">发送通知</h3>
            <van-cell-group>
              <van-field style="min-height:20vh" v-model="message" type="textarea" placeholder="请输入通知内容" rows="3" autosize />
            </van-cell-group>
            <div class="messageBtn">
              <van-button size="normal" @click="addTeamMsg">发送</van-button>
            </div>

            <router-link tag="div" to="/sendSms">
              <div class="msgHistory">历史通知</div>
              <br>
            </router-link>
          </div>
        </div>
			</van-popup>
	</div>
</template>

<script>
import { Toast } from "vant";
import cityData from "../assets/js/region.js";
import utils from "../assets/js/utils.js";
export default {
  data() {
    return {
      agentId: "",
      agentData: {},
			address: "" ,//转换后的地址
			msgLayer: false,
			message: "", //通知内容
    };
  },
  methods: {
    //获取团队人员接口
    search() {
      this.axios({
        url: baseURL + "/api/XCX/agent/search",
        method: "get",
        params: {
          agentId: this.agentId
        }
      })
        .then(result => {
          this.agentData = result.data[0];
          if (result.data[0]) {
            this.teamData = result.data[0];
            this.personImgHeadResult = this.teamData.headImg;
						//转换地址
						if(result.data[0].area){
							var sheng = result.data[0].area.split("|")[0]
							var shi = result.data[0].area.split("|")[1]
							this.address = utils.getCityResult(cityData, sheng,shi);
						}
            
          }
        })
        .catch(error => {});
    },
    // 删除成员
    delTeamMember() {
      this.axios({
        method: "post",
        url: baseURL + "/api/user/delTeamMember",
        params: {
          agentId: this.agentId
        }
      })
        .then(function(response) {
          Toast("删除成功");
        })
        .catch(function(error) {
          console.log(error.response);
          if (error.response.data.code == 0) {
            Toast("删除成功");
            that.$router.push("/manage");
            
          }else{
            Toast("删除失败");
          }
        });
    },
    //指定团队明星
    pointTeamStar() {
      this.axios({
        method: "post",
        url: baseURL + "/api/user/pointTeamStar",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        params: {
          agentId: this.agentId
        }
      })
        .then(function(response) {
          console.log(response);
          if (response.data.code == 0) {
            Toast("指定团队明星成功");
          }
        })
        .catch(function(error) {
          Toast(error.response.data.error);
        });
		},
		// show-msgLayer
		showMsgLayer(){
			this.msgLayer = true;
		},
		    //发送消息
    addTeamMsg() {
      if(this.message.length >150){
         Toast('通知内容最多150个字符');
         return
      }
      this.axios({
        url: baseURL + "/api/user/addTeamMsg",
        method: "post",
        data: {
          megForwardId:this.agentId,
          title: "消息通知",
          content: this.message
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            this.message = "";
            Toast.success("发送成功");
          } else {
            Toast.fail("发送失败");
          }
        })
        .catch(error => {
          Toast.fail(error.response.data.error);
        });
    }
  },
  created() {
    this.agentId = this.$route.params.id;
    this.search();
  }
};
</script>

<style>
.shareTitle {
  text-align: center;
  font-weight: normal;
}
#memberDetails {
  background: #fff url(../assets/img/top_bg.png) no-repeat center top;
  background-size: contain;
  padding-top: 1.426667rem /* 107/75 */;
	box-sizing: border-box;
	min-height: 84vh;
}
#memberDetails .van-field .van-cell__title {
  max-width: 100px;
}
#memberDetails .member-center {
  width: 7.786667rem /* 584/75 */;
  margin: 0 auto;
}
#memberDetails .top-con {
  border-bottom: 1px solid #eee;
  padding-bottom: 0.133333rem /* 10/75 */;
}
#memberDetails .top-con > h5 {
  margin: 0;
}
#memberDetails .top-con > h4 {
  margin: 0;
  color: #808080;
  display: flex;
  justify-content: space-between;
  line-height: 0.933333rem /* 70/75 */;
}
#memberDetails .top-con > h4 a {
  color: #808080;
  font-weight: normal;
  font-size: 0.346667rem /* 26/75 */;
}
#memberDetails .baseColor {
  color: #3b6cc8;
  font-weight: normal;
}
#memberDetails .top-con > h4 .send-msg {
  color: #3b6cc8;
}
#memberDetails .top-con > h5 strong {
  font-size: 0.613333rem /* 46/75 */;
  font-weight: normal;
  padding-right: 0.373333rem /* 28/75 */;
}
#memberDetails .mid-con {
  padding: 0.266667rem /* 20/75 */ 0;
  border-bottom: 1px solid #eee;
}
#memberDetails .mid-con li {
  list-style: none;
  line-height: 0.666667rem; /* 50/75 */
}
#memberDetails .mid-con li label {
  font-size: 0.32rem /* 24/75 */;
  color: #8e8e8e;
  width: 3.466667rem /* 260/75 */;
  display: inline-block;
}
#memberDetails .mid-con li span{
	display: inline-block;
	text-overflow:ellipsis;
	white-space:nowrap;
  overflow: hidden;
  vertical-align: middle;
	max-width: 4rem /* 300/75 */
}
.btnbox {
  display: flex;
  justify-content: space-around;
}

#memberDetails .bottom-con {
  padding: 0.533333rem /* 40/75 */ 0;
  border-bottom: 1px solid #eee;
}
.order-con {
  padding: 0.533333rem /* 40/75 */ 0;
  border-bottom: 1px solid #eee;
}

.orange {
  color: #e1a042;
}
#memberDetails .btn-con {
  display: flex;
  justify-content: space-around;
  padding: 0.533333rem /* 40/75 */ 0;
}
#memberDetails .btn-con button{
	color: #49516b;
	border-radius: .213333rem ;/* 16/75 */
	border: 1px solid #49516b
}

#mangeMsgLayer{
	width: 100%;
	top: 0;
	transform: translate(0)
}
#mangeMsgLayer .center{
	min-height: 84vh;
}
.messageBtn {
  padding-top: 15px;
  text-align: center;
}
.messageBtn .van-button--default {
  background: #4e8cee;
  color: #fff;
  padding: 0 30px;
  width: 100%;
}
.msgHistory {
  width: 2rem /* 150/75 */;
  margin: 0 auto;
  margin-top: 0.666667rem /* 50/75 */;
  font-size: 0.4rem /* 30/75 */;
  display: block;
  text-align: center;
  border-bottom: 1px solid #aaaaaa;
  color: #aaaaaa;
  padding-bottom: 4px;
}
</style>
