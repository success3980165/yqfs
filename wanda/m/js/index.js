new Vue({
  el: '#app',
  data: {
    cover: false,
    yuyue: false,
    sg2ActivityAPI: new hoolaiActivityAPI(23, true),
    countdown: 60,
    smsCodeVal: '获取验证码',
    isDisabled: false,
    telephone: '',
    code: '',
    total: 0,
    isAnd: true,
    isIos: false
  },
  created: function() {
    this.initData();
  },
  methods: {
    chooseXT: function(str) {
      if (str == 'android') {
        this.isAnd = true;
        this.isIos = false;
      } else {
        this.isAnd = false;
        this.isIos = true;
      }
    },
    openMc: function() {
      this.cover = true
      this.yuyue = true
    },
    
    closeMc: function() {
      this.cover = false
      this.yuyue = false
    },
    setTime: function() {
      if (this.countdown == 0) {
        this.isGrayBg = false;
        this.smsCodeVal = "获取验证码";
        this.isDisabled = false;
        return;
      } else {
        this.isDisabled = true;
        this.isGrayBg = true;
        this.smsCodeVal = '重新发送' + this.countdown + 's';
        this.countdown--;
        console.log(this.countdown)
      }
      setTimeout(this.setTime, 1000)
    },
    sendSms: function() {
      var self = this;
      console.log(this.telephone);
      var mobile = this.telephone;
      var data = {};
      data.mobile = mobile;
      this.sg2ActivityAPI.sendMobileCode(data, function(result) {
        if (result.ret != 1) {
          if (result.code == 19) {
            // 错误的手机号
            alert("请输入正确的手机号")
            return;
          }
          if (result.code == 4) {
            // 重复领取
            alert("已经重复预约")
            return;
          }
          // alert(result.msg);
        } else {
          self.isGrayBg = true;
          self.setTime();
        }
      })
    },
    // 领取礼包，获取礼包码
    saveRecord: function() {
      var mobile = this.telephone;
      var mobilecode = this.code;
      var platform = ''
      if (this.isAnd) {
        platform = 'android';
      } else {
        platform = 'ios';
      }
      var data = {};
      data.mobile = mobile;
      data.verifyCode = mobilecode;
      data.platform = platform;

      console.log(data);
      var self = this;
      this.sg2ActivityAPI.saveRecord(data, function(result) {
        console.log(result)
        if (result.ret != 1) {
          if (result.code == 7) {
            alert("错误的验证码")
            return;
          }
          if (result.code == 19) {
            alert("请输入正确的手机号")
            return;
          }
          if (result.code == 5) {
            alert("您已预约~")
            return;
          }
          alert(result.msg);
        } else {
          alert("恭喜您成功预约！");
          self.cover = false
          self.yuyue = false
          self.getTotal();
        }
      })
    },
    getTotal: function() {
      var self = this
      this.sg2ActivityAPI.getTotal(function(result) {
        if (result.ret != 1) {
          alert(result.msg);
        } else {
          self.total = result.total
          console.log(self.total)
        }
      })
    },
    initData: function() {
      var self = this
      this.sg2ActivityAPI.getTotal(function(result) {
        if (result.ret != 1) {
          alert(result.msg);
        } else {
          self.total = result.total
          console.log(self.total)
        }
      })
    },
  }
})