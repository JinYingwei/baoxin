<template>
  <div>
    <ul class="zhenye-box">
      <li>
        <router-link :to="{name:'readPacket'}" tag='div'>
          <img src="../../assets/img/hongbao.png" alt="">
          <p>红包</p>
        </router-link>
      </li>
      <!-- <li>
        <router-link :to="{name:'charge'}" tag='div'>
          <img src="../../assets/img/shoufei.png" alt="">
          <p>成员收费</p>
        </router-link>
      </li> -->
      <li>
        <router-link :to="{name:'panMain'}" tag='div'>
          <img src="../../assets/img/ziliao.png" alt="">
          <p>资料分享</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'aa'}" tag='div'>
          <img src="../../assets/img/shoufei.png" alt="">
          <p>AA收款</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'teamMsg'}" tag='div'>
          <img src="../../assets/img/tongzhi.png" alt="">
          <p>消息通知</p>
        </router-link>
      </li>
    </ul>
    <br><br><br><br>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  methods: {
    developing() {
      Toast("敬请期待~");
    },
  }
};
</script>

<style scoped>
.zhenye-box {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  padding-top: 20px;
}

.zhenye-box li {
  text-align: center;
  width: 40%;
  padding: 20px 0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  margin-bottom: 20px;
  margin-left: 22px;
}

.zhenye-box li img {
  /* height: 80px; */
  width: 54%;
}

.zhenye-box li p {
  margin-bottom: 0;
}
</style>