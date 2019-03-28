<template>
    <div class="center">
        <div id="bx-school">
            <div class="common-title">
                <h4><i><img src="../../assets/img/index/boshimao.png"> </i><strong> 保险学堂</strong></h4>
            </div>
            <div class="bx-school-main">
                <Tabs class="atr-top" v-model="activeNameSchool">
                    <TabPane label="学习频道" name="xuexipindao">
                        <div>
                            <ul>
                                <template v-for="(item,index) in school.xuexipindao">
                                    <router-link tag='li' :to="{name:'Article',params:{id:item.id}}" :key="index">
                                        <div class="hover-img-box">
                                            <img src="../../assets/img/index/example02.jpg">
                                        </div>
                                        <div class="art-content">
                                            <a href="#">
                                                <strong>{{ item.title }}</strong>
                                                <p>{{ item.description }}</p>
                                                <span>{{ item.createTime }}</span>
                                            </a>
                                        </div>
                                    </router-link>
                                </template>
                            </ul>

                        </div>
                    </TabPane>
                    <TabPane label="保险资讯" name="baoxianzixun">
                        <div>
                            <ul class="atr-top">
                                <template v-for="(item,index) in school.baoxianzixun">
                                    <router-link tag='li' :to="{name:'Article',params:{id:item.id}}" :key="index">
                                        <div class="hover-img-box">
                                            <img src="../../assets/img/index/example03.jpg">
                                        </div>
                                        <div class="art-content">
                                            <a href="#">
                                                <strong>{{ item.title }}</strong>
                                                <p>{{ item.description }}</p>
                                                <span>{{ item.createTime }}</span>
                                            </a>
                                        </div>
                                    </router-link>
                                </template>
                            </ul>

                        </div>
                    </TabPane>
                    <TabPane label="行业聚焦" name="hangyejvjiao">
                        <div>
                            <ul class="atr-top">
                                <template v-for="(item,index) in school.hangyejvjiao">
                                    <router-link tag='li' :to="{name:'Article',params:{id:item.id}}" :key="index">
                                        <div class="hover-img-box">
                                            <img src="../../assets/img/index/example02.jpg">
                                        </div>
                                        <div class="art-content">
                                            <a href="#">
                                                <strong>{{ item.title }}</strong>
                                                <p>{{ item.description }}</p>
                                                <span>{{ item.createTime }}</span>
                                            </a>
                                        </div>
                                    </router-link>
                                </template>
                            </ul>

                        </div>
                    </TabPane>
                    <TabPane label="保险法规" name="baoxianfagui">
                        <div>
                            <ul class="atr-top">
                                <template v-for="(item,index) in school.baoxianfagui">
                                    <router-link tag='li' :to="{name:'Article',params:{id:item.id}}" :key="index">
                                        <div class="hover-img-box">
                                            <img src="../../assets/img/index/example03.jpg">
                                        </div>
                                        <div class="art-content">
                                            <a href="#">
                                                <strong>{{ item.title }}</strong>
                                                <p>{{ item.description }}</p>
                                                <span>{{ item.createTime }}</span>
                                            </a>
                                        </div>
                                    </router-link>
                                </template>
                            </ul>

                        </div>
                    </TabPane>
                </Tabs>
                <div class="art-slider-bar">
                    <ul class="art-slider-bar-list">
                        <h5>热门文章</h5>
                        <template v-for="(item,index) in school.baoxianfagui">
                            <router-link tag='li' :to="{name:'Article',params:{id:item.id}}" :key="index" v-if="index < 9"><i></i><a href="#">{{ item.title }}</a></router-link>
                        </template>
                    </ul>

                    <ul class="art-slider-bar-list art-slider-bar-list-agent">
                        <h5>优秀顾问</h5>
                        <li class="carousel-item">
                            <div>
                                <img class="head-icon" src="../../assets/img/index/example.jpg">
                                <h5>贤心</h5>
                                <p>平安保险 5年从业经验</p>
                                <Button @click="showConsulting" icon="md-text" type="primary">咨询</Button>
                            </div>
                        </li>
                        <li class="carousel-item">
                            <div>
                                <img class="head-icon" src="../../assets/img/index/example.jpg">
                                <h5>贤心</h5>
                                <p>平安保险 5年从业经验</p>
                                <Button @click="showConsulting" icon="md-text" type="primary">咨询</Button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  created() {
    //保险学堂
    this.searchArtByCategoryId(26).then(result => {
      this.school.xuexipindao = result;
    });
    // 保险咨询
    this.searchArtByCategoryId(27).then(result => {
      this.school.baoxianzixun = result;
    });
    // 行业聚焦
    this.searchArtByCategoryId(28).then(result => {
      this.school.hangyejvjiao = result;
    });
    // 保险法规
    this.searchArtByCategoryId(29).then(result => {
      this.school.baoxianfagui = result;
    });
  },
  data() {
    return {
      activeNameSchool: "xuexipindao", //保险学堂当前选项
      //保险学堂
      school: {
        xuexipindao: [],
        baoxianzixun: [],
        hangyejvjiao: [],
        baoxianfagui: []
      }
    };
  },
  methods: {
    showConsulting() {
      this.$store.state.modalConsult = !this.$store.state.modalConsult;
    },
    //   根据栏目id获取内容列表
    searchArtByCategoryId(categoryId) {
      return new Promise((resolve, reject) => {
        this.$axios({
          method: "get",
          url: this.$GLOBAL.baseURL + "/api/cms/searchArtByCategoryId",
          params: {
            categoryId: categoryId
          }
        })
          .then(result => {
            if (result.data.code == 0) {
              if (result.data.data.items.length) {
                var dataResult = result.data.data.items;
                resolve(dataResult);
              }
            }
          })
          .catch(err => {
            reject("出错了");
          });
      });
    }
  }
};
</script>

<style scoped>
/*common-title*/
.common-title {
  border-bottom: 1px solid #3d6cc8;
  line-height: 50px;
  margin-top: 30px;
  margin-bottom: 40px;
}
.common-title h4 {
  font-size: 24px;
  font-weight: bold;
  display: inline-block;
  border-bottom: 2px solid #3d6cc8;
}
.common-title img {
  max-width: 30px;
  vertical-align: middle;
}
.common-title strong {
  vertical-align: middle;
}
.bx-school-main {
  overflow: hidden;
}
.atr-top {
  width: 800px;
  float: left;
  overflow: hidden;
}
.atr-top li {
  padding-bottom: 20px;
  border-bottom: 1px solid #e9e9e9;
  margin-bottom: 20px;
}
.atr-top .hover-img-box {
  width: 200px;
  height: 134px;
  display: inline-block;
}
.atr-top .art-content {
  width: 570px;
  display: inline-block;
  vertical-align: top;
  padding-left: 6px;
}
.atr-top .art-content a {
  display: block;
}
.atr-top .art-content strong {
  line-height: 26px;
  color: #333;
  font-size: 16px;
  cursor: pointer;
}
.atr-top .art-content p {
  padding-top: 6px;
  line-height: 26px;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
   /* autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
}
.atr-top .art-content span {
  display: block;
  text-align: right;
  font-size: 13px;
  line-height: 26px;
  color: #666;
  font-size: 14px;
}
.art-list {
  float: right;
}
.art-list {
  width: 500px;
  float: right;
}
.art-list li {
  margin-bottom: 5px;
}

/*art-slider-bar*/
.art-slider-bar {
  float: right;
}
.art-slider-bar .art-slider-bar-list {
  box-sizing: border-box;
  width: 304px;
  /* height: 424px; */
  border: 1px solid #eaeaea;
  padding: 0 20px;
  padding-bottom: 20px;
  margin-bottom: 36px;
}
.art-slider-bar-list h5 {
  font-weight: bold;
  color: #3d6cc8;
  font-size: 20px;
  line-height: 56px;
}
.art-slider-bar-list li {
  line-height: 40px;
  list-style: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.art-slider-bar-list li > i {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3d6cc8;
  vertical-align: middle;
  margin-right: 6px;
}
.art-slider-bar-list li a {
  font-size: 14px;
  color: #333;
}
.art-slider-bar-list-agent {
  height: auto !important;
}
.carousel-item {
  text-align: center;
  border-bottom: 1px solid #dddddd;
  padding-bottom: 12px;
}
.art-slider-bar-list-agent .carousel-item h5 {
  line-height: 26px;
}
</style>