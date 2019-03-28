<template>
  <div>
    
    <div class="center shadow-box" id="sendSMS">
      <h3 class="shareTitle">历史通知</h3>
      <div class="history-msg">
        <ul >
          <div id="van-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="400">
            <li v-for="(item,index) in TeamManageMsg" :key="index">
              <p>{{ item.content }}</p>
              <div class="msgBottom">
                <span>团队消息</span>
                <strong>{{ timeFormat(item.publishTime) }}</strong>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import utils from "../../assets/js/utils.js";
export default {
  data() {
    return {
      TeamManageMsg: [], //消息历史
      finished: false, //是否已加载完成,
      page: 1, //当前页数,
      totalPage: 0,
      busy: false //是否正在加载过程中
    };
  },
  created() {
    // this.getTeamManageMsg();
  },
    mounted() {
    // 屏幕调试
    var viewHeight = document.body.clientHeight;
    this.$nextTick(function() {
      var vanList = document.querySelector("#van-list");
      if (viewHeight <= 480) {
        vanList.style.height = "63vh";
      }
    });
  },
  methods: {
    loadMore() {
      this.axios({
        url: baseURL + "/api/user/getTeamManageMsg",
        method: "get",
        params: {
          page: this.page
        }
      }).then(result => {
        if (result.data.code == 0) {
             var data = result.data.data.items
              if (data.length) {
               this.page++;
               this.TeamManageMsg = this.TeamManageMsg.concat(result.data.data.items);
              } else {
                this.busy = true;
              }
        }
      });
    },
    //转换时间
    timeFormat(sendTime) {
      var timeFormat = utils.timeFormat;
      return timeFormat(sendTime);
    },

    //消息历史
    getTeamManageMsg() {
      this.axios({
        url: baseURL + "/api/user/getTeamManageMsg",
        method: "get",
        params: {
          page: this.page
        }
      }).then(result => {
        if (result.data.code == 0) {
          this.totalPage = result.data.data.totalPage;
          if (this.totalPage > 1) {
              this.page++;
              console.log(this.page,this.totalPage);
              if (this.page <= this.totalPage) {
               this.TeamManageMsg = this.TeamManageMsg.concat(result.data.data.items);
              } else {
                this.finished = true;
              }
            } else {
              this.TeamManageMsg = this.TeamManageMsg.concat(result.data.data.items);
              this.finished = true;
            }
        }
      });
    }
  }
};
</script>

<style>
#sendSMS{
  height: 84vh;
  overflow: auto;
}
.shareTitle {
  text-align: center;
}
.history-msg li p {
  font-size: 0.373333rem /* 28/75 */;
  color: #333333;
}
.msgBottom {
  display: flex;
  justify-content: space-between;
}
.history-msg li {
  padding-bottom: 0.346667rem /* 26/75 */;
  border-bottom: 0.026667rem /* 2/75 */ solid #e5e5e5;
  margin-bottom: 0.373333rem /* 28/75 */;
}
.history-msg .msgBottom span {
  width: 1.6rem /* 120/75 */;
  height: 0.4rem /* 30/75 */;
  line-height: 0.4rem /* 30/75 */;
  text-align: center;
  color: #4e8cee;
  border: 1px /* 1/75 */ solid #4e8cee;
  border-radius: 0.106667rem /* 8/75 */;
  font-size: 0.16rem; /* 12/75 */
}
.msgBottom strong {
  font-weight: normal;
}
.history-msg .van-field__control {
  text-align: right;
}

.history-msg .van-field .van-cell__title {
  flex: 3;
  max-width: 180px;
  word-wrap: break-word;
}

.null-tip {
  line-height: 22px;
}

.null-tip span {
  padding-left: 10px;
  line-height: 22px;
}
#van-list {
  height: 68vh;
  overflow: scroll;
}
</style>