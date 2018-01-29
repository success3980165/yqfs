function request(url_tag, call) {
  console.log(url_tag)
  var url = "http://games.hoolai.com/cms/?v=hlsg2gw&json=get_category_posts&category_id=" + url_tag;
  console.log(url)
  requestDo(url, call);
}

function requestDo(posturl, cal) {
  var url = "http://activity.api.hulai.com/api/wordpress/cache";
  var data = {};
  data.url = posturl;
  $.post(url, data, function(result) {
    if (result.ret > 0) {
      cal(result);
    }
  }, 'json');
}
$(function() {
  // 下拉菜单
  $(".youxiziliao").mouseenter(function() {
    $(".ziliaomenu").css("display", "flex");
  })
  $(".youxiziliao").mouseleave(function() {
    $(".ziliaomenu").css("display", "none");
  })
  $(".wanjiahudong").mouseenter(function() {
    $(".hudongmenu").css("display", "flex");
  })
  $(".wanjiahudong").mouseleave(function() {
    $(".hudongmenu").css("display", "none");
  })
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?3b582467fe6ec04adcf012790ef7cd14";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
})
