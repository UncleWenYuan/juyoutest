// pages/tongzhi/tongzhi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickIndex:-1,
    number:-1,
    payment:null,
    range: [
      { "id": "100 友币", "money": "￥12.00", "currency": "￥12.00" },
      {  "id": "100 友币", "money": "￥12.00", "currency": "￥12.00" },
      { "id": "100 友币", "money": "￥12.00", "currency": "￥12.00"  },
      {  "id": "100 友币", "money": "￥12.00", "currency": "￥12.00" },
      { "id": "100 友币", "money": "￥12.00", "currency": "￥12.00"  },

    ],
    
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

     app.requestGet("https://www.oldageshore.com/juyou/api/userWallet/currency").then(res => {
      that.setData({number:res.data})
      
      //请求成功，do something
    }).catch(res => {
    })
    app.requestGet("https://www.oldageshore.com/juyou/api/rechargePosition/list").then(res => {
      that.setData({range:res.data})
      
      //请求成功，do something
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

  },
  tap1:function(e){
    var that = this;
    that.setData({pickIndex:e.currentTarget.dataset.index});
  },
  
    zhifu:function(){

      var that = this;
      var app = getApp();
      var param = {"positionId":""};
      param.positionId = this.data.pickIndex;
      app.requestPost("https://www.oldageshore.com/juyou/api/recharge/weiXinPay?", param).then(res => {
        that.setData({payment:res.data})


        
        wx.requestPayment(
          {
          'timeStamp': that.data.payment.timeStamp,
          'nonceStr': that.data.payment.nonceStr,
          'package': that.data.payment.packageStr,
          'signType': that.data.payment.signType,
          'paySign': that.data.payment.paySign,
          'success':function(res){
            
            wx.navigateBack({
              complete: (res) => {},
            })
          },
          'fail':function(res){},
          'complete':function(res){}
          })


      }).catch(res => {
        console.log(res);
      })
      
    }
  
})