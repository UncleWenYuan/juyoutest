// pages/qunti/qunti.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['学生', '在职', '退休'],
    index: 0,
    chosenID:null,
    chosenNAME:"",
    array2: ['3-8k', '8-12k', '12-20k', '20-50k', '50k以上'],
    index2: 0,
    good: 0, good2: 0,good3:0,
    show:1
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      good: 1
    })
    if(this.data.array[ e.detail.value].name=="学生"){
      this.setData({show:0})
    }
    else{
      this.setData({show:1})
    }
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value, good2: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    let pages = getCurrentPages();
    var that = this;
    let prevPage = pages[pages.length - 2];
    console.log(prevPage);
    // if(prevPage.route == "pages/xuanzezhiye/xuanzezhiye"){
    //   that.data.chosenID = prevPage.data.chosenId;
    //   that.setData({chosenNAME : prevPage.data.chosenName})
    //   that.setData({good3:1})
      
    // }

      var app = getApp();
          app.requestGet("https://juyou.17lhd.com/juyou/api/occupation/list").then(res => {
          //请求成功，do something
    
            that.setData({ array: res.data.presentSituationList,})
            
            that.setData({ array2: res.data.monthlyIncomeList })
            console.log(that.data.array)
            
            console.log(that.data.array2)
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
  onLoad: function () {

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
  zhiye:function(){
    wx.navigateTo({
      url: '/pages/xuanzezhiye/xuanzezhiye',
    })
  },
  baocun: function (event) {
    var app = getApp();
    var that = this;
    console.log(this.data.good);
    console.log(this.data.good2);
    
    console.log(this.data.good3)
    if((this.data.array[this.data.index].name=="学生"&&this.data.good2==1)||(this.data.array[this.data.index].name!="学生"&&this.data.good2==1&&this.data.good3==1)){//如果选学生且选了月收入 或者 非学生 但全都选过了
      if(this.data.good3==1){
        var param = {"monthlyIncomeId":"","occupationId":"","presentSituationId":""};
    
    param.monthlyIncomeId = this.data.array2[this.data.index2].id;
    param.occupationId = this.data.chosenID;
    param.presentSituationId = this.data.array[this.data.index].id;
    
    app.requestPost("https://juyou.17lhd.com/juyou/api/userOccupation/update?", param).then(res => {
      console.log(res);
      wx.redirectTo({
        url: '/pages/zhangzhenming/zhangzhenming',
      })
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
    }).catch(res => {
      console.log(res);
    })
    
  }
  else{

    var param = {"monthlyIncomeId":"","presentSituationId":""};
    
    param.monthlyIncomeId = this.data.array2[this.data.index2].id;
    param.presentSituationId = this.data.array[this.data.index].id;
    
    app.requestPost("https://juyou.17lhd.com/juyou/api/userOccupation/update?", param).then(res => {
      console.log(res);
      wx.navigateTo({
        url: '/pages/zhangzhenming/zhangzhenming',
      })
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
    }).catch(res => {
      console.log(res);
    })
    

  }
}
    

  else{
    wx.showToast({
      title: '请填写完成',
      icon: 'none',
    })
  
  }

  },


})