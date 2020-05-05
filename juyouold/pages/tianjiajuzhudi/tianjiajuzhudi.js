// pages/tianjiajuzhudi/tianjiajuzhudi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [[], [], []],
    multiIndex: [0, 0, 0],
    start:0,
    xiangxidizhi:"",

  },


  onLoad: function (options) {
    var app = getApp();
    var that = this;

    app.requestGet("https://juyou.17lhd.com/juyou/api/address/list?").then(res => {
      //请求成功，do something
      var temp = null;
      console.log(res)
      that.data.multiArray[0] = res.data;
      that.setData({ multiArray: that.data.multiArray })

      app.requestGet("https://juyou.17lhd.com/juyou/api/address/list?", "superiorId=1").then(res => {
        //请求成功，do something
        var temp = null;
        console.log(res)
        that.data.multiArray[1] = res.data;
        that.setData({ multiArray: that.data.multiArray })

        app.requestGet("https://juyou.17lhd.com/juyou/api/address/list?", "superiorId=35").then(res => {
          //请求成功，do something
          var temp = null;
          console.log(res)
          that.data.multiArray[2] = res.data;
          that.setData({ multiArray: that.data.multiArray })
        }).catch(res => {
        })



      }).catch(res => {
      })


    }).catch(res => {
    })
    
    
  },
  baocun: function (event) {
    
    var app = getApp();
    var that = this;
    if(this.data.start==1&&this.data.xiangxidizhi!=""){
  var param = {"cityId":"","countyId":"","provinceId":"","detailInfo":""};
  param.provinceId = that.data.multiArray[0][that.data.multiIndex[0]].id;
  param.cityId = that.data.multiArray[1][that.data.multiIndex[1]].id;
  param.countyId = that.data.multiArray[2][that.data.multiIndex[2]].id;
  param.detailInfo = that.data.xiangxidizhi;
  app.requestPost("https://juyou.17lhd.com/juyou/api/userAddress/update?", param).then(res => {
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


  bindMultiPickerColumnChange: function (e) {
    let that = this
    var app = getApp();
    this.setData({start:1})


    var temp = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    temp.multiIndex[e.detail.column] = e.detail.value;
    console.log(temp.multiIndex);
    switch (e.detail.column) {
      case 0:
        //第一列改变  设置第二列数据

        app.requestGet("https://juyou.17lhd.com/juyou/api/address/list?", "superiorId=" + that.data.multiArray[0][temp.multiIndex[0]].id).then(res => {
          //请求成功，do something
          temp.multiArray[1] = res.data;
          that.setData({
            multiArray: temp.multiArray,
            multiIndex: temp.multiIndex
          })
          app.requestGet("https://juyou.17lhd.com/juyou/api/address/list?", "superiorId=" + that.data.multiArray[1][that.data.multiIndex[1]].id).then(res => {
            //请求成功，do something
            temp.multiArray[2] = res.data;
            that.setData({
              multiArray: temp.multiArray,
              multiIndex: temp.multiIndex
            })


          }).catch(res => {
          })

        }).catch(res => {
        })
        break;
      case 1:
        app.requestGet("https://juyou.17lhd.com/juyou/api/address/list?", "superiorId=" + that.data.multiArray[1][temp.multiIndex[1]].id).then(res => {
          //请求成功，do something
          temp.multiArray[2] = res.data;
          that.setData({
            multiArray: temp.multiArray,
            multiIndex: temp.multiIndex
          })


        }).catch(res => {
        })
        break;
      case 2:
        that.setData({
          multiArray: temp.multiArray,
          multiIndex: temp.multiIndex
        })
        break;
    }
  },

  bindMultiPickerChange: function (e) {
    var that = this;

    this.setData({ start: 1 })
    this.setData({
      multiIndex: e.detail.value
    })
  },
  input:function(e){
    this.data.xiangxidizhi = e.detail.value;

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

  }
})