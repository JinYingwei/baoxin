<template>
  <div>
    <Modal v-model="getModalConsult.val" width="380" @on-visible-change="visibleChange">
      <p slot="header" style="color:#3d6cc8;text-align:center">
        <Icon type="ios-happy" />
        <span>在线咨询</span>
      </p>
      <div style="text-align:center">
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
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="modal_loading"  @click="handleSubmit('formInline')">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  computed:{
    getModalConsult(){
      return {
        val:this.$store.state.modalConsult
      }
    }
  },
  data() {
    return {
      modal_loading: false,
      modal: false,
      //   在线咨询
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
    }
  },
  methods: {
    visibleChange(result){
      this.$store.commit('modalConsult',result)
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
  },
};
</script>

<style scoped>
</style>