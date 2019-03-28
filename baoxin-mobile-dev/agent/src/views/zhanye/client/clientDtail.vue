<template>
  <div>
    <div class="shadow-box center">
      <van-field label="姓名" :value="data.customName" readonly />
      <van-field label="电话" :value="data.customPhone" readonly icon="phone" @click-icon="callphone(data.customPhone)" />
      <van-field label="性别" :value="data.customSex || 1 == 1?'男':'女'" readonly />
      <van-field label="生日" :value="data.customBirthday" readonly />
      <van-field label="学历" :value="data.customEducation" readonly />
      <van-field label="地址" :value="customArea" readonly />
      <van-field label="单位" :value="data.customUnit" readonly />
      <van-field label="职业" :value="data.customProfession" readonly />
      <van-field label="保单名称" :value="data.policyName" readonly />
      <van-field label="保单编号" :value="data.policyNo" readonly />
      <van-field label="保单到期日" :value="data.policyExpireTime" readonly />
      <van-field label="婚姻" :value="data.customMaritalStauts == 1?'已婚':'未婚'" readonly />
      <van-field label="其它" :value="data.remark" readonly />
    </div>
    <div class="btn-warp">
      <van-button type="default" @click="upDataClient">修改</van-button>
      <van-button class="warning" type="warning" @click="delClient(clientId)">删除</van-button>
    </div>
  </div>
</template>
<script>
import cityData from "../../../assets/js/region.js";
import utils from "../../../assets/js/utils.js";
export default {
  created() {
    var clientId = this.$route.query.id;
    if (clientId) {
      this.clientId = clientId;
      this.getClientData(clientId);
    }
  },
  data() {
    return {
      data: "",
      clientId: "",
      customArea:""
    };
  },
  methods: {
    getClientData(id) {
      this.axios({
        method: "get",
        url: baseURL + "/api/agent/customer/search",
        params: {
          id: id
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            this.data = result.data.data;
            this.customArea = utils.getCityResult(cityData,this.data.customArea)
          }
        })
        .catch(err => {});
    },
    callphone(phone) {
      window.location.href = "tel:" + phone;
    },
    upDataClient() {
      this.$router.push({
        name: "addClient",
        query: { clientId: this.clientId }
      });
    },
    delClient(id) {
      var delData = []
      delData.push({id:id})
      var self = this
      this.$dialog
        .confirm({
          message: "确定删除该客户吗？"
        })
        .then(() => {
          this.axios({
            method:'post',
            url: baseURL+'/api/agent/customer/delete',
            data: delData
          }).then((result) => {
            if(result.data.code == 0){
              this.$toast("已删除~");
              self.$router.push({
                name: "clientManage"
              });
            }
          }).catch((err) => {
             this.$toast(err.response.data.error);
          });
          
        });
    }
  }
};
</script>

<style scoped>
.btn-warp {
  text-align: center;
}
.btn-warp .van-button--default {
  background: #4e8cee;
  color: #fff;
  width: 40%;
}
.btn-warp .warning {
  width: 40%;
}
.btn-warp .van-button--disabled {
  background: #4e8cee;
  opacity: 0.7;
  color: #fff;
  width: 30%;
}
</style>