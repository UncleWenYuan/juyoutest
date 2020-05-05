// pages/zhangzhenming/zhangzhenming.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    userInfo:null,
    mername:"张真铭",
    xingbie:true,
    color:"#FFFFFF",
    wenzi:"编辑资料",

    
  },
bianjiziliao:function(){
  wx:wx.navigateTo({
    url: '/pages/bianjiziliao/bianjiziliao',
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
},
juzhudi:function(){
  wx: wx.navigateTo({
    url: '/pages/tianjiajuzhudi/tianjiajuzhudi',
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { },
  })
  },
  aihao: function () {
    wx: wx.navigateTo({
      url: '/pages/xuanzeaihao/xuanzeaihao',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })},
  techang: function () {
    wx: wx.navigateTo({
      url: '/pages/xuanzetechang/xuanzetechang',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    }) },
  zhiye: function () {
    wx: wx.navigateTo({
      url: '/pages/zhiye/zhiye',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })},
  jiaoyu: function () {
    wx: wx.navigateTo({
      url: '/pages/jiaoyu/jiaoyu',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })},
  qunzi: function () {
    wx: wx.navigateTo({
      url: '/pages/qunti/qunti',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })},

    tap:function(){
      wx.switchTab({
        url: '/pages/wode/wode',
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
onShow: function (options) {
    var that = this;
var app = getApp();

    var app = getApp();
    app.requestGet("https://juyou.17lhd.com/juyou/api/userInfo/homePage?", "targetUserId=" + app.globalData.userId).then(res => {//1001换成app.globalData.userId
      
      that.setData({userInfo:res.data})
      console.log(res.data);
      wx.setNavigationBarTitle({
        title:that.data.userInfo.userInfo.nickName//页面标题为路由参数
      })
  }).catch(res => {
  })
    
    
    
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#28A9FA'
    })
  
  },

  qunti: function (event) {

    // const number = event.target.id;//1或者2得到点击了按钮1或者按钮2 

    const url = "/pages/qunti/qunti";//得到页面url 

    wx.navigateTo({

      url: url,

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
   
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
    wx.switchTab({
      url: '/pages/wode/wode',
    })

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