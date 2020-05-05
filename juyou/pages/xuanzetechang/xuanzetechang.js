// pages/xuanzezhiye/xuanzezhiye.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chosenArray:[],
    array: [
    ]
  },

  acceptMission: function (e) {
    var that = this.data.array;
    var qqq = this;
    var formData = e.currentTarget.dataset.id.id;

    for (var x in that) {
      for (var y in that[x].secondSpecialityList) {

        for (var z in that[x].secondSpecialityList[y].thirdSpecialityList) {
          
          if (that[x].secondSpecialityList[y].thirdSpecialityList[z].id == formData) {
            
            var temp = "array[" + x + "].secondSpecialityList[" + y + "].thirdSpecialityList[" + z + "].chosen"
            qqq.setData({ [temp]:true });

          }
        }
      }

    }
  },
  cancelMission: function (e) {
    var that = this.data.array;
    var qqq = this;
    var formData = e.currentTarget.dataset.id.id;

    for (var x in that) {

      for (var y in that[x].secondSpecialityList) {

        for (var z in that[x].secondSpecialityList[y].thirdSpecialityList) {
          if (that[x].secondSpecialityList[y].thirdSpecialityList[z].id == formData) {
            var temp = "array[" + x + "].secondSpecialityList[" + y + "].thirdSpecialityList[" + z + "].chosen"
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
      app.requestGet("https://www.oldageshore.com/juyou/api/speciality/list").then(res => {
      //请求成功，do something

        that.setData({ array: res.data })
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

      for (var y in that[x].secondSpecialityList) {

        for (var z in that[x].secondSpecialityList[y].thirdSpecialityList) {
          if (that[x].secondSpecialityList[y].thirdSpecialityList[z].chosen == true) {
            thatt.data.chosenArray.push(that[x].secondSpecialityList[y].thirdSpecialityList[z].id)

          }
        }
      }

    }

    console.log(thatt.data.chosenArray)
    var app = getApp();
    var param = {"specialityId":""};
    param.specialityId = thatt.data.chosenArray;
  
    app.requestPost("https://www.oldageshore.com/juyou/api/userSpeciality/update?", param).then(res => {
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