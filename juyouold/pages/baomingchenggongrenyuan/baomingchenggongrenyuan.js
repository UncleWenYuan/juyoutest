// pages/baomingchenggongrenyuan/baomingchenggongrenyuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    range:[
    ],
    userId:null,
    id:null,
    renwujinxingzhong:0,
    jieshubaoming:0,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    var that = this;
    let prevPage = pages[pages.length - 2];
    console.log(prevPage)
    that.setData({range:prevPage.data.registered,id:prevPage.data.id})
    if(prevPage.data.youxia=="任务进行中"&&(prevPage.data.huodong.requirement==null?0:prevPage.data.huodong.requirement.signInRange!=null)){
      var app = getApp();
      wx.setNavigationBarTitle({
        title: '到场人员确认',
      })
      that.setData({renwujinxingzhong:1})
     
      app.requestGet("https://juyou.17lhd.com/juyou/api/activitySignUp/bePresentList?", 'activityId='+that.data.id).then(res => {
        that.setData({range:res.data.list})
        console.log(res)
      }).catch(res => {
        
        console.log(res)
      })
      
      
      

    }
    else if(prevPage.data.youxia=="报名中"){
      that.setData({jieshubaoming:1})
     
      var app = getApp();
      app.requestGet("https://juyou.17lhd.com/juyou/api/activitySignUp/listOfMy?", 'activityId='+that.data.id).then(res => {
        that.setData({range:res.data.list})
        console.log(res)
      }).catch(res => {
        
        console.log(res)
      })


    }

    else{
      var app = getApp();
      app.requestGet("https://juyou.17lhd.com/juyou/api/activitySignUp/userInfoList?", 'activityId='+that.data.id).then(res => {
        that.setData({range:res.data.list})
        console.log(res)
      }).catch(res => {
        
        console.log(res)
      })
    }
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  tapqueren:function (e) {
    var app = getApp();
    var param = {"id":""};
    var that = this;
    console.log(e)
    param.id=e.currentTarget.dataset.id;
    app.requestPost("https://juyou.17lhd.com/juyou/api/activitySignUp/confirmBePresent?", param).then(res => {
      console.log(res)
      setTimeout(() => { 
        app.requestGet("https://juyou.17lhd.com/juyou/api/activitySignUp/bePresentList?", 'activityId='+that.data.id).then(res => {
        that.setData({range:res.data.list})
        console.log(res)
        
      }, 1000);
     
      }).catch(res => {
        
        console.log(res)
      })
    }).catch(res => {
      console.log(res);
    })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  gerenziliao:function(e){
    console.log(e)
this.data.userId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/zhangzhenming2/zhangzhenming2',
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

  },
  tongguo:function(e){

      var app = getApp();
  var param = {"id":""};
  param.id = e.currentTarget.dataset.id;
  
  app.requestPost("https://juyou.17lhd.com/juyou/api/activitySignUp/auditPass?", param).then(res => {
    wx.showToast({
      title: res.msg,
      icon:'none'
    })
  }).catch(res => {
    console.log(res);
  })
  this.onLoad();

  },
  jujue:function(e){
    var app = getApp();
    var param = {"id":""};
    param.id = e.currentTarget.dataset.id;
    
    app.requestPost("https://juyou.17lhd.com/juyou/api/activitySignUp/auditReject?", param).then(res => {
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
    }).catch(res => {
      console.log(res);
    })
    
  this.onLoad();
    
  }
})