// pages/renwu/renwu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canshorttap:1,
    currentTab: 0,
    baomingzhongList:[],
    jinxingzhongList:[],
    tijiaozhongList:[],
    yiwanchengList:[],
    baomingzhongList2:[],
    jinxingzhongList2:[],
    tijiaozhongList2:[],
    yiwanchengList2:[],
    swiperHeight:1400,
    range:[{"name":"我参与的任务"},{"name":"我发布的任务"}],
    index1:0,

  },
  tap: function (event) {
if(this.data.canshorttap==1){
    // const number = event.target.id;//1或者2得到点击了按钮1或者按钮2 

    const url = "/pages/yuelao/yuelao?";//得到页面url 

    wx.navigateTo({
      url: url+"id="+event.currentTarget.dataset.id

    })
  }
  },
  swichNav: function (e) {

     console.log(e);
    var that =this;
    this.setData({currentTab:e.target.dataset.current})
    // console.log(that.data.swiperHeight)

    this.updateHeight();

  
  },
  updateHeight:function(){
    var that =  this;
    if(that.data.index1==0){
      switch (that.data.currentTab) {
        case 0:
          if(that.data.baomingzhongList.length>=3)
          that.setData({swiperHeight:that.data.baomingzhongList.length*400})
          else
          that.setData({swiperHeight:2*400})
          break;
          case 1:
          if(that.data.jinxingzhongList.length>=3)
          that.setData({swiperHeight:that.data.jinxingzhongList.length*400})
          else
          that.setData({swiperHeight:2*400})
          
          break;
          case 2:
            if(that.data.tijiaozhongList.length>=3)
          that.setData({swiperHeight:that.data.tijiaozhongList.length*400})
          else
          that.setData({swiperHeight:2*400})
          
          break;
          case 3:
            if(that.data.yiwanchengList.length>=3)
            that.setData({swiperHeight:that.data.yiwanchengList.length*400})
          else
          that.setData({swiperHeight:2*400})
          
          
          break;
      
        default:
          break;
      }
    }else{
      switch (that.data.currentTab) {
        case 0:
          if(that.data.baomingzhongList2.length>=3)
          that.setData({swiperHeight:that.data.baomingzhongList2.length*400})
          else
          that.setData({swiperHeight:2*400})
          break;
          case 1:
          if(that.data.jinxingzhongList2.length>=3)
          that.setData({swiperHeight:that.data.jinxingzhongList2.length*400})
          else
          that.setData({swiperHeight:2*400})
          
          break;
          case 2:
            if(that.data.tijiaozhongList2.length>=3)
          that.setData({swiperHeight:that.data.tijiaozhongList2.length*400})
          else
          that.setData({swiperHeight:2*400})
          
          break;
          case 3:
            if(that.data.yiwanchengList2.length>=3)
            that.setData({swiperHeight:that.data.yiwanchengList2.length*400})
          else
          that.setData({swiperHeight:2*400})
          
          
          break;
      
        default:
          break;
      }
    }


  },

  stopTouchMove: function() {
    return false;
  },

  canyulongtap:function(event){
    
    var that = this;
    that.setData({canshorttap:0})
    wx.showModal({
      title: '提示',
      content: '确认要取消报名?',
      success: function (res) {
        
        that.setData({canshorttap:1})
        if (res.confirm) {
          console.log('用户点击确定')

          var app = getApp();
          var param = {"activityId":""};
          param.activityId = event.currentTarget.dataset.id;
          console.log(param)
          
          app.requestPost("https://juyou.17lhd.com/juyou/api/activitySignUp/cancel?", param).then(res => {
            wx.showToast({
              title: res.msg,
              icon:'none'
            })
            that.onShow();
          }).catch(res => {
            console.log(res);
          })
  
  
        } else if (res.cancel) {
          console.log('用户点击取消')

          
        }
      }
    })
  },

  fabulongtap:function(event){
    
    var that = this;
    that.setData({canshorttap:0})
    wx.showModal({
      title: '提示',
      content: '确认要取消此活动?',
      success: function (res) {
        
        that.setData({canshorttap:1}) 
        if (res.confirm) {
          console.log('用户点击确定')

          var app = getApp();
          var param = {"id":""};
          param.id = event.currentTarget.dataset.id;
          console.log(param)
          
          app.requestPost("https://juyou.17lhd.com/juyou/api/activity/cancel?", param).then(res => {
            wx.showToast({
              title: res.msg,
              icon:'none'
            })
            that.onShow();
          }).catch(res => {
            console.log(res);
          })
  
  
        } else if (res.cancel) {
          console.log('用户点击取消')

          
        }
      }
    })
  },

  swiperChange: function (e) {

    // console.log(e);
    var that  =this;
    this.setData({
  
      currentTab: e.detail.current,

    })
    
    this.updateHeight();
  
     


  },
  bindPickerChange1: function (e) {
    var that = this;
 
    this.setData({
      index1:e.detail.value,
      currentTab:0,
    })
    this.updateHeight();
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var app = getApp();
    var that =this;
    this.onLoad();

    if(this.data.index1==0){
      switch (that.data.currentTab) {
        case 0:
          that.setData({swiperHeight:that.data.baomingzhongList.length*400})
          break;
          case 1:
          that.setData({swiperHeight:that.data.jinxingzhongList.length*400})
          
          break;
          case 2:
          that.setData({swiperHeight:that.data.tijiaozhongList.length*400})
          
          break;
          case 3:
          that.setData({swiperHeight:that.data.yiwanchengList.length*400})
          
          break;
      
        default:
          break;
      }
    }else{
      switch (that.data.currentTab) {
        case 0:
          that.setData({swiperHeight:that.data.baomingzhongList2.length*400})
          break;
          case 1:
          that.setData({swiperHeight:that.data.jinxingzhongList2.length*400})
          
          break;
          case 2:
          that.setData({swiperHeight:that.data.tijiaozhongList2.length*400})
          
          break;
          case 3:
          that.setData({swiperHeight:that.data.yiwanchengList2.length*400})
          
          break;
      
        default:
          break;
      }
    }
    
    this.updateHeight();


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
    var app = getApp();
    var that =this;


    
    app.requestGet("https://juyou.17lhd.com/juyou/api/activity/joinInSignUp?pageNum=1").then(res => {
      that.setData({baomingzhongList:res.data.list})
      console.log(that.data.baomingzhongList)
    }).catch(res => {
    })
    app.requestGet("https://juyou.17lhd.com/juyou/api/activity/joinInProgress?pageNum=1").then(res => {
      that.setData({jinxingzhongList:res.data.list})
    }).catch(res => {
    })
    app.requestGet("https://juyou.17lhd.com/juyou/api/activity/joinInSubmit?pageNum=1").then(res => {
      that.setData({tijiaozhongList:res.data.list})
    }).catch(res => {
    })
    app.requestGet("https://juyou.17lhd.com/juyou/api/activity/joinCompleted?pageNum=1").then(res => {
      that.setData({yiwanchengList:res.data.list})
    }).catch(res => {
    })
    app.requestGet("https://juyou.17lhd.com/juyou/api/activity/myInAudit?pageNum=1").then(res => {
      that.setData({baomingzhongList2:res.data.list})
      console.log(res.data.list)
    }).catch(res => {
    })
    app.requestGet("https://juyou.17lhd.com/juyou/api/activity/myInSignUp?pageNum=1").then(res => {
      that.setData({jinxingzhongList2:res.data.list})
    }).catch(res => {
    })
    app.requestGet("https://juyou.17lhd.com/juyou/api/activity/myInProgress?pageNum=1").then(res => {
      that.setData({tijiaozhongList2:res.data.list})
    }).catch(res => {
    })
    app.requestGet("https://juyou.17lhd.com/juyou/api/activity/myCompleted?pageNum=1").then(res => {
      that.setData({yiwanchengList2:res.data.list})
      console.log(res.data.list)
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