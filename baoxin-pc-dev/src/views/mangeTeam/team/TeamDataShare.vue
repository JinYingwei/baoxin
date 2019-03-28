<template>
    <section>
        <!-- 菜单 -->
        <div class="listWrap">
            <ul class="menuList">
                <li class="upload">
                    <span>
                        <i class="iconfont icon-shangchuan"></i>
                        上传
                    </span>
                    <input 
                        type="file"
                        accept="image/*"
                        multiple
                        ref="up"
                        @change="upload"
                    >
                </li>
                <li @click="creatFolder">
                    <span>
                        <i class="iconfont icon-xinjianwenjian"></i>
                        新建文件夹
                    </span>
                </li>
            </ul>
            <ul class="showList"  v-show="bool">
                <li @click="strike">
                    <span>
                        <i class="iconfont icon-shanchu"></i>
                        删除
                    </span>
                </li>
                 <li @click="rename" v-show="strikeList.length==1">
                    <span>
                        <i class="iconfont icon-zhongmingming"></i>
                        重命名
                    </span>
                </li>
            </ul>
        </div>
        <!-- 模态框=>删除 -->

        <!-- 全选 已选中 -->
        <div class="check">
            <input type="checkbox" @change="isChecked" v-model="selectAll">
            <!-- <span>全选</span> -->
            <span>已选中{{countLength}}个文件/文件夹</span>
        </div>
        <!-- 面包屑 -->
        <Breadcrumb>
            <BreadcrumbItem v-show="show" @click.native="getDataShare(0,teamId)">Home</BreadcrumbItem>   
            <BreadcrumbItem 
                v-for="(item,index) in breadTitle"
                :key="index"
                @click.native="getBreadChild(item,index)"
            >{{item.title.name}}</BreadcrumbItem>
        </Breadcrumb>
        <!-- 文件 -->
        <ul class="papers">
            <li :class="{bg:item.isChecked}" 
                v-for="(item,index) in dataList"
                :key="index" 
                @click="getShowChild(item,$event)"
            >
                <i 
                    :class="{'icon-folder':item.fileExt=='目录','icon-fazhaopian':item.fileExt=='JPEG'||item.fileExt=='PNG'||item.fileExt=='GIF','icon-PDF':item.fileExt=='PDF'}"
                    class="iconfont"
                ></i>
                <span class="sel" :class="{active:item.isChecked}" @click.stop="selectHandle(item,index)">
                    <i class="iconfont icon-choosehandle" ></i>
                </span>
                
                <input 
                    v-if="item.id==activefileId" 
                    type="text" 
                    class="text" 
                    v-model="folderName" 
                    @click.stop=""
                    v-focus="focusState"
                    @blur="successfulName(item)"
                >
                <p v-else>{{item.name}}</p>
            </li>
        </ul>
        <!-- 模态框，图片 -->
         <Modal
            v-model="modal1"
            :closable="false"
         >
            <div slot = "header"></div>
            <img :src="picPreview">
            <div slot = "footer"></div>
        </Modal>
    </section>
</template>
<script>
    export default{
        created(){
            // this.getJoinTeam()
            this.getDataShare()
        },
        data(){
            return{
                n:'',
                dataShareLabel:'',   //存tab页面
                teamId:'',  //存第一个团队数据id
                parentId:'',    //存父级目录，上传接口参数
                dataList:[],    //数据文件
                childID:'',     //存id
                modal1:false,   
                picPreview:'',   //图片预览
                breadTitle:[],  //面包屑数据 
                show:false,    //面包屑boolean    
                bool:'',    //单选
                selectAll:false,    //全选
                strikeList:[],   //选中文件
                activefileId:'',
                value:'',
                folderName:'',
                focusState:''
            }
        },
        computed: {
            // 计算选中的文件/文件夹
            countLength(){
                var arr =  this.dataList.filter(item=>{
                    return item.isChecked == true
                })
                return arr.length
            }
        },
        methods:{
            //查看团队资料文件
            getDataShare(id = 0,teamId = this.teamId){
                this.$axios({
                    method:'get',
                    url:this.$GLOBAL.baseURL + '/api/teamMeans/teamGetCatalogByParentId',
                    params:{
                        parentId:id,
                        teamId:teamId
                    }
                }).then(result=>{
                    if(result.data.code === 0){
                        var tempList = result.data.data
                        for(let value of tempList){
                            value['isChecked']=false
                        }
                        this.dataList = JSON.parse(JSON.stringify(tempList))

                        if(result.data.data.length > 0){
                            this.parentId = result.data.data[0].parentId
                        }
                    }
                    //如果为主页内容
                    if(id == 0){
                        this.breadTitle = []
                        this.show = false
                        this.selectAll = false
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },

            //查看子集对应的文件
            getShowChild(item,event){
                this.teamId = item.teamId
                this.parentId = item.parentId
                this.show = true
                if(item.type === 1){
                    this.getDataShare(item.id,this.childID || this.teamId)
                    this.breadTitle.push(
                       {
                           title:item
                       }
                    )
                    this.selectAll = false
                }else if(item.fileExt === 'PDF'){
                    window.open(item.accessUrl)
                }else{
                   this.modal1 = true
                   this.picPreview = item.accessUrl
                }
            },

            //查看面包屑对应文件
            getBreadChild(item,index){
                console.log(item);
                this.parentId = item.parentId
                this.breadTitle.splice(index + 1,this.breadTitle.length - index + 1)
                this.$axios({
                    method:'get',
                    url:this.$GLOBAL.baseURL + '/api/teamMeans/teamGetCatalogByParentId',
                    params:{
                        parentId:item.title.id,
                    }
                }).then(result=>{
                    if(result.data.code === 0){
                        var tempList = result.data.data
                        for(let value of tempList){
                            value['isChecked']=false
                        }
                        this.dataList = Array.from(tempList)
                        // this.dataList = JSON.parse(JSON.stringify(tempList))
                        this.selectAll = false
                        console.log(this.dataList);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            // 选中文件
            selectHandle(item,index){
                item.isChecked =! item.isChecked
                var arr = this.dataList.filter(res=>{
                    this.strikeList.push(res)
                    return res.isChecked == true
                })
                this.strikeList = arr
                console.log(this.strikeList);

                arr.length === this.dataList.length ? this.selectAll = true : this.selectAll = false
                this.bool = arr.length
                this.activefileId = ''
            },
            //全选
            isChecked(){
                this.dataList.map(item=>{
                    return item.isChecked = !item.isChecked
                })
                var arr = this.dataList.filter(res=>{
                    return res.isChecked == true
                })
                if(arr.length == this.dataList.length && arr.length == 0){
                    this.selectAll != this.selectAll
                    console.log(this.selectAll);
                    return
                }

                arr.length === this.dataList.length ? this.selectAll = true : this.selectAll = false
                this.bool = arr.length
            },
            //上传文件
            upload(){
                var formData = new FormData();
                let ele =  this.$refs.up
                let files = ele.files
                var teamMeansFile = []
                for(let val of files){
                    formData.append('teamMeansFile',val)
                }
                formData.append('parentId',this.parentId)
                           
                this.$axios({
                    method:'post',
                    heardes:{
                        'Content-Type':'multipart/form-data'
                    },
                    url:this.$GLOBAL.baseURL + '/api/teamMeans/upload',
                    data:formData
                }).then(result=>{
                   this.$Message.success('文件上传成功')
                   this.getDataShare()
                }).catch(err=>{
                    console.log(err.response);
                })
            },
            //删除文件
            strike(){
                var arr = []
                this.strikeList.map(item=>{
                    console.log(item);
                    arr.push(
                        {
                            'id':item.id,
                            'type':item.type
                        }
                    )
                })
                this.$Modal.confirm({
                    title: '确认是否删除选中文件',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        this.$axios({
                            method:'post',
                            url:this.$GLOBAL.baseURL + '/api/teamMeans/delete',
                            headers: {
                                "Content-Type": "application/json;charset=UTF-8"
                            },
                            data:JSON.stringify(arr)
                        }).then(result=>{
                            this.getDataShare()
                            this.bool = ''
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                })
            },
            //新建文件
            creatFolder(){
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                placeholder: '请输入你要创建的文件夹名称'
                            },
                            on: {
                                input: (val) => {
                                    this.value = val;
                                }
                            },
                            
                        })
                    },
                    onOk: () => {
                        this.$axios({
                            method:'post',
                            url:this.$GLOBAL.baseURL+'/api/teamMeans/addCatalog',
                            data:{
                                name:this.value,
                                parentId:this.parentId
                            }
                        }).then(result=>{
                            console.log(result);
                            this.getDataShare(this.parentId)
                            this.value = ''
                        }).catch(err=>{
                            console.log(err);
                        })
                    },
                })
            },
            //重命名
            rename(){
                let fileId = this.strikeList[0].id
                var tempArr;
                tempArr = this.dataList.filter((item,index)=>{
                    return item.id == fileId
                })
                this.activefileId = tempArr[0].id
                this.focusState = true
                console.log(this.$refs.inputFocus);   
            },
            //失去焦点，命名成功
            successfulName(item){
                this.$axios({
                    method:'post',
                    url:this.$GLOBAL.baseURL + '/api/teamMeans/updateFileName',
                    data:{
                        newFileName:this.folderName,
                        fileId:item.id
                    }
                }).then(result=>{
                    this.getDataShare(this.parentId)
                    this.activefileId = ''
                }).catch(err=>{
                    console.log(err);
                })
            },
            focusclick () {
                this.focusState = true
            }
        },
        directives: {
            focus: {
                update: function (el, {value}) {
                if (value) {
                        el.focus()
                    }
                }
            }
        },
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
.papers li span{
    position: absolute;
    left: 4px;
    top: -1px;
    color:#aedbf1;
    display: none;
}
.papers li:hover span{
    display: block;
}
.papers li .sel:hover{
    color:#80bfdd;
}
.papers li .active{
    color: #3b8cff;
    display: block;
}
.papers li .active:hover{
    color: #3b8cff;
}
.papers li .sel .iconfont{
    font-size: 23px;
}
.papers .bg{
    background: #f1f5fa;
}
.check{
    padding-bottom: 10px;
    border-bottom: 1px solid #f5f5f5;
}
.check>input,.check>input span{
    vertical-align: middle;
    color:#666;
    margin-right: 5px;
}
.listWrap{
    overflow: hidden;
}
.menuList{
    overflow: hidden;
    margin-bottom: 10px;
    float: left;
}
.menuList li{
    float: left;
    font-size: 14px !important;
    cursor: pointer;
    line-height: 34px;
    border-radius: 4px;
    text-align: center;
    padding: 0 18px;
    color:#3b8cff;
}
.menuList li:not(.upload){
    border: 1px solid #c0d9fe;
    margin-left: 20px;
}
.menuList li:hover,.showList li:hover{
    opacity: .7;
}
.menuList .upload{
    background:#3b8cff;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
}
.menuList .upload input{
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}
.menuList .upload span{
    color: #fff;
    display: block;
}
.showList{
    float: left;
    overflow: hidden;
}
.showList li{
    float: left;
    font-size: 14px !important;
    cursor: pointer;
    line-height: 34px;
    border-radius: 4px;
    text-align: center;
    padding: 0 18px;
    color:#3b8cff;
    border: 1px solid #c0d9fe;
    margin-left: 10px;
}
.papers .text{
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 20px;
    width: 80%;
    text-indent:5px;
    line-height: 22px;
    border-radius: 2px;
    border:1px solid  #3b8cff;
}
</style>
