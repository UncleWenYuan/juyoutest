//app.js
App({



  globalData: {
    userInfo: null,
    userId:0,
    userName: "",
    openid: '',
    code:'',
    token: '',
    qiyerenzheng:'',
    shimingrenzheng:'',
    windowHeight:null,
    

    checkLogin: false
  },
  require_Get_Token: function (url, data) {//--用login得到的code来 向服务器索要token
    var that = this;
    return new Promise(function (resolve, reject) {

      wx.request({
        method: 'GET',
        url: url + data,
        header: {
        
        },
        //data: data,//这是用户传进来的参数
        success(res) {
          //that.data = res.data;
          console.log("获取token")
          console.log(res.data);

          resolve(res.data);//请求成功之后的回调并且把res携带过去
        },
        fail(res) {
          console.log("fail")
          reject(new Error(res))//请求失败之后的回调并且把res携带过去
        }

      })
    })

  },
  onLaunch: function () {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    var that = this
    if(!wx.getStorageSync('searchRecord')){
    var temp = [];
    wx.setStorageSync('searchRecord', temp);}


    

    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {//--用户登陆后
        var loginInfo = res;
        
        that.globalData.code = loginInfo.code;
        

    

      }
    })

  },


  //使用方法最多三个param
  // var app = getApp();
  // app.requestGet("https://www.oldageshore.com/juyou/api/address/list?", 'superiorId=107').then(res => {
  //   //请求成功，do something
  // }).catch(res => {
  // })
  requestGet: function (url, ...param) {
    var that = this;
    return new Promise(function (resolve, reject) {
      //  console.log(that.globalData.token);
      wx.request({
        method: 'GET',
        url: url + (param[0] ? '&' + param[0] : "") + (param[1] ? '&' + param[1] : "") + (param[2] ? '&' + param[2] : "") + (param[3] ? '&' + param[3] : "") + (param[4] ? '&' + param[4] : ""),
        header: {
          "Token": that.globalData.token,
        },
        success(res) {
          resolve(res.data);//请求成功之后的回调并且把res携带过去
        },
        fail(res) {
          console.log("fail")
          reject(new Error(res))//请求失败之后的回调并且把res携带过去
        }

      })
    })


  }
  ,

  // //  post使用方法
  // var app = getApp();
  // var param = {"activityId":"","latitude":"","longitude":""};
  // param.activityId = that.data.id;
  // param.latitude = res.latitude;
  // param.longitude = res.longitude;
  // app.requestPost("https://www.oldageshore.com/juyou/api/activitySignUp?", param).then(res => {
  //   wx.showToast({
  //     title: res.msg,
  //     icon:'none'
  //   })
  // }).catch(res => {
  //   console.log(res);
  // })

  requestPost: function (url, data) {
    var that = this;

    return new Promise(function (resolve, reject) {
      wx.request({
        method: 'POST',
        url: url,

        header: {
          "Token": that.globalData.token,
           'content-type': 'application/x-www-form-urlencoded'
          //"Content-Type":"application/json"
        },

        data: data,//这是用户传进来的参数

        success(res) {
          // console.log(data)
          if(res.data.msg=="token不存在"){
            wx.showToast({
              title: '登录过期，请重新登录',
              icon:'none',
              duration:1000,
            })
          }
          resolve(res.data);//请求成功之后的回调并且把res携带过去
        },
        fail(res) {
          if(res.data.msg=="token不存在"){
            wx.showToast({
              title: '登录过期，请重新登录',
              icon:'none',
              duration:1000,
            })
          }
          console.log("fail")
          reject(new Error(res))//请求失败之后的回调并且把res携带过去
        }

      })
    })


  },
  myGetUserInfor: function () {//-----------得到用户信息
    var that = this;

    return new Promise(function (resolve, reject) {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                // console.log(res)
                resolve(res);//请求成功之后的回调并且把res携带过去
                //从数据库获取用户信息
                // that.queryUsreInfo();
                // //用户已经授权过
                // wx.switchTab({
                //   url: ''
                // })
              }
            });
          }

        },
        fail(res) {
          console.log("fail")
          reject(new Error(res))//请求失败之后的回调并且把res携带过去
        }

      })
    })



  }

})