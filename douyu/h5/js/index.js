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
    isIos: false,
    erweima: false,
    kfbg: false,
    qqbg: false,
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
    clickBtn: function() {
      if (this.erweima == false) {
        this.erweima = true
      } else {
        this.erweima = false
      }
    },
    clickKfbg: function() {
      if (this.kfbg == false) {
        this.kfbg = true
      } else {
        this.kfbg = false
      }
    },
    clickQqbg: function() {
      if (this.qqbg == false) {
        this.qqbg = true
      } else {
        this.qqbg = false
      }
    },
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
      data.channel = self.channelName;
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

      var self = this;
      var data = {};
      data.mobile = mobile;
      data.verifyCode = mobilecode;
      data.platform = platform;
      data.channel = self.channelName;

      console.log(data);

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
          if (self.total > 50000) {
            self.successOne = true;
            self.successTwo = false;
            self.successThree = false;
          }
          if (self.total > 100000) {
            self.successOne = true;
            self.successTwo = true;
            self.successThree = false;
          }
          if (self.total > 200000) {
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
        $.getJSON('../channel.json', function(list) {
          list.forEach(function(item) {
            if ((item.channelId + "") === channelId) {
              channelData = item;
              that.channelName = channelData.channelName;
              console.log(that.channelName);
            }
          })
        })
      }
    }
  }
})