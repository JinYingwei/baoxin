<template>
	<div>
		<div class="shadow-box center">
			<router-link tag="div" :to="{name:'person'}">
				<div class="mineUp">
					<img class="headImg" :src="agentData.headImg+'&'+Math.random()">
					<div class="headCon">
						<h3>{{ agentData.userName }}</h3>
						<p>修改团队信息</p>
					</div>
					<div class="toPerson">></div>
				</div>
			</router-link>
      <!-- <van-cell title="团队介绍" icon="pending-orders" :to="{name:'introduce',params:{personIntro:agentData.personIntro}}" is-link>
				<van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
			</van-cell> -->
      <van-cell title="费用管理" icon="gold-coin-o" :to="{name:'teamCharge'}" is-link>
				<van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
			</van-cell>
			<van-cell title="团队秀" icon="like-o" :to="{name:'show'}" is-link>
				<van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
			</van-cell>
			<van-cell title="转发封面" icon="share" :to="{name:'forward',params:{agentData:agentData}}" is-link>
				<van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
			</van-cell>
      <van-cell title="系统消息" icon="volume-o" :to="{name:'message'}" is-link>
				<van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
			</van-cell>
      <van-cell title="帮助" icon="question-o" :to="{name:'help'}" is-link>
				<van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" />
			</van-cell>
			<p class="wxCodeTitle">{{ showQrCodePath == true ? '长按识别进入团队名片' :'完善资料后生成专属太阳码' }}</p>
			<div class="wxCodeBox" @touchstart.stop.prevent="hideWxcode" :class="{scale:isScale}">
				<img @touchstart.stop="codeScale" class="wxCode" :src="qrCodePath">
			</div>

		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      qrCodePath: "", //二维码
      showQrCodePath:true,
      agentData: {}, //顾问信息
      isScale: false,
      money: 0, //余额
      arrearage: 0 //欠费金额
    };
  },
  methods: {
    //查询顾问信息
    search() {
      var that = this;
      this.axios({
        method: "get",
        url: baseURL + "/api/team/search"
      })
        .then(result => {
          if (result.data[0]) {
            this.agentData = result.data[0];
            var img = document.createElement('img')
						if(result.data[0].qrCodePath){
							img.src = that.qrCodePath = 'http://bxpt-bucket.oss-cn-beijing.aliyuncs.com/bx/user/team/'+result.data[0].userId+'/qrCode/code_white.jpg'
							img.onload = function(){
								that.qrCodePath = 'http://bxpt-bucket.oss-cn-beijing.aliyuncs.com/bx/user/team/'+result.data[0].userId+'/qrCode/code_white.jpg'
								that.showQrCodePath = true
							}
							img.onerror = function(){
								that.qrCodePath = ''
								that.showQrCodePath = false
							}

						}else{
							that.showQrCodePath = false
						}
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取团队余额、欠费金额
    getTeamMoneyInfo() {
      this.axios({
        method: "get",
        url: baseURL + "/api/money/getTeamMoneyInfo"
      })
        .then(result => {
          if (result.data.code == 0) {
            this.money = result.data.data.money;
            this.arrearage = result.data.data.arrearage;
          }
        })
        .catch(err => {
        });
    },
    codeScale() {
      this.isScale = true;
    },
    hideWxcode() {
      this.isScale = false;
    }
  },
  created() {
    this.search();
    this.getTeamMoneyInfo();
  },
};
</script>

<style scoped>
.mineUp {
  background: #4e8cee;
  height: 3.013333rem /* 226/75 */;
  padding-left: 0.48rem /* 36/75 */;
  padding-right: 0.48rem /* 36/75 */;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  border-top-left-radius: 0.426667rem /*32/75*/;
  border-top-right-radius: 0.426667rem /*32/75*/;

  /* border-radius: 0.426667rem */
}

.shadow-box {
  padding: 0;
  border-radius: 0.426667rem /*32/75*/;
  overflow: hidden;
}

.headImg {
  width: 1.813333rem /* 136/75 */;
  height: 1.813333rem /* 136/75 */;
  border-radius: 50%;
  border: 2px solid #fff;
  margin-left: 0.6rem /* 45/75 */;
  display: inline-block;
}

.headCon {
  display: inline-block;
  margin-left: 0.586667rem /* 44/75 */;
}

.headCon h3 {
  font-size: 0.48rem /* 36/75 */;
  color: #fff;
  font-weight: normal;
  margin: 0;
}

.headCon p {
  margin: 0;
  font-size: 0.293333rem /* 22/75 */;
  line-height: 0.933333rem /* 70/75 */;
  color: #fff;
  opacity: 0.5;
  /* display:none; */
}

.toPerson {
  color: #fff;
  position: absolute;
  right: 0.4rem /* 30/75 */;
  font-family: serif;
  font-size: 0.666667rem;
  /* 50/75 */
}
.wxCode {
  transition: 0.3s;
}
.wxCodeBox.scale {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
.scale img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 50%;
  box-shadow: 0 0 0.266667rem /* 20/75 */ rgba(0, 0, 0, 0.4);
}
.const {
  display: flex;
  justify-content: space-between;
  background: #4e8cee;
  box-sizing: border-box;
  padding: 0.4rem /* 30/75 */ 1.253333rem /* 94/75 */;
  color: #fff;
}
.const > div {
  text-align: center;
}
.const > div strong {
  font-weight: normal;
  font-size: 0.266667rem /* 20/75 */;
}
.const > div h3 {
  font-weight: normal;
  font-size: 0.48rem /* 36/75 */;
  margin: 0;
}
.moneyMange {
  width: 98%;
  margin: 0 auto;
  line-height: 1.28rem /* 96/75 */;
  display: flex;
  justify-content: space-around;
  color: #4e8cee;
  font-size: 0.4rem /* 30/75 */;
  border-bottom: 1px solid #eee;
}
</style>
