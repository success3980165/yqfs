Vue.dev = true
new Vue({
  el: '#app',
  data: {
    dialog: false,
    cover2: false,
    hoolaiCmsAPI: new hoolaiCmsAPI(21, false),
    listData: [],
    listName: '',
    more_href: '',
    shouye: true,
    zuixin: true,
    xinwen: false,
    gonggao: false,
    gonglue: false,
    huodong: false,
    article_title: '',
    article_time: '',
    article_content: '',
    jueseArr: [],
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
    popYuyueShow: false,
    telephone: '',
    code: '',
    countdown: 60,
    isGrayBg: false,
    smsCodeVal: '获取验证码',
    isDisabled: false,
    isAndroidActive: false,
    isiOSActive: true,
    iosOrAndroid: 'ios',
    yqfsActivityAPI: new hoolaiActivityAPI(23, true),
    totalNum: 0,
    yuyue: false
  },
  created: function() {
    this.initData();
    this.getTotal();
  },
  methods: {
    dialogOpen: function() {
      this.cover2 = true;
      this.dialog = true;
    },
    dialogClose: function() {
      this.cover2 = false;
      this.dialog = false;
    },
    initData: function() {
      var that = this;
      var tag = window.location.hash.substr(1);
      var locationHrefArr = window.location.href.split("#");

      if (locationHrefArr.length == 1) { //首页

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
        that.shouye = false;
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
      })
    },
    goGetByID: function(articleTag) {
      var that = this;
      console.log(articleTag);
      that.hoolaiCmsAPI.getById(articleTag, function(result) {
        console.log(result);
        that.article_title = result.data.title;
        that.article_time = result.data.updated;
        that.article_content = result.data.content;
      }, 'json')
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
    getTotal: function() {
      var self = this;
      this.yqfsActivityAPI.getTotal(function(result) {
        if (result.ret != 1) {
          alert(result.msg);
        } else {
          self.totalNum = result.total;
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
    }
  }
})