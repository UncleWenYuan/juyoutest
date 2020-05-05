// pages/xuanzezhiye/xuanzezhiye.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chosenArray:[],
    array: [],
    chosenId:null,
    chosenName:"",
  },

  acceptMission: function (e) {
    this.data.chosenId = e.currentTarget.dataset.id.id;
    this.data.chosenName = e.currentTarget.dataset.id.name;
    let pages = getCurrentPages();
    var that = this;
    let prevPage = pages[pages.length - 2];
    if(prevPage.route=="pages/zhiye/zhiye"){
      prevPage.setData({chosenID:e.currentTarget.dataset.id.id,chosenNAME:e.currentTarget.dataset.id.name,good3:1})
    }else if(prevPage.route=="pages/huodongfabu/huodongfabu"){
      prevPage.setData({congshihangye:e.currentTarget.dataset.last.name+"-"+e.currentTarget.dataset.id.name,occupationID:e.currentTarget.dataset.id.id,currentTab1111:1})
     
    }
    wx.navigateBack({
      complete: (res) => {},
    })
   

   
  },
  cancelMission: function (e) {
    var that = this.data.array;
    var qqq = this;
    var formData = e.currentTarget.dataset.id.id;

    for (var x in that) {

      for (var y in that[x].secondOccupationList) {

        for (var z in that[x].secondOccupationList[y].thirdOccupationList) {
          if (that[x].secondOccupationList[y].thirdOccupationList[z].id == formData) {
            var temp = "array[" + x + "].secondOccupationList[" + y + "].thirdOccupationList[" + z + "].chosen"
            qqq.setData({ [temp]:false });

          }
        }
      }

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var app = getApp();
  var that = this;
      app.requestGet("https://juyou.17lhd.com/juyou/api/occupation/list").then(res => {
      //请求成功，do something

        that.setData({ array: res.data.firstOccupationList })
        console.log(that.data.array)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  baocun:function(){
    var thatt = this;
    var that = this.data.array;
    for (var x in that) {

      for (var y in that[x].secondOccupationList) {

        for (var z in that[x].secondOccupationList[y].thirdOccupationList) {
          if (that[x].secondOccupationList[y].thirdOccupationList[z].chosen == true) {
            thatt.data.chosenArray.push(that[x].secondOccupationList[y].thirdOccupationList[z].id)

          }
        }
      }

    }

    console.log(thatt.data.chosenArray)
    var app = getApp();
    var param = {"occupationId":""};
    param.occupationId = thatt.data.chosenArray;
  
    app.requestPost("https://juyou.17lhd.com/juyou/api/userOccupation/update?", param).then(res => {
      console.log(res);
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
    }).catch(res => {
      console.log(res);
    })
    wx.navigateTo({
      url: '/pages/zhangzhenming/zhangzhenming',
    })

  }
})