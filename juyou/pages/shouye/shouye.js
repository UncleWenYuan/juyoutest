// pages/shouye/shouye.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenheight:0,
    xiabanbufenheight:0,
    swiperheight:0,
    zuixinneirongheight:0,
    latitude:0 , 
    longitude: 0,
    zuixin: [],
    renqi: [],
    juli: [],
    eventMy:null,
    swiperImg:[
      {imageUrl:"/images/banner.png"},
      { imageUrl: "/images/banner.png"},
      { imageUrl: "/images/banner.png"}
    ],
    
    currentTab: 0,
    eventMy:null,
  },
  tap2: function (event) {

    // const number = event.target.id;//1或者2得到点击了按钮1或者按钮2 

    const url = "/pages/huodongfabu2/huodongfabu2";//得到页面url 
   
    wx.navigateTo({

      url: url,

    })
  },
  sousuo:function(){
    wx:wx.navigateTo({
      url: '/pages/sousuo/sousuo',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
  bindInput: function (e) {
    // this.setData({
    //   inputValue: e.detail.value
    // })

    wx.navigateTo({
      url: '../sousuo/sousuo'
    })
  },



  swichNav: function (e) {

   console.log(e)
    var that = this;

    if (this.data.currentTab == e.currentTarget.dataset.current) {

      return false;

    } else {

      that.setData({

        currentTab: e.currentTarget.dataset.current,

      })

    }

  },

  swiperChange: function (e) {

    // console.log(e);

    this.setData({

      currentTab: e.detail.current,

    })


  },



  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {//**********加代码在if和else里都要加 if是为了防止onLaunch在onload之前运行 else防止onLoad在onLaunch之前 */
    var app = getApp();
    var that = this;
    console.log("进入首页")

    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
       
        var ratio =  750/res.windowWidth;
        wx.setStorageSync('windowHeight', (res.windowHeight)*ratio-10)
        that.data.screenheight = wx.getStorageSync('windowHeight')
    
    that.setData({screenheight:that.data.screenheight})
    that.setData({screenheight:that.data.screenheight})
    console.log( wx.getStorageSync('windowHeight'))

    that.setData({xiabanbufenheight:that.data.screenheight-420})
        
    console.log( that.data.xiabanbufenheight)
    that.setData({swiperheight:that.data.xiabanbufenheight-70})//多减点

    
    console.log( that.data.swiperheight)

    
    that.setData({zuixinneirongheight:that.data.swiperheight/2})

    }})
    


      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
    // if(0){
    //   console.log("已有token不用回调")
    //   app.requestGet("https://www.oldageshore.com/juyou/api/activity/newestList?", 'pageNum=1').then(res => {
    //     //请求成功，do something
    //     //console.log(res.data.list[0].imageUrl)
    //     that.setData({ zuixin: res.data })
    //     console.log(that.data.zuixin)


    //   }).catch(res => {

    //   })
    //   app.requestGet("https://www.oldageshore.com/juyou/api/activity/listByPopularity?", 'pageNum=1').then(res => {
    //     //请求成功，do something
    //     //console.log(res.data.list[0].imageUrl)
    //     that.setData({ renqi: res.data })
    //   }).catch(res => {

    //   })

    //   wx.getLocation({
    //     type: 'wgs84',
    //     success: (res) => {
    //       var latitude = res.latitude
    //       var longitude = res.longitude
    //       this.setData({ latitude: latitude, longitude: longitude })

    //     }

    //   })
    //   app.requestGet("https://www.oldageshore.com/juyou/api/activity/listByDistance?", 'latitude=' + that.data.latitude, "longitude=" + that.data.longitude).then(res => {
    //     //请求成功，do something
    //     //console.log(res.data.list[0].imageUrl)
    //     that.setData({ juli: res.data })
    //   }).catch(res => {

    //   })
    //   app.requestGet("https://www.oldageshore.com/juyou/api/banner/list").then(res => {
        

    //       that.setData({ swiperImg: res.data })
    //     }).catch(res => {

    //     })


    // }
    // else{
    app.requestGet("https://www.oldageshore.com/juyou/api/notice/unreadSystemMessageCount").then(res => {
        if(res.data>0){
          wx.showTabBarRedDot({
            index: 2,
          })

        }else{
          wx.hideTabBarRedDot({
            index: 2,
          })
        }
      }).catch(res => {
      })
      
        console.log("执行回调函数")
        app.requestGet("https://www.oldageshore.com/juyou/api/activity/newestList?", 'pageNum=1').then(res => {
          //请求成功，do something
          //console.log(res.data.list[0].imageUrl)
          that.setData({ zuixin: res.data })
          console.log(that.data.zuixin)


        }).catch(res => {

        })
        app.requestGet("https://www.oldageshore.com/juyou/api/activity/listByPopularity?", 'pageNum=1').then(res => {
          //请求成功，do something
          //console.log(res.data.list[0].imageUrl)
          that.setData({ renqi: res.data })
        }).catch(res => {

        })

        wx.getLocation({
          type: 'wgs84',
          success: (res) => {
            var latitude = res.latitude
            var longitude = res.longitude
            this.setData({ latitude: latitude, longitude: longitude })

          }

        })
        app.requestGet("https://www.oldageshore.com/juyou/api/activity/listByDistance?", 'latitude=' + that.data.latitude, "longitude=" + that.data.longitude).then(res => {
          //请求成功，do something
          //console.log(res.data.list[0].imageUrl)
          that.setData({ juli: res.data })
        }).catch(res => {

        })
        app.requestGet("https://www.oldageshore.com/juyou/api/banner/list").then(res => {
        

          that.setData({ swiperImg: res.data })
        }).catch(res => {

        })



      // }

    // }




      

    // var app = getApp();
    // app.requestGet("https://www.oldageshore.com/juyou/api/activity/newestList?", 'pageNum=1').then(res => {
    //   //请求成功，do something
    //   console.log("321")
    //   zuixin1 = res.data.list[0].imageUrl;

    // }).catch(res => {

    // })
  
    
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
  tapSwiper:function(event){
    console.log(event.currentTarget.dataset.item)
    if(event.currentTarget.dataset.url==null){
    this.data.eventMy  = event;
    const url = "/pages/yuelao/yuelao?id="+event.currentTarget.dataset.id;//得到页面url 

    wx.navigateTo({

      url: url,

    })
  }else{
    wx.navigateTo({

      url: "/pages/out/out?url="+(event.currentTarget.dataset.url),

    })
  }

  },

  fresh:function(e) {
    var app = getApp();
    var that = this;
   console.log("fresh") 
   app.requestGet("https://www.oldageshore.com/juyou/api/activity/newestList?", 'pageNum=1').then(res => {
          //请求成功，do something
          //console.log(res.data.list[0].imageUrl)
          that.setData({ zuixin: res.data })
          console.log(that.data.zuixin)


        }).catch(res => {

        })
        app.requestGet("https://www.oldageshore.com/juyou/api/activity/listByPopularity?", 'pageNum=1').then(res => {
          //请求成功，do something
          //console.log(res.data.list[0].imageUrl)
          that.setData({ renqi: res.data })
        }).catch(res => {

        })

        wx.getLocation({
          type: 'wgs84',
          success: (res) => {
            var latitude = res.latitude
            var longitude = res.longitude
            this.setData({ latitude: latitude, longitude: longitude })

          }

        })
        app.requestGet("https://www.oldageshore.com/juyou/api/activity/listByDistance?", 'latitude=' + that.data.latitude, "longitude=" + that.data.longitude).then(res => {
          //请求成功，do something
          //console.log(res.data.list[0].imageUrl)
          that.setData({ juli: res.data })
        }).catch(res => {

        })
        app.requestGet("https://www.oldageshore.com/juyou/api/banner/list").then(res => {
        

          that.setData({ swiperImg: res.data })
        }).catch(res => {

        })
    
  },
})