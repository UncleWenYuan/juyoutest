// pages/zhiyuanzhaomu1/zhiyaozhaomu1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null,
    pickIndex:-1,
    selectedList:[],
    idList:[],
    nameList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var app = getApp();
      app.requestGet("https://www.oldageshore.com/juyou/api/activityPropagandaExperience/list").then(res => {
        that.setData({list:res.data})
        console.log(that.data.list)
        for (let index = 0; index < that.data.list.length; index++) {
          that.data.selectedList.push(0);
          
        }
        that.setData({selectedList:that.data.selectedList})
        
        console.log(that.data.selectedList);
    }).catch(res => {
    })
  },
  tap: function (e) {
    
    var temp = this.data.selectedList;
    if(temp[ e.currentTarget.dataset.index]==0){
    temp[ e.currentTarget.dataset.index] =  e.currentTarget.dataset.id;
    this.setData({ selectedList: temp })
    }
    else{
      temp[ e.currentTarget.dataset.index] = 0;
    this.setData({ selectedList: temp })

    }
    console.log(this.data.selectedList)

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

    for (let index = 0; index < this.data.selectedList.length; index++) {
      if(this.data.selectedList[index]!=0){
        this.data.nameList.push(this.data.list[index].name);
        this.data.idList.push(this.data.list[index].id)
      }
      
    }
    console.log(this.data.nameList)
    console.log(this.data.idList)
    wx.setStorageSync('xuanchuanID', this.data.idList);
    wx.setStorageSync('xuanchuanName', this.data.nameList);
    

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