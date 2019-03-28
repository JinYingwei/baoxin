<template>
  <div class="pan">
    <!-- 搜索 -->
    <div class="search">
      <van-search placeholder="搜索分享文件" @search="getFileByName" v-model="searchVal" />
    </div>
    <!-- 上传 -->
    <div class="changeTeam uploadBar" :class="{showUploadBar:changeTeam}">
      <span @click="changeTeamHandler"><i class="iconfont icon-qiehuan"></i></span>
      <div class="uploadBtn" @click="showChangeTeamHandler">
        切换团队
      </div>
      <ul class="myTeamList">
        <li v-for="(item,index) in myTeamList" :key="index" @click="onSelect(item)">{{ item.name }}</li>
      </ul>
    </div>
    <!-- 资料区 -->
     <!-- 官方文档 -->
     <div class="center office-doc">
       <h4 class="title">官方文档</h4>
       <ul id="pan-main">
          <li @click="$showPDF(item.accessUrl)" v-for="(item,index) in sysDoc" :key="index" class="file-item">
            <div class="pan-icon">
              <i class="iconfont icon-wendang1"></i>
            </div>
            <div class="pan-info">
              <strong>{{ item.helpDocName }}</strong>
              <em>{{timeFormat(item.createTime)}}</em>
            </div>
          </li>
      </ul>
     </div>
      <!-- 资料区 -->
    <div class="center shadow-box" v-if="defaultParentCatalog">
      <h4 class="title">团队资料</h4>
      <ul id="pan-main" v-if="defaultParentCatalog.length">
        <van-checkbox-group v-model="checkResult">
          <li v-for="(item,index) in defaultParentCatalog" :key="index" class="file-item" :class="{isShow:item.isShow == 2}">
            <div class="pan-icon">
              <i class="iconfont" :class="getFileType(item.type,item.fileExt).icon"></i>
            </div>
            <div class="pan-info" @touchend="teamGetCatalogByParentId(item,true)">
              <strong>{{ item.name }}</strong>
              <em v-show="item.type == 1">{{item.lowFiles}}项</em>
              <em v-show="item.type == 2">{{timeFormat(item.createTime)}}</em>
            </div>
            <!-- @click="chooseFile(item.id+'#'+item.name+'#'+item.type+'#'+item.isShow+'#'+item.downloadUrl)" -->
            <div class="pan-right-arrow" v-show="item.type != 1 && !showPanCheckbox">
              <i class="iconfont icon-xuanzhong1"></i>
            </div>
            <div class="pan-checkbox" v-show="item.type != 1 && showPanCheckbox">
              <van-checkbox :name='item.id+"#"+item.name+"#"+item.type+"#"+item.isShow+"#"+item.downloadUrl'>
                <i slot="icon" class="iconfont icon-xuanzhong" slot-scope="props" :style="{color:props.checked ? '#4e8dee' : '#aaaaaa'}"></i>
              </van-checkbox>
            </div>
          </li>
        </van-checkbox-group>
      </ul>
      <!-- 空空如也 -->
      <div class="null-con" v-else>
        <i class="iconfont icon-tubiaozhizuomoban"></i>
        <p>空空如也</p>
      </div>
    </div>
    <!-- 工具条 -->
    <div v-show="showPanCheckbox" class="toolBar" id="toolBar">
      <ul class="toolBar-list">
        <li @click="downLoad" :class="{disabled:checkResult.length != 1  }">
          <i class="iconfont icon-xiazai"></i>
          <span>下载</span>
        </li>
        <!-- <li @click="previewShow" :class="{disabled:checkResult.length != 1 }">
          <i class="iconfont icon-yulan"></i>
          <span>预览</span>
        </li> -->
        <li class="cancel" @click="cancelToolBar">
          <i class="iconfont icon-quanxuan"></i>
          <span>取消</span>
        </li>
      </ul>
    </div>
    <!-- 选择团队 -->
    <!-- <van-actionsheet v-model="showTeam" :close-on-click-overlay="false" :actions="myTeamList" @select="onSelect" /> -->

    <div v-show="wxOut" class="taobaoMask" @click="wxOut = false">
      <div class="taobaoMaskCon">
        <br>
        <img src="../../assets/img/rightTop.png" alt="" style="width:25%">
        <br>
        <br>
        <h2>点击右上角，选择浏览器打开</h2>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
var ua = navigator.userAgent;

import qs from "qs";
import utils from "../../assets/js/utils.js";
import { ImagePreview } from "vant";
export default {
  created() {
    this.getMyTeam();
    this.getSysDoc()
  },
  watch:{
    searchVal(){
      if(this.searchVal == ''){
         this.teamGetCatalogByParentId();
      }
    }
  },
  mounted() {
    var self = this;

    window.onpopstate = function() {
      var parentId = self.$route.query.parentId;
      var parentIds = self.$route.query.parentIds;
      var item = { id: parentId, parentIds: parentIds, type: 1 };
      self.teamGetCatalogByParentId(item, false);
    };

    setTimeout(() => {
      this.changeTeam = true;
      setTimeout(() => {
        this.changeTeam = false;
      }, 1000);
    }, 2000);
  },
  data() {
    return {
      changeTeam: false,
      showTeam: false, //团队菜单
      myTeamList: [], //团队列表
      activeTeam: {}, //当前所选团队
      searchVal: "", //搜索内容
      searchResult: [],
      sysDoc:'',//系统文档
      defaultParentCatalog: "", //初始文件列表
      showPanCheckbox: false, //显示底侧选择框
      checkResult: [], //选择结果
      activeFileId: "0", //当前文件夹层级ID
      parentIds: "", //当前所有层级ID
      breadcrumb: [], //面包屑导航
      preview: false, //
      wxOut: false //微信外
    };
  },
  methods: {
    // 已加入团队
    getMyTeam() {
      this.axios({
        method: "get",
        url: baseURL + "/api/user/getMyTeam"
      })
        .then(result => {
          if (result.data.code == 0) {
            result.data.data.list.map(item => {
              this.myTeamList.push({
                name: item.userName,
                teamId: item.userId
              });
            });
            if (this.myTeamList[0]) {
              this.activeTeam = this.myTeamList[0];
            }

            // 根据父级目录id获取下一级目录列表
            this.teamGetCatalogByParentId();
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast(err.response.data.error);
        });
    },
    // 选择团队
    onSelect(item) {
      this.activeTeam = item;
      this.changeTeam = false;
      console.log(item);
      // 根据父级目录id获取下一级目录列表
      this.teamGetCatalogByParentId();
    },
    changeTeamHandler() {
      this.changeTeam = true;
      // this.showTeam = true;
    },
    showChangeTeamHandler() {
      this.showTeam = true;
      setTimeout(() => {
        this.changeTeam = false;
      }, 3000);
    },
    // 文件搜索
    getFileByName() {
      if(!this.searchVal){
        this.$toast("请输入搜索内容");
        return;
      }
      this.axios({
        method: "get",
        url: baseURL + "/api/teamMeans/getFileByName",
        params: {
          teamId:this.activeTeam.teamId,
          fileName: this.searchVal,
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            if (result.data.data.length) {
              this.defaultParentCatalog = result.data.data;
            } else {
              this.defaultParentCatalog = []
              this.$toast("没有匹配到内容");
            }
          }
        })
        .catch(err => {});
    },
    // 获取系统文档
    getSysDoc(){
      this.axios({
        method:'get',
        url: baseURL+'/api/teamMeans/getSysDoc',
        params: {
          docForwardType:1
        }
      }).then((result) => {
        if(result.data.code == 0){
          this.sysDoc = result.data.data
        }
      }).catch((err) => {
        
      });
    },
    // 根据父级目录id获取下一级目录列表
    teamGetCatalogByParentId(item, onOff = true) {
      var item = item || { id: 0, parentIds: 0, type: 1 };
      var activeParentId = item.id || 0; //当前文件夹层级ID
      // item.type == 1 表示是文件夹

      this.axios({
        method: "get",
        url: baseURL + "/api/teamMeans/getCatalogByParentId",
        params: {
          parentId: activeParentId || 0,
          teamId: this.activeTeam.teamId
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            if (item.type == 1) {
              var activeParentIds;
              if (result.data.data[0]) {
                activeParentIds = result.data.data[0].parentIds; //当前所有层级ID
              } else {
                activeParentIds = 0;
              }
              if (onOff) {
                // 添加历史记录
                history.pushState(
                  null,
                  "",
                  location.href.split("?")[0] +
                    "?parentId=" +
                    activeParentId +
                    "&parentIds=" +
                    activeParentIds
                );
              }
              this.activeFileId = activeParentId; //当前文件夹层级ID
              this.parentIds = activeParentIds; //记录当前所有层级ID
              this.showPanCheckbox = false; //隐藏工具条
              this.defaultParentCatalog = result.data.data;

              // 面包屑数据
              if (this.defaultParentCatalog[0].parentNames != null) {
                this.breadcrumb = this.defaultParentCatalog[0].parentNames.split(
                  "/"
                );
                this.breadcrumb = this.defaultParentCatalog[0].parentNames.split(
                  "/"
                );
                parentIds;
              } else {
                this.breadcrumb = [];
              }
              this.checkResult = []; //清空选择
            } else {
              // 
              if(item.fileExt != 'PDF'){
                ImagePreview([
                  item.accessUrl
                ])
              }else{
                this.$showPDF(item.accessUrl)
              }
            }
          }
        })
        .catch(err => {});
    },
    // 获取文件类型
    getFileType(type, fileExt) {
     
      var fileExt = fileExt.toLowerCase()
      if (type == 1) {
        return {
          icon: "icon-wenjianjia1"
        };
      } else if (type == 2) {
        var imgArr = ["jpg","jpeg", "png", "gif"];
        if (imgArr.includes(fileExt)) {
          return {
            icon: "icon-tupian2"
          };
        } else {
          return {
            icon: "icon-wendang1"
          };
        }
      }
    },
    // 选择文件
    chooseFile(file) {
      //显示左侧选择框
      this.showPanCheckbox = true;
      // 默认选中第一个
      this.checkResult = [file];
      // 记录要移动的文件
      this.moveFileFileId = this.checkResult[0].split("#")[0];
      var fileIsshow = this.checkResult[0].split("#")[3]; //当前文件是否显示
    },
    // 下载
    downLoad() {
      var id = this.checkResult[0].split("#")[0]; //当前文件是否显示
      var name = this.checkResult[0].split("#")[1]; //当前文件名
      var downloadUrl = this.checkResult[0].split("#")[4]; //当前文件是否显示

      var ua = navigator.userAgent;
      if (ua.indexOf("MicroMessenger") > -1) {
        this.wxOut = true;
        return;
      }
      this.axios({
        method: "get",
        responseType: "blob",
        url: baseURL + "/api/teamMeans/download",
        params: {
          downloadUrl: downloadUrl,
          id: id
        }
      })
        .then(result => {
          var blob = new Blob([result.data]);
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = name; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        .catch(err => {});
    },
    //预览
    previewShow() {
      window.scrollTo(0, 0);
      this.preview = true;
    },
    // 关闭
    closePreview() {
      this.preview = false;
    },
    // 清空选择，隐藏工具条
    cancelToolBar() {
      this.checkResult = []; //清空选择
      this.showPanCheckbox = false; //隐藏工具条
    },
    //转换时间
    timeFormat(sendTime) {
      var timeFormat = utils.timeFormat;
      return timeFormat(sendTime);
    }
  }
};
</script>

<style scoped>
.pan .shadow-box {
  background: #f9f9f9;
  position: relative;
}
.pan {
  background: #f2f2f2;
  min-height: 100vh;
}
/* search */
.search >>> .van-field__control {
  text-align: center;
}
.search >>> .van-cell {
  border-radius: 14px;
  background: #e9e9e9;
}
.search >>> .van-search {
  padding: 20px 15px;
}
/* breadcrumb */
.breadcrumb {
  width: 92%;
  margin: 0 auto;
  display: flex;
}
.breadcrumb > a {
  color: #666666;
  padding-right: 3px;
}
.breadcrumb > a strong {
  display: inline-block;
  vertical-align: middle;
  font-weight: normal;
  color: #666666;
  max-width: 2.466667rem /* 200/75 */;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.breadcrumb > a span {
  display: inline-block;
  vertical-align: middle;
}
.breadcrumb > a::after {
  /* content: ">"; */
  padding-left: 3px;
  font-family: Arial, Helvetica, sans-serif;
}
.pan .shadow-box {
  background: #f9f9f9;
  /* min-height: 63vh; */
  position: relative;
}
.pan {
  background: #f2f2f2;
  min-height: 100vh;
}
/* search */
.search >>> .van-field__control {
  text-align: center;
}
.search >>> .van-cell {
  border-radius: 14px;
  background: #e9e9e9;
}
.search >>> .van-search {
  padding: 20px 15px;
}
/* breadcrumb */
.breadcrumb {
  width: 92%;
  margin: 0 auto;
  display: flex;
}
.breadcrumb > a {
  color: #666666;
  padding-right: 3px;
}
.breadcrumb > a strong {
  display: inline-block;
  vertical-align: middle;
  font-weight: normal;
  color: #666666;
  max-width: 2.466667rem /* 200/75 */;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.breadcrumb > a span {
  display: inline-block;
  vertical-align: middle;
}
.breadcrumb > a::after {
  /* content: ">"; */
  padding-left: 3px;
  font-family: Arial, Helvetica, sans-serif;
}
/* pan-main */
#pan-main li.file-item {
  line-height: 1.733333rem /* 130/75 */;
  height: 1.733333rem /* 130/75 */;
  border-bottom: 1px solid #e5e5e5;
  position: relative;
  display: flex;
  align-items: center;
}

.pan-checkbox {
  width: 1.066667rem /* 80/75 */;
  position: absolute;
  right: 0;
  text-align: center;
}
.pan-checkbox .icon-xuanzhong {
  font-size: 0.666667rem /* 50/75 */;
}
.check-icon {
  width: 0.346667rem /* 26/75 */;
  height: 0.346667rem /* 26/75 */;
}
.pan-icon {
  vertical-align: middle;
  /* width: 0.786667rem 59/75; */
  display: inline-block;
  height: 100%;
  /* flex: 1; */
}
.pan-icon .iconfont {
  font-size: 1.2rem /* 90/75 */;
}
.pan-icon .icon-wenjianjia1 {
  color: #ffcd2c;
}
.pan-icon .icon-wendang1 {
  color: #4e8dee;
  font-size: 1.066667rem /* 80/75 */;
}
.pan-icon .icon-tupian2 {
  color: #ae7afa;
  font-size: 1.066667rem /* 80/75 */;
}
.pan-icon img {
  display: block;
  vertical-align: middle;
}
.pan-info {
  margin-left: 0.4rem /* 30/75 */;
  display: inline-block;
  width: 68%;
  /* flex: 6; */
}
.pan-info strong {
  font-weight: normal;
  display: block;
  line-height: 0.5rem /* 30/75 */;
  font-size: 0.346667rem /* 26/75 */;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pan-info em {
  display: block;
  font-style: normal;
  line-height: 0.4rem /* 30/75 */;
  font-size: 0.266667rem /* 20/75 */;
  color: #999999;
  padding-top: 0.08rem /* 6/75 */;
}
#pan-main .pan-right-arrow {
  width: 1.066667rem /* 80/75 */;
  position: absolute;
  right: 0;
  text-align: center;
}
#pan-main .pan-right-arrow .icon-xuanzhong1 {
  font-size: 0.186667rem /* 14/75 */;
}
.office-doc{
  padding: 14px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  margin-top: 14px;
  margin-bottom: 14px;
}
.title{
  margin-top: 0;
}
/* toolBar */
.toolBar {
  background: #fff;
  box-shadow: 0 0 0.133333rem /* 10/75 */ rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  z-index: 600;
  width: 100%;
  height: 1.6rem /* 120/75 */;
  line-height: 1.6rem /* 120/75 */;
}
.toolBar-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  line-height: 0.666667rem /* 50/75 */;
  padding-top: 0.16rem /* 12/75 */;
}
.toolBar-list li {
  text-align: center;
}
.toolBar-list .iconfont {
  display: block;
  font-size: 0.533333rem /* 40/75 */;
  color: #4e8dee;
}
.toolBar-list span {
  display: block;
  line-height: 0.666667rem; /* 50/75 */
}
.toolBar-list .cancel {
  color: red;
}
.toolBar-list .cancel .iconfont {
  color: red;
}
.toolBar-list .disabled {
  pointer-events: none;
  opacity: 0.5;
}
#fileNameDom {
  border: 1px solid #ccc;
  width: 80%;
  margin: 10px auto;
}
.uploadBar {
  position: fixed;
  max-height: 1.066667rem /* 80/75 */;
  line-height: 1.066667rem /* 80/75 */;
  border-top-left-radius: 0.533333rem /* 40/75 */;
  border-bottom-left-radius: 0.533333rem /* 40/75 */;
  background: #4e8dee;
  width: 2.933333rem /* 220/75 */;
  z-index: 100;
  color: #fff;
  /* display: flex; */
  align-items: center;
  top: 20%;
  right: -2.066667rem /* 200/75 */;
  transition: 0.3s;
  overflow: hidden;
}
.addCatalogBar {
  position: fixed;
  height: 1.066667rem /* 80/75 */;
  line-height: 1.066667rem /* 80/75 */;
  border-top-left-radius: 0.533333rem /* 40/75 */;
  border-bottom-left-radius: 0.533333rem /* 40/75 */;
  background: #4e8dee;
  width: 4rem /* 300/75 */;
  z-index: 100;
  color: #fff;
  display: flex;
  align-items: center;
  top: 26.6%;
  right: -4.633333rem /* 280/75 */;
  transition: 0.8s;
}
.showUploadBar {
  right: -0 /* 110/75 */;
  max-height: 8rem /* 600/75 */;
}
.uploadBar span {
  width: 0.8rem /* 60/75 */;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
}
.uploadBtn {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.myTeamList li {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 0 0.213333rem; /* 16/75 */
}
#uploadFileCtrl {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
}
#uploadPopup {
  width: 82%;
}
.upLoadBtn {
  margin: 0.5rem /* 40/75 */ 0;
  text-align: center;
}
.upLoadBtn .van-button--default {
  background-color: #4e8cee;
  color: #fff;
  border: none;
  letter-spacing: 3px;
}
.upLoadBtn .van-button--disabled {
  /* background-color: #e8e8e8;
    color: #999; */
  opacity: 0.6;
}
#circle {
  display: block;
  margin: 20px auto;
}
.isShow {
  opacity: 0.5;
}

/* #moveFileWrap */
#moveFileWrap {
  width: 8.8rem /* 700/75 */;
  padding: 0.533333rem /* 40/75 */ 0;
  height: 68vh;
}
.moveBtnWrap {
  text-align: center;
  padding-top: 0.266667rem /* 20/75 */;
}
.moveBtnWrap .van-button--default.enter {
  background-color: #4e8cee;
  color: #fff;
}
.moveFileWrapTitle {
  text-align: center;
  margin-top: 0;
}
#moveFileWrap #pan-main {
  width: 95%;
  margin: 0 auto;
  height: 58vh;
  overflow: scroll;
}
.moveBtnWrap .van-button--disabled.enter {
  background-color: #e8e8e8;
}
.null-con {
  text-align: center;
  position: absolute;
  top: 240%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.null-con .icon-tubiaozhizuomoban {
  font-size: 2rem /* 150/75 */;
}

/* taobaoMask */
.taobaoMask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3000;
  top: 0;
  left: 0;
}
.taobaoMaskCon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 5rem;
  padding: 0.3rem;
  font-size: 0.24rem;
  background: #fff;
  border-radius: 0.15rem;
  line-height: 0.4rem;
  text-align: center;
}
.taobaoMaskCon h2 {
  text-align: center;
}
</style>