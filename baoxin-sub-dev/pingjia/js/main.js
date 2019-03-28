
layui.use(['element','laydate','form','layer'], function(){
    var element = layui.element,
        laydate = layui.laydate,
        form = layui.form,
        layer = layui.layer

        // 投诉时间
        var contactTimeStr = ''
        laydate.render({
          elem: '#advise-laydate' 
          ,type: 'datetime',
          done:function(value,date){
            contactTimeStr = date.year+''+date.month+''+date.date+''+date.hours+''+date.minutes+''+date.seconds
          }
        });
        // 表扬时间
        var contactTimeStr_praise = ''
        laydate.render({
          elem: '#praise-laydate' 
          ,type: 'datetime',
          done:function(value,date){
            contactTimeStr_praise = date.year+''+date.month+''+date.date+''+date.hours+''+date.minutes+''+date.seconds
          }
        });

        //投诉选项
        var feedbackOptionsArr = []
        var feedbackOptions = ''
        form.on('checkbox(adviseOption)', function(data){
          if(data.elem.checked){
            feedbackOptionsArr.push(data.value)
          }else{
            feedbackOptionsArr.splice(feedbackOptionsArr.indexOf(data.value),1)
          }
          feedbackOptions = feedbackOptionsArr.join(',')
        });  

        //表扬选项
        var feedbackOptionsArr_praise = []
        var feedbackOptions_praise = ''
        form.on('checkbox(praiseOption)', function(data){
          if(data.elem.checked){
            feedbackOptionsArr_praise.push(data.value)
          }else{
            feedbackOptionsArr_praise.splice(feedbackOptionsArr.indexOf(data.value),1)
          }
          feedbackOptions_praise = feedbackOptionsArr.join(',')
        });  

        

        function is_phone(val){
          var phone_reg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
          if(phone_reg.test(val)){
            return true;
          }
        }

        // 投诉提交
        form.on('submit(advise-btn)', function(data){
          if(!data.field.fbPersonPhone){
            layer.msg('请输入电话');
            return
          }else if(!is_phone(data.field.fbPersonPhone)){
            layer.msg('投诉者电话号码不正确');
            return
          }else if(!is_phone(data.field.userPhone)){
            layer.msg('被投诉者电话号码不正确');
            return
          }

          axios({
            method:'post',
            url: 'http://ii.sinelinked.com/tg_web/api/feedback/add',
            data:{
              feedbackType:2,//反馈类型（1：赞扬；2：投诉）
              fbPersonPhone:data.field.fbPersonPhone,//反馈人电话（必填）
              userPhone:data.field.userPhone,//被反馈用户的电话
              userName:data.field.userName,//被反馈用户的名字（必填）
              contactTimeStr:contactTimeStr,//顾问/团队联系时间
              content:data.field.content,//反馈内容(详细描述)
              feedbackOptions:feedbackOptions,//评价选项，可多选，用‘,’分隔
              userType:1,//被反馈用户的类型（1：顾问；2：团队）
            },
          })
          .then((result) => {
            layer.msg('提交成功');
            // 提交成功后，清空
            form.val("advise-form", {
              "fbPersonPhone": "",
              "userPhone": "",
              "userName": "",
              "contactTimeStr": "",
              "content": "",
            })
          }).catch((err) => {
            layer.msg('提交失败');
          });
          return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });

         // 表扬提交
        form.on('submit(praise-btn)', function(data){
          console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
          if(!data.field.fbPersonPhone){
            layer.msg('请输入电话');
            return
          }else if(!is_phone(data.field.fbPersonPhone)){
            layer.msg('表扬者电话号码不正确');
            return
          }else if(!is_phone(data.field.userPhone)){
            layer.msg('被表扬者电话号码不正确');
            return
          }

          axios({
            method:'post',
            url: 'http://ii.sinelinked.com/tg_web/api/feedback/add',
            data:{
              feedbackType:1,//反馈类型（1：赞扬；2：投诉）
              fbPersonPhone:data.field.fbPersonPhone,//反馈人电话（必填）
              userPhone:data.field.userPhone,//被反馈用户的电话
              userName:data.field.userName,//被反馈用户的名字（必填）
              contactTimeStr:contactTimeStr_praise,//顾问/团队联系时间
              content:data.field.content,//反馈内容(详细描述)
              feedbackOptions:feedbackOptions_praise,//评价选项，可多选，用‘,’分隔
              userType:1,//被反馈用户的类型（1：顾问；2：团队）
            },
          })
          .then((result) => {
            layer.msg('提交成功');
            // 提交成功后，清空
            form.val("praise-form", {
              "fbPersonPhone": "",
              "userPhone": "",
              "userName": "",
              "contactTimeStr": "",
              "content": "",
            })
          }).catch((err) => {
            layer.msg('提交失败');
          });
          return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });


  });

