// pages/sousuojieguo/sousuojieguo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xuanchuan: null,
    zhiyuan: null,
    shejiao: null,
    sousuojieguo:null,
    indexAll:[0,0,0],
     
    xuanchuanIdNow:"",
    zhiyuanIdNow:"",
    shejiaoIdNow:"",
    inputValueNow:"",

   
    defaultValue1: "宣传体验",
    defaultValue2: "志愿招募",
    defaultValue3: "社交活动",

    eventMy:null,
  },
  bindInput: function (e) {
    this.setData({
      inputValueNow: e.detail.value
     })

    wx.navigateTo({
      url: '../sousuojieguo/sousuojieguo'
    })
  },
  bindBlur:function(e){
    this.setData({
      inputValueNow: e.detail.value
    })
  },
  tap: function (event) {

    // const number = event.target.id;//1或者2得到点击了按钮1或者按钮2 
    
    console.log(event.currentTarget.dataset.id)
    this.data.eventMy  = event;

    const url = "/pages/yuelao/yuelao?id="+event.currentTarget.dataset.id;//得到页面url 

    wx.navigateTo({

      url: url,

    })
  },
 

  bindPickerChange1: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    
    let index = e.detail.value
    let temp = this.data.indexAll
    let temp2 = this.data.xuanchuan[index].name
    temp[0] = index;
    
    this.data.xuanchuanIdNow = this.data.xuanchuan[index].id
    this.setData({
      indexAll:temp,defaultValue1:temp2
    })
  },
  bindPickerChange2: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
   
    let index = e.detail.value
    let temp = this.data.indexAll
    temp[1] = index;
    
    this.data.zhiyuanIdNow = this.data.zhiyuan[index].id

    let temp2 = this.data.zhiyuan[index].name
    this.setData({
      indexAll: temp, defaultValue2: temp2
    })
  },
  bindPickerChange3: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    
    let index = e.detail.value
    let temp = this.data.indexAll
    temp[2] = index;

    this.data.shejiaoIdNow = this.data.shejiao[index].id
    let temp2 = this.data.shejiao[index].name
    this.setData({

      indexAll: temp,
      defaultValue3: temp2
      
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log("搜索结果onload")
    var app = getApp();
    var that = this;
    app.requestGet("https://www.oldageshore.com/juyou/api/activityPropagandaExperience/list").then(res => {
      

      that.setData({ xuanchuan: res.data,  })


    }).catch(res => {
    })
    app.requestGet("https://www.oldageshore.com/juyou/api/activitySocialAffair/list").then(res => {
      that.setData({ zhiyuan: res.data })

    }).catch(res => {
    })
    app.requestGet("https://www.oldageshore.com/juyou/api/activityVolunteerRecruitment/list").then(res => {
      that.setData({ shejiao: res.data })

    }).catch(res => {
    })

    //sousuo
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    if(prevPage.route=="pages/gengduosousuo/gengduosousuo"){
      app.requestGet("https://www.oldageshore.com/juyou/api/search?pageNum=1", "keyWord=" + prevPage.data.guanjianzi, "propagandaExperienceId=" + prevPage.data.xuanchuanId, "socialAffairId=" + prevPage.data.shejiaoId,"volunteerRecruitmentId=" + prevPage.data.zhiyuanId).then(res => {

        if(prevPage.data.guanjianzi!=""){
          var temp = wx.getStorageSync('searchRecord')
          temp.push({data:prevPage.data.guanjianzi});
          wx.setStorageSync('searchRecord', temp);
          console.log(wx.getStorageSync('searchRecord'))
        }

        console.log(res)
        if(res.code==2||res.data.total==0){
          wx.showToast({
            title: '未找到'+' \''+prevPage.data.guanjianzi+'\' '+'，换个关键字再搜搜看~',
            icon:'none'
          })
        }
        
        console.log(res)
        that.setData({ sousuojieguo: res.data.list })
        console.log(that.data.sousuojieguo)
  
      }).catch(res => {
      })
    }
    if(prevPage.route=="pages/sousuo/sousuo"){
      console.log("fromsousuo")
      app.requestGet("https://www.oldageshore.com/juyou/api/search?pageNum=1", "keyWord=" + prevPage.data.inputValue).then(res => {
        console.log(res)
        console.log(prevPage.data.inputValue)
        if(prevPage.data.inputValue!=""){
          console.log(wx.getStorageSync('searchRecord'))
          var temp = wx.getStorageSync('searchRecord')
          temp.push({data:prevPage.data.inputValue});
          wx.setStorageSync('searchRecord', temp);
          console.log(wx.getStorageSync('searchRecord'))
        }

        if(res.code==2||res.data.total==0){
          wx.showToast({
            title: '未找到'+' \''+prevPage.data.inputValue+'\' '+'，换个关键字再搜搜看~',
            icon:'none'
          })
        }
        
        console.log(res)
        that.setData({ sousuojieguo: res.data.list })
        console.log(that.data.sousuojieguo)
  
      }).catch(res => {
      })
    }
    if(prevPage.route=="pages/sousuojieguo/sousuojieguo"){
      app.requestGet("https://www.oldageshore.com/juyou/api/search?pageNum=1", "keyWord=" + prevPage.data.inputValueNow, "propagandaExperienceId=" + prevPage.data.xuanchuanIdNow, "socialAffairId=" + prevPage.data.shejiaoIdNow,"volunteerRecruitmentId=" + prevPage.data.zhiyuanIdNow).then(res => {
        if(prevPage.data.inputValueNow!=""){
          var temp = wx.getStorageSync('searchRecord')
          temp.push({data:prevPage.data.inputValueNow});
          wx.setStorageSync('searchRecord', temp);
          console.log(wx.getStorageSync('searchRecord'))
        }

        if(res.code==2||res.data.total==0){
          wx.showToast({
            title: '未找到'+' \''+prevPage.data.inputValueNow+'\' '+'，换个关键字再搜搜看~',
            icon:'none'
          })
        }
        that.setData({ sousuojieguo: res.data.list })
        console.log(that.data.sousuojieguo)
  
      }).catch(res => {
      })
    }

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
    
console.log("onshow")
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