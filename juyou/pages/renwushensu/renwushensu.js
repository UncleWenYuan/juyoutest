// pages/renwushensu/renwushensu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    max: 100, //限制最大输入字符数
    min: 10,  //限制最小输入字符数
    minWord: '？？？',//提示语句
    currentWordNumber:0,
    contentValue:"",

  },
  getValueLength: function (e) {
    let value = e.detail.value
    let len = parseInt(value.length)
    this.setData({
      currentWordNumber: len, //当前字数 
      contentValue: e.detail.value,
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
fabu:function(){
  var that = this;
  wx.showModal({
    title: '提示',
    content: '是否提交申诉？',
    success: function (res) {
        if (res.confirm&&that.data.contentValue.length>0) {
            console.log('用户点击确定')
            var app = getApp();
            var param = {"content":""};
            param.content = that.data.contentValue;
            
            app.requestPost("https://www.oldageshore.com/juyou/api/activityRepresentations/submit?", param).then(res => {
              wx.showToast({
                title: res.msg,
                icon:'none'
              })
            }).catch(res => {
              console.log(res);
            })
            wx.switchTab({
              url: '/pages/wode/wode',
            })
            
        }else{
           console.log('用户点击取消')
        }

    }
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