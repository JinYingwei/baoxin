<template>
    <section>
        <RadioGroup 
            type="button" 
            @on-change="change"
            
        >
            <Radio 
                v-for="(item,index) in dataShareLabel" 
                :label="item.userName"
                :key="index" 
            ></Radio>
        </RadioGroup>   
        <div class="content">
            <!-- 面包屑 -->
            <Breadcrumb>
                <BreadcrumbItem v-show="show" @click.native="getDataShare(0,teamId)">Home</BreadcrumbItem>   
                <BreadcrumbItem 
                    v-for="(item,index) in breadTitle"
                    :key="index"
                    @click.native="getBreadChild(item,index)"
                >{{item.title.name}}</BreadcrumbItem>
            </Breadcrumb>
            <ul class="papers">
                <li 
                    v-for="(item,index) in dataList"
                    :key="index" 
                    @click="getShowChild(item,$event)"
                >
                    <i 
                        :class="{'icon-folder':item.fileExt=='目录','icon-fazhaopian':item.fileExt=='JPEG'||item.fileExt=='GIF'||item.fileExt=='PNG','icon-PDF':item.fileExt=='PDF'}"
                        class="iconfont"
                    ></i>
                    <p>{{item.name}}</p>
                </li>

            </ul>
            <Modal
                v-model="modal1"
                :closable="false"
            >
                <div slot = "header"></div>
                <img :src="picPreview">
                <div slot = "footer"></div>
            </Modal>
        </div>
        <div class="null" v-show="!dataList.length">
            <img src="../../../assets/img/null.png" alt="">
        </div>
    </section>
</template>

<script>
    export default{
        created(){
            this.getJoinTeam()
        },
        data(){
            return{
                n:'',
                dataShareLabel:'',   //存tab页面
                teamId:'',  //存第一个团队数据id
                dataList:[],    //数据文件
                childID:'',     //存id
                modal1:false,
                picPreview:'',   //图片预览
                breadTitle:[],
                show:false
            }
        },
        methods:{
            //查看加入的团队
            getJoinTeam(){
                this.$axios({
                    method:'get',
                    url:this.$GLOBAL.baseURL+'/api/user/getMyTeam'
                }).then(result=>{
                    if(result.data.code === 0){
                        this.dataShareLabel = result.data.data.list
                        this.teamId = result.data.data.list[0].userId
                        this.getDataShare(0,this.teamId)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },

            //查看团队资料文件
            getDataShare(id=0,teamId = this.teamId){
                this.$axios({
                    method:'get',
                    url:this.$GLOBAL.baseURL+'/api/teamMeans/getCatalogByParentId',
                    params:{
                        parentId:id,
                        teamId:teamId
                    }
                }).then(result=>{
                    if(result.data.code === 0){
                        this.dataList = result.data.data
                    }
                    //如果为主页内容
                    if(id==0){
                        this.breadTitle = []
                        this.show = false
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },

            //查看对应团队的资料文件
            change(item){
                var getItem = this.dataShareLabel.find(user=>{
                    return user.userName == item ? user : ''  
                })
                
                this.getDataShare(0,getItem.userId)
                this.childID = getItem.userId
                this.breadTitle = []
            },

            //查看子集对应的文件
            getShowChild(item,event){
                this.teamId = item.teamId
                this.show = true
                if(item.type === 1){
                    this.getDataShare(item.id,this.childID||this.teamId)
                    this.breadTitle.push(
                       {
                           title:item
                       }
                    )
                }else if(item.fileExt === 'PDF'){
                    window.open(item.accessUrl)
                }else{
                   this.modal1 = true
                   this.picPreview = item.accessUrl
                }
            },

            //查看面包屑对应文件
            getBreadChild(item,index){
                this.breadTitle.splice(index+1,this.breadTitle.length-index+1)
                this.$axios({
                    method:'get',
                    url:this.$GLOBAL.baseURL + '/api/teamMeans/getCatalogByParentId',
                    params:{
                        parentId:item.title.id,
                        teamId:item.title.teamId
                    }
                }).then(result=>{
                    if(result.data.code === 0){
                        this.dataList = result.data.data
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }
        }
    }
</script>

<style scoped>
.icon-PDF{
   color: #dd6572;
   font-size: 46px;
   display: block;
   margin-top:9px; 
}
.icon-fazhaopian{
    font-size: 44px;
    margin-top: 9px;
    display: block;
    color: #dd6572;
}
.icon-folder{
    color:#ffd659;
    font-size: 56px;
}
.papers{
    display: flex;
    flex-wrap: wrap;

}
.papers li{
    text-align: center;
    width: 120px;
    height: 126px;
    border-radius: 5px;
    cursor: pointer;
    margin: 2px 20px 0 0;
    text-align: center;
    position: relative;
}
.papers li:hover{
    background: #f1f5fa;
}
.papers li p{
    overflow:hidden; 
    white-space:nowrap; 
    text-overflow:ellipsis;
    padding: 0 2px;
    position:absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 20px;
}
>>>.ivu-modal-header,>>>.ivu-modal-footer{
    display: none;
}
>>>.ivu-modal-body img{
    width: 100%;
}
>>>.ivu-breadcrumb{
    margin-top:20px; 
}
>>>.ivu-breadcrumb span:not(:last-child):hover{
    color: #3d6cc8;
    cursor: pointer;
}
.null{
    text-align: center;
    margin-top: 60px;
}
</style>
