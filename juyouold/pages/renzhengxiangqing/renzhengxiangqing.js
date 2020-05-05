// pages/renzhengxiangqing/renzhengxiangqing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:"已认证",
    range:null,
    isPicker:[0,0,0],

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
    app.requestGet("https://juyou.17lhd.com/juyou/api/enterpriseCertification/applyList?pageNum=1").then(res => {
      console.log(res)
      that.setData({range:res.data})
      for (let index = 0; index < res.data.length; index++) {
        if(res.data[index].whetherDefault==true)
        var temp2 = that.data.isPicker;
        temp2[index]=1;
        that.setData({isPicker:temp2})
        
      }
      
      //请求成功，do something
    }).catch(res => {
    })

  },
  xiugai:function(e){
    if(e.currentTarget.dataset.state=="awaiting_audit"||e.currentTarget.dataset.state=="audit_reject"){
    console.log(e)
      wx.navigateTo({
        url: '/pages/qiyexiugai/qiyexiugai?id='+e.currentTarget.dataset.id,
      })}
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
  baocun:function(){
    wx.switchTab({
      url: '/pages/wode/wode',
    })
  },

  tap:function(e){
    console.log(e)
    if(e.currentTarget.dataset.state=="audit_pass"){
      var temp = this.data.isPicker;
      if(temp[e.currentTarget.dataset.index]==0){
        temp[e.currentTarget.dataset.index]=1;
      }
      else if(temp[e.currentTarget.dataset.index]==1){
        temp[e.currentTarget.dataset.index]=0;}
      this.setData({isPicker:temp})
    }
    
    console.log(this.data.isPicker)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})