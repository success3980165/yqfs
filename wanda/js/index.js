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
    totalNum: 0
  },
  created: function() {
    this.getTotal();
  },
  methods: {
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
      console.log(this.telephone);
      var mobile = this.telephone;
      var data = {};
      data.mobile = mobile;
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
      var data = {};
      data.mobile = this.telephone;
      data.verifyCode = this.code;
      data.platform = this.iosOrAndroid;
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
        }
      })
    }
  }
})
