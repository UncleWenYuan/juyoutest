// pages/bianjiziliao/bianjiziliao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMale:1,
    date1:"点击选择",
    on1:1,
    xingming:"",
    zhifubao:"",
    weixin:"",
    userInfo:null,
    touxiangUrl:"",
    postParam:null,
    imageId1:null,
    onzhengmian:0,
    postParam:{"wechat":"","alipay":"","avatarImageId":"","birthDateTimestamp":"","gender":"","nickName ":""},
    nicheng:"",
    zhifubaohao:"",
    weixinhao:"",

  },
  xingming:function(e){
    this.data.xingming=e.detail.value;
  },
 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  var app = getApp();
  var that = this;
  app.requestGet("https://juyou.17lhd.com/juyou/api/userInfo/get").then(res => {
    that.setData({userInfo:res.data,touxiangUrl:res.data.avatarImageUrl,isMale:((res.data.gender-1)==0),xingming:res.data.nickName})//zhifubao weixinhao ++

    var temp  = res.data.birthDate.substring(0,10)
    that.setData({date1:temp})
    console.log(res.data)

    //请求成功，do something
  }).catch(res => {
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
  onShow: function () {

  },
  nv:function(){
    this.setData({isMale:0})
  },
  nan:function(){
    this.setData({isMale:1})
  },
  bindDateChange1: function(e){

    this.setData({ date1: e.detail.value,  on1:1,
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
  touxiang:function(){
    var that = this;
    wx.chooseImage({
      complete: (res) => {

      },
      count: 1,
      fail: (res) => {},
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
   sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: (result) => {
        
        
        that.data.onzhengmian=1;
          that.setData({touxiangUrl:result.tempFilePaths[0]})
          
        
      },
    })
  },
  baocun:function(){
    var that =this;
    if(1){
      
      
        
      if(that.data.onzhengmian==1){
          wx.uploadFile({
            filePath: that.data.touxiangUrl,
            header: {
              
              "Token":getApp().globalData.token
            },
            name: 'image',
            url: 'https://juyou.17lhd.com/juyou/api/image/upload',
            success:function(e){
              console.log(e.data)
              that.data.imageId1  = JSON.parse(e.data).data
              that.data.postParam.avatarImageId   = that.data.imageId1;
              var repTime = that.data.date1.replace(/-/g, '/');
              var timeTamp = Date.parse(repTime) ;
  
              that.data.postParam.birthDateTimestamp   =timeTamp;
              that.data.postParam.gender   = ((that.data.isMale+1)==1)+1;
              that.data.postParam.nickName   = that.data.xingming;
              
             
              var app = getApp();
              console.log(that.data.postParam)
            app.requestPost("https://juyou.17lhd.com/juyou/api/userInfo/update?", that.data.postParam).then(res => {
              //请求成功，do something
              console.log(res);
              wx.switchTab({
                url: '/pages/wode/wode',
              })
            }).catch(res => {
              console.log("fail");
            })
  
            }
          })
        }else{
              that.data.postParam.avatarImageUrl   = that.data.imageId1;
              var repTime = that.data.date1.replace(/-/g, '/');
              var timeTamp = Date.parse(repTime) ;
  
              that.data.postParam.birthDateTimestamp   =timeTamp;
              that.data.postParam.gender   = ((that.data.isMale+1)==1)+1;
              that.data.postParam.nickName   = that.data.xingming;
              
             
              var app = getApp();
              console.log(that.data.postParam)
            app.requestPost("https://juyou.17lhd.com/juyou/api/userInfo/update?", that.data.postParam).then(res => {
              //请求成功，do something
              console.log(res);
              wx.switchTab({
                url: '/pages/wode/wode',
              })
            }).catch(res => {
              console.log("fail");
            })
  
          
        }
        
     

    }else{
      wx.showToast({
        title: '请填写完成',
        icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
        duration: 2000     
      }) 
    }
  }
})