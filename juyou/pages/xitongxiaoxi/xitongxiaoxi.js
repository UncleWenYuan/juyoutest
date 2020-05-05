// pages/xitongxiaoxi/xitongxiaoxi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    range:[],
  
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
      var app = getApp();
      var that = this;
  app.requestGet("https://www.oldageshore.com/juyou/api/notice/systemMessageList?").then(res => {
    console.log(res.data.list)
    that.setData({range:res.data.list})
    //请求成功，do something
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

  }
})