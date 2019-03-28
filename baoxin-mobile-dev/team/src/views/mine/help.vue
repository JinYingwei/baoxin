<template>
    <div>
      <div @click="changeKefu" class="char-heads">
            <img src="../../assets/img/kefu.png">
            <span>在线客服</span>
        </div>
         <iframe v-show="show" id="kefu" src="http://ii.sinelinked.com/sub/kefu.help/index.html" frameborder="0"></iframe>

        <img v-show="!show"  style="width:100%" src="../../assets/img/help.png">
    </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      activeChecked: true,
       show:false
    };
  },
  methods: {
    changeKefu(){
          this.show = !this.show
      }
  }
};
</script>
<style scoped>
.char-heads {
  position: fixed;
  width: 1.53rem;
  height: 1.01rem;
  border-radius: 50%;
  display: block;
  justify-content: center;
  align-items: center;
  margin-right: 0.3rem;
  right: 0.266667rem /* 20/75 */;
  bottom: 4rem /* 300/75 */;
  z-index: 100;
}
#kefu{
    width: 100%;
    height: 100vh;
    transition: .3s;
    position: absolute;
    top: 0;
    left: 0;
}
</style>

