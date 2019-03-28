<template>
  <div>
    <van-tabs v-model="selected" @change="selectedHandle" sticky class='learn-tab' color="#4e8cee">
      <van-tab title='观念'>
        <div slot="title" title='观念'>
          <van-icon name="pending-evaluate" />
          <em>观念</em>
        </div>
        <van-cell-group class=''>
          <van-list :finished="guannianFinished" @load="guannian">
            <ul class="public-list center">
              <router-link tag='li' :to="{path:'/details',query:{id:item.id,title:selectedTitle}}" v-for="(item,index) in guannianData" :key="index">
                <div class="title" href="javascript:;">{{ item.title }}</div>
                <div class="conTxt">
                  <div class="left">
                    <p>{{ item.description }}</p>
                    <span class="timer">{{ item.createTime }}</span>
                  </div>
                  <div class="right">
                    <img :src="item.coverUrl || require('../assets/img/demo01.jpg')" />
                  </div>
                </div>
              </router-link>
            </ul>
          </van-list>
        </van-cell-group>
      </van-tab>

      <van-tab>
        <div slot="title" title='获客'>
          <van-icon name="contact" />
          <em>获客</em>
        </div>
        <van-cell-group class=''>
          <van-list :finished="huokeFinished" @load="huoke">
            <ul class="public-list center">
              <router-link tag='li' :to="{path:'/details',query:{id:item.id,title:selectedTitle}}" v-for="(item,index) in huokeData" :key="index">
                <div class="title" href="javascript:;">{{ item.title }}</div>
                <div class="conTxt">
                  <div class="left">
                    <p>{{ item.description }}</p>
                    <span class="timer">{{ item.createTime }}</span>
                  </div>
                  <div class="right">
                    <img :src="item.coverUrl || require('../assets/img/demo01.jpg')" />
                  </div>
                </div>
              </router-link>
            </ul>
          </van-list>
        </van-cell-group>
      </van-tab>

      <van-tab>
        <div slot="title" title='产品'>
          <van-icon name="exchange" />
          <em>产品</em>
        </div>
        <van-cell-group class=''>
          <van-list :finished="chanpinFinished" @load="chanpin">
            <ul class="public-list center">
              <router-link tag='li' :to="{path:'/details',query:{id:item.id,title:selectedTitle}}" v-for="(item,index) in chanpinData" :key="index">
                <div class="title" href="javascript:;">{{ item.title }}</div>
                <div class="conTxt">
                  <div class="left">
                    <p>{{ item.description }}</p>
                    <span class="timer">{{ item.createTime }}</span>
                  </div>
                  <div class="right">
                    <img :src="item.coverUrl || require('../assets/img/demo01.jpg')" />
                  </div>
                </div>
              </router-link>
            </ul>
          </van-list>
        </van-cell-group>
      </van-tab>

      <van-tab>
        <div slot="title" title='问答'>
          <van-icon name="question" />
          <em>问答</em>
        </div>
        <van-cell-group class=''>
          <van-list :finished="wendaFinished" @load="wenda">
            <ul class="public-list center">
              <router-link tag='li' :to="{path:'/details',query:{id:item.id,title:selectedTitle}}" v-for="(item,index) in wendaData" :key="index">
                <div class="title" href="javascript:;">{{ item.title }}</div>
                <div class="conTxt">
                  <div class="left">
                    <p>{{ item.description }}</p>
                    <span class="timer">{{ item.createTime }}</span>
                  </div>
                  <div class="right">
                    <img :src="item.coverUrl || require('../assets/img/demo01.jpg')" />
                  </div>
                </div>
              </router-link>
            </ul>
          </van-list>
        </van-cell-group>
      </van-tab>

    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "learn",
  data() {
    return {
      selected: 0,
      selectedTitle:"观念",
      finished: false,
      guannianData: [], //观念
      guannianPage: 0, //当前页码
      guannianTotalPage: 0, //观念总页码
      guannianFinished: false, //观念是否加载完成
      huokeData: [], //获客
      huokePage: 0, //获客当前页码
      huokeTotalPage: 0, //获客总页码
      huokeFinished: false, //获客是否加载完成
      chanpinData: [], //产品
      chanpinPage:0, //产品当前页码
      chanpinTotalPage: 0, //产品总页码
      chanpinFinished: false, //产品是否加载完成
      wendaData: [], //问答
      wendaPage: 0, //	wenda当前页码
      wendaTotalPage: 0, //	wenda总页码
      wendaFinished: false //	wenda是否加载完成
    };
  },
  created() {
    var tabId = this.$route.query.tabId;
    if (tabId) {
      switch (tabId) {
        case "0":
          this.selected = "0";
          break;
        case "1":
          this.selected = "1";
          break;
        case "2":
          this.selected = "2";
          break;
        case "3":
          this.selected = "3";
          break;
        default:
          break;
      }
    }
  },
  methods: {
    selectedHandle(index,title){
			console.log(index,title);
      this.selectedTitle = index+''
    },
    //观念
    guannian() {
      this.guannianPage++
      this.axios({
          method: "get",
          url: baseURL + "/api/cms/searchArtByCategoryId",
          params: {
            categoryId: 13,
            page: this.guannianPage
          }
        })
          .then(result => {
            if (result.data.code == 0) {
              if(result.data.data.items.length){
                this.guannianData = this.guannianData.concat(
                      result.data.data.items
                    );
              }else{
                this.guannianFinished = true;
              }
              
            }
          })
          .catch(err => {});
    },
    //获客
    huoke() {
      this.huokePage++;
      this.axios({
          method: "get",
          url: baseURL + "/api/cms/searchArtByCategoryId",
          params: {
            categoryId: 14,
            page: this.huokePage
          }
        })
          .then(result => {
            if (result.data.code == 0) {
              if(result.data.data.items.length){
                this.huokeData = this.huokeData.concat(
                      result.data.data.items
                    );
              }else{
                this.huokeFinished = true;
              }
            }
          })
          .catch(err => {});
    },
    //产品
    chanpin() {
      this.chanpinPage++;
      this.axios({
          method: "get",
          url: baseURL + "/api/cms/searchArtByCategoryId",
          params: {
            categoryId: 15,
            page: this.chanpinPage
          }
        })
          .then(result => {
            if (result.data.code == 0) {
              if(result.data.data.items.length){
                this.chanpinData = this.chanpinData.concat(
                      result.data.data.items
                    );
              }else{
                this.chanpinFinished = true;
              }
            }
          })
          .catch(err => {});
    },
    //问答
    wenda() {
      this.wendaPage++;
       this.axios({
          method: "get",
          url: baseURL + "/api/cms/searchArtByCategoryId",
          params: {
            categoryId: 16,
            page: this.wendaPage
          }
        })
          .then(result => {
            if (result.data.code == 0) {
              if(result.data.data.items.length){
                this.wendaData = this.wendaData.concat(
                      result.data.data.items
                    );
              }else{
                this.wendaFinished = true;
              }
            }

          })
          .catch(err => {});
    }
  }
};
</script>

<style scoped>
.learn-tab {
  padding-bottom: 2rem; /* 150/75 */
}
.learn-tab em {
  font-style: normal;
  vertical-align: middle;
}

.learn-tab .van-icon {
  vertical-align: middle;
}

.mt-tab-container-item {
  background: #f7f7f9;
}

.breviary-con .data {
  display: block;
  text-align: right;
}
.public-list {
  width: 9.333333rem /* 700/75 */;
  margin: 0 auto;
  margin-top: 0.32rem /* 24/75 */;
  border-radius: 0.266667rem /* 20/75 */;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0 0.333333rem /* 25/75 */ rgba(0, 0, 0, 0.3);
}
.public-list .title {
  font-size: 0.4rem /* 30/75 */;
  color: #333333;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.van-cell-group {
  background: none;
}
.public-list li {
  padding: 0.4rem /* 30/75 */;
  border-bottom: 1px solid #e5e5e5;
}
.public-list .left {
  width: 6.24rem /* 468/75 */;
}
.public-list .left p {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /*!  autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */

  font-size: 0.32rem /* 24/75 */;
  color: #666666;
}
.public-list .left .timer {
  display: block;
  padding-top: 0.133333rem /* 10/75 */;
}
.public-list .conTxt {
  display: flex;
  justify-content: space-between;
  padding-top: 0.266667rem /* 20/75 */;
}
.public-list .right {
  width: 2.08rem /* 156/75 */;
  max-height: 1.426667rem /* 107/75 */;
  overflow: hidden;
}
.public-list .right img {
  width: 100%;
}
</style>
