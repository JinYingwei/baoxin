<template>
    <div>
        <!-- Carousel  -->
        <Carousel id="topCarousel" autoplay loop :autoplay-speed="5200">
            <CarouselItem>
                <div class="demo-carousel"><img src="../../assets/img/index/banner01.jpg"></div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel"><img src="http://sinelinked.com/img/index/banner01.jpg"></div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel"><img src="http://sinelinked.com/img/index/banner03.jpg"></div>
            </CarouselItem>
        </Carousel>
        <!-- main -->
        <div class="main center">
            <!-- 保险学堂 -->
            <div id="bx-school">
                <div class="common-title">
                    <h4><i><img src="../../assets/img/index/boshimao.png"> </i><strong> 保险学堂</strong></h4>
                </div>
                <Tabs v-model="activeNameSchool">
                    <TabPane label="学习频道" name="xuexipindao">
                        <div>
                            <ul class="atr-top">
                                <template v-for="(item,index) in school.xuexipindao">
                                    <router-link tag='li' :to="{name:'Article',params:{id:item.id}}" v-if="index<2" :key="index">
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
                            <ul class="art-list left-list">
                                <template v-for="(item,index) in school.xuexipindao">
                                    <router-link tag='li' :to="{name:'Article',params:{id:item.id}}" v-if="index<5" :key="index">
                                        <div class="list-left">
                                            <a href="#">
                                                <Icon type="md-arrow-dropright" />
                                                <span>{{ item.title }}</span>
                                            </a>
                                            <p>{{ item.createTime }}</p>
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
                                    <router-link tag='li' :to="{name:'Article',params:{id:item.id}}" v-if="index<2" :key="index">
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
                            <ul class="art-list left-list">
                                <template v-for="(item,index) in school.baoxianzixun">
                                    <router-link tag='li' :to="{name:'Article',params:{id:item.id}}" v-if="index<5" :key="index">
                                        <div class="list-left">
                                            <a href="#">
                                                <Icon type="md-arrow-dropright" />
                                                <span>{{ item.title }}</span>
                                            </a>
                                            <p>{{ item.createTime }}</p>
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
                                    <router-link tag='li' :to="{name:'Article',params:{id:item.id}}" v-if="index<2" :key="index">
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
                            <ul class="art-list left-list">
                                <template v-for="(item,index) in school.hangyejvjiao">
                                    <li v-if="index<5" :key="index">
                                        <div class="list-left">
                                            <a href="#">
                                                <Icon type="md-arrow-dropright" />
                                                <span>{{ item.title }}</span>
                                            </a>
                                            <p>{{ item.createTime }}</p>
                                        </div>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </TabPane>
                    <TabPane label="保险法规" name="baoxianfagui">
                        <div>
                            <ul class="atr-top">
                                <template v-for="(item,index) in school.baoxianfagui">
                                    <router-link tag='li' :to="{name:'Article',params:{id:item.id}}" v-if="index<2" :key="index">
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
                            <ul class="art-list left-list">
                                <template v-for="(item,index) in school.baoxianfagui">
                                    <router-link tag='li' :to="{name:'Article',params:{id:item.id}}" v-if="index<5" :key="index">
                                        <div class="list-left">
                                            <a href="#">
                                                <Icon type="md-arrow-dropright" />
                                                <span>{{ item.title }}</span>
                                            </a>
                                            <p>{{ item.createTime }}</p>
                                        </div>
                                    </router-link>
                                </template>
                            </ul>
                        </div>
                    </TabPane>
                    <router-link slot="extra" :to="{name:'School'}"><Button size="small">更多>></Button></router-link>
                </Tabs>
            </div>
            <!--  在线咨询 -->
            <div id="bx-consult">
                <div class="common-title">
                    <h4><i><img src="../../assets/img/index/weixin.png"> </i><strong> 在线咨询</strong></h4>
                </div>
                <Tabs v-model="activeNameConsult">
                    <TabPane label="热门问题" name="remenwenti">
                        <ul class="left-list">
                            <template v-for="(item,index) in question">
                                <router-link tag='li' :to="{name:'Consult'}" v-if="index < 4" :key="index">
                                    <div class="list-left">
                                        <a href="#">
                                            <Icon type="md-arrow-dropright" />
                                            <span>{{ item.questionExplain }}</span>
                                        </a>
                                        <p>{{ timeFormat(item.createTime) }}</p>
                                    </div>
                                    <div class="list-right">
                                        <strong>{{ item.weight }}</strong>
                                        <p>回答</p>
                                    </div>
                                </router-link>
                            </template>
                        </ul>
                    </TabPane>
                    <TabPane label="最新提问" name="zuixintiwen">
                        <ul class="left-list">
                            <template v-for="(item,index) in question">
                                <router-link tag='li' :to="{name:'Consult'}" v-if="index < 4" :key="index">
                                    <div class="list-left">
                                        <a href="#">
                                            <Icon type="md-arrow-dropright" />
                                            <span>{{ item.questionExplain }}</span>
                                        </a>
                                        <p>{{ timeFormat(item.createTime) }}</p>
                                    </div>
                                    <div class="list-right">
                                        <strong>{{ item.weight }}</strong>
                                        <p>回答</p>
                                    </div>
                                </router-link>
                            </template>
                        </ul>
                    </TabPane>
                    <TabPane label="最新回复" name="zuixinhuifu">
                        <ul class="left-list">
                            <template v-for="(item,index) in question">
                                <router-link tag='li' :to="{name:'Consult'}" v-if="index < 4" :key="index">
                                    <div class="list-left">
                                        <a href="#">
                                            <Icon type="md-arrow-dropright" />
                                            <span>{{ item.questionExplain }}</span>
                                        </a>
                                        <p>{{ timeFormat(item.createTime) }}</p>
                                    </div>
                                    <div class="list-right">
                                        <strong>{{ item.weight }}</strong>
                                        <p>回答</p>
                                    </div>
                                </router-link>
                            </template>
                        </ul>
                    </TabPane>
                    <TabPane label="我要提问" icon="ios-brush" name="woyaotiwen">
                        <Form class="questionForm" ref="formInline" :model="formInline" required :rules="ruleInline">
                            <FormItem prop="title">
                                <Input type="text" v-model="formInline.title" autocomplete="off" placeholder="请用一句话描述您的问题">
                                </Input>
                            </FormItem>
                            <FormItem prop="content">
                                <Input type="textarea" :rows="4" v-model="formInline.content" placeholder="请在这里添加问题补充">
                                </Input>
                            </FormItem>
                            <FormItem prop="name">
                                <Input type="text" v-model="formInline.name" autocomplete="off" placeholder="请输入您的姓名">
                                </Input>
                            </FormItem>
                            <FormItem prop="phone">
                                <Input type="text" v-model="formInline.phone" autocomplete="off" placeholder="请输入您的手机号">
                                </Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('formInline')">提交</Button>
                            </FormItem>
                        </Form>
                    </TabPane>
                    <router-link slot="extra" :to="{name:'Consult'}"><Button size="small">更多>></Button></router-link>
                </Tabs>
                <Carousel id="referral-agent" autoplay>
                    <CarouselItem>
                        <div class="carouse-item">
                            <img class="referral-photo" src="../../assets/img/index/example.jpg">
                            <h5 class="referral-name">MR Wang</h5>
                            <p class="referral-desc">大地保险 5年从业经验</p>
                            <Button @click="showConsulting" icon="md-text" type="primary">咨询</Button>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div class="carouse-item">
                            <img class="referral-photo" src="../../assets/img/index/example.jpg">
                            <h5 class="referral-name">贤心</h5>
                            <p class="referral-desc">平安保险 5年从业经验</p>
                            <Button @click="showConsulting" icon="md-text" type="primary">咨询</Button>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div class="carouse-item">
                            <img class="referral-photo" src="../../assets/img/index/example.jpg">
                            <h5 class="referral-name">老农</h5>
                            <p class="referral-desc">华安保险 10年从业经验</p>
                            <Button @click="showConsulting" icon="md-text" type="primary">咨询</Button>
                        </div>
                    </CarouselItem>
                </Carousel>
            </div>
            <!--  保险方案 -->
            <!-- <div id="bx-plan">
                <div class="common-title">
                    <h4><i><img src="../../assets/img/index/fangan.png"> </i><strong> 保险方案</strong></h4>
                </div>
            </div> -->
           
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
    this.getQuestion();
  },
  data() {
    return {
      modelConsult:false,
      activeNameSchool: "xuexipindao", //保险学堂当前选项
      activeNameConsult: "remenwenti", //在线咨询当前选项
      //保险学堂
      school: {
        xuexipindao: [],
        baoxianzixun: [],
        hangyejvjiao: [],
        baoxianfagui: []
      },
      //   在线咨询
      question: [],
      formInline: {
        title: "",
        content: "",
        name: "",
        phone: ""
      },
      ruleInline: {
        title: [
          {
            required: true,
            message: "请输入问题标题",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "请输入问题补充信息",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "内容最少为20个字",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入您的姓名",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入您的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
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
    },
    // 获取问题列表
    getQuestion() {
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/question/visitorShow"
      })
        .then(result => {
            if(result.data.code == 0){
                this.question = result.data.data
            }
        })
        .catch(err => {});
    },
    // 提交问题
    handleSubmit(name) {
      var self = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          self
            .$axios({
              method: "post",
              url: self.$GLOBAL.baseURL + "/api/question/add",
              data: {
                questionerName: this.formInline.name,
                questionerPhone: this.formInline.phone,
                questionExplain: this.formInline.title,
                questionSup: this.formInline.content
              }
            })
            .then(result => {
              if (result.data.code == 0) {
                self.$Message.success("提交成功!");
                this.formInline.name = ''
                this.formInline.phone = ''
                this.formInline.title = ''
                this.formInline.content = ''
              }
            })
            .catch(err => {
                this.$Message.error("提交失败!");
            });
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    showConsulting(){
        this.$store.commit('modalConsult',!this.$store.state.modalConsult)
    },
    timeFormat(val){
        return this.$GLOBAL.timeFormat(val)
    }
  }
};
</script>

<style scoped>
.center {
  width: 1200px;
  margin: 0 auto;
}
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
.atr-top {
  width: 580px;
  float: left;
}

.atr-top li {
  list-style: none;
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
  width: 350px;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.atr-top .art-content strong:hover {
  color: #3d6cc8;
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
  min-height: 88px;
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
  list-style: none;
}

.left-list li {
  overflow: hidden;
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 8px;
  margin-bottom: 12px;
}

.list-left a {
  font-size: 16px;
  color: #333;
}
.list-left a:hover {
  color: #3d6cc8;
}

.list-left span {
  max-width: 650px;
  display: inline-block;
  cursor: pointer;
  padding-left: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
}
.list-left p {
  font-size: 14px;
  color: #999999;
  padding-left: 22px;
  line-height: 34px;
}

.list-right {
  width: 52px;
  height: 52px;
  box-sizing: border-box;
  background: #fffff0;
  border: 1px solid #fbaf6c;
  text-align: center;
  float: right;
  cursor: pointer;
}
.list-left {
  max-width: 700px;
  float: left;
}
#bx-consult {
  position: relative;
}
#referral-agent {
  width: 240px;
  height: 290px;
  border: 1px solid #dddddd;
  position: absolute;
  right: 50px;
  top: 180px;
}
#referral-agent .referral-photo {
  width: 126px;
  max-width: 126px;
}
#referral-agent .referral-name {
  font-size: 18px;
  font-weight: bold;
  line-height: 34px;
  padding-top: 6px;
}
.carouse-item {
  text-align: center;
}
#referral-agent .referral-desc {
  font-size: 14px;
  font-weight: bold;
  line-height: 40px;
}
#bx-consult .left-list {
  width: 814px;
  float: left;
}
#bx-consult .list-right {
  width: 52px;
  height: 52px;
  box-sizing: border-box;
  background: #fffff0;
  border: 1px solid #fbaf6c;
  text-align: center;
  float: right;
  cursor: pointer;
}
#bx-consult .list-left {
  max-width: 700px;
  float: left;
}
#bx-consult .list-right strong {
  font-size: 16px;
  color: #ff3636;
  line-height: 26px;
  cursor: pointer;
}
#bx-consult .list-right p {
  font-size: 14px;
  color: #666666;
  cursor: pointer;
}
.questionForm {
  width: 400px;
}
.ivu-carousel-item{
    overflow: hidden;
}
#topCarousel .ivu-carousel-item img{
    position: relative;
    left: 50%;
    transform: translateX(-50%)
}
</style>