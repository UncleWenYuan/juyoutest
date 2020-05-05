Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    notPermit:1,
  },
  onShow: function () {
    var that = getApp();
    var thatt = this;
    
    // 查看是否授权
    wx.getSetting({//get授权
      success: function (res) {
        console.log(that.globalData.code)
        
        console.log(res)
      if (res.authSetting['scope.userInfo']) {//if授权？
        thatt.setData({notPermit:0})
        wx.showToast({title: '加载中', icon: 'loading', duration: 10000,});
        wx.getUserInfo({
          success: function (res) {//yishouquan
            
          console.log( res.userInfo)
          //从数据库获取用户信息
          that.globalData.userInfo = res.userInfo;
          that.globalData.userName =  res.userInfo.nickName;
          that.globalData.token = that.require_Get_Token("https://www.oldageshore.com/juyou/api/userAccount/login?code=", that.globalData.code)//发起请求
            .then(res => {//--得到token后 更新个人信息 防止code6
              console.log("用户已授权情况下 成功取得token")
              console.log(res.data)
              if(res.data==null){
                wx.reLaunch({
                  url: '/pages/test/test',
                })
                console.log("getagain")
              }
              that.globalData.token = res.data.token;
              that.globalData.qiyerenzheng = res.data.enterpriseCertificationState;
              that.globalData.shimingrenzheng = res.data.realNameAuthenticationState;
              that.globalData.userId =res.data.simpleUserInfo.userId;              
              var param = {"nickName":"","avatarImageUrl":""};
              param.nickName =  that.globalData.userName;
              param.avatarImageUrl =  that.globalData.userInfo.avatarUrl;
              if(res.data.simpleUserInfo.nickName==null){
                that.requestPost("https://www.oldageshore.com/juyou/api/userInfo/update?", param).then(res => {
                  console.log("修改用户信息")
                  console.log(res)
                  
                  wx.hideToast();
                  //用户已经授权过
                  wx.switchTab({
                    url: '/pages/shouye/shouye'
                    })
                }).catch(res => {
                  console.log(res)
                })
            }
            else{
              console.log("用户不是第一次登陆 无需修改个人信息")
              wx.hideToast();
              wx.switchTab({
                url: '/pages/shouye/shouye'
                })

            }
            }).catch(res => {
              wx.reLaunch({
                url: '/pages/test/test',
              })
            })
  
          
          
          }
        });
      }
      }
    })
  },
  bindGetUserInfo: function (e) {
   var that = getApp();
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo)
     
      wx.showToast({title: '加载中', icon: 'loading', duration: 10000});
      that.globalData.userInfo = e.detail.userInfo;
      that.globalData.userName =  e.detail.nickName;
      that.globalData.token = that.require_Get_Token("https://www.oldageshore.com/juyou/api/userAccount/login?code=", that.globalData.code)//发起请求
        .then(res => {//--得到token后 更新个人信息 防止code6
          console.log("用户已授权情况下 成功取得token")
          console.log(res.data)
          if(res.data==null){
            wx.reLaunch({
              url: '/pages/test/test',
            })
            console.log("getagain")
          }
          that.globalData.token = res.data.token;
          that.globalData.qiyerenzheng = res.data.enterpriseCertificationState;
          that.globalData.shimingrenzheng = res.data.realNameAuthenticationState;
          that.globalData.userId =res.data.simpleUserInfo.userId;              
          var param = {"nickName":"","avatarImageUrl":""};
          param.nickName =  that.globalData.userName;
          param.avatarImageUrl =  that.globalData.userInfo.avatarUrl;
          if(res.data.simpleUserInfo.nickName==null){
            that.requestPost("https://www.oldageshore.com/juyou/api/userInfo/update?", param).then(res => {
              console.log("修改用户信息")
              console.log(res)
              
              wx.hideToast();
              //用户已经授权过
              wx.switchTab({
                url: '/pages/shouye/shouye'
                })
            }).catch(res => {
              console.log(res)
            })
        }
        else{
          console.log("用户不是第一次登陆 无需修改个人信息")
          wx.hideToast();
          wx.switchTab({
            url: '/pages/shouye/shouye'
            })

        }
        }).catch(res => {
          wx.reLaunch({
            url: '/pages/test/test',
          })
        })
      
      //授权成功后，跳转进入小程序首页
      
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title:'警告',
        content:'您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel:false,
        confirmText:'返回授权',
        success:function(res){
        if (res.confirm) {
        console.log('用户点击了“返回授权”')
        } 
        }
      })
    }
  },
})
