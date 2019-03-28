<template>
  <div>
    <!-- 上传 -->
    <div
      class="uploadBar"
      :class="{showUploadBar:showUploadBar}"
    >
      <span @click="showUploadBarHandler"></span>
      <div class="uploadBtn">
        <i class="iconfont icon-shangchuan"></i>
        上传
        <input
          type="file"
          ref="uploadFileCtrl"
          id="uploadFileCtrl"
          @change="fileChange($event)"
        />
      </div>
    </div>
    <!-- 新建 -->
    <div
      @click="addCatalog"
      class="addCatalogBar uploadBar"
      :class="{showUploadBar:showUploadBar}"
    >
      <span></span>
      <div class="uploadBtn">
        <i class="iconfont icon-xinjianwenjianjia"></i>
        新建
      </div>
    </div>
    <!-- 上传弹层 -->
    <van-popup
      id="uploadPopup"
      v-model="uploadPopup"
      :close-on-click-overlay="overlay"
    >
      <div>
        <h3 style="text-align:center">上传</h3>
        <van-cell-group>
          <van-cell
            :title="upLoadFiles.name"
            :value="parseInt(upLoadFiles.size/1024)+'kb'"
          />
        </van-cell-group>
        <van-circle
          id="circle"
          v-model="currentRate"
          :rate="rate"
          :speed="100"
          :text="text"
        />
        <div class="upLoadBtn">
          <van-button
            type="default"
            :disabled="uploadDisabled"
            @click="upload"
          >上传</van-button>
        </div>
      </div>
    </van-popup>
    <!-- 资料区 -->
    <div
      class="center shadow-box"
      v-if="defaultParentCatalog"
    >
      <ul
        id="pan-main"
        v-if="defaultParentCatalog.length"
      >
        <van-checkbox-group v-model="checkResult">
          <li
            v-for="(item,index) in defaultParentCatalog"
            :key="index"
            class="file-item"
            :class="{isShow:item.isShow == 2}"
          >
            <div class="pan-icon">
              <i
                class="iconfont"
                :class="getFileType(item.type,item.fileExt).icon"
              ></i>
            </div>
            <div
              class="pan-info"
              @touchend="teamGetCatalogByParentId(item,true)"
            >
              <strong>{{ item.name }}</strong>
              <em v-show="item.type == 1">{{item.lowFiles}}项</em>
              <em v-show="item.type == 2">{{timeFormat(item.createTime)}}</em>
            </div>
            <div
              class="pan-right-arrow"
              @click="chooseFile(item.id+'#'+item.name+'#'+item.type+'#'+item.isShow)"
              v-show="!showPanCheckbox"
            >
              <i class="iconfont icon-xuanzhong1"></i>
            </div>
            <div
              class="pan-checkbox"
              v-show="showPanCheckbox"
            >
              <van-checkbox :name='item.id+"#"+item.name+"#"+item.type+"#"+item.isShow'>
                <i
                  slot="icon"
                  class="iconfont icon-xuanzhong"
                  slot-scope="props"
                  :style="{color:props.checked ? '#4e8dee' : '#aaaaaa'}"
                ></i>
              </van-checkbox>
            </div>
          </li>
        </van-checkbox-group>
      </ul>
      <!-- 空空如也 -->
      <div
        class="null-con"
        v-else
      >
        <i class="iconfont icon-tubiaozhizuomoban"></i>
        <p>空空如也</p>
      </div>
    </div>
    <!-- 弹出层选择移动目录 -->
    <van-popup
      id="moveFileWrap"
      v-model="moveFileWrapShow"
      :overlay="true"
    >
      <h5 class="moveFileWrapTitle">选择移动目录</h5>
      <ul id="pan-main">
        <van-checkbox-group
          v-model="checkResult"
          :max="1"
        >
          <li
            v-show="item.type == 1"
            v-for="(item,index) in defaultParentCatalog"
            :key="index"
            class="file-item"
            :class="{isShow:item.isShow == 2}"
          >
            <div class="pan-icon">
              <i
                class="iconfont"
                :class="getFileType(item.type,item.fileExt).icon"
              ></i>
            </div>
            <div
              class="pan-info"
              @touchend="teamGetCatalogByParentId(item,true)"
            >
              <strong>{{ item.name }}</strong>
              <em v-show="item.type == 1">{{item.lowFiles}}项</em>
              <em v-show="item.type == 2">{{timeFormat(item.createTime)}}</em>
            </div>
            <!-- <div class="pan-right-arrow" @click="chooseFile(item.id+'#'+item.name+'#'+item.type+'#'+item.isShow)" v-show="!showPanCheckbox">
              <i class="iconfont icon-xuanzhong1"></i>
            </div>
            <div class="pan-checkbox" v-show="showPanCheckbox">
              <van-checkbox :name='item.id+"#"+item.name+"#"+item.type+"#"+item.isShow'>
                <i slot="icon" class="iconfont icon-xuanzhong" slot-scope="props" :style="{color:props.checked ? '#4e8dee' : '#aaaaaa'}"></i>
              </van-checkbox>
            </div> -->
          </li>
        </van-checkbox-group>
      </ul>
      <div class="moveBtnWrap">
        <van-button
          class="enter"
          size="small"
          @click="moveFile"
        >确认</van-button>
        <van-button
          size="small"
          @click="closeMoveBtnWrap"
        >取消</van-button>
      </div>
    </van-popup>
    <!-- 工具条 -->
    <div
      v-show="showPanCheckbox"
      class="toolBar"
      id="toolBar"
    >
      <ul class="toolBar-list">
        <li
          @click="showUpdateNameHandler"
          :class="{disabled:checkResult.length != 1 }"
        >
          <i class="iconfont icon-zhongmingming"></i>
          <span>重命名</span>
        </li>
        <li
          @click="delFileHandler"
          :class="{disabled:checkResult.length < 1 }"
        >
          <i class="iconfont icon-shanchu"></i>
          <span>删除</span>
        </li>
        <li
          @click="hidden"
          :class="{disabled:checkResult.length != 1}"
        >
          <i class="iconfont icon-yincang"></i>
          <span>{{ showText }}</span>
        </li>
        <!-- <li
          @click="showMoveFile"
          :class="{disabled:checkResult.length != 1 }"
        >
          <i class="iconfont icon-yidong"></i>
          <span>移动</span>
        </li> -->
        <!-- <li @click="showMoveFile">
          <i class="iconfont icon-xinjianwenjianjia"></i>
          <span>新建</span>
        </li> -->
        <!-- <li @click="moveFile" :class="{disabled:checkResult.length != 1 }">
          <i class="iconfont icon-gengduo"></i>
          <span>更多</span>
        </li> -->
        <li
          class="cancel"
          @click="cancelToolBar"
        >
          <i class="iconfont icon-quanxuan"></i>
          <span>取消</span>
        </li>
      </ul>
    </div>
    <!-- 弹框，修改姓名 -->
    <van-dialog
      v-model="showUpdateName"
      title="重命名"
      show-cancel-button
      :before-close="beforeClose"
    >
      <div id="fileNameDom">
        <van-field
          ref="fileNameDom"
          clearable
          v-model="fileName"
          placeholder="请输入新文件名称"
        />
      </div>
    </van-dialog>
    <!-- 弹框，新建文件夹 -->
    <van-dialog
      v-model="showAddCatalog"
      title="新建文件夹"
      show-cancel-button
      :before-close="beforeCloseAddCatalog"
    >
      <div id="addCatalogNameDom">
        <van-field
          ref="addCatalogNameDom"
          clearable
          v-model="addCatalogName"
          placeholder="请输入文件夹名称"
        />
      </div>
    </van-dialog>
  </div>
</template>

<script>
import bus from "../../../components/eventBus.js";
import utils from "../../../assets/js/utils.js";
import qs from "qs";
export default {
  created() {
    var self = this;
    // 根据父级目录id获取下一级目录列表
    var item = item || { id: 0, parentIds: 0, type: 1 }
    this.teamGetCatalogByParentId(item,false);
  },
  mounted() {
    var self = this;
    window.onpopstate = function(event) {
      var state = event;
      // history.replaceState(null,"",location.href);
      var parentId = self.$route.query.parentId;
      var parentIds = self.$route.query.parentIds;
      var item = { id: parentId, parentIds: parentIds, type: 1 };
      self.teamGetCatalogByParentIdList(item, false);
    };
    setTimeout(() => {
      this.showUploadBar = true;
      setTimeout(() => {
        this.showUploadBar = false;
      }, 1000);
    }, 3000);
  },
  watch: {
    searchResult(curVal, oldVal) {
      console.log(curVal, oldVal);
      this.defaultParentCatalog = curVal;
    },
    checkResult(curVal, oldVal) {
      if (curVal.length) {
        this.moveFileFileId = curVal[0].split("#")[0];
      }
    }
  },
  props: ["searchResult"],
  data() {
    return {
      activeTabIndex: "0", //顶部当前激活的标签索引
      searchVal: "", //搜索内容
      defaultParentCatalog: [], //初始文件列表
      showPanCheckbox: false, //显示底侧选择框
      checkResult: [], //选择结果
      fileName: "", //文件名称
      showUpdateName: false, //展示修改名称弹框
      activeFileId: "0", //当前文件夹层级ID
      parentIds: "", //当前所有层级ID
      breadcrumb: [], //面包屑导航
      activeDirName: "",
      showUploadBar: false, //上传bar
      uploadPopup: false, //上传弹层
      overlay: true, //是否在点击蒙层后关闭
      currentRate: 0,
      upLoadFiles: {}, //上传文件
      rate: 0, //上传进度
      uploadDisabled: false, //是否可上传
      moveFileWrapShow: false, //是否显示移动文件弹层
      moveFileFileId: "", //要移动的文件
      showAddCatalog: false, //新建文件弹窗
      addCatalogName: "" //新文件夹名称
    };
  },
  computed: {
    text() {
      return this.currentRate.toFixed(0) + "%";
    },
    showText() {
      if (this.checkResult[0]) {
        return this.checkResult[0].split("#")[3] == 1 ? "隐藏" : "显示";
      } else {
        return "隐藏";
      }
    }
  },
  methods: {
    // 向根组件传递数据
    busEv() {
      bus.$emit("upOne", this.activeDirName);
    },
    // 标签索引与标题
    getTabIndex(index, title) {
      console.log(index, title);
    },
    // 文件搜索
    getFileByName() {
      this.axios({
        method: "get",
        url: baseURL + "/api/teamMeans/getFileByName",
        params: {
          fileName: this.searchVal
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            if (result.data.data.length) {
              this.defaultParentCatalog = result.data.data;
            } else {
              this.$toast("没有匹配到内容");
            }
          }
        })
        .catch(err => {});
    },
    // 根据父级目录id获取下一级目录列表
    teamGetCatalogByParentId(item, onOff = true) {
      
      var item = item || { id: 0, parentIds: 0, type: 1 };
      var activeParentId = item.id || 0; //当前文件夹层级ID
      this.axios({
        method: "get",
        url: baseURL + "/api/teamMeans/teamGetCatalogByParentId",
        params: {
          parentId: activeParentId || 0
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            if (item.type == 1) {
              var activeParentIds;
              this.activeDirName = item.name
              this.busEv();
              if (result.data.data[0]) {
                activeParentIds = result.data.data[0].parentIds; //当前所有层级ID
              } else {
                activeParentIds = 0;
              }
              if (onOff) {
                console.log('push',location.href.split("?")[0] +
                    "?parentId=" +
                    activeParentId +
                    "&parentIds=" +
                    activeParentIds);
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
              this.checkResult = []; //清空选择
            } else {
              // this.activeDirName = result.data.data[0].parentNames
              // this.busEv();
            }
          }
        })
        .catch(err => {});
    },
    // 获取当前目录下文件
    teamGetCatalogByParentIdList(item) {
      var item = item || { id: 0, parentIds: 0, type: 1 };
      var activeParentId = item.id || 0; //当前文件夹层级ID
      this.axios({
        method: "get",
        url: baseURL + "/api/teamMeans/teamGetCatalogByParentId",
        params: {
          parentId: activeParentId || 0
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            this.activeDirName = result.data.data[0].parentNames
            this.busEv();

            this.showPanCheckbox = false; //隐藏工具条
            this.defaultParentCatalog = result.data.data;

            this.checkResult = []; //清空选择
          }
        })
        .catch(err => {});
    },
    // 获取文件类型
    getFileType(type, fileExt) {
      var fileExt = fileExt.toLowerCase();
      if (type == 1) {
        return {
          icon: "icon-wenjianjia1"
        };
      } else if (type == 2) {
        var imgArr = ["jpg", "jpeg", "png", "gif"];
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
    // 清空选择，隐藏工具条
    cancelToolBar() {
      this.checkResult = []; //清空选择
      this.showPanCheckbox = false; //隐藏工具条
    },
    // 展示重命名弹窗框
    showUpdateNameHandler() {
      this.showUpdateName = true;
      //ML1541036902479133#QQ图片20180227092626.jpg
      var fileId = this.checkResult[0].split("#")[0]; //当前文件ID
      var fileName = this.checkResult[0].split("#")[1]; //当前文件名称
      // 打开弹窗默认赋值当前名称
      this.fileName = fileName;
    },
    // 重命名确认
    beforeClose(action, done) {
      if (action === "confirm") {
        if (this.fileName.length < 2) {
          this.$toast("操作失败!名称最小为2个字符");
          done();
          return;
        }
        var fileId = this.checkResult[0].split("#")[0]; //当前文件ID
        var fileName = this.checkResult[0].split("#")[1]; //当前文件名称
        this.axios({
          method: "post",
          url: baseURL + "/api/teamMeans/updateFileName",
          data: {
            fileId: fileId,
            newFileName: this.fileName
          }
        })
          .then(result => {
            if (result.data.code == 0) {
              this.$toast("修改成功");
              var item = item || { id: this.activeFileId };
              this.teamGetCatalogByParentIdList(item);
              done();
            }
          })
          .catch(err => {
            this.$toast(err.response.data.error);
            done();
          });
      } else {
        done();
      }
    },
    // 移动文件弹层
    showMoveFile() {
      var fileId = this.checkResult[0].split("#")[0];
      // console.log(fileId);
      this.checkResult = [];
      this.moveFileWrapShow = true;
      // 记录要移动的文件
      // this.moveFileFileId = fileId
    },
    // 移动文件
    moveFile() {
      this.axios({
        method: "post",
        url: baseURL + "/api/teamMeans/moveFile",
        data: qs.stringify({
          parentIds: this.parentIds,
          fileId: this.moveFileFileId
        })
      })
        .then(result => {
          if (result.data.code == 0) {
            this.$toast("已移动");
            var item = item || { id: this.activeFileId };
            this.teamGetCatalogByParentIdList(item);
            this.moveFileWrapShow = false;
          }
        })
        .catch(err => {
          this.$toast(err.response.data.error);
        });
    },
    // 关闭移动文件弹层
    closeMoveBtnWrap() {
      this.moveFileWrapShow = false; //移动文件弹层
      this.showPanCheckbox = false; //隐藏工具条
    },
    // 删除文件
    delFileHandler() {
      var delList = [];

      this.checkResult.map(item => {
        delList.push({
          id: item.split("#")[0],
          type: item.split("#")[2]
        });
      });

      this.$dialog.confirm({
        title: '删除确认',
        message: '确认是否删除此文件'
      }).then(() => {
        this.axios({
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        url: baseURL + "/api/teamMeans/delete",
        data: JSON.stringify(delList)
      })
        .then(result => {
          if (result.data.code == 0) {
            this.$toast("已删除");
            var item = item || { id: this.activeFileId };
            this.teamGetCatalogByParentIdList(item);
          }
        })
        .catch(err => {
          this.$toast("删除失败");
        });
      }).catch(() => {
        // on cancel
      });

      
    },
    // 创建文件夹
    addCatalog() {
      this.showAddCatalog = true;
    },
    // 创建文件夹确认
    beforeCloseAddCatalog(action, done) {
      if (action === "confirm") {
        if (this.addCatalogName.length < 2) {
          this.$toast("操作失败!名称最小为2个字符");
          done();
          return;
        }
        this.axios({
          method: "post",
          url: baseURL + "/api/teamMeans/addCatalog",
          data: {
            name: this.addCatalogName,
            parentId: this.activeFileId //当前文件夹层级
          }
        })
          .then(result => {
            if (result.data.code == 0) {
              this.$toast("新建成功");
              var item = item || { id: this.activeFileId };
              this.teamGetCatalogByParentIdList(item);
              done();
            }
          })
          .catch(err => {
            this.$toast(err.response.data.error);
            done();
          });
      } else {
        done();
      }
    },
    // 隐藏/显示文件（文件夹）
    hidden() {
      var hiddenList = [];
      this.checkResult.map(item => {
        hiddenList.push({
          id: item.split("#")[0],
          type: item.split("#")[2]
        });
      });
      // 当前文件显示状态
      var activeIsShow = this.checkResult[0].split("#")[3];

      if (activeIsShow == 1) {
        this.axios({
          method: "post",
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          },
          url: baseURL + "/api/teamMeans/hidden",
          data: JSON.stringify(hiddenList)
        })
          .then(result => {
            if (result.data.code == 0) {
              this.$toast("已隐藏");
              var item = item || { id: this.activeFileId };
              this.teamGetCatalogByParentIdList(item);
            }
          })
          .catch(err => {
            this.$toast("隐藏失败");
          });
      } else {
        this.axios({
          method: "post",
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          },
          url: baseURL + "/api/teamMeans/show",
          data: JSON.stringify(hiddenList)
        })
          .then(result => {
            if (result.data.code == 0) {
              this.$toast("已恢复显示");
              var item = item || { id: this.activeFileId };
              this.teamGetCatalogByParentIdList(item);
            }
          })
          .catch(err => {
            this.$toast("显示失败");
          });
      }
    },
    fileChange(event) {
      this.rate = 0;
      var uploadFileCtrl = event.target.files[0];
      if(uploadFileCtrl.type == 'video/mp4'){
        this.$toast("目前不支持视频文件上传");
        return
      }
       this.uploadPopup = true;
      // var uploadFileCtrl = document.getElementById("uploadFileCtrl").files[0];
      this.upLoadFiles = uploadFileCtrl;
    },
    // 点击蒙层时触发
    overlayHandler() {
      this.upLoadFiles = {};
      this.rate = 0;
    },
    // 上传
    upload() {
      var self = this;
      var formData = new FormData();
      var uploadFileCtrl = document.getElementById("uploadFileCtrl").files[0];
      formData.append("parentId", this.activeFileId);
      formData.append("teamMeansFile", this.upLoadFiles);
      this.axios({
        method: "post",
        url: baseURL + "/api/teamMeans/upload",
        data: formData,
        onUploadProgress: function(progressEvent) {
          // 上传进度
          var complete =
            ((progressEvent.loaded / progressEvent.total) * 100) | 0;
          self.rate = complete;
        }
      })
        .then(result => {
          this.uploadDisabled = false;
          if (result.data.code == 0) {
            this.$toast("上传成功");

            // 根据父级目录id获取下一级目录列表
            var item = item || {
              id: this.activeFileId,
              parentIds: this.parentIds
            };
            this.teamGetCatalogByParentIdList(item);
            this.uploadPopup = false;
          }
        })
        .catch(err => {
          this.uploadDisabled = false;
          this.$toast("上传失败");
        });
    },

    // 上传bar
    showUploadBarHandler() {
      this.showUploadBar = true;
      setTimeout(() => {
        this.showUploadBar = false;
      }, 3000);
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
  min-height: 63vh;
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
/* toolBar */
.toolBar {
  background: #fff;
  /* border-radius: 0.16rem 12/75; */
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
.toolBar-list {
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
  top: 20%;
  right: -3.633333rem /* 280/75 */;
  transition: 0.3s;
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
  right: -1.466667rem /* 110/75 */;
}
.uploadBar span {
  width: 0.8rem /* 60/75 */;
  height: 100%;
  display: block;
  text-align: center;
}
.uploadBtn {
  position: relative;
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.null-con .icon-tubiaozhizuomoban {
  font-size: 2rem /* 150/75 */;
}
</style>