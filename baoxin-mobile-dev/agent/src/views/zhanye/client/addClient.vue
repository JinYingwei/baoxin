<template>
  <div>
    <div class="shadow-box center" id="clientF">
      <van-cell-group>
        <van-field required label="姓名" v-model="clientData.customName" placeholder="请输入姓名" />
        <!-- icon="add-o" -->
        <van-field required label="联系方式" type="number" v-model="clientData.customPhone" placeholder="请输入手机号"  @click-icon="addContact" />
        <van-field v-for="(item,index) in contactNum" :key="index" :label="'联系方式 '+(index+1)" type="number" v-model="clientData.customPhone" placeholder="请输入手机号" />
        <van-cell value="内容" class="hunyin">
          <template slot="title">
            <span class="van-cell-text">性别</span>
          </template>
          <van-radio-group v-model="clientData.customSex">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </van-cell>
        <span class="line"></span>
        <van-field label="生日" @click="showDatetimeHandel('shengri')" placeholder="请选择日期" v-model="visitTime" readonly />
        <van-field label="学历" @click="xueliShow = true" v-model="clientData.customEducation" readonly placeholder="请输入学历" />
        <van-field label="地址" @focus="showAreaPick" placeholder="请选择地区" readonly v-model="clientData.customArea" />
        <van-field label="单位" v-model="clientData.customUnit" placeholder="请输入单位" />
        <van-field label="职业" v-model="clientData.customProfession" placeholder="请输入职业" />
        <van-field label="保单名称" v-model="clientData.policyName" placeholder="请输入保单名称" />
        <van-field label="保单编号" v-model="clientData.policyNo" placeholder="请输入保单编号" />
        <van-field label="保单到期" @click="showDatetimeHandel('daoqi')" placeholder="请选择保单到期" v-model="visitTimeDaoqi" readonly />
        <van-cell value="内容" class="hunyin">
          <template slot="title">
            <span class="van-cell-text">婚姻</span>
          </template>
          <van-radio-group v-model="clientData.customMaritalStauts">
            <van-radio name="1">已婚</van-radio>
            <van-radio name="2">未婚</van-radio>
          </van-radio-group>
        </van-cell>
        <span class="line"></span>
        <van-field label="其它" v-model="clientData.remark" placeholder="" />
        <van-cell value="内容">
          <div class="client-tag">
            <strong>标签</strong>
            <ul>
              <li @click="tagChose(index)" :class="{tagChose:index == activeTagIndex}" v-for="(item,index) in tagData" :key="index" >{{ item }}</li>
            </ul>
          </div>
        </van-cell>
      </van-cell-group>
    </div>
    <br>
    <!-- <div class="client-chil">
      <div class="items">
        <i class="iconfont icon-tuandui"></i>
        <span>配偶信息</span>
      </div>
      <div class="items">
        <i class="iconfont icon-haizi"></i>
        <span>子女信息</span>
      </div>
    </div> -->
    <van-popup position="bottom" v-model="xueliShow">
      <van-picker show-toolbar :columns="columns" @cancel="xueliShow = false"  @confirm="xueliShow = false" @change="onChange" />
    </van-popup>
     <!-- 时间 选择器 -->
    <van-popup position="bottom" v-model="showDatetime">
      <van-datetime-picker class="datetime-picker" @cancel="showDatetime=false" @confirm="chooseDatetime" :min-date="minDate" v-model="currentDate" type="date" />
    </van-popup>
   
    <div class="btn-warp">
      <van-button type="default" :disabled="disabled" @click="addClient">保存</van-button>
    </div>
    <van-area id="vanArea"
      :value="defaultCityVal"
      v-show="isShowAreaPick"
      :area-list="areaList"
      columns-num='2'
      @confirm="chooseOk"
      @cancel="chooseNo"
    />
  </div>
</template>

<script>
import AreaList from "@/assets/js/area";
export default {
  data() {
    return {
      value: "",
      clientId:'',
      xueliShow:false,
      defaultCityVal: "370000", //默认反选城市
      areaList: AreaList, //地区数据
      customAreaCode:'',
      isShowAreaPick: false, //是否显示地区选择器
      type:1,//1添加 2修改
      columns: ['初中', '高中', '专科', '本科', '硕士','博士'],
      activeTagIndex:0,
      tagData:['普通客户','五星客户','优质客户','VIP客户'],
      clientData: {
        customName: "", //客户名字
        customPhone: "", //客户电话
        customSex: "1", //客户性别 1 男 2 女
        customBirthday: "", //客户生日
        customEducation: "", //客户学历
        district: "", //区域
        customUnit: "", //工作单位
        customProfession: "", //客户职业
        policyName: "", //保单名字
        policyNo: "", //保单编号
        policyExpireTime: "", //保单到期时间
        customMaritalStauts: "", //客户婚姻状况（1：已婚；2：未婚）
        remark: "", //备注,
        showPopupMate: true //弹窗配偶
      },
      contactNum: 0,
      showDatetime: false, //时间选择器
      showDatetimeType: "", //
      visitTime: "", //生日
      formatterTime: "",
      visitTimeDaoqi: "", //到期
      formatterTimeDaoqi: "",
      minDate: new Date(1970),
      minHour: 10,
      maxHour: 20,
      currentDate: new Date(),
      radio: 1
    };
  },
  created() {
    var clientId = this.$route.query.clientId;
    if (clientId) {
      this.type = 2
      this.clientId = clientId
      this.getClientData(clientId);
    }
  },
  computed: {
    disabled() {
      var authArr = [];
      if (this.clientData.customName && this.clientData.customPhone) {
        return false;
      }
      return true;
    }
  },
  methods: {
    regPhone(val) {
      var myreg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
      if (!myreg.test(val)) {
        return false
      } else {
        return true
      }},
    onChange(picker, value, index) {
      this.clientData.customEducation = value;
    },
    tagChose(index){
      console.log(index);
      this.activeTagIndex = index;
    },
    // 获取客户信息
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
            console.log(result.data.data.customSex);
            this.clientData = result.data.data;
            this.visitTime = result.data.data.customBirthday;
            this.visitTimeDaoqi = result.data.data.policyExpireTime;
          }
        })
        .catch(err => {});
    },
    // 添加联系方式
    addContact() {
      if (this.contactNum >= 2) {
        this.$toast("最多添加两条");
        return;
      }
      this.contactNum++;
    },
    showDatetimeHandel(type) {
      this.showDatetime = true;
      this.showDatetimeType = type;
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
      if (this.showDatetimeType == "shengri") {
        this.visitTime = Y + M + D;
        this.formatterTime =
          date.getFullYear() +
          "" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          date.getDate();
      } else if (this.showDatetimeType == "daoqi") {
        this.visitTimeDaoqi = Y + M + D;
        this.formatterTimeDaoqi =
          date.getFullYear() +
          "" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          date.getDate();
      }

      this.showDatetime = false;
    },
    //展示地区选择器
    showAreaPick() {
      this.isShowAreaPick = true;
    },
     //地址选择完成
    chooseOk(data) {
      console.log(data);
      this.clientData.customArea = data[0].name + " " + data[1].name;
      this.customAreaCode = data[0].code+'|'+data[1].code;
      this.isShowAreaPick = false;
    },
    //隐藏地区选择器
    chooseNo() {
      this.isShowAreaPick = false;
    },
    // 提交
    addClient() {
      var data = {
        userId: "", //客户名字
        customName: this.clientData.customName, //客户名字
        customPhone: this.clientData.customPhone, //客户电话
        customSex: this.clientData.customSex, //客户性别 1 男 2 女
        customBirthday: this.formatterTime, //客户生日
        customEducation: this.clientData.customEducation, //客户学历
        customArea: this.customAreaCode, //区域
        customUnit: this.clientData.customUnit, //工作单位
        customProfession: this.clientData.customProfession, //客户职业
        policyName: this.clientData.policyName, //保单名字
        policyNo: this.clientData.policyNo, //保单编号
        policyExpireTime: this.formatterTimeDaoqi, //保单到期时间
        customMaritalStauts: this.clientData.customMaritalStauts, //客户婚姻状况（1：已婚；2：未婚）
        remark: this.clientData.remark //备注,
      };

      if( this.clientData.customName.length > 15){
        this.$toast("姓名最多15个字符");
        return
      }else if(!this.regPhone(this.clientData.customPhone)){
        this.$toast("请输入正确的手机号码");
        return
      }else if(this.clientData.customArea && this.clientData.customArea.length > 40){
        this.$toast("地址最多40个字符");
         return
      }else if(this.clientData.customUnit && this.clientData.customUnit.length > 40){
        this.$toast("单位最多40个字符");
         return
      }else if(this.clientData.policyName && this.clientData.policyName.length > 40){
        this.$toast("保单名称最多40个字符");
         return
      }else if(this.clientData.policyNo && this.clientData.policyNo.length > 40){
        this.$toast("保单编号最多40个字符");
         return
      }else if(this.clientData.remark && this.clientData.remark.length > 50){
        this.$toast("其它信息最多50个字符");
         return
      }

      if(this.clientId){
        data.id = this.clientId
      }
      if(this.type == 1){
        this.axios({
        method: "post",
        url: baseURL + "/api/agent/customer/add",
        data: data
      })
        .then(result => {
          if (result.data.code == 0) {
            this.$toast.success("添加成功");
            for (const key in this.clientData) {
              if (this.clientData.hasOwnProperty(key)) {
                this.clientData[key] = "";
              }
            }
            this.$router.push({name:'clientManage'})
          }
        })
        .catch(err => {
           this.$toast.success(err.response.data.error);
        });
      }else{
        this.axios({
        method: "post",
        url: baseURL + "/api/agent/customer/update",
        data: data
        })
        .then(result => {
          if (result.data.code == 0) {
            this.$toast.success("修改成功");
            this.$router.push({name:'clientManage'})
          }
        })
        .catch(err => {  this.$toast(err.response.data.error)});
      }
      
    }
  }
};
</script>

<style scoped>
.client-tag li.tagChose{
  background:#4e8cee;
  color: #fff;
}
.datetime-picker-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.van-radio {
  display: inline-block;
  margin-right: 0.16rem; /* 12/75 */
}
.hunyin >>> .van-cell__value {
  text-align: left;
  flex: 3;
}
#clientF >>> .van-cell__title{
  flex:1
}
.client-tag {
  display: flex;
}

.client-tag strong {
  font-weight: normal;
}
.client-tag ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90%;
}
.client-tag li {
  line-height: 0.453333rem /* 34/75 */;
  padding: 0 0.16rem /* 12/75 */;
  font-size: 0.213333rem /* 16/75 */;
  background: #f6f6f6;
  border-radius: 0.266667rem /* 20/75 */;
  color: #777777;
}
.client-chil {
  display: flex;
  justify-content: space-around;
}
.client-chil .items {
  width: 3.093333rem /* 232/75 */;
  height: 0.96rem /* 72/75 */;
  border-radius: 0.24rem /* 18/75 */;
  border: 1px solid #4e8dee;
  color: #4e8dee;
  text-align: center;
  line-height: 0.96rem /* 72/75 */;
  display: flex;
  align-items: center;
  justify-content: center;
}
.client-chil .items span {
  padding-left: 0.066667rem /* 5/75 */;
}
.btn-warp {
  text-align: center;
}
.btn-warp .van-button--default {
  background: #4e8cee;
  color: #fff;
  width: 40%;
}
.btn-warp .van-button--disabled {
  background: #4e8cee;
  opacity: 0.7;
  color: #fff;
  width: 30%;
}
.line {
  display: block;
  height: 1px;
  transform: scaleY(0.5);
  background: #eee;
}
#vanArea{
  width: 100%;
  position: fixed;
  bottom: 1.6rem /* 120/75 */
}
</style>