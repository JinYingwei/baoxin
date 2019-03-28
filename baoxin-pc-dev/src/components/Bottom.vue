<template>
    <div>
        <footer>
            <div class="center">
                <div class="foot ">
                    <!-- <div class="foot_friend ">
                        <a href="#">关于我们</a>
                        <a href="#">联系我们</a>
                        <a href="#">操作指南 </a>
                    </div> -->
                    <div class="footRigt ">
                        <ul class="footRigtUl clearfix ">
                            <li class="footRigtUlLi " style="margin-right:30px">
                                <img src="../assets/img/header/erweima.jpg">
                                <p>晟联保信</p>
                            </li>
                            <li class="footRigtUlLi ">
                                <img src="../assets/img/header/erweima.jpg">
                                <p>泰顾晟联</p>
                            </li>
                        </ul>
                    </div>
                    <p class="p3 ">Copyright © 2017 山东晟联保信信息技术有限公司 鲁ICP备17005550号-3 </p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>

/*--------底部------*/

footer {
  margin-top: 40px;
  background: #3d6cc8;
}

.foot {
  width: 100%;
  background: #3d6cc8;
  overflow: hidden;
  position: relative;
  text-align: center
}

.foot_friend {
  height: 30px;
  margin: 30px auto 0;
  text-align: center;
}

.foot_friend > span {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #80a4ee;
  display: inline-block;
}

.foot_friend > a {
  color: #fff;
  display: inline-block;
  margin-right: 15px;
}

.foot_friend > a:nth-of-type(1) {
  margin-left: 5px;
}

.foot_friend a:hover {
  color: orangered;
}

.footRigt {
  /* position: absolute; */
  right: 180px;
  display: inline-block;
  top: 12px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.footRigt h3 {
  width: 196px;
  height: 27px;
  line-height: 27px;
  text-indent: 15px;
  color: #fff;
}

.footRigt span {
  display: inline-block;
  width: 196px;
  height: 33px;
  line-height: 33px;
  text-indent: 5px;
  color: #80a4ee;
}

.footRigtUlLi {
  width: 66px;
  height: 80px;
  text-align: center;
  float: left;
}

.footRigtUlLi > img {
  display: inline-block;
  max-width: 66px;
}

.foot .p3 {
  margin-bottom: 24px;
}

.foot p {
  float: left;
  width: 100%;
  color: #fff;
  font-size: 14px;
  text-align: center;
  height: 26px;
  line-height: 26px;
}

.footRigtUlLi > p {
  height: 30px;
  line-height: 30px;
}

</style>