var sg2ActivityAPI = new hoolaiActivityAPI(4, true);
// 视频播放
function playVideo(str) {
  console.log(str);
  $("#video").attr("src", str);

  $(".video_player").css("display", "block");
  $("#cover").css("display", "block");
  var myVideo = document.getElementById("video");
  myVideo.play();
}

$(function() {
 
  $(".video_close").click(function() {
    var myVideo = document.getElementById("video");
    myVideo.pause();
    $(".video_player").css("display", "none");
    $("#cover").css("display", "none");
  })

  $(".infor_ul li").click(function() {
    for (var a = 0; a < 4; a++) {
      $(".infor_ul li").eq(a).removeClass("infor_act");
    }
    $(this).addClass("infor_act");

  })

  $(".shouzhan").click(function() {
    var right_val = $(".fixed_dialog").css("right");
    console.log(right_val);
    if (right_val == '50px') {
      console.log("应收起");
      $(".fixed_dialog").animate({
        right: '-155px'
      })
      $(".shouzhan").attr("src", "./img/zhankai.png");
    } else if (right_val == '-155px') {
      console.log("应展开");
      $(".fixed_dialog").animate({
        right: '50px'
      })
      $(".shouzhan").attr("src", "./img/shouqi.png");
    }
  })
})
