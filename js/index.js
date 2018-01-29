new Vue({
  el: '#app',
  data: {
    popYuyueShow: false,
    telephone: '',
    code: '',
    yuyue: false,
    cover2: false,
    countdown: 60,
    isGrayBg: false,
    smsCodeVal: '获取验证码',
    isDisabled: false,
    isAndroidActive: false,
    isiOSActive: true,
    iosOrAndroid: 'ios',
    yqfsActivityAPI: new hoolaiActivityAPI(23, true),
    totalNum: 0,
    xueMian: true,
    jiangZiYa: false,
    yangJian: false,
    aoCunXin: false,
    zhouWang: false,
    daJi: false,
    jiFa: false,
    ranDeng: false,
    isChecked: 1,
    kefu: false,
    qqbg: false,
    weixin: false,
    successOne: false,
    successTwo: false,
    successThree: false,
    channelName: '',
    convertId: null,
    xmpic: 'img/xm_hover.png',
    jzypic: 'img/jzy_normal.png',
    yjpic: 'img/yj_normal.png',
    acxpic: 'img/acx_normal.png',
    zwpic: 'img/zw_normal.png',
    djpic: 'img/dj_normal.png',
    jfpic: 'img/jf_normal.png',
    rdpic: 'img/rd_normal.png'
  },
  created: function() {
    this.getTotal();
    this.getUrlParam(name);
    this.loadData();
  },
  methods: {
    mouseenterKefu: function() {
      if (this.kefu == false) {
        this.kefu = true;
        this.qqbg = false;

      } else {
        this.kefu = false
      }
    },
    mouseleaveKefu: function() {
      this.kefu = false
    },
    mouseenterQqbg: function() {
      if (this.qqbg == false) {
        this.qqbg = true;
        this.kefu = false;
      } else {
        this.qqbg = false
      }
    },
    mouseenterWeixin: function() {
      this.weixin = true;
    },
    mouseleaveWeixin: function() {
      this.weixin = false
    },
    clickXumian: function() {
      this.isChecked = 1;
      this.xueMian = true;
      this.jiangZiYa = false;
      this.yangJian = false;
      this.aoCunXin = false;
      this.zhouWang = false;
      this.daJi = false;
      this.jiFa = false;
      this.ranDeng = false;
      this.xmpic = 'img/xm_hover.png';
      this.jzypic = 'img/jzy_normal.png';
      this.yjpic = 'img/yj_normal.png';
      this.acxpic = 'img/acx_normal.png';
      this.zwpic = 'img/zw_normal.png';
      this.djpic = 'img/dj_normal.png';
      this.jfpic = 'img/jf_normal.png';
      this.rdpic = 'img/rd_normal.png';
    },
    clickJiangziya: function() {
      this.isChecked = 2;
      this.xueMian = false;
      this.jiangZiYa = true;
      this.yangJian = false;
      this.aoCunXin = false;
      this.zhouWang = false;
      this.daJi = false;
      this.jiFa = false;
      this.ranDeng = false;
      this.xmpic = 'img/xm_normal.png';
      this.jzypic = 'img/jzy_hover.png';
      this.yjpic = 'img/yj_normal.png';
      this.acxpic = 'img/acx_normal.png';
      this.zwpic = 'img/zw_normal.png';
      this.djpic = 'img/dj_normal.png';
      this.jfpic = 'img/jf_normal.png';
      this.rdpic = 'img/rd_normal.png';
    },
    clickYangjian: function() {
      this.isChecked = 3;
      this.xueMian = false;
      this.jiangZiYa = false;
      this.yangJian = true;
      this.aoCunXin = false;
      this.zhouWang = false;
      this.daJi = false;
      this.jiFa = false;
      this.ranDeng = false;
      this.xmpic = 'img/xm_normal.png';
      this.jzypic = 'img/jzy_normal.png';
      this.yjpic = 'img/yj_hover.png';
      this.acxpic = 'img/acx_normal.png';
      this.zwpic = 'img/zw_normal.png';
      this.djpic = 'img/dj_normal.png';
      this.jfpic = 'img/jf_normal.png';
      this.rdpic = 'img/rd_normal.png';
    },
    clickAocunxin: function() {
      this.isChecked = 4;
      this.xueMian = false;
      this.jiangZiYa = false;
      this.yangJian = false;
      this.aoCunXin = true;
      this.zhouWang = false;
      this.daJi = false;
      this.jiFa = false;
      this.ranDeng = false;
      this.xmpic = 'img/xm_normal.png';
      this.jzypic = 'img/jzy_normal.png';
      this.yjpic = 'img/yj_normal.png';
      this.acxpic = 'img/acx_hover.png';
      this.zwpic = 'img/zw_normal.png';
      this.djpic = 'img/dj_normal.png';
      this.jfpic = 'img/jf_normal.png';
      this.rdpic = 'img/rd_normal.png';
    },
    clickZhouwang: function() {
      this.isChecked = 5;
      this.xueMian = false;
      this.jiangZiYa = false;
      this.yangJian = false;
      this.aoCunXin = false;
      this.zhouWang = true;
      this.daJi = false;
      this.jiFa = false;
      this.ranDeng = false;
      this.xmpic = 'img/xm_normal.png';
      this.jzypic = 'img/jzy_normal.png';
      this.yjpic = 'img/yj_normal.png';
      this.acxpic = 'img/acx_normal.png';
      this.zwpic = 'img/zw_hover.png';
      this.djpic = 'img/dj_normal.png';
      this.jfpic = 'img/jf_normal.png';
      this.rdpic = 'img/rd_normal.png';
    },
    clickDaji: function() {
      this.isChecked = 6;
      this.xueMian = false;
      this.jiangZiYa = false;
      this.yangJian = false;
      this.aoCunXin = false;
      this.zhouWang = false;
      this.daJi = true;
      this.jiFa = false;
      this.ranDeng = false;
      this.xmpic = 'img/xm_normal.png';
      this.jzypic = 'img/jzy_normal.png';
      this.yjpic = 'img/yj_normal.png';
      this.acxpic = 'img/acx_normal.png';
      this.zwpic = 'img/zw_normal.png';
      this.djpic = 'img/dj_hover.png';
      this.jfpic = 'img/jf_normal.png';
      this.rdpic = 'img/rd_normal.png';
    },
    clickJifa: function() {
      this.isChecked = 7;
      this.xueMian = false;
      this.jiangZiYa = false;
      this.yangJian = false;
      this.aoCunXin = false;
      this.zhouWang = false;
      this.daJi = false;
      this.jiFa = true;
      this.ranDeng = false;
      this.xmpic = 'img/xm_normal.png';
      this.jzypic = 'img/jzy_normal.png';
      this.yjpic = 'img/yj_normal.png';
      this.acxpic = 'img/acx_normal.png';
      this.zwpic = 'img/zw_normal.png';
      this.djpic = 'img/dj_normal.png';
      this.jfpic = 'img/jf_hover.png';
      this.rdpic = 'img/rd_normal.png';
    },
    clickRandeng: function() {
      this.isChecked = 8;
      this.xueMian = false;
      this.jiangZiYa = false;
      this.yangJian = false;
      this.aoCunXin = false;
      this.zhouWang = false;
      this.daJi = false;
      this.jiFa = false;
      this.ranDeng = true;
      this.xmpic = 'img/xm_normal.png';
      this.jzypic = 'img/jzy_normal.png';
      this.yjpic = 'img/yj_normal.png';
      this.acxpic = 'img/acx_normal.png';
      this.zwpic = 'img/zw_normal.png';
      this.djpic = 'img/dj_normal.png';
      this.jfpic = 'img/jf_normal.png';
      this.rdpic = 'img/rd_hover.png';
    },
    popYuyue: function() {
      this.popYuyueShow = true;
    },
    closePop: function() {
      this.popYuyueShow = false;
    },
    chooseXT: function(str) {
      if (str == 'android') {
        this.isAndroidActive = true;
        this.isiOSActive = false;
        this.iosOrAndroid = 'android';
      } else {
        this.isAndroidActive = false;
        this.isiOSActive = true;
        this.iosOrAndroid = 'ios';
      }
    },
    sendSms: function() {
      var self = this;
      console.log(self.channelName);
      console.log(this.telephone);
      var mobile = this.telephone;
      var data = {};
      data.mobile = mobile;
      data.channel = self.channelName;
      this.yqfsActivityAPI.sendMobileCode(data, function(result) {
        if (result.ret != 1) {
          alert(result.msg);
        } else {
          self.isGrayBg = true;
          self.countdown = 60;
          self.setTime();
        }
      })
    },
    setTime: function() {
      if (this.countdown == 0) {
        this.isGrayBg = false;
        this.smsCodeVal = "获取验证码";
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
        this.isGrayBg = true;
        this.smsCodeVal = '重新发送' + this.countdown + 's';
        this.countdown--;
      }
      setTimeout(this.setTime, 1000)
    },
    saveRecord: function() {
      var self = this;
      var data = {};
      data.mobile = this.telephone;
      data.verifyCode = this.code;
      data.platform = this.iosOrAndroid;
      data.channel = self.channelName;
      var self = this;
      this.yqfsActivityAPI.saveRecord(data, function(result) {
        if (result.ret != 1) {
          alert(result.msg);
        } else {
          alert("预约成功！");
          // 领取成功
          self.popYuyueShow = false;
          if (self.convertId) {
            _taq.push({
              convert_id: self.convertId,
              event_type: "button"
            })
          }
        }
      })
    },
    getTotal: function() {
      var self = this;
      this.yqfsActivityAPI.getTotal(function(result) {
        if (result.ret != 1) {
          alert(result.msg);
        } else {
          self.totalNum = result.total;
          if (self.totalNum > 50000) {
            self.successOne = true;
            self.successTwo = false;
            self.successThree = false;
          }
          if (self.totalNum > 100000) {
            self.successOne = true;
            self.successTwo = true;
            self.successThree = false;
          }
          if (self.totalNum > 200000) {
            self.successTwo = true;
            self.successOne = true;
            self.successThree = true;
          }
        }
      })
    },
    clickYuyue: function() {
      this.cover2 = true;
      this.yuyue = true;
    },
    closeYuyue: function() {
      this.cover2 = false;
      this.yuyue = false;
    },
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    },
    bindToutiaoBi: function(convertId) {
      this.convertId = convertId;
      (function(root) {
        root._tt_config = true;
        var ta = document.createElement('script');
        ta.type = 'text/javascript';
        ta.async = true;
        ta.src = document.location.protocol + '//' + 's3.pstatp.com/bytecom/resource/track_log/src/toutiao-track-log.js';
        ta.onerror = function() {
          var request = new XMLHttpRequest();
          var web_url = window.encodeURIComponent(window.location.href);
          var js_url = ta.src;
          var url = '//ad.toutiao.com/link_monitor/cdn_failed?web_url=' + web_url + '&js_url=' + js_url + '&convert_id=' + convertId;
          request.open('GET', url, true);
          request.send(null);
        }
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ta, s);
      })(window);
    },
    loadData: function() {
      var that = this;
      that.getUrlParam(name);
      var channelId = that.getUrlParam('channel');
      var channelData = {};
      if (channelId) {
        $.getJSON('/channel.json?n' + new Date().getTime(), function(list) {
          list.forEach(function(item) {
            if ((item.channelId + "") === channelId) {
              channelData = item;
              that.channelName = channelData.channelName;
              // 今日头条channelId 201-203
              if (item.channelId >= 201 && item.channelId <= 203) {
                that.bindToutiaoBi(item.convertId);
              }
            }
          })
        })
      }
    }
  }
})