<template>
	<div class="shadow-box center minHeight">
		<van-collapse v-model="activeNames" accordion>
			<van-collapse-item :name="index+1" v-for="(item,index) in clientList" :key="index">
				<div slot="title">
					<van-icon name="contact" />
					<span class="listName">{{item.customName}}</span>
					<span class="listArea">{{item.customArea}}</span>
				</div>
				<div class="content">
					<van-field label="姓名" :placeholder="item.customName || '无'" disabled />
					<van-field label="性别" :placeholder="item.customSex || '无'" disabled />
					<van-field label="电话" :placeholder="item.customPhone || '无'" disabled />
					<van-field label="微信" :placeholder="item.customWechartQq || '无'" disabled />
					<van-field label="区域" :placeholder="item.customArea || '无'" disabled />
					<van-field label="婚姻状况" :placeholder="item.customMaritalStauts || '无'" disabled />
					<van-field label="民族" :placeholder="item.customNation || '无'" disabled />
					<van-field label="学历" :placeholder="item.customEducation || '无'" disabled />
					<van-field label="职业" :placeholder="item.customProfession || '无'" disabled />
					<van-field label="备注" type="textarea" :placeholder="item.remark || '无'" rows="1" autosize disabled />
				</div>
			</van-collapse-item>
		</van-collapse>
		<p v-show="hasClient" class="null-tip">
			<van-icon name="info-o" /><span>暂无客户</span></p>
	</div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: "0",
      clientList: [],
      hasClient: true
    };
  },
  methods: {
    // 获取客户数据
    getClientList() {
      this.axios({
        method: "get",
        url: baseURL + "/api/agent/customer/searchList"
      })
        .then(result => {
          if (result.data.code == 0 && result.data.data.items.length) {
            this.hasClient = false;
            this.clientList = result.data.data.items;
          }
        })
        .catch(err => {});
    }
  },
  created() {
    this.getClientList();
  }
};
</script>

<style scoped>
.minHeight {
  min-height: 83vh;
}
.listName {
  padding-left: 20px;
}

.listArea {
  padding: 0 12px;
  float: right;
}

.content .van-cell {
  padding-top: 8px;
  padding-bottom: 10px;
}
.null-tip {
	text-align: center
}
.null-tip .van-icon {
  vertical-align: text-bottom;
}
.null-tip span {
  vertical-align: middle;
  padding-left: 10px;
}
</style>
