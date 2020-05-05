// pages/gengduosousuo/gengduosousuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shejiao: "全部",

    zhiyuan: "全部",

    xuanchuan: "全部",

    guanjianzi:"",

    xuanchuanId:"",
    zhiyuanId:"",
    shejiaoId:"",
  },

  tapFunction1: function (e) {
    // this.setData({
    //   inputValue: e.detail.value
    // })

    wx.navigateTo({
      url: '../zhiyuanzhaomu1/zhiyuanzhaomu1'
    })
  },
  tapFunction2: function (e) {
    // this.setData({
    //   inputValue: e.detail.value
    // })

    wx.navigateTo({
      url: '../zhiyuanzhaomu2/zhiyuanzhaomu2'
    })
  },
  tapFunction3: function (e) {
    // this.setData({
    //   inputValue: e.detail.value
    // })

    wx.navigateTo({
      url: '../zhiyuanzhaomu3/zhiyuanzhaomu3'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("123312")

    let pages = getCurrentPages();
    var that = this;
    let prevPage = pages[pages.length - 2];
    console.log(prevPage)

    if (prevPage.route == "pages/sousuo/sousuo") {
      that.data.guanjianzi = prevPage.data.inputValue
    }
    console.log(that.data.guanjianzi)

    if (wx.getStorageSync('shejiaoName')!=null) {
      var temp = wx.getStorageSync('shejiaoName');
      var tempStr = '';
      for (let index = 0; index < temp.length; index++) {
        tempStr+=temp[index]+"  ";
      }
      
      this.setData({
        shejiao:tempStr,
        shejiaoId: wx.getStorageSync('shejiaoID')
      })
    }
    if (wx.getStorageSync('zhiyuanName')!=null) {
      var temp = wx.getStorageSync('zhiyuanName');
      var tempStr = '';
      for (let index = 0; index < temp.length; index++) {
        tempStr+=temp[index]+"  ";
      }
      
      this.setData({
        zhiyuan:tempStr,
        zhiyuanId: wx.getStorageSync('zhiyuanID')
      })
    }
    if (wx.getStorageSync('xuanchuanName')!=null) {
      var temp = wx.getStorageSync('xuanchuanName');
      var tempStr = '';
      for (let index = 0; index < temp.length; index++) {
        tempStr+=temp[index]+"  ";
      }
      
      this.setData({
        xuanchuan:tempStr,
        xuanchuanId: wx.getStorageSync('xuanchuanID')
      })
    }
    
    },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  sousuotap:function(){

    wx.setStorageSync("xuanchuanName", null);
    wx.setStorageSync("xuanchuanID", null);
    wx.setStorageSync("zhiyuanName", null);
    wx.setStorageSync("zhiyuanID", null);
    wx.setStorageSync("shejiaoName", null);
    wx.setStorageSync("shejiaoID", null);

    // this.data.xuanchuan = "全部";

    // this.data.shejiao = "全部";
    
    // this.data.zhiyuan = "全部";

    wx.navigateTo({
      url: '/pages/sousuojieguo/sousuojieguo',
    })
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})