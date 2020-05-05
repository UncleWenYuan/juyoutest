// pages/shimingrenzheng/shimingrenzheng.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrayList:null,
    totalAllowNum:null,
    allowNum:0,
    counter:[],
    imageId1:null,
    imageId2:null,
    zhengmianUrl:["/images/tupianwei.png"],
    fanmianUrl:["/images/tupianwei.png"],
    xingming:[""],
    dianhua:[""],
    onxingming:[0],
    ondianhua:[0],
    onzhengmian:[0],
    onfanmian:[0],
    postParam:{"businessCardImageId":"" ,"businessLicenseImageId":"" , "companyName":"" , "dutyParagraph":""}
    
  },

  // bindDateChange1: function (e) {

  //   this.setData({
  //     date1: e.detail.value,
  //     on1: 1
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var app = getApp();
    var that = this;
    app.requestGet("https://juyou.17lhd.com/juyou/api/enterpriseCertification/applyList?pageNum=1").then(res => {
      console.log(res.data)
      this.setData({arrayList:res.data})

      var temp = 3-res.data.length;
       that.setData({allowNum:temp,totalAllowNum:temp})

      if(temp==3){
        that.tianjiaTap();
      }
      //请求成功，do something
    }).catch(res => {
    })


  },
  xiugai:function(e){
    wx.navigateTo({
      url: '/pages/qiyexiugai/qiyexiugai?id='+e.currentTarget.dataset.id,
    })
  },
  tianjiaTap:function(){
    
  console.log("tianjia")
if(this.data.allowNum==0){
  wx.showToast({
    title: '最多只能认证三所企业',
    icon:'none'
  })
}
else{
  this.data.allowNum-=1;
  var temp1 = this.data.counter;
  var temp2 = this.data.zhengmianUrl;
  var temp3 = this.data.fanmianUrl;
  var temp4 = this.data.xingming;
  var temp5 = this.data.dianhua;
  var temp6 = this.data.onxingming;
  var temp7 = this.data.ondianhua;
  var temp8 = this.data.onzhengmian;
  var temp9 = this.data.onfanmian;
  
  console.log("push")
  temp1.push(0)
  temp2.push("/images/tupianwei.png")
  temp3.push("/images/tupianwei.png")
  temp4.push(null)
  temp5.push(null)
  temp6.push(null)
  temp7.push(null)
  temp8.push(null)
  temp9.push(null)
  
  this.setData({counter:temp1,zhengmianUrl:temp2,fanmianUrl:temp3,xingming:temp4,dianhua:temp5,onxingming:temp6,ondianhua:temp7,onzhengmian:temp8,onfanmian:temp9})

}

console.log(this.data.allowNum)
console.log(this.data.counter)

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
    console.log(e.currentTarget.dataset.index)
    this.data.xingming[e.currentTarget.dataset.index]=e.detail.value;

    this.data.onxingming[e.currentTarget.dataset.index]=1;

  },
  dianhua:function(e){
    this.data.dianhua[e.currentTarget.dataset.index]=e.detail.value;
    this.data.ondianhua[e.currentTarget.dataset.index]=1;

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
        
        
        that.data.onzhengmian[e.currentTarget.dataset.index]=1;
        var temp = this.data.zhengmianUrl;
        temp[e.currentTarget.dataset.index]= result.tempFilePaths[0];
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
        that.data.onfanmian[e.currentTarget.dataset.index]=1;
        var temp = this.data.fanmianUrl;
        temp[e.currentTarget.dataset.index]= result.tempFilePaths[0];
          that.setData({fanmianUrl:temp})
        
          
        
      },
    })

  },
  baocun:function(){
    console.log(this.data.totalAllowNum)
    console.log(this.data.allowNum)
    if(this.data.totalAllowNum==0||this.data.totalAllowNum==this.data.allowNum){
     wx.navigateTo({
       url: '/pages/renzhengxiangqing/renzhengxiangqing',
     })
    }
    else{
    var that =this;
    var isAllFinish = 1;
    for (let index = 0; index < this.data.counter.length; index++) {
      isAllFinish &= this.data.onxingming[index]
      isAllFinish &= this.data.ondianhua[index]
      isAllFinish &= this.data.onzhengmian[index]
      isAllFinish &= this.data.onfanmian[index]
      
    }

    if(isAllFinish==1){
      
      wx.showToast({title: '上传中', icon: 'loading', duration: 10000});
      for (let index = 0; index < this.data.counter.length; index++) {

        wx.uploadFile({
          filePath: that.data.zhengmianUrl[index],
          header: {
            
            "Token":getApp().globalData.token
          },
          name: 'image',
          url: 'https://juyou.17lhd.com/juyou/api/image/upload',
          success:function(e){
            console.log(e.data)
            that.data.imageId1  = JSON.parse(e.data).data
    
            wx.uploadFile({
              filePath: that.data.fanmianUrl[index],
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
                that.data.postParam.companyName   = that.data.xingming[index];
                that.data.postParam.dutyParagraph   = that.data.dianhua[index];
               
                var app = getApp();
                console.log(that.data.postParam)
              app.requestPost("https://juyou.17lhd.com/juyou/api/enterpriseCertification/apply?", that.data.postParam).then(res => {
                //请求成功，do something
                console.log(res);
                if(index==that.data.counter.length-1){
                  wx.hideToast({
                          complete: (res) => {
                            wx.navigateTo({
                              url: '/pages/renzhengxiangqing/renzhengxiangqing',
                            })


                          },
                        })
                        

                }
                
                console.log(that.data.counter);
                
              }).catch(res => {
                console.log("fail");
              })
    
              }
            })
          }
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
    
    
  }
})
