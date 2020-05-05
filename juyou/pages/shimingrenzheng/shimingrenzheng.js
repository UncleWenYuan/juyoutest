// pages/shimingrenzheng/shimingrenzheng.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    on1: 0,
    date1: '2016-09-01',
    tupian1:'/images/tupianwei.png',
    tupian2:'/images/tupianwei.png',
    xingming:'',
    dianhua:'',
    shenfenzheng:'',
    zhifubao:'',
    imageId1:'',
    imageId2:'',
    onxingming:0,
    ondianhua:0,
    onriqi:0,
    onshenfenzheng:0,
    onzhengmian:0,
    onfanmian:0,
    onweixin:0,
    onzhifubao:0,
    postParam:{"alipay":"" ,"birthDateTimestamp":"" , "fullName":"" , "idCardFrontImageId":"" , "idCardNumber":"" , "idCardReverseImageId":"" , "phoneNumber":"" , "wechat":""}
  },

  bindDateChange1: function (e) {
    this.data.onriqi=1;
    this.setData({
      date1: e.detail.value,
      on1: 1
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
  tap1:function(){
    var that=this;
    wx.chooseImage({
      complete: (res) => {

      },
      count: 1,
      fail: (res) => {},
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
   sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: (result) => {
        
        
        that.data.onzhengmian=1;
          that.setData({tupian1:result.tempFilePaths[0]})
          
        
      },
    })
  },
  tap2:function(){
    var that=this;
    wx.chooseImage({
      complete: (res) => {

      },
      count: 1,
      fail: (res) => {},
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
   sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: (result) => {
        that.data.onfanmian=1;
        
          that.setData({tupian2:result.tempFilePaths[0]})
          
        
      },

    })
  },
  xingming:function(e){
    this.data.xingming=e.detail.value;
    this.data.onxingming=1;
  },
  dianhua:function(e){
    this.data.dianhua=e.detail.value;
    
    this.data.ondianhua=1;
  },
      
  shenfenzheng:function(e){
    this.data.shenfenzheng=e.detail.value;
    
    this.data.onshenfenzheng=1;
  },
  weixin:function(e){
    this.data.weixin=e.detail.value;
    
    this.data.onweixin=1;
  },
  zhifubao:function(e){
    this.data.zhifubao=e.detail.value;
    
    this.data.onzhifubao=1;
  },
                 
  baocun:function(){
    var that =this;
    if(that.data.onxingming==1&&that.data.ondianhua==1&&that.data.onriqi==1&&that.data.onshenfenzheng==1&&that.data.onzhengmian==1&&that.data.onfanmian==1&&(that.data.onweixin==1||that.data.onzhifubao==1)){
    wx.uploadFile({
      filePath: that.data.tupian1,
      header: {
        
        "Token":getApp().globalData.token
      },
      name: 'image',
      url: 'https://www.oldageshore.com/juyou/api/image/upload',
      success:function(e){
        console.log(e.data)
        that.data.imageId1  = JSON.parse(e.data).data

        wx.uploadFile({
          filePath: that.data.tupian2,
          header: {
            
            "Token":getApp().globalData.token
          },
          name: 'image',
          url: 'https://www.oldageshore.com/juyou/api/image/upload',
          success:function(e){
            console.log(e.data)
            that.data.imageId2  = JSON.parse(e.data).data
            that.data.postParam.alipay = that.data.zhifubao;
            var repTime = that.data.date1.replace(/-/g, '/');
            var timeTamp = Date.parse(repTime) ;
            that.data.postParam.birthDateTimestamp  = timeTamp;
            that.data.postParam.fullName  = that.data.xingming;
            that.data.postParam.idCardFrontImageId  = that.data.imageId1;
            that.data.postParam.idCardNumber  = that.data.shenfenzheng;
            that.data.postParam.idCardReverseImageId  = that.data.imageId2;
            that.data.postParam.phoneNumber  = that.data.dianhua;
            that.data.postParam.wechat  = that.data.weixin;
            var app = getApp();
            console.log(that.data.postParam)
          app.requestPost("https://www.oldageshore.com/juyou/api/realNameAuthentication/apply?", that.data.postParam).then(res => {
            
            console.log(res);
            //请求成功，do something
            if(res.code==1){
            wx.navigateTo({
              url: '/pages/shimingrenzheng1/shimingrenzheng1',
            })
          }
            else{
              wx.showToast({
                title: res.msg,
                icon:"none"
              })
            }
          }
          ).catch(res => {
            console.log("fail");
          })

          }
        })
      }
    })
  }else{
    wx.showToast({
      title: '请填写完成',
      icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
      duration: 2000     
    }) 
  }
    
    
  }
    
})