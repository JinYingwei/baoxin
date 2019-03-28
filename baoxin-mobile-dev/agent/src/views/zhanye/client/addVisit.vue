<template>
  <div>
    <div class="shadow-box center">
      <van-cell-group>
        <van-field label="姓名" v-model="visitPersonName" placeholder="请输入或者选择用户" icon="contact" @click-icon="toClientList" />
        <van-field type="number" label="联系方式" placeholder="请输入联系方式" v-model="visitPersonPhone" />
        <van-field label="拜访日期" @click="showDatetimeHandel" placeholder="请选择日期" v-model="visitTime" readonly />
        <van-field label="备注" placeholder="请输入备注信息" type="textarea" v-model="remark" rows="1" autosize />
      </van-cell-group>
    </div>
    <div class="btn-warp">
      <van-button type="default" :disabled="disabled" @click="addVisit">保存</van-button>
    </div>
    <van-datetime-picker v-show="showDatetime" @confirm="chooseDatetime" @cancel="showDatetime=false" v-model="currentDate" type="datetime" :min-date="minDate" :max-date="maxDate" :formatter="formatter" />
  </div>
</template>

<script>
export default {
  created() {
    var aleryClent = this.$route.params;
    if (aleryClent) {
      this.visitPersonName = aleryClent.customName;
      this.visitPersonPhone = aleryClent.customPhone;
    }
  },
  computed: {
    disabled() {
      var authArr = [];
      if (this.visitPersonName && this.visitPersonPhone && this.visitTime) {
        return false;
      }
      return true;
    }
  },
  data() {
    return {
      visitPersonName: "", //拜访人姓名
      visitPersonPhone: "", //拜访人电话
      visitTime: "", //拜访时间
      formatterTime: "",
      remark: "", //备注
      showDatetime: false, //时间选择器
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2040, 10, 1),
      currentDate: new Date()
    };
  },
  methods: {
    regPhone(val) {
      var myreg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
      if (!myreg.test(val)) {
        return false
      } else {
        return true
      }
    },
    toClientList() {
      this.$router.push({ name: "clientList" });
    },
    showDatetimeHandel() {
      this.showDatetime = true;
    },
    // 时间选择完成
    chooseDatetime(value) {
      var date = new Date(value);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes();
      this.visitTime = Y + M + D + h + m;
      this.formatterTime =
        date.getFullYear() +
        "" +
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) +
        (date.getDate() < 10
          ? "0" + (date.getDate())
          : date.getDate()) +
        (date.getHours()< 10
          ? "0" + (date.getHours())
          : date.getHours()) +
        (date.getMinutes()< 10
          ? "0" + (date.getMinutes())
          : date.getMinutes())+'00';
      this.showDatetime = false;
    },
    // 添加拜访
    addVisit() {

      if( this.visitPersonName.length > 15){
        this.$toast("姓名最多15个字符");
        return
      }else if(!this.regPhone(this.visitPersonPhone)){
        this.$toast("请输入正确的手机号码");
        return
      }else if(this.remark.length > 50){
        this.$toast("备注信息最多50个字符");
         return
      }

      this.axios({
        method: "post",
        url: baseURL + "/api/agent/visit/add",
        data: {
          visitPersonName: this.visitPersonName, //拜访人姓名
          visitPersonPhone: this.visitPersonPhone, //拜访人电话
          visitTime: this.formatterTime, //拜访时间
          remark: this.remark //备注
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            this.visitPersonName = ""; //拜访人姓名
            this.visitPersonPhone = ""; //拜访人电话
            this.visitTime = ""; //拜访时间
            this.remark = ""; //备注
            this.$toast.success("添加成功");
          } else {
            this.$toast("添加失败");
          }
        })
        .catch(err => {
          this.$toast(err.response.data.error);
        });
    },
    // 格式化日期
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
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
  width: 30%;
}
.btn-warp .van-button--disabled {
  background: #4e8cee;
  opacity: 0.7;
  color: #fff;
  width: 30%;
}
</style>