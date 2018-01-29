new Vue({
  el: '#app',
  data: {
    popYuyueShow: false,
    telephone: '',
    code: '',
    countdown: 60,
    isGrayBg: false,
    smsCodeVal: '获取验证码',
    isDisabled: false,
    isAndroidActive: true,
    isiOSActive: false,
    iosOrAndroid: 'android',
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
    channelName: ''
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
      console.log(data);
      var self = this;
      this.yqfsActivityAPI.saveRecord(data, function(result) {
        console.log(result)
        if (result.ret != 1) {
          alert(result.msg);
        } else {
          alert("预约成功！");
          // 领取成功
          self.popYuyueShow = false;
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
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    },
    loadData: function() {
      var that = this;
      that.getUrlParam(name);
      var channelId = that.getUrlParam('channel');
      var channelData = {};
      if (channelId) {
        $.getJSON('channel.json', function(list) {
          list.forEach(function(item) {
            if ((item.channelId + "") === channelId) {
              channelData = item;
              that.channelName = channelData.channelName;
            }
          })
        })
      }
    }
  }
})