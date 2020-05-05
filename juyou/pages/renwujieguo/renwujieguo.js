// pages/renwujieguo/renwujieguo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    range: [
      
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
  yulan:function(e) {
    wx.previewImage({
      urls:  e.currentTarget.dataset.list,   //预览的图片url数组
      current: e.currentTarget.dataset.url,  //当前的url
    })  
  },
  /**
   * 生命周期函数--监听页面显示
   */


  onShow: function () {

     var app = getApp();
     let pages = getCurrentPages();
    var that = this;
    let prevPage = pages[pages.length - 2];
    console.log(prevPage)
  app.requestGet("https://www.oldageshore.com/juyou/api/activityResult/list?", 'activityId='+prevPage.data.id).then(res => {
    console.log(res)
    that.setData({range:res.data.list})
    //请求成功，do something
  }).catch(res => {
  })

  },

  jixu:function(){


    wx.showModal({
      title: '提示',
      content: '确认审核完所有参与人结果，只发放审核通过人员友币，其余全部退回吗？',
      success: function(res) {
         if (res.confirm) { var app = getApp();
          let pages = getCurrentPages();
         var that = this;
         let prevPage = pages[pages.length - 2];
         console.log(prevPage)

          var app = getApp();
  var param = {"activityId":""};
  param.activityId = parseInt(prevPage.data.id);
  console.log(param)
  app.requestPost("https://www.oldageshore.com/juyou/api/activitySettlement/submit?", param).then(res => {
  
    console.log(res);  
  wx.showToast({
      title: res.msg,
      icon:'none',
      success:function(){
        setTimeout(function() {
          //请求成功，do something
          console.log(res);
          wx.switchTab({
            url: '/pages/renwu/renwu',
          })
        }, 1000);
      }
    })
  }).catch(res => {
    console.log(res);
  })
         } else if (res.cancel) {
            console.log('用户点击取消')
         }
      }
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
  hege:function(e){
     var app = getApp();
  var param = {"id":""};
  param.id = e.currentTarget.dataset.id;

   wx.showModal({
  title: '提示',
  content: '确认合格?',
  success: function (res) {
   if (res.confirm) {
    console.log('用户点击确定')
    app.requestPost("https://www.oldageshore.com/juyou/api/activityResult/auditQualified?", param).then(res => {
    wx.showToast({
      title: res.msg,
      icon:'none'
    })
  }).catch(res => {
    console.log(res);
  })
   } else if (res.cancel) {
    console.log('用户点击取消')
   }
  }
 })
  
  

  },
  buhege:function(e){
    var app = getApp();
 var param = {"id":""};
 param.id = e.currentTarget.dataset.id;


 wx.showModal({
  title: '提示',
  content: '确认不合格?',
  success: function (res) {
   if (res.confirm) {
    console.log('用户点击确定')
    console.log(e.currentTarget.dataset.id)
    app.requestPost("https://www.oldageshore.com/juyou/api/activityResult/auditUnqualified?", param).then(res => {
      console.log(res)
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
    }).catch(res => {
      console.log(res);
    })
   } else if (res.cancel) {
    console.log('用户点击取消')
   }
  }
 })
 


 },

})