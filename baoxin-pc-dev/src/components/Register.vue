<template>
  <div>
    <Modal v-model="modal" width="380" @on-visible-change="visibleChange">
      <!-- <p slot="header" style="color:#3d6cc8;text-align:center">
        <Icon type="ios-happy" />
        <span>在线咨询</span>
      </p> -->
      <div style="text-align:center">
        <br>
        <br>
        <Form ref="formInline" :model="formInline" required :rules="ruleInline">
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
      // return this.$store.state.modalConsult
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
      // this.$store.commit('modalConsult',result)
    },
     // 提交问题
    handleSubmit(name) {
    },
  },
};
</script>

<style scoped>
</style>