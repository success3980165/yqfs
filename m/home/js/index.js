new Vue({
  el: '#app',
  data: {
    hoolaiCmsAPI: new hoolaiCmsAPI(21, false),
    yqfsActivityAPI: new hoolaiActivityAPI(23, true),
    listData: [],
    listName: '',
    more_href: '',
    zuixin: true,
    xinwen: false,
    gonggao: false,
    gonglue: false,
    huodong: false,
    article_title: '',
    article_content: '',
    xianrenArr: [],
    xianren: {},
    wuxianArr: [],
    faxianArr: [],
    yixianArr: [],
    xuanxianArr: [],
    wxbg: './img/wuxian_act.png',
    fxbg: './img/faxian.png',
    yxbg: './img/yixian.png',
    xxbg: './img/xuanxian.png',
    show_dialog: false,
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
    if (isMobile.apple.device) {
      this.isIos = true
      this.isAnd = false
    }
    if (isMobile.android.device) {
      this.isAnd = true
      this.isIos = false
    }
    this.getTotal();
  },
  methods: {
    initData: function() {
      var that = this;
      var tag = window.location.hash.substr(1);
      console.log(tag)
      var locationHrefArr = window.location.href.split("#");

      if (locationHrefArr.length == 1) {
        // 判断是首页还是仙人页
        var biaoshi = window.location.pathname.split('/');
        if (biaoshi[biaoshi.length - 1] == 'xianren.html') {
          console.log('仙人页');
          that.goGetXianRen('仙人百科')
        } else {
          console.log('首页')
          that.goGetList('最新', 1);
        }
      } else {
        // 二级页
        if (tag == 'zuixin') {
          console.log('二级页')
          that.goGetList('最新', 1, 'all');
        } else if (tag == 'xinwen') {
          console.log('二级页')
          that.goGetList('新闻', 1, 'all');
        } else if (tag == 'gonggao') {
          console.log('二级页')
          that.goGetList('公告', 1, 'all');
        } else if (tag == 'gonglue') {
          console.log('二级页')
          that.goGetList('攻略', 1, 'all');
        } else if (tag == 'huodong') {
          console.log('二级页')
          that.goGetList('活动', 1, 'all');
        } else {
          console.log('文章页')
            // 三级页
          that.goGetByID(tag);
        }
      }

    },
    goGetList: function(str, num, rows) {
      var that = this;
      if (str == '最新') {
        that.more_href = 'list.html#' + 'zuixin';
        that.listName = '最新';
        that.zuixin = true;
        that.xinwen = false;
        that.gonggao = false;
        that.gonglue = false;
        that.huodong = false;
      } else if (str == '新闻') {
        that.more_href = 'list.html#' + 'xinwen';
        that.listName = '新闻';
        that.zuixin = false;
        that.xinwen = true;
        that.gonggao = false;
        that.gonglue = false;
        that.huodong = false;
      } else if (str == '公告') {
        that.more_href = 'list.html#' + 'gonggao';
        that.listName = '公告';
        that.zuixin = false;
        that.xinwen = false;
        that.gonggao = true;
        that.gonglue = false;
        that.huodong = false;
      } else if (str == '攻略') {
        that.more_href = 'list.html#' + 'gonglue';
        that.zuixin = false;
        that.xinwen = false;
        that.gonggao = false;
        that.gonglue = true;
        that.huodong = false;
        that.listName = '攻略';
      } else if (str == '活动') {
        that.more_href = 'list.html#' + 'huodong';
        that.listName = '活动';
        that.zuixin = false;
        that.xinwen = false;
        that.gonggao = false;
        that.gonglue = false;
        that.huodong = true;
      }

      var params = {};
      // 1: 获取推荐的文章
      // params.isRecommend = 1;
      // 2: 获取某个类型的所有文章
      params.categoryName = str;
      // 3: 分页 page 默认显示第1页
      // params.page = 1;
      params.page = num;
      // 4: 每页显示多少个 默认10个
      if (rows) {
        params.rows = 100;
      } else {
        params.rows = 5;
      }
      that.hoolaiCmsAPI.getList(params, function(result) {
        var listData = result.rows;
        listData.forEach(function(item) {
          item.updated = item.created.substr(0, 10);
          item.hrefVal = 'article.html#' + item.id;
        })
        that.listData = listData;
        console.log(that.listData);
      })
    },
    goGetByID: function(articleTag) {
      var that = this;
      console.log(articleTag);
      that.hoolaiCmsAPI.getById(articleTag, function(result) {
        console.log(result);
        that.article_title = result.data.title;
        // that.article_time = result.data.updated;
        that.article_content = result.data.content;
      }, 'json')
    },
    goBack: function() {
      window.history.back();
    },
    goGetXianRen: function(str) {
      var that = this;
      var params = {};
      params.categoryName = str;
      params.page = 1;
      params.rows = 100;
      that.hoolaiCmsAPI.getList(params, function(result) {
        var arr = result.rows;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].fields.job === '武仙') {
            arr[i].zhanshi = '';
            that.wuxianArr.push(arr[i]);
          } else if (arr[i].fields.job === '法仙') {
            arr[i].zhanshi = '';
            that.faxianArr.push(arr[i]);
          } else if (arr[i].fields.job === '医仙') {
            arr[i].zhanshi = '';
            that.yixianArr.push(arr[i]);
          } else if (arr[i].fields.job === '玄仙') {
            arr[i].zhanshi = '';
            that.xuanxianArr.push(arr[i]);
          }
        }
        that.wuxianArr[0].zhanshi = true;
        that.faxianArr[0].zhanshi = true;
        that.yixianArr[0].zhanshi = true;
        that.xuanxianArr[0].zhanshi = true;
        that.xianrenArr = that.wuxianArr;
        that.xianren = that.xianrenArr[0].fields;
        console.log(that.xianrenArr)
        console.log(that.xianren)
      })
    },
    changeXianrenArr: function(num) {
      var that = this;
      if (num == 1) {
        that.wxbg = './img/wuxian_act.png';
        that.fxbg = './img/faxian.png';
        that.yxbg = './img/yixian.png';
        that.xxbg = './img/xuanxian.png';
        that.xianrenArr = that.wuxianArr;
      } else if (num == 2) {
        that.wxbg = './img/wuxian.png';
        that.fxbg = './img/faxian_act.png';
        that.yxbg = './img/yixian.png';
        that.xxbg = './img/xuanxian.png';
        that.xianrenArr = that.faxianArr;
      } else if (num == 3) {
        that.wxbg = './img/wuxian.png';
        that.fxbg = './img/faxian.png';
        that.yxbg = './img/yixian_act.png';
        that.xxbg = './img/xuanxian.png';
        that.xianrenArr = that.yixianArr;
      } else if (num == 4) {
        that.wxbg = './img/wuxian.png';
        that.fxbg = './img/faxian.png';
        that.yxbg = './img/yixian.png';
        that.xxbg = './img/xuanxian_act.png';
        that.xianrenArr = that.xuanxianArr;
      }
      for (var i = 0; i < that.xianrenArr.length; i++) {
        that.xianrenArr[i].zhanshi = '';
      }
      this.xianrenArr[0].zhanshi = true;
      that.xianren = that.xianrenArr[0].fields;
    },
    changeXianren: function(index) {
      console.log(index)
      var that = this;
      this.xianren = this.xianrenArr[index].fields;
      for (var i = 0; i < that.xianrenArr.length; i++) {
        that.xianrenArr[i].zhanshi = '';
      }
      this.xianrenArr[index].zhanshi = true;
    },
    showDialog: function() {
      this.show_dialog = true;
    },
    closeDialog: function() {
      this.show_dialog = false;
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
      this.yqfsActivityAPI.sendMobileCode(data, function(result) {
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
          self.countdown = 60;
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

      this.yqfsActivityAPI.saveRecord(data, function(result) {
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
            self.show_dialog = false;
            return;
          }
          alert(result.msg);
        } else {
          alert("恭喜您成功预约！");
          self.getTotal();
          self.show_dialog = false;
        }
      })
    },
    getTotal: function() {
      var self = this
      this.yqfsActivityAPI.getTotal(function(result) {
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
  }
})