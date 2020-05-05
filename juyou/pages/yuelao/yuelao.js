// pages/yuelao/yuelao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder:"评论活动",
    longitude:"",
    latitude:"",
    tempID:null,
    showxiazuo:1,
      comment:null,
      id:4,
      inputValue:"",
      keqiandao:0,
      ziticolor: "#28A9FA",
      bgcolor:"#FFFFFF",
      youxia:"我要报名",
      swiperImg: [
        { src: "/images/banner.png" },
        { src: "/images/banner.png" },
        { src: "/images/banner.png" }
      ],
      registered:null,
      user1Image:"/images/白底3.png",
      
      user2Image:"/images/白底3.png",
      userId:'',
      user3Image:"/images/白底3.png",
      huodong:null,
      start:"",
      end:"",
      currentTab: 0,
      focus:false,

      

  },
  huifu:function (e) {
    console.log(e.currentTarget.dataset)
    var that = this;
    if(e.currentTarget.dataset.user.userInfo.userId!=getApp().globalData.userId){
      that.setData({placeholder:"@"+e.currentTarget.dataset.user.userInfo.nickName,focus:true,tempID:e.currentTarget.dataset.user.id})
      
      
    }
  },
  confirm:function(e){

     var app = getApp();
    var that = this;
    var param = {"activityId":"","content":"","replyId":""};
    param.activityId = that.data.id;
    param.content = e.detail.value;
    if(that.data.placeholder!="评论活动"){
      param.replyId = that.data.tempID;

    }
    else{
      param.replyId = "";
    }

    console.log(wx.getStorageSync("lastVal"));
    if(wx.getStorageSync("lastVal")!=e.detail.value){
    app.requestPost("https://www.oldageshore.com/juyou/api/activityComment/release?", param).then(res => {
      that.setData({placeholder:"评论活动"})
      console.log(res)
        //请求成功，do something
      wx.showToast({
        title: '留言成功',
      })
      app.requestGet("https://www.oldageshore.com/juyou/api/activityComment/list?", 'activityId=' + this.data.id).then(res => {
        console.log("获取留言")
        console.log(res);
        that.setData({comment:res.data,inputValue:""})
      }).catch(res => {
      })
    }).catch(res => {
      console.log("fail");
    })
  }
    wx.setStorageSync("lastVal",e.detail.value)

  },
  tap: function (event) {

    // const number = event.target.id;//1或者2得到点击了按钮1或者按钮2 

    const url = "/pages/baomingchenggongrenyuan/baomingchenggongrenyuan";//得到页面url 

    wx.navigateTo({

      url: url,

    })
  },
  tap2:function(){
    var that = this
    if(this.data.keqiandao==1){
      wx.navigateTo({
        url: '/pages/renwutijiao/renwutijiao?'+"id="+that.data.id,
      })  
    }
    if(that.data.youxia=="未结算/任务结束"){
      wx.navigateTo({
        url: '/pages/renwujieguo/renwujieguo',
      })
    }
    if(that.data.youxia=="我要报名"){
      wx.getLocation({
        type: 'wgs84',
        success: (res)=> {
         
          this.setData({ latitude: res.latitude, longitude: res.longitude})
          
          var app = getApp();
          var param = {"activityId":"","latitude":"","longitude":""};
          param.activityId = that.data.id;
          param.latitude = res.latitude;
          param.longitude = res.longitude;
          app.requestPost("https://www.oldageshore.com/juyou/api/activitySignUp?", param).then(res => {
            if(res.msg=="成功"){
            wx.showToast({
                          title: "审核中",
                          icon:'none'
                        })
            that.setData({youxia:"审核中/已报名",bgcolor:"#666666",ziticolor:"#ffffff",keqiandao:0})
                        
            }
            else{wx.showToast({
              title: res.msg,
              icon:'none'
            })
          }
          }).catch(res => {
            console.log(res);
          })
          
        }
   
      })
 
    }
  },
  tap3:function(){
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: (res)=> {
       
        this.setData({ latitude: res.latitude, longitude: res.longitude})
        
        var app = getApp();
        var param = {"activityId":"","latitude":"","longitude":""};
        param.activityId = that.data.id;
        param.latitude = res.latitude;
        param.longitude = res.longitude;
        app.requestPost("https://www.oldageshore.com/juyou/api/activitySignIn/submit?", param).then(res => {
          wx.showToast({
            title: res.msg,
            icon:'none'
          })
        }).catch(res => {
          console.log(res);
        })
        
      }
 
    })
    
  },
  swichNav: function (e) {


    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {

      return false;

    } else {

      that.setData({

        currentTab: e.target.dataset.current,

      })

    }

  },

  swiperChange: function (e) {

    this.setData({

      currentTab: e.detail.current,

    })


  },



liuyanFun:function(){

},
faburenTap:function(e){
  console.log(e)
  this.data.userId = e.currentTarget.dataset.id;
  if(this.data.userId!=getApp().globalData.userId&&this.data.userId!=null)
  wx.navigateTo({
    url: '/pages/zhangzhenming2/zhangzhenming2',
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
       var app = getApp();
       this.data.id = options.id;
    app.requestGet("https://www.oldageshore.com/juyou/api/activity/detail?", 'id='+this.data.id).then(res => {

      console.log("获取活动详情")
      console.log(res)
      that.data.registered = res.data.userInfoOfRegistered;
      if( res.data.userInfoOfRegistered[0]!=null)
      var temp1 = res.data.userInfoOfRegistered[0].avatarImageUrl;
      
      if( res.data.userInfoOfRegistered[1]!=null)
      var temp2 = res.data.userInfoOfRegistered[1].avatarImageUrl;
      
      if( res.data.userInfoOfRegistered[2]!=null)
      var temp3 = res.data.userInfoOfRegistered[2].avatarImageUrl;

      that.setData({huodong:res.data,user1Image:temp1,user2Image:temp2,user3Image:temp3,

        start: res.data.startTime.slice(0, 4) + "年" + res.data.startTime.slice(5, 7) + "月" + res.data.startTime.slice(8, 10) + "日",
        end: res.data.endTime.slice(0, 4) + "年" + res.data.endTime.slice(5, 7) + "月" + res.data.endTime.slice(8, 10) + "日",
      
      
      })
      wx.setNavigationBarTitle({
        title: "聚友社区"
      })
      that.myShow();
  }).catch(res => {
  })

    
    app.requestGet("https://www.oldageshore.com/juyou/api/activityComment/list?", 'activityId=' + this.data.id).then(res => {
      console.log("获取留言")
      console.log(res);
      that.setData({comment:res.data})
  }).catch(res => {
  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  tapfujian:function(e) {

    
    var that = this;
    var len =e.currentTarget.dataset.url.length;
if(e.currentTarget.dataset.url.slice(len-3,len)=="jpg"){
  wx.previewImage({
    urls: that.data.huodong.enclosureUrlList,  //预览的图片url数组
    current: e.currentTarget.dataset.url,  //当前的url
  })}
    
else{
  var temp = e.currentTarget.dataset.url.slice(0,4)+'s'+e.currentTarget.dataset.url.slice(4) ;
  wx.downloadFile({
  url:  temp,
  header: {},
  success: function(res) {
      var filePath = res.tempFilePath;
      console.log(filePath);
      wx.openDocument({
          filePath: filePath,
          success: function(res) {
              console.log('打开文档成功')
          },
          fail: function(res) {
              console.log(res);
          },
          complete: function(res) {
              console.log(res);
          }
      })
  },
  fail: function(res) {
      console.log('文件下载失败');
  },
  complete: function(res) {},
})}
    

    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  myShow: function () {
    let pages = getCurrentPages();
    var that = this;
    let prevPage = pages[pages.length - 2];
    console.log(prevPage)
    if(prevPage.route=="pages/renwu/renwu"){
      if(prevPage.data.index1==0){
        that.setData({showxiazuo:1})
        switch (prevPage.data.currentTab) {
          case 0:
            that.setData({youxia:"审核中/已报名",bgcolor:"#666666",ziticolor:"#ffffff",keqiandao:0})
            break;
            case 1:
              that.setData({youxia:"完成任务",bgcolor:"#999999",ziticolor:"#ffffff",keqiandao:1})
              break;
              case 2:
                that.setData({youxia:"已提交",bgcolor:"#999999",ziticolor:"#ffffff",keqiandao:0})
                break;
        
                case 3:
                  that.setData({youxia:"已完成",bgcolor:"#ffffff",ziticolor:"#28A9FA",keqiandao:0})

                  
                  if(that.data.resultState=="qualified"){
                    that.setData({youxia:"通过/已完成",bgcolor:"#ffffff",ziticolor:"#28A9FA",keqiandao:0})
                  }else if(that.data.resultState=="unqualified"){
                    that.setData({youxia:"失败/已完成",bgcolor:"#ffffff",ziticolor:"#28A9FA",keqiandao:0})
                  }
                  break;
              
        
         
        }

      }else if(prevPage.data.index1==1){
        that.setData({showxiazuo:0,width:100})
        switch (prevPage.data.currentTab) {
          case 0:
            that.setData({youxia:"审核中",bgcolor:"#999999",ziticolor:"#ffffff",keqiandao:0})
            break;
            case 2:
              that.setData({youxia:"任务进行中",bgcolor:"#ffffff",ziticolor:"#333333",keqiandao:0})
              break;
              case 1:
                that.setData({youxia:"报名中",bgcolor:"#ffffff",ziticolor:"#ff0000",keqiandao:0})
                break;
        
                case 3:

                    if(that.data.huodong.whetherSettlement==false){
                      that.setData({youxia:"未结算/任务结束",bgcolor:"#ffcccc",ziticolor:"#ff0000",keqiandao:0})
                    }else{
                      that.setData({youxia:"已结算/任务结束",bgcolor:"#ffcccc",ziticolor:"#ff0000",keqiandao:0})
                    }
                break;
              
        
         
        }

      }
    }
    else if(prevPage.route=="pages/shouye/shouye"||prevPage.route=="pages/sousuojieguo/sousuojieguo"){
      console.log(prevPage.data)

      
      switch (prevPage.data.eventMy.currentTarget.dataset.zhuangtai) {
        case "in_audit":
          that.setData({youxia:"审核中/已报名",bgcolor:"#666666",ziticolor:"#ffffff",keqiandao:0})
            break;
        case "audit_pass":
          that.setData({youxia:"通过/已报名",bgcolor:"#666666",ziticolor:"#ffffff",keqiandao:0})
            break;
        case "audit_reject":
          that.setData({youxia:"拒绝/已报名",bgcolor:"#666666",ziticolor:"#ffffff",keqiandao:0})
            break;

      
        default:
          break;
      }
    }
    


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
    wx.removeStorageSync("lastVal")

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
  tap4:function(){
    this.setData({currentTab:2,placeholder:"评论活动"})
    setTimeout(() => {
      this.setData({focus:true})
    }, 300);
    
    
  }
})