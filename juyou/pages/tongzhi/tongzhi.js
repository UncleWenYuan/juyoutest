// pages/tongzhi/tongzhi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    range: [
    ],
    number:0,
    swiperHeight:300,
    range2:[],
  },
  xitongxiaoxi: function (event) {

    // const number = event.target.id;//1或者2得到点击了按钮1或者按钮2 

    const url = "/pages/xitongxiaoxi/xitongxiaoxi";//得到页面url 

    wx.navigateTo({

      url: url,

    })
  },
  
  swichNav: function (e) {

    console.log(e);

    var that = this;

    switch (e.detail.current) {
      case 0:
        that.setData({swiperHeight:that.data.range2.length*220})
        break;
        case 1:
        that.setData({swiperHeight:that.data.range.length*220})
        
        break;
    }
    if (this.data.currentTab === e.target.dataset.current) {

      return false;

    } else {

      that.setData({

        currentTab: e.target.dataset.current,

      })

    }

  },

  swiperChange: function (e) {

    console.log(e);
var that =this;
    switch (e.detail.current) {
      case 0:
        that.setData({swiperHeight:that.data.range2.length*220})
        break;
        case 1:
        that.setData({swiperHeight:that.data.range.length*220})
        
        break;
    }
    this.setData({

      currentTab: e.detail.current,

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

      //使用方法最多三个param
  var app = getApp();
  var that = this;

 
  
  console.log(that.data.range)
  app.requestGet("https://www.oldageshore.com/juyou/api/notice/activityCommentReplyMeList?").then(res => {
    that.setData({range:res.data.list})
    console.log(that.data.range)
  }).catch(res => {
  })
  app.requestGet("https://www.oldageshore.com/juyou/api/notice/activityMessageList?").then(res => {
    that.setData({range2:res.data.list,swiperHeight:res.data.list.length*220})
    console.log(that.data.range2)
  }).catch(res => {
  })
  app.requestGet("https://www.oldageshore.com/juyou/api/notice/unreadSystemMessageCount").then(res => {
    that.setData({number:res.data})
  }).catch(res => {
  })

  app.requestGet("https://www.oldageshore.com/juyou/api/notice/unreadSystemMessageCount").then(res => {
        if(res.data>0){
          wx.showTabBarRedDot({
            index: 2,
          })

        }else{
          wx.hideTabBarRedDot({
            index: 2,
          })
        }
      }).catch(res => {
      })

      switch (that.data.currentTab) {
        case 0:
          that.setData({swiperHeight:that.data.range2.length*220})
          break;
          case 1:
          that.setData({swiperHeight:that.data.range.length*220})
          
          break;
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tiaozhuan:function (e) {
    wx.navigateTo({
      url:  "/pages/yuelao/yuelao?id="+e.currentTarget.dataset.id
    })
  }
})