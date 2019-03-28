  //把url后面的参数解析成对象
  function parseUrl(url) {
    var reg = /(\w+)=(\w+)/ig;
    var result = {};

    url.replace(reg, function (a, b, c) {
      result[b] = c;
    });

    return result;
  }

  function $(obj){
    return document.querySelector(obj)
  }

  var userId = parseUrl(location.href).userId
  var articleId = parseUrl(location.href).articleId
  if(articleId){
    axios({
      method: 'get',
      url: 'http://ii.sinelinked.com/tg_web/api/cms/searchArtById',
      params: {
        id: articleId
      }
    }).then((result) => {
      if(result.data.code == 0){
        var data = result.data.data
        $('title').innerHTML = data.title+'保信云顾问'
        $('.article-title h3').innerHTML = data.title
        $('.createTime').innerHTML = data.createTime
        $('.copyfrom').innerHTML = data.copyfrom
        $('.detailsConte').innerHTML = data.content
      }
    }).catch((err) => {
      
    });

    axios({
      method:'get',
      url: 'http://ii.sinelinked.com/tg_web/api/XCX/agent/search',
      params: {
          agentId:userId
      }
  }).then((result) => {
      var data = result.data[0]
      $('.userName').innerHTML = data.userName
      $('.qrCodePath').src = data.qrCodePath
  }).catch((err) => {
      console.log(err);
  });
  }
