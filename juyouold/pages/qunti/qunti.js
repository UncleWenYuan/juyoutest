// pages/qunti/qunti.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    array: ['中共党员', '中共预备党员', '共青团员', '民革党员', '民盟盟员'],
    index: 0,
    array2: ['残疾', '优抚', '退役军人', '知青', '失独','低保'],
    index2: 0,
    good:0,good2:0,
  },
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      good:1
    })
  }, 
  bindPickerChange2: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value,good2:1
    })
  },

  baocun: function (event) {

    wx.navigateBack({
      delta: 1
   

    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    app.requestGet("https://juyou.17lhd.com/juyou/api/group/list").then(res => {
      //请求成功，do something
      this.setData({ array: res.data.faceList,
      array2:res.data.specialList })
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
  baocun: function (event) {
    
    var app = getApp();
    var that = this;
    if(this.data.good==1&&this.data.good2==1){
  var param = {"faceId":"","specialId":""};
  param.faceId = that.data.array[that.data.index].id;
  param.specialId = that.data.array2[that.data.index2].id;
  
  app.requestPost("https://juyou.17lhd.com/juyou/api/userGroup/update?", param).then(res => {
    //请求成功，do something
    console.log(res)
    wx.showToast({
      title: '保存成功',
    })
  }).catch(res => {
    console.log("fail");
  })

    wx.navigateBack({
      delta: 1


    })
  }else{
    wx.showToast({
      title: '请填写完成',
      icon: 'none',
    })
  }
  },

  onShareAppMessage: function () {

  }
})