// pages/shimingrenzheng/shimingrenzheng.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    imageId1:null,
    imageId2:null,
    id:null,
    zhengmianUrl:"/images/tupianwei.png",
    fanmianUrl:"/images/tupianwei.png",
    xingming:"",
    dianhua:"",
    onxingming:0,
    ondianhua:0,
    onzhengmian:0,
    onfanmian:0,
    postParam:{"businessCardImageId":"" ,"businessLicenseImageId":"" , "companyName":"" , "dutyParagraph":"","id":""}
    
  },

  
  onLoad: function (options) {

    var app = getApp();
    var that = this;
    console.log(options)
    this.data.id = options.id;
    


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
  xingming:function(e){
    this.data.xingming=e.detail.value;

    this.data.onxingming=1;

  },
  dianhua:function(e){
    this.data.dianhua=e.detail.value;
    this.data.ondianhua=1;

  },
  zhengmian:function(e){
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
        var temp = this.data.zhengmianUrl;
        temp= result.tempFilePaths[0];
          that.setData({zhengmianUrl:temp})
          console.log(that.data.zhengmianUrl)
          console.log(that.data)
          
        
      },
    })
  },
  fanmian:function(e){
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
        var temp = this.data.fanmianUrl;
        temp= result.tempFilePaths[0];
          that.setData({fanmianUrl:temp})
        
          
        
      },
    })

  },
  baocun:function(){
    
    
    var that =this;
    var isAllFinish = 1;
    isAllFinish &= this.data.onxingming
    isAllFinish &= this.data.ondianhua
    isAllFinish &= this.data.onzhengmian
    isAllFinish &= this.data.onfanmian

    if(isAllFinish==1){
      

        wx.uploadFile({
          filePath: that.data.zhengmianUrl,
          header: {
            
            "Token":getApp().globalData.token
          },
          name: 'image',
          url: 'https://juyou.17lhd.com/juyou/api/image/upload',
          success:function(e){
            console.log(e.data)
            that.data.imageId1  = JSON.parse(e.data).data
    
            wx.uploadFile({
              filePath: that.data.fanmianUrl,
              header: {
                
                "Token":getApp().globalData.token
              },
              name: 'image',
              url: 'https://juyou.17lhd.com/juyou/api/image/upload',
              success:function(e){
                console.log(e.data)
                that.data.imageId2  = JSON.parse(e.data).data
                that.data.postParam.businessCardImageId = that.data.imageId1;
               
                that.data.postParam.businessLicenseImageId   = that.data.imageId2;
                that.data.postParam.companyName   = that.data.xingming;
                that.data.postParam.dutyParagraph   = that.data.dianhua;
                that.data.postParam.id   = that.data.id;
               
                var app = getApp();
                console.log(that.data.postParam)
              app.requestPost("https://juyou.17lhd.com/juyou/api/enterpriseCertification/update?", that.data.postParam).then(res => {
                //请求成功，do something
                console.log(res);
                wx.navigateBack({
                  complete: (res) => {},
                })
                
              }).catch(res => {
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
    
    
  }
)
