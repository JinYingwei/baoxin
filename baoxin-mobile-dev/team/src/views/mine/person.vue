<template>
  <div>
    <div class="shadow-box center personCenter">
      <van-cell-group v-show="teamData">
        <van-cell
          class="person-imgHeadTitle"
          style="color:#999"
          :title="'帐号 : '+teamData.phone"
        >
          <van-uploader :after-read="onReadHead">
            <van-icon name="photograph" />
          </van-uploader>
          <img
            class="person-imgHead"
            :src="personImgHeadResult || 'http://iconfont.alicdn.com/t/1531748288851.jpeg@100h_100w.jpg' "
            alt=""
          >
        </van-cell>
        <van-field
          placeholder="请输入团队名称"
          required
          label="团队名称"
          v-model="teamData.userName"
        />
        <van-field
          placeholder="请输入手机号码"
          label="联系电话"
          v-model="teamData.contractPhone"
        />
        <!-- <van-field placeholder="请输入银行账号" label="银行账号" v-model="teamData.bankAccount" /> -->
        <!-- <van-field placeholder="请输入银行名称" label="银行名称" v-model="teamData.bankName" /> -->
        <!-- <van-field placeholder="请输入开户姓名" label="开户姓名" v-model="teamData.bankUserName" /> -->
        <van-field
          @focus="showAreaPick"
          required
          readonly
          placeholder="请选择地区"
          label="地区"
          v-model="address"
        />
        <van-area
          v-show="isShowAreaPick"
          :area-list="areaList"
          :value="defaultCityVal"
          columns-num='2'
          @confirm="chooseOk"
          @cancel="chooseNo"
        />
        <!-- <van-field
          type="textarea"
          autosize
          rows="1"
          placeholder="请输入内容"
          label="团队简介"
          v-model="teamData.teamSummary"
        /> -->
      </van-cell-group>

    </div>
    <div class="btnSubmit center">
      <van-button
        type="primary"
        :loading="submitLoading"
        size="large"
        @click="submitUpde"
      >提交</van-button>
    </div>

  </div>

</template>


<script>
import AreaList from "@/assets/js/area";
import { Toast } from "vant";
import cityData from "../../assets/js/region.js";
import utils from "../../assets/js/utils.js";

export default {
  data() {
    return {
      areaList: AreaList, //地区数据
      isShowAreaPick: false, //是否显示地区选择器
      defaultCityVal: "370000", //默认反选城市
      personImgHeadFile: "", //头像资料
      teamData: '', //顾问资料
      address: "", //转换后的地址
      personImgHeadResult:
        "http://iconfont.alicdn.com/t/1531748288851.jpeg@100h_100w.jpg",
      provice: "",
      city: "",
      submitLoading: false //提交按钮加载状态
    };
  },
  methods: {
    //展示地区选择器
    showAreaPick() {
      this.isShowAreaPick = true;
    },
    //地址选择完成
    chooseOk(data) {
      this.address = data[0].name + " " + data[1].name;
      this.teamData.province = data[0].code;
      this.teamData.city = data[1].code;
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
        url: baseURL + "/api/team/search"
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

            this.teamData = resultData;

            this.personImgHeadResult = this.teamData.headImg+'&'+Math.random();
            if (this.teamData.area) {
              this.teamData.provice = this.teamData.area.split("|")[0];
              this.teamData.city = this.teamData.area.split("|")[1];
            }
            this.defaultCityVal = this.teamData.area.split("|")[0];
            //转换地址时间
            this.address = utils.getCityResult(cityData, this.teamData.area);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //个人头像选择
    onReadHead(file) {
      this.personImgHeadResult = file.content;
      this.personImgHeadResult = file.content;
      this.personImgHeadFile = file.file;
    },
    //顾问更新信息维护接口
    submitUpde() {
      var that = this;
      var formData = new FormData();
      formData.append("userName", this.teamData.userName);
      formData.append("contractPhone", this.teamData.contractPhone || '');
      formData.append("imgHeadFile", this.personImgHeadFile);
      formData.append("bankAccount", this.teamData.bankAccount);
      formData.append("bankName", this.teamData.bankName);
      formData.append("bankUserName", this.teamData.bankUserName);
      formData.append("province", this.teamData.province);
      formData.append("city", this.teamData.city);
      formData.append("teamSummary", this.teamData.teamSummary);

      if (!this.teamData.userName) {
        this.$toast("请输入团队名称");
        return;
      } else if (this.teamData.userName.length > 20) {
        this.$toast("团队名称最多15个字符");
        return;
      }else if(this.teamData.contractPhone){
        if(!this.regPhone(this.teamData.contractPhone)){
          this.$toast("请输入正确的联系方式");
           return;
        }
      } else if (!this.teamData.city) {
        this.$toast("请选择所在地区");
        return;
      }

      this.submitLoading = true;
      this.axios({
        method: "post",
        url: baseURL + "/api/team/update",
        data: formData
      })
        .then(result => {
          if (result.data.code == 0) {
            Toast.success("修改成功");
           
            setTimeout(function() {
              this.submitLoading = false
              that.$router.push("/mine");
            }, 3000);
          }
        })
        .catch(err => {
          console.log(err);
          Toast(err.response.data.error);
          this.submitLoading = false
        });
    },
    //手机号验证
    regPhone(val) {
      var myreg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
      if (!myreg.test(val)) {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    //查询顾问信息
    this.search();
  }
};
</script>

<style>
.personCenter {
  margin-bottom: 0.4rem /* 30/75 */;
  min-height: 76vh;
}
.van-field .van-cell__title {
  max-width: 106px;
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
</style>
