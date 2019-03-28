<template>
  <div class="center">
    <div class="topBar">
      晟联保信 > 文章 > {{ data.title }}
    </div>
    <h3 class="title">
      {{ data.title }}
    </h3>

    <div class="content" v-html="data.content">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: ""
    };
  },
  created() {
    var id = this.$route.params.id;
    if (id) {
      this.searchArtById(id);
    }
  },
  methods: {
    searchArtById(id) {
      this.$axios({
        method: "get",
        url: this.$GLOBAL.baseURL + "/api/cms/searchArtById",
        params: {
          id: id
        }
      })
        .then(result => {
          if (result.data.code == 0) {
            this.data = result.data.data;
          }
        })
        .catch(err => {
          this.data = "出错了！！！";
        });
    }
  }
};
</script>

<style scoped>
.title {
  margin-top: 40px;
  font-size: 18px;
  border-bottom: 1px dashed #e8e8e8;
  padding-bottom: 25px;
  text-align: center;
}
.content {
  margin-top: 35px;
}
.topBar {
  padding-left: 20px;
  height: 45px;
  line-height: 45px;
  background: #3d6cc8;
  color: #fff;
}
</style>