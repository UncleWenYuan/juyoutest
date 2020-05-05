// pages/sousuo/sousuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lishijilu: [],
    inputValue:"",
    searchValue:"",
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.setData({lishijilu:wx.getStorageSync("searchRecord")})
  
  },
  taplaji:function(){
    this.setData({lishijilu:[]})
    wx.setStorageSync('searchRecord', this.data.lishijilu)
  },
  quxiaoTap:function(){

    this.setData({
      searchValue:"",
      inputValue:""
      
     })
  },
  
  tap:function(e){
    this.setData({inputValue:e.currentTarget.dataset.name})  
       wx.navigateTo({
       url: '../sousuojieguo/sousuojieguo'
     })
  },
  bindInput: function (e) {
    var that = this;
    if(0){
      wx.showToast({
        title: '关键词不能为空',
        icon:"none",
      })
    }else{
    
    this.setData({
      inputValue: e.detail.value
     })
    //  wx.setStorageSync('searchRecord', Array.from(new Set(searchRecord)));
    //  wx.getStorageSync('searchRecord')
    
    
    
     wx.navigateTo({
       url: '/pages/sousuojieguo/sousuojieguo',
       complete: (res) => {},
       fail: (res) => {},
       success: (result) => {},
     })
    }
  
  },
  bindBlur:function(e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  tapFunction: function (e) {
    // this.setData({
    //   inputValue: e.detail.value
    // })

    if(0){
      wx.showToast({
        title: '关键词不能为空',
        icon:'none',
      })
    }else{

      wx.navigateTo({
        url: '../gengduosousuo/gengduosousuo'
      })
    }
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})