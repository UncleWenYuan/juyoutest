// pages/tixian/tixian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:-1,
    getNumber:0,

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
  input:function(e){
    this.setData({getNumber:e.detail.value})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var app = getApp();
    app.requestGet("https://juyou.17lhd.com/juyou/api/userWallet/currency").then(res => {
      that.setData({number:res.data})
      
      //请求成功，do something
    }).catch(res => {
    })

  },
  weixinInput:function(){
    var app = getApp();
    var param = {"currency":"","mode":"wechat"};
    
    var that = this;
    param.currency = that.data.getNumber;
    app.requestPost("https://juyou.17lhd.com/juyou/api/cashWithdrawal/submit?", param).then(res => {
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
    }).catch(res => {
      console.log(res);
    })

  },
  zhifubaoInput:function(){
    
    var app = getApp();
    var param = {"currency":"","mode":"alipay"};
    var that = this;
    param.currency = that.data.getNumber;
    app.requestPost("https://juyou.17lhd.com/juyou/api/cashWithdrawal/submit?", param).then(res => {
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
    }).catch(res => {
      console.log(res);
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