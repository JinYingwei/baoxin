<template>
  <div>
    <div class="public-title">团队信息</div>
    <div class="m-userInfo">
      <div class="info f-left">
        <div class="infoWrap"><a class="avatar f-left" target="_blank"><img width="66" :src="teamInformation.headImg"></a>
          <div class="name">
            <div class="nickname"><a>{{teamInformation.userName}}</a></div><a class="w-levelname" target="_blank" data-reactid=".3.0.0.0.0.1.1"><noscript data-reactid=".3.0.0.0.0.1.1.0"></noscript><span class="w-icon-member member-top-vip0" data-reactid=".3.0.0.0.0.1.1.1"></span></a>
          </div>
        </div>
        <div class="growWrap">
          <div class="growNum"><span>简介 &gt;&gt;</span></div>
          <div class="process">
            <a>{{teamInformation.teamSummary}}</a>
          </div><noscript></noscript><a class="w-levelname" target="_blank"><span class="w-icon-member member-top-vip0" data-reactid=".3.0.0.0.1.3.0"></span></a>
        </div>
      </div>
      <div class="asset f-left">
        <div class="item">
          <div class="label">团队成立时间</div>
          <div class="content"><a target="_blank"><span>{{creatTime}}</span></a></div>
        </div>
        <div class="item">
          <div class="label">人数</div>
          <div class="content"><a target="_blank"><span>{{teamInformation.teamNum}}</span></a></div>
        </div>
        <div class="item">
          <div class="label">电话</div>
          <div class="content"><a target="_blank"><span>{{teamInformation.phone}}</span></a><i class="w-icon-common icon-common-open-eye" data-reactid=".3.0.0.1.3.1.1"></i></div>
        </div>
        <div class="item">
          <div class="label">地区</div>
          <div class="content"><a target="_blank">{{$GLOBAL.getCityResult(cityData,teamInformation.area)}}</a></div>
        </div>
        <!-- <div class="item" >
                    <div class="label" >待领礼包</div>
                    <div class="content" ><a href="/membership/index" target="_blank" ><span>0</span><span >个</span></a></div>
                </div> -->
      </div>
      <div class="code-img">
        <img :src="teamInformation.qrCodePath" alt="">
      </div>
    </div>
    <br>
    <div class="public-title">信息设置</div>
    <Tabs type="card">
      <TabPane label="团队资料">
        <Form id="formPerson" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
          <FormItem label="头像">
            <a class="up-head-img">
              <input 
                type="file" 
                class="file"
                @change="getHeadImg($event)"
                accept="image/*"
              >
              <img width="66" :src="formValidate.headImg" >
            </a>
          </FormItem>
          <FormItem label="团队名称" prop="userName">
            <Input size='large' v-model="formValidate.userName" placeholder="请输入您要修改的团队名称"></Input>
          </FormItem>
          <FormItem label="地区" >
            <div class="myCity">
              <al-selector
                level='1'
               
                size="large"
                :auto='true'
                v-model="formValidate.area"
              />
            </div>
          </FormItem>
          <FormItem label="个人简介">
            <Input size='large' v-model="formValidate.teamSummary" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入您的个人简介..."></Input>
          </FormItem>
          <FormItem>
            <Button size='large' type="primary" @click="handleSubmit('formValidate')">提交</Button>
          </FormItem>
        </Form>
      </TabPane>

      <!-- 团队介绍 -->
      <TabPane label="团队介绍">
        <div class="tabPaneCon">
          <Form>
            <FormItem label="团队介绍">
              <Input
                v-model="formValidate.teamIntro"
                :autosize="{minRows: 10}"
                type="textarea"
                placeholder="请输入您的团队简介..."
              />
            </FormItem>
            <FormItem>
              <Button
                size='large'
                type="primary"
                :loading="loadingBtn"
                @click="updateTeamIntro"
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
              <div class="file file-fm">
                <img :src="coverTempletUrl">
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
      <TabPane label="团队秀">
        <div class="tabPaneCon">
         
          <div class="section personShow">
            <h2 class="headPic">
              <img :src="teamInformation.headImg">
            </h2>
            <div class="title">
              <span>团队秀</span>
            </div>
            <h4><input type="text" v-model="xcxTitle" placeholder="请输入团队秀简介"></h4>
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
            <!-- <div class="order">
              <img src="../../../assets/img/order.png">
              <span>小程序</span>
            </div> -->
            <div class="btn">
              <input 
                type="submit" 
                value="提交"
                @click="showClickHandle"
              >
            </div>
          </div>  
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
  </div>
</template>

<script>
import cityData from '@/assets/lib/region'
import qs from "qs"
export default {
  created() {
    this.queryTeamInformation()
    this.cityData = cityData
  },
  computed:{
    creatTime(){
      let time = String(this.teamInformation.createTime)
      time = time.substring(0,4) + '-' + time.substring(4,6) + '-' +time.substring(6,8)
      return time
    },
    
  },
  data() {
    // 密码确认验证
    const validrenewpassword = (rule, value, callback) => {
      if (this.updateUserPwd.newpassword != this.updateUserPwd.renewpassword) {
        callback(new Error("两次密码输入不一致"));
      }
      callback();
    };
    return {
      loadingBtn:false,
      teamInformation:'', //团队信息
      cityData:'',  //地区
      headImg:'', //头像
      xcxTitle:'',  //标题
      imgHeadFile:'',
      viewImageDataUrl:'',  //封面
      showImageBase64:[], //个人秀图片列表base64
      showImageList:[], //个人秀图片列表
      coverTempletUrl:'',
      updateUserPwd: {
        oldpassword: "",
        newpassword: "",
        renewpassword: ""
      },

      formValidate: {
        userName: "",   //名称
        area: [],   //地区
        teamSummary: "",   //个人简介
        headImg:'',
        teamIntro:''

      },
      ruleValidate: {
        userName: [
          {
            required: true,
            message: "团队名称不能为空",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
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
    //查询团队信息
    queryTeamInformation(){
      this.$axios({
        method:'get',
        url:this.$GLOBAL.baseURL + '/api/team/search'
      })
      .then(result=>{ 
        this.teamInformation = JSON.parse(JSON.stringify(result.data[0]))
        var area = this.teamInformation.area.split('|')
        var sheng = area[0]
        var shi = area[1]
        this.formValidate =  result.data[0]
        this.formValidate.area = [sheng,shi]
        this.teamInformation.headImg = this.teamInformation.headImg+'&random'+Math.random()
        this.formValidate.headImg = this.teamInformation.headImg+'&random'+Math.random()
        this.coverTempletUrl = result.data[0].coverTempletUrl
         // 将团队名字进行存储
        localStorage.setItem('teamName',result.data[0].userName)
      })
      .catch(err=>{
        console.log(err);
      })
    },
    //团队资料头像预览
    getHeadImg(e){
      var This = this
      var target = e.target
      var reader = new FileReader()
      reader.readAsDataURL(target.files[0])
      this.imgHeadFile = target.files[0]
      reader.onload = function(e){
        This.formValidate.headImg = e.target.result
      }
    },
    //选择地区
    // changeArea(){
    //   console.log(this.formValidate.area);
    // },
    //团队资料提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var formData = new FormData()
          
          formData.append('teamSummary',this.formValidate.teamSummary)

          formData.append('imgHeadFile',this.imgHeadFile)
          
          formData.append('userName',this.formValidate.userName)

          
          //省
          if(this.formValidate.area && this.formValidate.area[0].code){
            //console.log(this.formValidate.area);
            formData.append('province',Number(this.formValidate.area[0].code))
            formData.append('city',Number(this.formValidate.area[1].code))
          }
   
          this.$axios({
            method:'post',
            url:this.$GLOBAL.baseURL + '/api/team/update',
            data:formData
          })
          .then(result=>{
            if(result.data.code === 0){
              this.$Message.success("提交成功!");
              this.queryTeamInformation()
            }
          })
          .catch(err=>{
            console.log(err);
          })
        } else {
          this.$Message.error("团队资料不能为空!");
        }
      });
    },
    // 预览封面模板
    customIview() {
      this.$Modal.confirm({
        title: "模板一",
        closable: true,
        width: "520",
        content: `<p><img src ="${"http://www.sinelinked.com/static/other/pic-bg1.jpg"}"  /></p>`,
        okText: "选择此模板",
        cancelText: "取消"
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
        This.coverTempletUrl = e.target.result
        This.viewImageDataUrl = e.target.result
      }
     
    },
    //转发封面,提交按钮
    clickHandle(){
      var form = new FormData()

      this.xcxTitle ?  form.append('teamXcxTitle',this.xcxTitle) : form.append('teamXcxTitle',' ')

      form.append('shareImageStr',this.viewImageDataUrl)
      this.$axios({
        method:'post',
        url:this.$GLOBAL.baseURL+'/api/team/updatePic',
        data:form
      }).then(result=>{
        console.log(result);
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
        url:this.$GLOBAL.baseURL+'/api/team/emptyTeamShareInfo'
      })
      .then(result =>{
        this.queryTeamInformation()
        if(result.data.code===0){
          this.$Message.success('封面取消')
        }
      })
      .catch(error=>{
        console.log(error);
      })
    },
    //点击个人秀选择照片
    showHandle(e){
      var target = e.target
      var files = target.files

     if( this.showImageList.length + files.length > 9){
        this.$Message.warning('图片最多上传9张')
        return
      }

      for(var key in files){
        if (files.hasOwnProperty(key)) {
          const element = files[key]
          // for(var key in this.showImageList){
          //   if(this.showImageList[key].name!==element.name){
          //      this.showImageList.push(element)
          //   }
          // }
          this.showImageList.push(element)
        }
         
      }


      var This = this
      this.showImageBase64 = []
       for (const key in this.showImageList) {
        if (this.showImageList.hasOwnProperty(key)) {
          const element = this.showImageList[key];
          var reader = new FileReader()
          reader.readAsDataURL(element)
          reader.onload = function(e) {
            This.showImageBase64.push(e.target.result)
          }
        }
      }
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
        url:this.$GLOBAL.baseURL + '/api/team/update',
        data:formPic
      }).then(result =>{
        if(result.data.code === 0){
          this.$Message.success('提交个人秀成功');
        }
      })
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
    //团队个人介绍
    updateTeamIntro(){
      if(!this.formValidate.teamIntro){
        this.$Message.error('请输入团队资料内容');
      }
      this.$axios({
        method:'post',
        url:this.$GLOBAL.baseURL+'/api/team/updateTeamIntro',
        data:{
          teamIntro:this.formValidate.teamIntro
        }
      }).then(result=>{
        this.$Message.success('团队介绍提交成功');
      }).catch(err=>{
        console.log(err);
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
}

.m-userInfo .info .infoWrap .avatar img {
  border-radius: 50%;
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
  width: 240px;
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
  top: 9px;
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
  width: 60%;
  padding-left: 40px;
}
#formPerson >>> .ivu-form-item-label {
  text-align: left !important;
}
.up-head-img {
  width: 70px;
}
.up-head-img img {
  border-radius: 50%;
}
/* formForword */
#formForword {
  margin-top: 20px;
  padding-left: 40px;
  width: 62%;
}
#formForword >>> .ivu-form-item-label {
  text-align: left !important;
}
/* .crm-list  */
.crm-list {
  display: flex;
  flex-wrap: wrap;
}
.crm-list .ivu-card {
  margin-right: 10px;
  margin-bottom: 10px;
}
.crm-list .default-head {
  border-radius: 50%;
  width: 65px;
}
#formShow,
#formPass {
  width: 53%;
}
#formShow {
  margin-top: 20px;
  padding-left: 40px;
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
.up-head-img .file{
  position: absolute;
  left: 0;
  top: 0;
  width: 66px;
  height: 66px;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
}
.up-head-img img{
  cursor: pointer;
  height: 66px;
  overflow: hidden;
}
.myCity >>>.ivu-row{
  margin-left: 0 !important;
}
.myCity >>>.ivu-row .ivu-col{
  padding-left: 0 !important;
}
.avatar img{
  height: 66px;
}
.zf input{
  position: absolute;
  left:0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
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
/* .tabPaneCon {
  width: 470px;
} */
>>>textarea.ivu-input{
  width: 470px !important;
}
.wrap{
  width: 300px;
}
.section{
  width: 300px;
  box-sizing: border-box;
  padding: 20px 20px 0 20px; 
  border-radius: 20px;
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
.file-fm{
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

/*团队秀*/
/* .file dl{
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
.file .picList{
  border-style: solid; 
}
.picList dt{
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.file .picList dt img{
  width: 100%;
} */

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