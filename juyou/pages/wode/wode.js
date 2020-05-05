// pages/wode/wode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:0,
    isNan: 0,
    isRenzheng: 0,
    isGerenrenzheng: 0,
    isQiyerenzheng: 0,
    touxiangUrl:"",
    userInfo:null,
  },
  shimingTap: function (event) {

    // const number = event.target.id;//1或者2得到点击了按钮1或者按钮2 
    if(getApp().globalData.shimingrenzheng=="awaiting_audit"){
      wx.navigateTo({
        url: '/pages/shimingrenzheng1/shimingrenzheng1',
      })
    }
    else if(getApp().globalData.shimingrenzheng=="audit_reject"){
wx.navigateTo({
  url: '/pages/shimingrenzheng2/shimingrenzheng2',
})
    }
    else if(getApp().globalData.shimingrenzheng=="audit_pass"){
      wx.navigateTo({
        url: '/pages/shimingrenzheng3/shimingrenzheng3',
      })
    }
    else{
    const url = "/pages/shimingrenzheng/shimingrenzheng";//得到页面url 

    wx.navigateTo({

      url: url,

    })
    }
  },
  qiyeTap: function (event) {

    // const number = event.target.id;//1或者2得到点击了按钮1或者按钮2 
    if(0){
    const url = "/pages/renzhengxiangqing/renzhengxiangqing";//得到页面url 

    wx.navigateTo({

      url: url,

    })
  }else{
    wx.navigateTo({
      url: '/pages/qiyerenzheng/qiyerenzheng',
    })
  }

  },
  wodeTap: function (event) {

    // const number = event.target.id;//1或者2得到点击了按钮1或者按钮2 

    const url = "/pages/wodeqianbao/wodeqianbao";//得到页面url 

    wx.navigateTo({

      url: url,

    })
  },
  bianjiziliao:function(){
    wx.navigateTo({
      url: '/pages/zhangzhenming/zhangzhenming',
    })
  },
  zhangdanTap: function (event) {

    // const number = event.target.id;//1或者2得到点击了按钮1或者按钮2 

    const url = "/pages/zhangdanmingxi/zhangdanmingxi";//得到页面url 

    wx.navigateTo({

      url: url,

    })
  },
  tixianTap: function (event) {

    // const number = event.target.id;//1或者2得到点击了按钮1或者按钮2 

    const url = "/pages/tixian/tixian";//得到页面url 

    wx.navigateTo({

      url: url,

    })
  },
  renwuTap: function (event) {

    // const number = event.target.id;//1或者2得到点击了按钮1或者按钮2 

    const url = "/pages/renwushensu/renwushensu";//得到页面url 

    wx.navigateTo({

      url: url,

    })
  },
  lianxiTap: function (event) {

    // const number = event.target.id;//1或者2得到点击了按钮1或者按钮2 

    const url = "/pages/lianxikefu/lianxikefu";//得到页面url 

    wx.navigateTo({

      url: url,

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
    var that = this;
    var app = getApp();
    
    
    if(app.globalData.qiyerenzheng=="audit_pass"){
      that.setData({isQiyerenzheng:1})
    }
    else{
      that.setData({isQiyerenzheng:0})
    }
    
    
    if(app.globalData.shimingrenzheng=="audit_pass"){
      that.setData({isRenzheng:1,isGerenrenzheng:1})
    }
    else{
      that.setData({isRenzheng:0,isGerenrenzheng:0})
    }
    
        app.requestGet("https://www.oldageshore.com/juyou/api/userWallet/currency").then(res => {
      that.setData({number:res.data})
      
      //请求成功，do something
    }).catch(res => {
    })

        app.requestGet("https://www.oldageshore.com/juyou/api/userInfo/homePage?", "targetUserId=" + app.globalData.userId).then(res => {//1001换成app.globalData.userId
          console.log(res)
          that.setData({userInfo:res.data,touxiangUrl:res.data.userInfo.avatarImageUrl})
          
          
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