<template>
  <div>
    <div class="public-title">个人信息</div>
    <div class="m-userInfo">
      <div class="info f-left">
        <div class="infoWrap"><a
            class="avatar f-left"
            target="_blank"
          ><img
              width="66"
              :src="agentData.headImg+'&'+Math.random()"
            ></a>
          <div class="name">
            <div class="nickname"><a>{{ agentData.userName }}</a></div><a
              class="w-levelname"
              target="_blank"
            ><noscript></noscript><span class="w-icon-member member-top-vip0"></span></a>
          </div>
        </div>
        <div class="growWrap">
          <div class="growNum"><span><a>简介 &gt;&gt;</a></span></div>
          <div class="process">
            {{ agentData.personSummary }}
          </div><noscript></noscript><a
            class="w-levelname"
            target="_blank"
          ><span class="w-icon-member member-top-vip0"></span></a>
        </div>
      </div>
      <div class="asset f-left">
        <div class="item">
          <div class="label">职业证书编号</div>
          <div class="content"><a
              href="http://iir.circ.gov.cn/web/"
              target="_blank"
            ><span>{{ agentData.certificateNo }}</span></a></div>
        </div>
        <div class="item">
          <div class="label">从属公司</div>
          <div class="content"><a target="_blank"><span>{{ agentData.companyName }}</span></a></div>
        </div>
        <div class="item">
          <div class="label">工号</div>
          <div class="content"><a><span>{{ agentData.jobNumber }}</span></a></div>
        </div>
        <div class="item">
          <div class="label">顾问电话</div>
          <div class="content"><a target="_blank"><span>{{ agentData.phone }}</span></a><i class="w-icon-common icon-common-open-eye"></i></div>
        </div>
        <div class="item">
          <div class="label">地区</div>
          <div class="content"><a
              v-if="agentData.area"
              target="_blank"
            >{{ $GLOBAL.getCityResult(cityData, agentData.area) }}</a></div>
        </div>
      </div>
      <div class="code-img">
        <img
          :src="agentData.qrCodePath"
          alt=""
        >
      </div>
    </div>
    <br>
    <div class="public-title">信息设置</div>
    <Tabs type="card">
      <TabPane label="个人资料">
        <div class="tabPaneCon">
          <Form
            id="formPerson"
            ref="formPerson"
            :model="agentData"
            :rules="ruleValidatePerson"
            :label-width="120"
          >

            <FormItem label="头像">
              <a class="up-head-img">
                <img
                  width="66"
                  :src="upHeadImg"
                >
                <input
                  ref="headFile"
                  @change="getHeadImg"
                  id="headFile"
                  type="file"
                  accept="image/*"
                >
              </a>
            </FormItem>
            <FormItem label="手机号码">
              <p>{{ agentData.phone }}</p>
            </FormItem>
            <FormItem
              label="姓名"
              prop="userName"
            >
              <Input
                size='large'
                v-model="agentData.userName"
                placeholder="请输入您的姓名"
              ></Input>
            </FormItem>
            <FormItem
              label="身份证"
              prop="idCard"
            >
              <Input
                size='large'
                v-model="agentData.idCard"
                placeholder="请输入您的身份证"
              ></Input>
            </FormItem>
            <FormItem
              label="联系电话"
              prop="contactPhone"
            >
              <Input
                size='large'
                v-model="agentData.contactPhone"
                placeholder="请输入您的联系电话"
              ></Input>
            </FormItem>
            <FormItem
              label="资格证书"
              prop="qualicertNo"
            >
              <Input
                size='large'
                v-model="agentData.qualicertNo"
                placeholder="请输入资格证书编号"
              ></Input>
            </FormItem>
            <FormItem
              label="执业证书"
              prop="certificateNo"
            >
              <Input
                size='large'
                v-model="agentData.certificateNo"
                placeholder="请输入执业证书编号"
              ></Input>
            </FormItem>
            <FormItem label="有效期">
              <DatePicker
                @on-change="dateChooseOk"
                v-model="certValidity"
                type="date"
                placeholder="请选择有效期"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem label="所属公司">
              <Select
                size='large'
                label-in-value
                @on-change="companyNameChange"
                filterable
                remote
                v-model="agentData.companyId"
                placeholder="请输入所属公司"
              >
                <Option
                  v-for="(item,index) in companyData"
                  :key="index"
                  :value="item.id"
                >{{ item.compnaySimpleName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="工号">
              <Input
                size='large'
                v-model="agentData.jobNumber"
                placeholder="请输入您的工号"
              ></Input>
            </FormItem>

            <FormItem label="地区">
              <al-selector
                level='2'
                @on-change="changeArea"
                size="large"
                :auto='true'
                v-model="city"
              />
            </FormItem>
            <FormItem label="主营险种">
              <Select
                size='large'
                v-model="agentData.intype"
                placeholder="请输入主营险种"
              >
                <Option value="寿险">寿险</Option>
                <Option value="车险">车险</Option>
              </Select>
            </FormItem>
            <FormItem label="简述">
              <Input
                size='large'
                v-model="agentData.personSummary"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入您的个人简述..."
              ></Input>
            </FormItem>
            <FormItem>
              <Button
                size='large'
                type="primary"
                @click="baseupdate('formPerson')"
              >提交</Button>
            </FormItem>
          </Form>
        </div>
      </TabPane>
      <!-- 个人介绍 -->
      <TabPane label="个人介绍">
        <div class="tabPaneCon">
          <Form>
            <FormItem label="个人介绍">
              <Input
                v-model="agentData.personIntro"
                :autosize="{minRows: 10}"
                type="textarea"
                placeholder="请输入您的个人简介..."
              />
            </FormItem>
            <FormItem>
              <Button
                size='large'
                type="primary"
                :loading="loadingBtn"
                @click="updatePersonIntro"
              >提交</Button>
            </FormItem>

          </Form>
        </div>
      </TabPane>
      <!-- 转发封面 -->
      <TabPane label="转发封面">
        <div class="tabPaneCon">
          <div class="wrap">
            <div class="section">
              <h2 class="title">
                <img src="../../../assets/img/logo.png">
                <span>保信云顾问</span>
              </h2>
              <h3><input type="text" v-model="xcxTitle" placeholder="请输入转发标题"></h3>
              <div class="file file-zf">
                <img :src="viewImageDataUrl">
                <input 
                  type="file"
                  ref="forward-cover-imgs"
                  @change="upLoadBannerChange('forward-cover-imgs')"
                  accept="image/*"
                >
              </div>
              <div class="order">
                <img src="../../../assets/img/order.png">
                <span>小程序</span>
              </div>
              <div class="btn">
                <input 
                  type="submit" 
                  value="提交"
                  @click="clickHandle"
                >
              </div>
            </div>
           
            <div class="error" @click="cancelHandle">
              <img src="../../../assets/img/error.png">  
              <span >取消封面</span>
            </div>
          </div>
        </div>
      </TabPane>

      <!-- 个人秀 -->
      <TabPane label="个人秀">
        <div class="tabPaneCon">
          <!-- <div class="showBox">  
            <div class="box" v-if="showImageBase64.length<9">
              
              <input 
                type="file"
                @change="showHandle($event)"
                accept="image/*"
                multiple
              >
              <p>点击添加照片</p>
            </div>
            
            <div class="box" v-for="(item,index) in showImageBase64" :key="index">
              <img :src="item">
            </div>
          </div> -->
          <div class="section personShow">
            <!-- <h2 class="title">
              <img src="../../../assets/img/logo.png">
              <span>保信云顾问</span>
            </h2> -->
            <h2 class="headPic">
              <img :src="upHeadImg">
            </h2>
            <div class="title">
              <span>个人秀</span>
            </div>
            <h4><input type="text" v-model="xcxTitle" placeholder="请输入个人秀简介"></h4>
            
            <div class="file showFile">
              <!-- <img :src="coverTempletUrl"> -->
             
              <dl v-if="showImageBase64.length<9">
                <dt><img src="../../../assets/img/selectPic.png" alt=""></dt>
                <dd>点击添加照片</dd>
                <input 
                  class="inpFile"
                  type="file"
                  @change="showHandle($event)"
                  accept="image/*"
                  multiple
                >
              </dl>
              
              <dl class="picList" v-for="(item,index) in showImageBase64" :key="index">
                <dt><img :src="item"></dt>
              </dl>
            </div>
           
            <div class="btn">
              <input 
                type="submit" 
                value="提交"
                @click="showClickHandle"
              >
            </div>
          </div>  

          <!-- <div class="btn">
             <input 
                type="submit" 
                value="提交"
                @click="showClickHandle"
              >
          </div> -->


        </div>
      </TabPane>
      
      <TabPane label="修改密码">
        <div class="tabPaneCon">
          <Form
            id="formPass"
            ref="formValiformPass"
            :model="updateUserPwd"
            :rules="ruleValidateUpdateUserPwd"
            :label-width="120"
          >
            <FormItem
              prop="oldpassword"
              label="原密码"
            >
              <Input
                size='large'
                v-model="updateUserPwd.oldpassword"
                placeholder="请输入原密码"
              ></Input>
            </FormItem>
            <FormItem
              prop="newpassword"
              label="新密码"
            >
              <Input
                size='large'
                v-model="updateUserPwd.newpassword"
                placeholder="请输入新密码"
              ></Input>
            </FormItem>
            <FormItem
              prop="renewpassword"
              label="重复新密码"
            >
              <Input
                size='large'
                v-model="updateUserPwd.renewpassword"
                placeholder="请再次输入新密码"
              ></Input>
            </FormItem>

            <FormItem>
              <Button
                size='large'
                type="primary"
                @click="updateUserPwdHandle"
              >提交</Button>
            </FormItem>
          </Form>
        </div>
      </TabPane>
    </Tabs>
    <Modal
      title="View Image"
      v-model="viewImage"
    >
      <img
        :src="viewImageData"
        style="width: 100%"
      >
    </Modal>
  </div>
</template>

<script>
//引入地区代码文件
import cityData from "../../../assets/lib/region.js";
import qs from "qs";
export default {
  created() {
    this.search();
    this.fuzzysearch();
    this.cityData = cityData;
  },
  data() {
    // 手机号验证
    const validPhone = (rule, value, callback) => {
      if (!this.$GLOBAL.isPhone(value)) {
        callback(new Error("手机号格式错误"));
      }
      callback();
    };
    // 身份证号验证
    const IdentityCodeValid = (rule, code, callback) => {
      var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
      };
      var tip = "";
      var pass = true;

      if (
        !code ||
        !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
          code
        )
      ) {
        tip = "身份证号格式错误";
        pass = false;
      } else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
      } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
          code = code.split("");
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          if (parity[sum % 11] != code[17]) {
            tip = "校验位错误";
            pass = false;
          }
        }
      }
      if (!pass) {
        callback(new Error(tip));
      }
      callback();
      return pass;
    };

    // 密码确认验证
    const validrenewpassword = (rule, value, callback) => {
      if (this.updateUserPwd.newpassword != this.updateUserPwd.renewpassword) {
        callback(new Error("两次密码输入不一致"));
      }
      callback();
    };

    return {
      loadingBtn: false,
      agentData: {}, //顾问信息
      certValidity: "", //有效期
      upHeadImg: "", //上传的头像base64数据
      upShowImg: "", //上传的个人秀封面base64数据
      viewImage: false, //图片预览
      viewImageData: "", //图片预览图片
      viewImageDataUrl:'',
      xcxTitle:'',  //标题

      showImageBase64:[], //个人秀图片列表base64
      showImageList:[], //个人秀图片列表
      city: [],
      cityData: [], //保存地区
      companyData: [], //保险公司名称
      personIntro: "", //个人介绍
      updateUserPwd: {
        oldpassword: "",
        newpassword: "",
        renewpassword: ""
      },
      // 基本资料验证
      ruleValidatePerson: {
        userName: [
          {
            required: true,
            message: "必填项,请输入内容",
            trigger: "blur"
          }
        ],
        city: [
          {
            required: true,
            message: "必填项,请输入内容",
            trigger: "blur"
          }
        ],
        idCard: [
          { required: true, validator: IdentityCodeValid, trigger: "blur" }
        ],
        contactPhone: [{ validator: validPhone, trigger: "blur" }],
        qualicertNo: [
          {
            type: "string",
            max: 30,
            message: "字数最多30个字符",
            trigger: "blur"
          }
        ],
        certificateNo: [
          {
            type: "string",
            max: 30,
            message: "字数最多30个字符",
            trigger: "blur"
          }
        ]
      },
      // 修改密码验证
      ruleValidateUpdateUserPwd: {
        oldpassword: [
          {
            required: true,
            message: "必填项,请输入原密码",
            trigger: "blur"
          }
        ],
        newpassword: [
          {
            required: true,
            message: "必填项,请输入新密码",
            trigger: "blur"
          }
        ],
        renewpassword: [
          {
            required: true,
            validator: validrenewpassword,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //查询顾问信息
    search() {
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/agent/search"
      })
        .then(result => {
          if (result.data[0]) {
            this.agentData = result.data[0];
            // 将顾问名字进行存储
            localStorage.setItem('agentName',this.agentData.userName)
            this.upHeadImg = this.agentData.headImg+'&'+Math.random();
            if (result.data[0].area) {
              this.city.push(result.data[0].area.split("|")[0]);
              this.city.push(result.data[0].area.split("|")[1]);
            }
            // 有效期转换格式
            if (this.agentData.certValidity) {
              this.certValidity = new Date(
                this.$GLOBAL.timeFormat2(this.agentData.certValidity)
              );
            }
          }
          //转发封面title
          this.xcxTitle = result.data[0].xcxTitle
          //转发封面图片
          this.viewImageDataUrl = result.data[0].coverTempletUrl
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 根据公司名模糊匹配公司全名
    fuzzysearch(insurerName = "") {
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/insurer/fuzzysearch",
        params: {
          rows: 200,
          insurerName: insurerName
        }
      })
        .then(result => {
          //console.log(result)
          this.companyData = result.data;
        })
        .catch(err => {});
    },
    //时间选择完成
    dateChooseOk(value) {
      var str;
      if (value) {
        str = value.split("-").join("");
      }
      this.agentData.certValidity = str;
    },
    // 基本信息修改
    baseupdate(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
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
          formDataText.append("imgHeadFile", this.$refs.headFile.files[0]);

          // 修改
          this.$axios({
            method: "post",
            url: this.$GLOBAL.baseURL + "/api/agent/update",
            data: formDataText
          })
            .then(result => {
              if (result.data.code == 0) {
                this.$Notice.success({
                  title: "消息提示",
                  desc: "资料修改成功"
                });
                this.search();
              }
            })
            .catch(err => {
              this.$Notice.error({
                title: "消息提示",
                desc: err.response.data.error
              });
            });
        } else {
          console.log("Fail");
        }
      });
    },
    // 头像预览
    getHeadImg() {
      var _this = this;
      var fileObj = this.$refs.headFile;
      var fileReader = new FileReader();
      fileReader.readAsDataURL(this.$refs.headFile.files[0]);
      fileReader.onload = function(e) {
        _this.upHeadImg = e.target.result;
      };
    },
    //
    changeArea() {
      this.agentData.province = this.city[0].code;
      this.agentData.city = this.city[1].code;
    },
    // 公司选择
    companyNameChange(val) {
      this.agentData.companyName = val.label;
    },
    // 个人介绍
    updatePersonIntro() {
      if (!this.agentData.personIntro) {
        this.$Message.error("请输入个人介绍内容");
        return;
      }
      this.$axios({
        method: "post",
        url: this.$GLOBAL.baseURL + "/api/agent/updatePersonIntro",
        data: {
          personIntro: this.agentData.personIntro
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            this.$Message.success("个人介绍修改成功");
            this.agentData.personIntro = ''
          }
        })
        .catch(err => {
          this.$Message.error(err.response.data.error);
        });
    },
    //修改密码
    updateUserPwdHandle() {
      this.$refs["formValiformPass"].validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url: this.$GLOBAL.baseURL + "/api/user/updateUserPwd",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify({
              oldpassword: this.updateUserPwd.oldpassword,
              password: this.updateUserPwd.renewpassword
            })
          })
            .then(result => {
              if (result.data.code == 0) {
                this.$Message.success("修改成功");
              }
            })
            .catch(err => {
              this.$Message.error(err.response.data.error);
            });
        }
      });
    },
    //转发封面,图片预览
    upLoadBannerChange(name){
      var target = this.$refs[name]
      this.viewImageDataUrl = target.files[0]
      var reader = new FileReader()
      var This = this
      reader.readAsDataURL(this.viewImageDataUrl)
      reader.onload = function(e){
        This.viewImageDataUrl = e.target.result
      }
    },
    //转发封面,提交按钮
    clickHandle(){
      var form = new FormData()
      form.append('xcxTitle',this.xcxTitle)
      form.append('shareImageStr',this.viewImageDataUrl)
      this.$axios({
        method:'post',
        url:this.$GLOBAL.baseURL+'/api/agent/updatePic',
        data:form
      }).then(result=>{
        if(result.data.code===0){
          this.$Message.success('转发封面成功');
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    //点击转发取消按钮
    cancelHandle(){
      this.$axios({
        method:'post',
        url:this.$GLOBAL.baseURL+'/api/agent/emptyAgentShareInfo'
      }).then(result =>{
        if(result.data.code===0){
          this.search()
          this.$Message.success('封面取消')
        }
      })
    },
    //点击个人秀选择照片
    showHandle(e){
      var target = e.target
      var files = target.files
      console.log(files)
      if(files.length + this.showImageList > 9){
        this.$Message.warning('图片最多上传9张')
        return
      }
      for(var key in files){
        if (files.hasOwnProperty(key)) {
          const element = files[key];
          this.showImageList.push(element)
        }
        //console.log(key+':'+ files[key])
      }
      var This = this
      this.showImageBase64 = []
       for (const key in this.showImageList) {
        if (this.showImageList.hasOwnProperty(key)) {
          const element = this.showImageList[key];
          var reader = new FileReader();
          reader.readAsDataURL(element);
          reader.onload = function(e) {
            This.showImageBase64.push(e.target.result);
          };
        }
      }
      //console.log( this.showImageBase64 )
    },
    //个人秀提交按钮
    showClickHandle(){
      var formPic = new FormData()
      //个人秀图片
      for(var i=0;i<this.showImageBase64.length;i++){
        formPic.append('selfShowImage',this.showImageBase64[i])
      }
      this.$axios({
        method:'post',
        url:this.$GLOBAL.baseURL + '/api/agent/update',
        data:formPic
      }).then(result =>{
        if(result.data.code === 0){
          this.$Message.success('提交个人秀成功');
        }
      })
    }
  }
};
</script>

<style scoped>
.m-userInfo {
  padding: 30px 0;
  border: 1px solid #eaeaea;
  font-size: 14px;
  overflow: hidden;
  position: relative;
}

.m-userInfo:after,
.m-userInfo:before {
  content: " ";
  display: table;
}

.m-userInfo .info {
  width: 281px;
  padding-left: 28px;
  border-right: 1px dashed #d2d2d2;
}

.m-userInfo .info .infoWrap {
  margin: 3px 0 17px;
}

.m-userInfo .info .infoWrap .avatar {
  display: inline-block;
  margin-right: 16px;
  border: 2px solid #f1f1f1;
  border-radius: 50%;
  height: 70px;
  width: 70px;
  overflow: hidden;
}

.m-userInfo .info .infoWrap .avatar img {
  width: 100%;
  height: 100%;
}

.m-userInfo .info .infoWrap .name {
  height: 70px;
  display: table-cell;
  vertical-align: middle;
}

.m-userInfo .asset .item:after,
.m-userInfo .asset .item:before,
.m-userInfo .info .growWrap .growNum:after,
.m-userInfo .info .growWrap .growNum:before {
  display: table;
  content: " ";
}

.m-userInfo .info .infoWrap .name .nickname {
  margin-bottom: 8px;
  max-width: 134px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.m-userInfo .info .growWrap {
  width: 220px;
}

.m-userInfo .info .growWrap .growNum {
  margin-bottom: 9px;
}

.m-userInfo .info .growWrap .process {
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 19px;
}

.m-userInfo .info .growWrap .process .num {
  height: 8px;
  background-color: #bea988;
}

.m-userInfo .asset {
  width: 550px;
  padding-left: 50px;
}

.m-userInfo .asset .item {
  /* float: left; */
  width: 266px;
  line-height: 36px;
  overflow: hidden;
}

.m-userInfo .asset .item .label {
  float: left;
  width: 88px;
  margin-right: 20px;
  text-align: left;
}

.m-userInfo .asset .item .content {
  float: left;
}

.m-userInfo .icon-common-close-eye,
.m-userInfo .icon-common-open-eye {
  vertical-align: -6px;
  margin-left: 9px;
  cursor: pointer;
}
.code-img {
  position: absolute;
  width: 200px;
  right: 30px;
}
.code-img img {
  width: 100%;
}
.f-left {
  float: left;
}
/* formPerson */
#formPerson {
  margin-top: 20px;
  padding-left: 40px;
}
#formPerson >>> .ivu-form-item-label {
  text-align: left !important;
}
.up-head-img {
  width: 30px;
  height: 30px;
  overflow: hidden;
  display: block;
  position: relative;
  border-radius: 50%;
}
.up-head-img img {
  width: 100%;
  height: 100%;
}
#headFile {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
/* formForword */
#formForword {
  margin-top: 20px;
  padding-left: 40px;
  width: 80%;
}
#formForword >>> .ivu-form-item-label {
  text-align: left !important;
}
.upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  align-content: center;
  justify-content: center;
}
#forwardCover:hover .upload-list-cover {
  display: flex;
  justify-content: center;
  align-items: center;
}
.upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 6px;
}
/* .crm-list  */
.crm-list {
  display: flex;
  flex-wrap: wrap;
}
.crm-list .ivu-card {
  width: 100% !important;
  margin-right: 10px;
  margin-bottom: 10px;
  height: 110px;
  overflow: hidden;
}
.crm-list >>> .ivu-card-body {
  padding: 0;
}
.crm-list .default-head {
  /* border-radius: 50%; */
  width: 100%;
  height: 100%;
}

#formShow {
  margin-top: 20px;
  padding-left: 40px;
}
.tabPaneCon >>> .ivu-form-item {
  font-size: 14px;
}
#formShow >>> .ivu-form-item-label {
  text-align: left !important;
}
#formPass {
  margin-top: 20px;
  padding-left: 40px;
}
#formPass >>> .ivu-form-item-label {
  text-align: left !important;
}

#formPerson >>> .ivu-row {
  margin-left: 0 !important;
}
#formPerson >>> .ivu-col-span-8 {
  padding-left: 0 !important;
}
/* upLoadControl */
.upLoadControl {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 158px;
  height: 110px;
  overflow: hidden;
  border: 1px solid #dcdee2;
  border-radius: 6px;
  margin-right: 10px;
  position: relative;
}
.upLoadControl .ivu-icon {
  display: block;
  width: 158px;
  text-align: center;
}
#upLoadControlInput {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.upLoadControl {
  width: 300px;
}
.tabPaneCon {
  width: 470px;
}
.wrap{
  width: 300px;
}
.section{
  width: 300px;
  box-sizing: border-box;
  padding: 20px 20px 0 20px; 
  border-radius: 10px;
  border:1px solid #ddd;
  margin-bottom: 20px;
  margin-right: 20px;
}
.title img{
  width: 30px;
  vertical-align: top;
}
.title span{
  font-size: 12px;
  color: #333;
  font-weight: normal;
}
.section h3 input{
  border: 0;
  padding: 0;
  font-weight: normal;
  cursor: text;
  margin: 10px 0;
  font-size: 12px;
}
.file{
  width: 100%;
  height: 250px;
  border: 2px dashed #8e8e8e;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  align-content: baseline;
}
.file-zf{
  align-items: center;
}
.file img{
  width: 100%;
  /* height: 100%; */
}
.file input{
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: absolute;
  left:0;
  top: 0;
  opacity: 0;
}
.order img{
  width: 25px;
  vertical-align: top;
  margin-top: 10px;
}
.order span{
  font-size: 12px;
  color: #333;
  line-height: 44px;
}
.btn{
  text-align: center;
}
.btn input{
  background: #3d6cc8;
  color: #fff;
  padding: 0;
  border: 0;
  text-align: center;
  cursor: pointer;
  padding: 6px 15px;
  border-radius: 4px;
  margin: 20px auto;
}
.error{
  width: 90px; 
  text-align: center;
  line-height: 24px;
  padding-bottom: 5px;
  border-bottom: 2px solid #aaa;
  margin: 0 auto;
  cursor: pointer;
}
.error img{
  width: 24px;
  vertical-align: top;
}
.error span{
  color: #aaa;
}

/*个人秀*/
.personShow{
  width: 358px;
}
.personShow .title{
  margin-top: 10px;
  text-align: center;
  position: relative;
  height: 23px;
}
.personShow .title span{
  position: absolute;
  font-size: 14px;
  color: #000;
  left: 50%;
  margin-left: -41px;
  padding: 0 20px;
  background: #fff;
  z-index: 1;
}
.personShow .title:after{
  content: '';
  display: block;
  border-bottom: 1px solid #cecece;
  position: relative;
  top: 9px;
}
.personShow .showFile{
  border: none;
}
.personShow h4{
  margin-bottom: 10px;
}
.personShow h4 input{
  width: 100%;
  border: none;
}
.headPic{
  width: 100px;  
  height: 100px;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
}
.headPic img{
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.file dl{
  width: 30%;
  height: 30%;
  border: 1px dashed #ddd;
  margin: 1.5%;
  text-align: center;
}
.file dl dt img{
  width: 50%;
}
.file dl dd{
  font-size: 12px;
  color: #999;
}
.file .inpFile{
  width: 32%;
  height: 32%;
}
.picList dt{
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.file .picList dt img{
  width: 100%;
}
</style>