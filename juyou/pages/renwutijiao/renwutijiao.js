// pages/renwutijiao/renwutijiao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[],
    id:null,
    inputValue:"",
    imageIdList:[],
    canshorttap:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  yulan:function (e) {
    if(this.data.canshorttap==1){
var that = this;
var temp = [];
temp.push(that.data.imageList[e.currentTarget.dataset.index].url)
    wx.previewImage({
      current: that.data.imageList[e.currentTarget.dataset.index].url, // 当前显示图片的http链接
      urls: temp // 需要预览的图片http链接列表
      })}
    
  },
  shanchu:function (e) {
    var that= this;
    this.setData({canshorttap:0})

    setTimeout(() => {
      that.data.imageList.splice(e.currentTarget.dataset.index,1)
      that.setData({imageList:this.data.imageList})
    
      that.setData({canshorttap:1})
    }, 100);
    
  },
  jiatu:function(e){
    var that = this;

  
      wx.chooseImage({
        complete: (res) => {

        },
        count: 1,
        fail: (res) => {},
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
    sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: (result) => {
          var temp = {"url":result.tempFilePaths[0]}
          that.setData({
            imageList: this.data.imageList.concat(temp)
    });
    console.log(this.data.imageList)
            
          
        },
      })
  
      
    
  },
  fabu: function (event) {
    
    var app = getApp();
    var that = this;
    
    if(this.data.inputValue!=""){

      wx.showModal({
        title: '提示',
        content: '一经提交不能修改，请确认提交',
        success:function(res){
        if (res.confirm) {
          that.tupianchuli().then(res => {
            var param = {"activityId":"","content":"","imageId":null};
            param.activityId =  that.data.id;
            param.content = that.data.inputValue;
            param.imageId = that.data.imageIdList;
          
            console.log(param)
            app.requestPost("https://www.oldageshore.com/juyou/api/activityResult/submit?", param).then(res => {
              //请求成功，do something
              
              console.log(res)
              wx.showToast({
                title: res.msg,
                icon:"none",
              })
            }).catch(res => {
              console.log("fail");
            })
            }).catch(res => {
              console.log("fail");
            })
    
    
      
     
    
        wx.navigateBack({
          delta: 1
    
    
        })
        } 
        }
      })
    
  }else{
    wx.showToast({
      title: '请填写完成',
      icon: 'none',
    })
  }
  },
  input:function(e){
    this.data.inputValue = e.detail.value
  },

  tupianchuli:function(){
    var that = this;
    return new Promise(function (resolve, reject) {

      if(that.data.imageList.length==0){
        resolve(that.data.imageIdList);

      }
      
  
      for (let index = 0; index < that.data.imageList.length; index++) {
        
        wx.uploadFile({
          filePath:that.data.imageList[index].url,
          header: {
            
            "Token":getApp().globalData.token
          },
          name: 'image',
          url: 'https://www.oldageshore.com/juyou/api/image/upload',
          success:function(e){
            var idImage  = JSON.parse(e.data).data
            
            console.log(idImage)
            that.data.imageIdList.push(idImage)
            if(index==(that.data.imageList.length-1)){
             resolve(that.data.imageIdList);
            }
          
      
           
      
      },
      
      fail: (res) => { reject(new Error(res))},
      
      })
      }


    })
  }
})



