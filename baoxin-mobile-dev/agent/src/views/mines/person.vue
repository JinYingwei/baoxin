<template>
  <div>
    <div class="shadow-box center">
      <van-cell-group id="imgHeadTitles">
        <van-cell
          class="person-imgHeadTitle"
          style="color:#999"
          :title="'帐号 : '+agentData.phone"
        >
          <van-uploader :after-read="onReadHead">
            <van-icon name="photograph" />
          </van-uploader>
          <img
            class="person-imgHead"
            :src="personImgHeadResult"
            alt=""
          >
        </van-cell>
        <!-- <van-field placeholder="帐号" label="注册帐号" disabled v-model="agentData.phone" /> -->
        <van-field
          placeholder="请输入姓名"
          label="姓名"
          required
          v-model="agentData.userName"
        />
        <van-field
          placeholder="请输入身份证号"
          label="身份证号"
          required
          v-model="agentData.idCard"
        />
        <van-field
          placeholder="请输入联系电话"
          label="联系电话"
          v-model="agentData.contactPhone"
        />
        <van-field
          placeholder="请输入资格证书"
          v-model="agentData.qualicertNo"
          label="资格证书"
        />
        <van-field
          placeholder="请输入执业证书"
          required
          type="number"
          label="执业证书"
          v-model="agentData.certificateNo"
        />
        <van-field
          @focus="showDatetime"
          v-model="agentData.certValidity"
          readonly
          placeholder="执业证书有效期"
          label="有效期"
        />
        <van-datetime-picker
          v-show="isShowDatetime"
          v-model="currentDate"
          type="date"
          @confirm="dateChooseOk"
          @cancel="dateChooseCancel"
          :min-date="minDate"
        />
        <van-field
          placeholder="请输入公司名称"
          required
          label="所属公司"
          v-model="agentData.companyName"
        />
        <van-field
          placeholder="请输入工号"
          label="工号"
          v-model="agentData.jobNumber"
        />
        <van-field
          @focus="showAreaPick"
          placeholder="请选择地区"
          readonly
          label="地区"
          v-model="address"
          required
        />
        <van-area
          :value="defaultCityVal"
          v-show="isShowAreaPick"
          :area-list="areaList"
          columns-num='2'
          @confirm="chooseOk"
          @cancel="chooseNo"
        />
        <van-field
          placeholder="请输入主营险种"
          label="主营险种"
          v-model="agentData.intype"
        />
        <!-- <van-field
          type="textarea"
          autosize
          rows="1"
          placeholder="请输入内容"
          label="简述"
          v-model="agentData.personSummary"
        /> -->
      </van-cell-group>

    </div>
    <div class="btnSubmit center">
      <van-button
        type="primary"
        size="large"
        :loading="submitLoading"
        @click="submitUpde"
      >提交</van-button>
    </div>
  </div>
</template>

<script>
import AreaList from "@/assets/js/area";

import cityData from "../../assets/js/region.js";
import utils from "../../assets/js/utils.js";

export default {
  data() {
    return {
      areaList: AreaList, //地区数据
      defaultCityVal: "370000", //默认反选城市
      isShowAreaPick: false, //是否显示地区选择器
      agentData: {}, //顾问资料
      address: "", //转换后的地址
      personImgHeadResult: "",
      personImgHeadFile: "",
      //顾问更改数据
      submitLoading: false, //提交按钮加载状态
      updaData: {
        area: "",
        userName: "",
        idCard: "", //身份证号
        qualicertNo: "", //资格证书
        certificateNo: "", //执业证书编号
        certValidity: 0,
        companyId: "", //所属公司id
        companyName: "", //所属公司名字
        jobNumber: "", //公司工号
        provice: "", //执业区域（省），地区代号
        city: "", //执业区域（省），地区代号
        wechart: "", //微信/QQ
        intype: "", //主营险种
        personSummary: "", //个人简介（字数<200）
        selfShowSummary: "", //个人秀此刻的想法（字数<200）
        shareImageStr: "" //身份证号
      },
      minDate: new Date(),
      currentDate: "",
      isShowDatetime: false //展示时间选择器
    };
  },
  methods: {
    //展示地区选择器
    showAreaPick() {
      this.isShowAreaPick = true;
    },
    // 展示时间选择器
    showDatetime() {
      this.isShowDatetime = true;
    },
    //时间选择完成
    dateChooseOk(value) {
      this.isShowDatetime = false;
      var str =
        value.getFullYear() +
        "" +
        this.repairZero(value.getMonth() + 1) +
        this.repairZero(value.getDate());
      // this.currentDate = str;
      this.agentData.certValidity = str;
      console.log(str);
    },
    //时间选择取消
    dateChooseCancel() {
      this.isShowDatetime = false;
    },
    repairZero(num) {
      if (num < 10) {
        num = "0" + num;
      }
      return num;
    },
    //手机号验证
    regPhone(val) {
      var myreg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
      if (!myreg.test(val)) {
        return false;
      } else {
        return true;
      }
    },
    /*
     * 身份证15位编码规则：dddddd yymmdd xx p
     * dddddd：6位地区编码
     * yymmdd: 出生年(两位年)月日，如：910215
     * xx: 顺序编码，系统产生，无法确定
     * p: 性别，奇数为男，偶数为女
     *
     * 身份证18位编码规则：dddddd yyyymmdd xxx y
     * dddddd：6位地区编码
     * yyyymmdd: 出生年(四位年)月日，如：19910215
     * xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女
     * y: 校验码，该位数值可通过前17位计算获得
     *
     * 前17位号码加权因子为 Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
     * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
     * 如果验证码恰好是10，为了保证身份证是十八位，那么第十八位将用X来代替
     * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
     * i为身份证号码1...17 位; Y_P为校验码Y所在校验码数组位置
     */
    validateIdCard(idCard) {
      //15位和18位身份证号码的正则表达式
      var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

      //如果通过该验证，说明身份证格式正确，但准确性还需计算
      if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
          var idCardWi = new Array(
            7,
            9,
            10,
            5,
            8,
            4,
            2,
            1,
            6,
            3,
            7,
            9,
            10,
            5,
            8,
            4,
            2
          ); //将前17位加权因子保存在数组里
          var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
          var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
          for (var i = 0; i < 17; i++) {
            idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
          }

          var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
          var idCardLast = idCard.substring(17); //得到最后一位身份证号码

          //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
          if (idCardMod == 2) {
            if (idCardLast == "X" || idCardLast == "x") {
              //  alert("恭喜通过验证啦！");
               return true;
            } else {
              this.$toast("身份证号码错误！");
               return false;
            }
          } else {
            //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
            if (idCardLast == idCardY[idCardMod]) {
              //  alert("恭喜通过验证啦！");
               return true;
            } else {
              this.$toast("身份证号码错误！");
              return false;
            }
          }
        }else{
             return true;
        }
      } else {
        this.$toast("身份证格式不正确!");
        return false;
      }
    },
    //地址选择完成
    chooseOk(data) {
      console.log(data);
      this.address = data[0].name + " " + data[1].name;
      this.agentData.city = data[1].code;
      this.agentData.province = data[0].code;
      this.isShowAreaPick = false;
    },
    //隐藏地区选择器
    chooseNo() {
      this.isShowAreaPick = false;
    },
    //查询顾问信息
    search() {
      this.axios({
        method: "get",
        url: baseURL + "/api/agent/search"
      })
        .then(result => {
          if (result.data[0]) {
            var resultData = result.data[0];
            for (const key in resultData) {
              if (resultData.hasOwnProperty(key)) {
                let element = resultData[key];
                if (element == "null") {
                  element = "";
                }
              }
            }
            this.agentData = resultData;
            this.personImgHeadResult = this.agentData.headImg+'&'+Math.random();
            if (this.agentData.area) {
              this.agentData.provice = this.agentData.area.split("|")[0];
              this.agentData.city = this.agentData.area.split("|")[1];
            }
            if (this.agentData.contactPhone == "null") {
              this.agentData.contactPhone = this.agentData.phone;
            }
            this.defaultCityVal = this.agentData.area.split("|")[0];
            //转换地址时间
            this.address = utils.getCityResult(cityData, this.agentData.area);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //个人头像选择
    onReadHead(file) {
      this.personImgHeadResult = file.content;
      this.personImgHeadFile = file.file;
    },
    //顾问更新信息维护接口
    submitUpde() {
      var that = this;
      var formDataText = new FormData();

      formDataText.append("userName", this.agentData.userName);
      formDataText.append("contactPhone", this.agentData.contactPhone);
      formDataText.append("qualicertNo", this.agentData.qualicertNo);
      formDataText.append("certValidity", this.agentData.certValidity || 0);
      formDataText.append("idCard", this.agentData.idCard);
      formDataText.append("certificateNo", this.agentData.certificateNo);
      formDataText.append("companyId", this.agentData.companyId);
      formDataText.append("companyName", this.agentData.companyName);
      formDataText.append("jobNumber", this.agentData.jobNumber);
      formDataText.append("province", this.agentData.province);
      formDataText.append("city", this.agentData.city);
      formDataText.append("intype", this.agentData.intype);
      formDataText.append("personSummary", this.agentData.personSummary);
      formDataText.append("imgHeadFile", this.personImgHeadFile);

      if (!this.agentData.userName) {
        this.$toast("请输入姓名");
        return;
      } else if (this.agentData.userName.length > 20) {
        this.$toast("姓名最多15个字符");
        return;
      } else if (!this.agentData.idCard) {
        this.$toast("请输入身份证号");
        return;
      } else if (!this.regPhone(this.agentData.contactPhone)) {
        this.$toast("请输入正确的联系电话");
      } else if (!this.validateIdCard(this.agentData.idCard)) {
        return;
      } else if (!this.agentData.certificateNo) {
        this.$toast("请输入职业证书编号");
        return;
      } else if (!this.agentData.province) {
        this.$toast("请选择城市");
        return;
      }

      this.submitLoading = true;

      // 修改基本信息
      function upDateText() {
        return that.axios.post(baseURL + "/api/agent/update", formDataText);
      }

      this.axios
        .all([upDateText()])
        .then(
          this.axios.spread(res1 => {
            if (res1.data.code == 0) {
              this.$toast.success("修改成功");
             
              setTimeout(function() {
                this.submitLoading = false;
                that.$router.push("/mine");
              }, 3000);
            }
          })
        )
        .catch(err => {
          console.log(err);
          this.submitLoading = false;
          this.$toast(err.response.data.error);
        });
    },
  },
  created() {
    //查询顾问信息
    this.search();
  }
};
</script>

<style>
.van-field .van-cell__title {
  max-width: 80px;
}

.van-area {
  margin-bottom: 100px;
}

.person-imgHead {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: middle;
  margin-left: -36px;
}

.person-imgHeadTitle {
  line-height: 50px;
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
.van-cell__title {
  flex: 2;
}
</style>
