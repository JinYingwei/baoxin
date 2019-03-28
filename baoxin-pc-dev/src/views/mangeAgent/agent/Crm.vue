<template>
  <div>
    <div class="public-title">客户管理</div>
    <div class="function-btn-warp-right">
      <Button
        icon="md-add"
        type="dashed"
        @click="showAddClient = true"
      >新增客户</Button>
    </div>
    <!-- 新增客户 -->
    <Drawer
      title="新增客户"
      v-model="showAddClient"
      width="720"
      :mask-closable="false"
      :styles="styles"
    >
      <Form
        :model="formData"
        :rules="ruleCustom"
        ref="formCustom"
      >
        <Row :gutter="32">
          <Col span="12">
          <FormItem
            prop="customName"
            label="客户姓名"
            label-position="top"
          >
            <Input
              size="large"
              v-model="formData.customName"
              placeholder="请输入客户姓名"
            />
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            label="客户性别"
            label-position="top"
          >
            <RadioGroup
              v-model="formData.customSex"
              size="large"
            >
            <div class="raBox">
              <Radio label="1">男</Radio>
              <Radio label="2">女</Radio>
            </div>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
          <FormItem
            prop="customPhone"
            label="客户电话"
            label-position="top"
          >
            <Input
              size="large"
              v-model="formData.customPhone"
              placeholder="请输入客户电话"
            />
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            label="客户微信"
            label-position="top"
          >
            <Input
              size="large"
              v-model="formData.customWechartQq"
              placeholder="请输入客户微信"
            />
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
          <p style="padding:5px 12px 10px 0">客户地区</p>
          <al-selector
            level='2'
            size="large"
            :auto='true'
            v-model="formData.customArea"
          />
          <!-- <FormItem label="客户地区" label-position="top">
                            <Input size="large" v-model="formData.name" placeholder="please enter user name" />
                        </FormItem> -->
          </Col>
          <Col span="12">
          <!-- <FormItem label="客户生日" label-position="top"> -->
          <p style="padding:5px 12px 10px 0">客户生日</p>
          <DatePicker
            size="large"
            type="date"
            placeholder="选择日期"
            style="width: 200px"
            v-model="formData.customBirthday"
          ></DatePicker>
          <!-- </FormItem> -->
          </Col>
        </Row>
        <br>
        <Row :gutter="32">
          <Col span="12">
          <FormItem label="婚姻状况">
            <Select v-model="formData.customMaritalStauts ">
              <Option value="1">已婚</Option>
              <Option value="2">未婚</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            label="客户民族"
            label-position="top"
          >
            <Input
              size="large"
              v-model="formData.customNation"
              placeholder="请输入客户民族"
            />
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
          <FormItem label="学历">
            <Select v-model="formData.customEducation ">
              <Option value="初中">初中</Option>
              <Option value="高中">高中</Option>
              <Option value="专科">专科</Option>
              <Option value="本科">本科</Option>
              <Option value="硕士">硕士</Option>
              <Option value="博士">博士</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            label="客户职业"
            label-position="top"
          >
            <Input
              size="large"
              v-model="formData.customProfession"
              placeholder="请输入客户职业"
            />
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
          <FormItem
            label="保单编号"
            label-position="top"
          >
            <Input
              size="large"
              v-model="formData.policyNo"
              placeholder="请输入保单编号"
            />
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            label="保单名字"
            label-position="top"
          >
            <Input
              size="large"
              v-model="formData.policyName"
              placeholder="请输入保单名字"
            />
          </FormItem>
          </Col>
        </Row>
        <FormItem
          label="备注"
          label-position="top"
        >
          <Input
            type="textarea"
            v-model="formData.remark"
            :rows="4"
            placeholder="请输入备注信息"
          />
        </FormItem>
      </Form>
      <div class="demo-drawer-footer">
        <Button
          size="large"
          type="primary"
          style="margin-right: 8px"
          @click="addCustomer('formCustom')"
        >提交</Button>
        <Button
          size="large"
          @click="showAddClient = false"
        >取消</Button>
      </div>
    </Drawer>

    <!-- 客户信息 -->
    <Modal
      v-model="modal1"
      title="客户信息"
    >
      <div class="main">
        <div class="item">
          <label for="">姓名：</label>
          <p v-if="show">{{inquireList.customName}}</p>
          <Input v-model="modifyList.customName" placeholder="请输入要修改的客户姓名" v-else />
        </div>
        <div class="item">
          <label for="">电话：</label>
          <p v-if="show">{{inquireList.customPhone}}</p>
           <Input v-model="modifyList.customPhone" placeholder="请输入要修改的客户电话" v-else/>
        </div>
        <div class="item">
          <label for="">性别：</label>
          <p v-if="show">{{inquireList.customSex == 1 ? '男' : '女'}}</p>
          <div class="sel" v-else>
            <Select style="width:100px" v-model="modifyList.customSex">
              <Option value="1">男</Option>
              <Option value="2">女</Option>
            </Select>
          </div>
        </div>
        <div class="item">
          <label for="">生日：</label>
          <p v-if="show">{{inquireList.customBirthday}}</p>
          <DatePicker v-model="modifyList.customBirthday" type="date" placeholder="选择日期" style="width: 200px" v-else></DatePicker>
        </div>
        <div class="item">
          <label for="">学历：</label>
          <p v-if="show">{{inquireList.customEducation}}</p>
          <div class="sel" v-else>
            <Select style="width:100px" v-model="modifyList.customEducation">
                <Option value="初中">初中</Option>
                <Option value="高中">高中</Option>
                <Option value="专科">专科</Option>
                <Option value="本科">本科</Option>
                <Option value="硕士">硕士</Option>
                <Option value="博士">博士</Option>
            </Select>
          </div>
        </div>
        <div class="item">
          <label for="">地区：</label>
          <p v-if="show">{{inquireList.customArea}}</p>
           <al-selector
            level='2'
            size="large"
            :auto='true'
            v-model="modifyList.customArea"
            v-else
          />
        </div>
        <div class="item">
          <label for="">微信：</label>
          <p v-if="show">{{inquireList.customWechartQq}}</p>
          <Input v-model="modifyList.customWechartQq" placeholder="请输入要修改的客户微信" v-else/>
        </div>
        <div class="item">
          <label for="">职业：</label>
          <p v-if="show">{{inquireList.customProfession}}</p>
          <Input v-model="modifyList.customProfession" placeholder="请输入要修改的客户职业" v-else/>
        </div>
        <div class="item">
          <label for="">保单名称：</label>
          <p v-if="show">{{inquireList.policyName}}</p>
          <Input v-model="modifyList.policyName" placeholder="请输入要修改的保单名称" v-else/>
        </div>
        <div class="item">
          <label for="">保单编号：</label>
          <p v-if="show">{{inquireList.policyNo}}</p>
          <Input v-model="modifyList.policyNo" placeholder="请输入要修改的保单编号" v-else/>
        </div>
        <div class="item">
          <label for="">客户民族：</label>
          <p v-if="show">{{inquireList.customNation}}</p>
           <Input v-model="modifyList.customNation" placeholder="请输入要修改的客户民族" v-else/>
        </div>
        <div class="item">
          <label for="">婚姻：</label>
          <p v-if="show">{{inquireList.customMaritalStauts == 1 ? '已婚' : '未婚'}}</p>
          <div class="sel" v-else>
            <Select style="width:100px" v-model="modifyList.customMaritalStauts">
              <Option value="2">未婚</Option>
              <Option value="1">已婚</Option>
            </Select>
          </div>
        </div>
        <div class="item">
          <label for="">备注：</label>
          <p v-if="show">{{inquireList.remark}}</p>
          <Input v-model="modifyList.remark" type="textarea" placeholder="请输入备注信息" v-else/>
        </div>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="modify" v-if="show">修改</Button>
        <Button type="success" size="large" v-else @click="update">确定</Button>
        <Button type="primary" size="large" @click="deleted(inquireList.id)">删除</Button>
      </div>

    </Modal>

    <!-- 客户管理列表 -->
    <div class="crm-list">
      <Table
        border
        stripe
        :columns="customListCol"
        :data="customList"
        @on-row-click="searchCustomerById"
      ></Table>
    </div>
    <Page
      v-show="totalNum"
      :total="totalNum"
      show-total
      @on-change="change"
    />
  </div>
</template>

<script>
import cityData from "../../../assets/lib/region";
export default {
  created() {
    // 获取客户列表
    this.getCustomer();
  },
  data() {
    return {
      activeName: "1",
      showAddClient: false, //展示添加页面
      showClientInfo: false, //展示客户信息
      modal1: false,
      inquireList: {}, //查询详细信息
      getBirstday: "",
      totalNum: 1, //存客户
      id: "", //需要删除的id
      show:true,
      loading:true,

      modifyList:[],  //存需要修改的值

      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      pStyle: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "24px",
        display: "block",
        marginBottom: "16px"
      },
      customListCol: [
        {
          title: "姓名",
          key: "customName"
        },
        {
          title: "联系电话",
          key: "customPhone"
        },
        {
          title:"地区",
          key:"customArea"
        }
      ],
      customList: [], //客户列表
      formData: {
        customName: "", //客户姓名
        customSex: "", //客户姓别
        customPhone: "", //客户电话
        customWechartQq: "", //客户微信
        customArea: [], //客户区域
        customMaritalStauts: "", //客户婚姻状况
        customNation: "", //客户民族
        customEducation: "", //客户学历
        customProfession: "", //客户职业
        policyNo: "", //保单编号
        policyName: "", //保单名字
        remark: "", //备注
        customBirthday: "" //客户生日
      },
      //客户修改数据
      modifyData:{
        customName: "", //客户姓名
        customSex: "", //客户姓别
        customPhone: "", //客户电话
        customWechartQq: "", //客户微信
        customArea: [], //客户区域
        customMaritalStauts: "", //客户婚姻状况
        customNation: "", //客户民族
        customEducation: "", //客户学历
        customProfession: "", //客户职业
        policyNo: "", //保单编号
        policyName: "", //保单名字
        remark: "", //备注
        customBirthday: "", //客户生日
        id:''
      },

      //   数据验证
      ruleCustom: {
        customName: [
          {
            required: true,
            message: "请输入客户姓名"
          }
        ],
        customSex: [
          {
            required: true,
            message: "请输入客户性别"
          }
        ],
        customPhone: [
          {
            required: true,
            message: "请输入客户性别"
          }
        ]
      }
    };
  },
  methods: {
    //   添加客户
    addCustomer(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url: this.$GLOBAL.baseURL + "/api/agent/customer/add",
            data: {
              customName: this.formData.customName, //客户姓名
              customSex: this.formData.customSex, //客户姓别
              customPhone: this.formData.customPhone, //客户电话
              customWechartQq: this.formData.customWechartQq, //客户微信
              //客户区域
              customArea:
                this.formData.customArea.length > 0
                  ? this.formData.customArea[0].code +
                    "|" +
                    this.formData.customArea[1].code +
                    "|" +
                    this.formData.customArea[2].code
                  : "",
              //客户生日
              customBirthday: this.$GLOBAL.timestampToTime(
                new Date(this.formData.customBirthday).getTime()
              ),

              customMaritalStauts: this.formData.customMaritalStauts, //客户婚姻状况
              customNation: this.formData.customNation, //客户民族
              customEducation: this.formData.customEducation, //客户学历
              customProfession: this.formData.customProfession, //客户职业
              policyNo: this.formData.policyNo, //保单编号
              policyName: this.formData.policyName, //保单名字
              remark: this.formData.remark //备注
            }
          })
            .then(result => {
              this.$Notice.success({
                title: "系统通知",
                desc: "新客户添加成功~"
              });
              this.getCustomer()
            })
            .catch(err => {
              this.$Notice.error({
                title: "异常提示",
                desc: err.response.data.error
              });
            });
        } else {
          this.$Message.error("Fail!");
          return;
        }
      });
    },
    // 根据id查询客户详细信息
    searchCustomerById(item) {
      this.show = true
      this.modifyData.id = item.id
      var This = this;
      this.modal1 = true;
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/agent/customer/search",
        params: {
          id: item.id
        }
      })
        .then(result => {
          //处理生日格式
          if (result.data.code == 0) {
            var birthday = result.data.data.customBirthday;
            if(birthday){
              birthday = result.data.data.customBirthday.toString()

              if (birthday.length === 7) {
              var fDay = birthday.substring(0, birthday.length - 1);
              var lDay = birthday.substring(birthday.length - 2);
              countBirthday = fDay + "0" + lDay;
              result.data.data.customBirthday = countBirthday;
            }
          }

          this.inquireList = result.data.data
          var tempcustomArea = this.inquireList.customArea.split('|')
  
          //处理地区格式
          this.inquireList.customArea = this.$GLOBAL.getCityResult(
            cityData,
            result.data.data.customArea
          )
          
          this.modifyList = JSON.parse(JSON.stringify(this.inquireList))
          this.modifyList.customSex = this.modifyList.customSex == 1 ? '1' : '2'
          this.modifyList.customMaritalStauts = this.customMaritalStauts == 1 ? '1' : '2'
          this.modifyList.customBirthday = String(this.modifyList.customBirthday)
          
          this.modifyList.customArea= [tempcustomArea[0],tempcustomArea[1]]
          console.log(this.modifyList);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改按钮
    modify(){
      this.show = false
    },
    //删除客户信息
    deleted(id) {
      var arr = [];
      arr.push({
        id: id
      });
      this.$Modal.confirm({
        title: "确定是否删除吗？",
        onOk: () => {
          this.$axios({
            method: "post",
            url: this.$GLOBAL.baseURL + "/api/agent/customer/delete",
            data: arr
          }).then(result => {
            this.getCustomer()
            this.modal1 = false
          });
        }
      });
    },
    // 维护客户信息
    update() {
      this.$axios({
        method: "post",
        url: this.$GLOBAL.baseURL + "/api/agent/customer/update",
        data: {
          id:this.modifyData.id,
          customName: this.modifyList.customName, //客户姓名
          customSex: this.modifyList.customSex, //客户姓别
          customPhone: this.modifyList.customPhone, //客户电话
          customWechartQq: this.modifyList.customWechartQq, //客户微信
           //客户区域
          customArea: this.modifyList.customArea.length > 0 
                      ? this.modifyList.customArea[0].code + '|'
                      + this.modifyList.customArea[1].code + '|'
                      + this.modifyList.customArea[2].code 
                      : '',
                             
          customMaritalStauts: this.modifyList.customMaritalStauts, //客户婚姻状况
          customNation: this.modifyList.customNation, //客户民族
          customEducation: this.modifyList.customEducation, //客户学历
          customProfession: this.modifyList.customProfession, //客户职业
          policyNo: this.modifyList.policyNo, //保单编号
          policyName: this.modifyList.policyName, //保单名字
          remark: this.modifyList.remark, //备注
          customBirthday:this.$GLOBAL.timestampToTime(this.modifyList.customBirthday)  //生日
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            this.modal1 = false
            this.getCustomer()
            this.$Message.success('修改成功');
          }
        })
        .catch(err => {});
    },
    // 获取客户列表
    getCustomer() {
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/agent/customer/searchList",
        params: {
          sortType: 1
        }
      })
        .then(result => {
          console.log(result);
          if (result.data.code == 0) {
             var data = result.data.data.items
             data.map(item=>{
               item.customArea =  this.$GLOBAL.getCityResult(cityData,item.customArea)
             })
             this.customList = data
             
            this.totalNum = result.data.data.totalNum;
          }
        })
        .catch(err => {});
    },
    //客户管理翻页
    searchList(page) {
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/agent/customer/searchList",
        params: {
          page: page,
          sortType: 1
        }
      }).then(result => {
        var data = result.data.data.items
        this.customList = result.data.data.items;
        data.map(item=>{
          item.customArea =  this.$GLOBAL.getCityResult(cityData,item.customArea)
        })
      });
    },
    change(page) {
      this.searchList(page);
    },
    //客户信息
    showClient() {
      this.showClientInfo = true;
    }
  }
};
</script>

<style scoped>
/* cell-cust */
.collapse-title-bar em {
  display: inline-block;
  width: 18%;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* overflow: hidden; */
}
.collapse-title-bar em i {
  vertical-align: middle;
}

.cell-cust-wrap {
  padding-left: 46px;
}
.cell-cust {
  line-height: 24px;
  margin-bottom: 16px;
}
.cell-cust .cell-title {
  display: inline-block;
  width: 80px;
  color: #999;
}
.cell-cust .cell-con {
  display: inline-block;
  cursor: default;
  max-width: 646px;
  vertical-align: top;
}
/* function-btn-warp */
.function-btn-warp {
  text-align: center;
  /* padding-left: 40px; */
}
.function-btn-warp-right {
  text-align: right;
  margin-bottom: 6px;
  margin-top: -45px;
  margin-right: 26px;
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
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
.demo-drawer-profile {
  font-size: 14px;
}
.demo-drawer-profile .ivu-col {
  margin-bottom: 22px;
}
>>> .ivu-card-body {
  padding: 30px 0;
}
.main {
  padding: 10px 0;
}
.item {
  font-size: 14px;
  margin-bottom: 5px;
}
.item:after {
  content: "";
  display: block;
  clear: both;
}
.item * {
  float: left;
  line-height: 34px;
  color: #333;
}
.item label {
  width: 100px;
  text-align: right;
  font-size: 12px;
  margin-right: 10px;
  color: #666;
}
.item:last-child p {
  width: 360px;
  line-height: 20px;
  padding-top: 7px;
}
>>> .ivu-form-item-content {
  position: relative;
}
>>> .ivu-radio-group {
  position: absolute;
  left: 0;
}
#agent-main {
  position: relative;
}
>>> .ivu-page {
  text-align: center;
  margin-top: 10px;
}
>>> .ivu-btn-text {
  background-color: #3d6cc8;
  color: #fff;
  border-color: #3d6cc8;
}
>>> .ivu-btn-primary {
  background-color: #fff;
  background: #f26d40;
  border-color: #f26d40;
}
>>> .ivu-input-wrapper{
  width: 50%;
}
.sel >>> .ivu-select-item{
  display: block;
  float: none;
  padding: 0px 16px;
}
.raBox{
  margin-left: 65px;
}
</style>