<template>
    <div>
        <!-- banner -->
        <div class="banner"></div>
        <!-- 选项卡 -->
        <div class="center">
             <div class="guideTab">
                <div class="wrap">
                    <ul class="tab clearfix">
                        <li class="tabLi" v-for="(item,i) in tabData" :key="i">
                            <div class="tabImg" @click="tabHandle(i)"><img :src="item.images" /></div>
                            <p>{{item.title}}</p>
                            <img class="downImg" src="../../assets/img/help/down.png" :style="{display: i == index ? 'block' : 'none'}"/>
                        </li>
                        <!-- <li class="tabLi">
                            <div class="tabImg" @click="tabHandle(i)"><img src="../../assets/img/help/caozuozhinan-un.png" /></div>
                            <p>操作指南</p>
                            <img class="downImg" style="display: none;"  src="../../assets/img/help/down.png" />
                        </li>
                        <li class="tabLi">
                            <div class="tabImg"><img src="../../assets/img/help/xinshouxuzhi-un.png" /></div>
                            <p>新手须知</p>
                            <img class="downImg" style="display: none;"  src="../../assets/img/help/down.png" />
                        </li>
                        <li class="tabLi">
                            <div class="tabImg"><img src="../../assets/img/help/changjianwenti-un.png" /></div>
                            <p>常见问题</p>
                            <img class="downImg" style="display: none;"  src="../../assets/img/help/down.png" />
                        </li> -->
                    </ul>
                </div>
            </div>
             <!-- 选项内容 -->
            <div class="content">
                <div class="wrap">
                    <div class="tabContent">
                        <div :style="{display: i == index ? 'block' : 'none'}" v-for="(item,i) in tabData" :key="i" v-html="item.content"></div>
                        <!-- <div>操作指南</div>
                        <div>新手须知</div>
                        <div>常见问题</div>-->
                    </div>
                </div>
            </div>	
        </div>
    </div>
</template>

<script>
    
    export default{
        data(){
            return{
                tabData:[
                    {
                        title:"平台介绍",
                        content:`       晟联保信系统是保险代理人的展业工具，包括服务于代理人的保险顾问系统，以及顾问组成的团队系统，并与用户需求信息收集系统相关联。
        保险代理人可以通过“晟联保信”公众号免费注册并登陆，在系统内获取并处理用户需求信息，使用系统提供的展业工具辅助开展业务。
        晟联保信系统为每个用户配置了小程序名片系统，用户可以自己编辑，然后依托社交网络发送给潜在的客户，从而降低与客户交互的门槛，拉近与潜在客户的距离，宣传自己的同时更加方便地获得用户需求信息。
        除通过名片主动推广外，晟联保信平台还和专业的信息推广系统“晟联传播平台”相关联，通过平台推广，为用户提供稳定的用户需求信息来源。同时开放与第三方平台的接口，提供更多的信息源。
        晟联保信系统还提供了由保险代理人组成的顾问团队系统，方便代理人之间的协作、资料分享、以及集体活动等，有利于提高每个代理人的业务水平，并形成团队优势。
        晟联保信平台以“稳定的用户需求信息源”和“基于社交的名片系统”两大特点，解决顾问获客的核心需求。欢迎保险代理人参与进来，共同发展保险事业。
        感谢每个人的关注。`,
                        images:require('../../assets/img/help/pingtaijieshao-se.png')
                    },
                    {
                        title:"操作指南",
                         content:`<img src=${require('../../assets/img/help/intro.jpg')}  />`,
                        images:require('../../assets/img/help/caozuozhinan-un.png')
                    },
                    {
                        title:"新手须知",
                        content:'新手须知',
                        images:require('../../assets/img/help/xinshouxuzhi-un.png')
                    },
                    {
                        title:"常见问题",
                        content:'常见问题',
                        images:require('../../assets/img/help/changjianwenti-un.png')
                    }
                ],
                index:0     //用于操作选项卡
            }
        },
        methods:{
            tabHandle(i){
                console.log(i);
                this.index = i
            }
        }
    }
    
</script>

<style scoped>
    .banner {
       height: 470px;
       background: url(../../assets/img/help/banner.png) no-repeat center;  
    }
    .tab{
       display: flex;
       justify-content: space-around;
    }
    .tabImg{
        width: 140px;
        height: 140px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
    }
    .tabImg img{
        width: 133px;
        height: 133px;
    }
    .tab li{
      text-align: center;
    }
    .tab p{
        font-size: 20px;
        line-height: 40px;
    }
    .downImg{
        margin: 10px auto;
    }
    .wrap{
        margin-top: 25px;
    }
    .tabContent{
        margin-top: 25px;
    }
    .tabContent div{
        padding-left: 10px;
        min-height: 200px;
        font-size: 16px;
        line-height: 30px;
        /* border: 2px solid #ccc; */
        border-radius: 10px;
    }
</style>

