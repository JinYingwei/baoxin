<template>
  <div class="center">
    <div id="bx-consult">
      <div class="common-title">
        <h4><i><img src="../../assets/img/index/weixin.png"> </i><strong> 保险学堂</strong></h4>
      </div>
      <div class="bx-consult-main">
        <div class="consult-left">
          <Tabs>
            <TabPane label="热门问题" name="name1">
              <ul class="atr-top">
                <template v-for="(item,index) in question">
                  <li :key="index">
                    <div class="art-content">
                      <a href="javascript:;">
                        <strong>
                          <Icon type="md-help" /><em class="ask-title">{{ item.questionExplain }}</em></strong>
                        <div class="tag-box">
                          <span class="tag-item">理财险</span>
                          <span class="tag-item">保险规划</span>
                        </div>
                        <!-- <div class="all-answer">查看全部353条回答</div> -->
                        <div class="all-answer-list">
                          <div class="answer-items">
                            <div class="answer-img">
                              <img src="http://iconfont.alicdn.com/t/1517471002130.png@100h_100w.jpg">
                            </div>
                            <div class="answer-con">
                              <div class="anwer-con-info">
                                <h5 class="anwer-name">贤心</h5>
                                <span>平安保险</span>
                                <span>7年从业经验</span>
                              </div>
                              <div class="answer-details">
                                “平安福健康保障计划”专为中高收入客户设计，涵盖重大疾病、交通意外、身故、残疾、保费豁免等多项责任，为客户带来全方位的风险守护。新产品产品性价比高，客户用同样的投入，可获得更高的保额，是寿险保障的上上之选。
                              </div>
                              <span class="data">{{ timeFormat(item.createTime) }}</span>
                            </div>
                          </div>
                          <div class="answer-items">
                            <div class="answer-img">
                              <img src="../../assets/img/index/example.jpg">
                            </div>
                            <div class="answer-con">
                              <div class="anwer-con-info">
                                <h5 class="anwer-name">老农</h5>
                                <span>富德生命</span>
                                <span>5年从业经验</span>
                              </div>
                              <div class="answer-details">
                                富德生命人寿的福无忧是一款可以解决孩子的教育金、婚嫁金、创业金，成人的养老需求，并且兼顾大病、小病、健康、意外保障，医疗报销、财富积累、终身分红的的综合保障计划。有年度红利和终了红利的双重红利，客户利益最大化；在60岁根据客户需求任意成养老金，还可减少保险金额和保单贷款功能；包括医疗金、重疾金、轻症金和传承金四大职责。他是一款非常全面的综合保障计划，既有意外保障，又有医疗保障，有重疾保障81大类，还有额外给付的轻症保障41大类，并且还年年分红，是个会长大的重疾保障计划。希望您早日拥有这份保障计划，您将一生与福相随，一生无忧！
                              </div>
                              <span class="data">{{ timeFormat(item.createTime) }}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </li>
                </template>
              </ul>
            </TabPane>
            <TabPane label="最新提问" name="name2">
              <ul class="atr-top">
                <template v-for="(item,index) in question">
                  <li :key="index">
                    <div class="art-content">
                      <a href="javascript:;">
                        <strong>
                          <Icon type="md-help" /><em class="ask-title">{{ item.questionExplain }}</em></strong>
                        <div class="tag-box">
                          <span class="tag-item">理财险</span>
                          <span class="tag-item">保险规划</span>
                        </div>
                        <!-- <div class="all-answer">查看全部353条回答</div> -->
                        <div class="all-answer-list">
                          <div class="answer-items">
                            <div class="answer-img">
                              <img src="../../assets/img/index/example.jpg">
                            </div>
                            <div class="answer-con">
                              <div class="anwer-con-info">
                                <h5 class="anwer-name">老农</h5>
                                <span>富德生命</span>
                                <span>5年从业经验</span>
                              </div>
                              <div class="answer-details">
                                富德生命人寿的福无忧是一款可以解决孩子的教育金、婚嫁金、创业金，成人的养老需求，并且兼顾大病、小病、健康、意外保障，医疗报销、财富积累、终身分红的的综合保障计划。有年度红利和终了红利的双重红利，客户利益最大化；在60岁根据客户需求任意成养老金，还可减少保险金额和保单贷款功能；包括医疗金、重疾金、轻症金和传承金四大职责。他是一款非常全面的综合保障计划，既有意外保障，又有医疗保障，有重疾保障81大类，还有额外给付的轻症保障41大类，并且还年年分红，是个会长大的重疾保障计划。希望您早日拥有这份保障计划，您将一生与福相随，一生无忧！
                              </div>
                              <span class="data">{{ timeFormat(item.createTime) }}</span>
                            </div>
                          </div>
                          <div class="answer-items">
                            <div class="answer-img">
                              <img src="http://iconfont.alicdn.com/t/1517471002130.png@100h_100w.jpg">
                            </div>
                            <div class="answer-con">
                              <div class="anwer-con-info">
                                <h5 class="anwer-name">贤心</h5>
                                <span>平安保险</span>
                                <span>7年从业经验</span>
                              </div>
                              <div class="answer-details">
                                “平安福健康保障计划”专为中高收入客户设计，涵盖重大疾病、交通意外、身故、残疾、保费豁免等多项责任，为客户带来全方位的风险守护。新产品产品性价比高，客户用同样的投入，可获得更高的保额，是寿险保障的上上之选。
                              </div>
                              <span class="data">{{ timeFormat(item.createTime) }}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </li>
                </template>
              </ul>
            </TabPane>
            <TabPane label="最新回复" name="name3">
              <ul class="atr-top">
                <template v-for="(item,index) in question">
                  <li :key="index">
                    <div class="art-content">
                      <a href="javascript:;">
                        <strong>
                          <Icon type="md-help" /><em class="ask-title">{{ item.questionExplain }}</em></strong>
                        <div class="tag-box">
                          <span class="tag-item">理财险</span>
                          <span class="tag-item">保险规划</span>
                        </div>
                        <!-- <div class="all-answer">查看全部353条回答</div> -->
                        <div class="all-answer-list">
                          <div class="answer-items">
                            <div class="answer-img">
                              <img src="../../assets/img/index/example.jpg">
                            </div>
                            <div class="answer-con">
                              <div class="anwer-con-info">
                                <h5 class="anwer-name">MR Wang</h5>
                                <span>富德生命</span>
                                <span>8年从业经验</span>
                              </div>
                              <div class="answer-details">
                                富德生命人寿的福无忧是一款可以解决孩子的教育金、婚嫁金、创业金，成人的养老需求，并且兼顾大病、小病、健康、意外保障，医疗报销、财富积累、终身分红的的综合保障计划。有年度红利和终了红利的双重红利，客户利益最大化；在60岁根据客户需求任意成养老金，还可减少保险金额和保单贷款功能；包括医疗金、重疾金、轻症金和传承金四大职责。他是一款非常全面的综合保障计划，既有意外保障，又有医疗保障，有重疾保障81大类，还有额外给付的轻症保障41大类，并且还年年分红，是个会长大的重疾保障计划。希望您早日拥有这份保障计划，您将一生与福相随，一生无忧！
                              </div>
                              <span class="data">{{ timeFormat(item.createTime) }}</span>
                            </div>
                          </div>
                          <div class="answer-items">
                            <div class="answer-img">
                              <img src="http://iconfont.alicdn.com/t/1517471002130.png@100h_100w.jpg">
                            </div>
                            <div class="answer-con">
                              <div class="anwer-con-info">
                                <h5 class="anwer-name">贤心</h5>
                                <span>平安保险</span>
                                <span>7年从业经验</span>
                              </div>
                              <div class="answer-details">
                                “平安福健康保障计划”专为中高收入客户设计，涵盖重大疾病、交通意外、身故、残疾、保费豁免等多项责任，为客户带来全方位的风险守护。新产品产品性价比高，客户用同样的投入，可获得更高的保额，是寿险保障的上上之选。
                              </div>
                              <span class="data">{{ timeFormat(item.createTime) }}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </li>
                </template>
              </ul>
            </TabPane>
            <TabPane label="我要提问" name="woyaotiwen">
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
          </Tabs>
        </div>
        <!-- right -->
        <div class="art-slider-bar">
          <ul class="art-slider-bar-list" id="tagcloud">
            <h5>标签分类</h5>
            <div class="wrapper">
              <div class="tagcloud" style="visibility: visible; position: relative; min-height: 144px; min-width: 300px;">
                <a href="#" style="left: 38.0682px; top: -18.0232px; z-index: 4; font-size: 12px; opacity: 0.810969; position: absolute;">意外险</a>
                <a href="#" style="left: 80.1847px; top: -13.2975px; z-index: 16; font-size: 15px; opacity: 2.64385; position: absolute;">理财险</a>
                <a href="#" style="left: 157.387px; top: -15.3285px; z-index: 6; font-size: 13px; opacity: 1.0287; position: absolute;">养老险</a>
                <a href="#" style="left: 113.497px; top: 16.8021px; z-index: 1; font-size: 12px; opacity: 0.392041; position: absolute;">医疗险</a>
                <a href="#" style="left: 34.7473px; top: 61.1222px; z-index: 2; font-size: 12px; opacity: 0.514072; position: absolute;">车险</a>
                <a href="#" style="left: 20.1817px; top: 77.8427px; z-index: 11; font-size: 14px; opacity: 1.78478; position: absolute;">少儿险</a>
                <a href="#" style="left: 112.731px; top: 71.9888px; z-index: 30; font-size: 17px; opacity: 4.69064; position: absolute;">人寿险</a>
                <a href="#" style="left: 173.162px; top: 71.9375px; z-index: 7; font-size: 13px; opacity: 1.18446; position: absolute;">社会保险</a>
                <a href="#" style="left: 109.997px; top: 97.0278px; z-index: 2; font-size: 12px; opacity: 0.433198; position: absolute;">投保理赔</a>
                <a href="#" style="left: 72.3344px; top: 137.798px; z-index: 6; font-size: 13px; opacity: 1.12746; position: absolute;">保险规划</a>
              </div>
            </div>
          </ul>

          <ul class="art-slider-bar-list art-slider-bar-list-agent">
            <h5>优秀顾问</h5>
            <li class="carousel-item">
              <div>
                <img class="head-icon" src="../../assets/img/index/example.jpg">
                <h5>MR Wang</h5>
                <p>华安保险 10年从业经验</p>
                <Button  @click="showConsulting" icon="md-text" type="primary">咨询</Button>
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
  mounted() {
    tagcloud({
      selector: ".tagcloud", //元素选择器
      fontsize: 16, //基本字体大小, 单位px
      radius: 60, //滚动半径, 单位px
      mspeed: "normal", //滚动最大速度, 取值: slow, normal(默认), fast
      ispeed: "normal", //滚动初速度, 取值: slow, normal(默认), fast
      direction: 135, //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
      keep: false //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
    });
  },
  created() {
    this.getQuestion();
  },
  data() {
    return {
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
    showConsulting(){
       this.$store.commit('modalConsult',!this.$store.state.modalConsult)
    },
    // 获取问题列表
    getQuestion() {
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/question/visitorShow"
      })
        .then(result => {
          if (result.data.code == 0) {
            this.question = result.data.data;
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
                this.formInline.name = "";
                this.formInline.phone = "";
                this.formInline.title = "";
                this.formInline.content = "";
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
    timeFormat(val) {
      return this.$GLOBAL.timeFormat(val);
    }
  }
};
/*3D标签云*/
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
.bx-consult-main {
  overflow: hidden;
}
.consult-left {
  width: 800px;
  float: left;
}

.atr-top {
  width: 800px;
  float: left;
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
  width: 100%;
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

.atr-top .art-content .data {
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

.wrap .layui-tab-content .art-list {
  width: 500px;
  float: right;
}

.wrap .layui-tab-content .art-list li {
  margin-bottom: 5px;
}
.ask-title {
  font-style: normal;
  padding-left: 4px;
  width: 740px;
  vertical-align: top;
  display: inline-block;
}
.tag-box {
  padding-left: 20px;
  display: inline-block;
  width: 600px;
}

.tag-item {
  padding: 0 20px;
  height: 30px;
  display: inline-block;
  border-radius: 18px;
  border: 1px solid #dddddd;
  font-size: 14px;
  line-height: 30px;
  color: #333;
  text-align: center;
  margin-right: 18px;
  margin-bottom: 20px;
  margin-top: 20px;
  cursor: pointer;
}

.all-answer {
  padding: 0 20px;
  height: 30px;
  display: inline-block;
  border-radius: 18px;
  border: 1px solid #3d6cc8;
  font-size: 14px;
  line-height: 30px;
  color: #3d6cc8;
  text-align: center;
}

.answer-img {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #dddddd;
  display: inline-block;
}

.answer-img img {
  width: 100%;
}

.answer-con {
  display: inline-block;
  width: 700px;
  vertical-align: top;
  padding-left: 20px;
}

.all-answer-list {
  padding-top: 20px;
}

.anwer-con-info {
  line-height: 40px;
}

.anwer-con-info .anwer-name {
  display: inline-block;
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-right: 36px;
}

.anwer-con-info span {
  display: inline-block;
  font-size: 14px;
  color: #666;
  padding: 0 6px;
}

.answer-details {
  font-size: 14px;
  line-height: 26px;
  color: #888;
}
/*art-slider-bar*/
.art-slider-bar {
  float: right;
}
.art-slider-bar .art-slider-bar-list {
  box-sizing: border-box;
  width: 304px;
  height: 424px;
  border: 1px solid #eaeaea;
  padding: 0 20px;
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
/*标签云*/

.wrapper {
  /*width: 1200px;*/
  height: 340px;

  margin: 0 auto;
  margin-top: 50px;
}

.tagcloud {
  position: relative;
  /*margin-top: -150px;*/
}

.tagcloud a {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  padding: 11px 30px;
  color: #333;
  font-size: 16px;
  border: 1px solid #e6e7e8;
  border-radius: 18px;
  background-color: #f2f4f8;
  text-decoration: none;
  white-space: nowrap;
  -o-box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, 0.34);
  -ms-box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, 0.34);
  -moz-box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, 0.34);
  -webkit-box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, 0.34);
  box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, 0.34);
  -ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=4,Direction=135, Color='#000000')";
  filter: progid:DXImageTransform.Microsoft.Shadow(color='#969696', Direction=125, Strength=9);
}

.tagcloud a:hover {
  color: #3385cf;
}
.questionForm {
  width: 400px;
}
</style>