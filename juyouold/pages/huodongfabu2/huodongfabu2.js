// pages/huodongfabu2/huodongfabu2.js
var util = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    fujianidlist:[],
    time:null,
    onzhuti:0,
    onshuoming:0,
    ontupian:0,
    onfujian:0,

    onTime1:0,
    onTime2:0,


   
    rangeArray:[[{name:"宣传体验"},{name:"志愿招募"},{name:"社交活动"}],[]],
    zhuti:"",
    shuoming:"",
    imageUrl:"/images/tupianwei.png",
    fujianUrl:"",
    fujianshuoming:"添加附件",
    on1 :0,
    date1: '2016-09-01',
    on2: 0,
    date2: '2016-09-01',
    fujiantotallist:[],
    on3: 0,
    date3: '2016-09-01',

    renshu1:0,
    on4:0,

    renshu2: 0,
    on5: 0,

    renshu3: 0,
    on6: 0,
    on7:0,
    xuanchuan:null,
    zhiyuan:null,
    shejiao:null,

    multiArray: [[],[],[]],
    
    multiIndex: [0,0,0],


    time2:"00:00",
    time1:"00:00",

    range1: ["0", "1", "2"],
    range2: ["0", "1", "2"],
    range3: ["0", "1", "2"],

    qiandao:"",
    onQiandao:0,



    address:'',  dituxuan:0,latitude:"",longitude:"",name:"",
    

    faburenrange:[],
    faburenindex:0,
    faburenID:null,
    onfaburen:0,


    fujianurlArray:[],
    tupianurlArray:[],

  },

  qiandaoConfirm:function(e){
    if(e.detail.value.length>0){
    this.setData({onQiandao:1})
    this.data.qiandao=e.detail.value;
    }else{
      this.setData({onQiandao:0})
    this.data.qiandao=e.detail.value;

    }
  },
  bindDateChange1: function(e){

    this.setData({ date1: e.detail.value, 
    on1:1})
  },

  ditu:function(){
    var that = this
      wx.chooseLocation({
        success: function(res) {
          
          console.log(res)
          that.setData({ address: res.address, dituxuan:1,latitude:res.latitude,longitude:res.longitude,name:res.name})
        },
      })
    },

    qiandaoConfirm:function(e){
      if(e.detail.value.length>0){
        this.setData({onQiandao:1})
        this.data.qiandao=e.detail.value;
      }else{
        this.setData({onQiandao:0})
        this.data.qiandao=e.detail.value;
  
      }
    },

    time1tap:function(e){
      this.setData({time1:e.detail.value,onTime1:1})
    },

    time2tap:function(e){
      this.setData({time2:e.detail.value,onTime2:1})
      var mydata = this.data.date2+" "+this.data.time2;
      mydata=mydata.replace(/-/g, '/');  
      console.log("返回时间：" + mydata);  
      var time = Date.parse(new Date(mydata)); 

      console.log(time)
    },

jixu:function(){
  var that = this;
  console.log(this.data)
  if(that.data.on1&&that.data.on2&&that.data.on3&&that.data.on4&&that.data.on5&&that.data.on6&&that.data.on7&&that.data.onzhuti&&that.data.onshuoming&&that.data.ontupian&&that.data.onTime1&&that.data.onTime2&&that.data.onfaburen){//
    if(this.data.renshu2>=5){//

      that.data.fujiantotallist = that.data.fujianurlArray.concat(that.data.tupianurlArray)
      console.log(that.data.fujiantotallist)
      if(that.data.fujiantotallist.length>0)
        that.uploadonebyone(0);


      wx:wx.navigateTo({
      url: '/pages/huodongfabu/huodongfabu',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })}
    else{
      wx.showToast({
        title: '奖励金标准需大于5友币/人',
        icon:"none"
      })
    }
  }
  else{
    wx.showToast({
      title: '信息未完善',
      icon:"none"
    })

  }
  
},
  bindDateChange2: function (e) {

    this.setData({
      date2: e.detail.value,
      on2: 1
    })
  },

  bindDateChange3: function (e) {

    this.setData({
      date3: e.detail.value,
      on3: 1
    })
  },
  
  // bindChange4: function (e) {
  //   this.setData({ renshu1: e.detail.value, on4: 1 })
  // },
  renshuInput:function(e){
    if(e.detail.value.length>0){
      this.setData({ renshu1: e.detail.value, on4: 1,on6: 1,})
      this.setData({renshu3:this.data.renshu1*this.data.renshu2})
    }
      else{
        
        this.setData({ renshu1: e.detail.value, on4: 0,on6: 0,})
        
      this.setData({renshu3:this.data.renshu1*this.data.renshu2})
      }
    

  },

  // bindChange5: function (e) {
  //   this.setData({ renshu2: e.detail.value, on5: 1 })
  // },
  jianglijinInput:function(e){

    if(e.detail.value.length>0){
      this.setData({ renshu2: e.detail.value, on5: 1,on6: 1, })
    this.setData({renshu3:this.data.renshu1*this.data.renshu2})
    }
      else{
        
        this.setData({ renshu2: e.detail.value, on5: 0,on6: 0, })
    this.setData({renshu3:this.data.renshu1*this.data.renshu2})
      }
    
    

  },

  bindChange6: function (e) {
    this.setData({ renshu3: e.detail.value, on6: 1 })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value,
      on7:1
    })
  },

  faburenPicker:function(e){
    var that = this;
    that.setData({faburenID:that.data.faburenrange[e.detail.value].id,onfaburen:1,faburenindex:e.detail.value})
    console.log(that.data.faburenID)
    console.log(that.data.faburenindex)

  },
  bindMultiPickerColumnChange: function (e) {
    var that = this;
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    this.data.multiIndex[e.detail.column] = e.detail.value;

    switch (this.data.multiIndex[0]) {
      case 0:
        var tempArray = that.data.rangeArray;
        tempArray[1] = that.data.xuanchuan;
        that.setData({rangeArray:tempArray})
        
        break;
        case 1:
        var tempArray = that.data.rangeArray;
        tempArray[1] = that.data.zhiyuan;
        that.setData({rangeArray:tempArray})
        
        break;
        case 2:
        var tempArray = that.data.rangeArray;
        tempArray[1] = that.data.shejiao;
        that.setData({rangeArray:tempArray})
        
        break;
    
      default:
        break;
    }
    // console.log(data.multiIndex);
    // this.setData({ multiArray:data.multiArray,
    // multiIndex:data.multiIndex});
  },
  tapImage:function(){
    var that = this;
    wx.chooseImage({
      complete: (res) => {

      },
      count: 1,
      fail: (res) => {},
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
   sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: (result) => {
        that.data.ontupian=1;
        console.log(result)
          that.setData({imageUrl:result.tempFilePaths[0]})
          
        
      },
    })
  },

  // tianjiaTap:function(){
  //   var that = this
  //   if(this.data.fujianshuoming=="点击预览"){
  //     wx.openDocument({
  //       filePath:  that.data.fujianUrl,
  //     })

  //   }else{
  //   wx.chooseMessageFile({
  //     count: 1,
  //     success(res){
  //       if(res.tempFiles[0].type=="file"){
  //       console.log(res)
  //       that.data.onfujian=1;
  //       that.data.fujianUrl=res.tempFiles[0].path;
  //       that.setData({fujianshuoming:"点击预览"})
  //       }else{
  //         wx.showToast({
  //           title: '文件格式不匹配',
  //           icon:"none"
  //         })
  //       }
  //     }
  //   })
  // }
  // },

  tianjiafujian:function(e) {
    var that= this;
    wx.chooseMessageFile({
      count: 1,
      success(res){
        if(res.tempFiles[0].type=="file"){
        console.log(res)
        that.data.onfujian=1;
        that.data.fujianurlArray.push(res.tempFiles[0].path);
        
        that.setData({fujianurlArray:that.data.fujianurlArray})
        console.log(res.tempFiles[0].path)
      //   wx.uploadFile({
      //     filePath:res.tempFiles[0].path,
      //     header: {
            
      //       "Token":getApp().globalData.token
      //     },
      //     name: 'enclosure',
      //     url: 'https://juyou.17lhd.com/juyou/api/enclosure/upload',
      //     success:function(e){
      //       console.log(e)
      //       var idfujian  = JSON.parse(e.data).data
            
      //       console.log(idfujian)
      //       that.data.fujianidlist.push(idfujian)
           
      //     },
      
      
      // })

        }else{
          wx.showToast({
            title: '文件格式不匹配',
            icon:"none"
          })
        }
      }
    })
    
  },
  tianjiatupian:function(e){
    var that = this;
    wx.chooseImage({
      complete: (res) => {

      },
      count: 1,
      fail: (res) => {},
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
   sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: (result) => {
        that.data.onfujian=1;
        console.log(result)
        that.data.tupianurlArray.push(result.tempFilePaths[0])
          that.setData({tupianurlArray:that.data.tupianurlArray})
          
        
      },
    })

  },

  tupianyulan:function(e){
var that = this;
    wx.previewImage({
      urls: that.data.tupianurlArray,  //预览的图片url数组
      current: e.currentTarget.dataset.url,  //当前的url
    })

  },

  fujianyulan:function(e){

    wx.openDocument({
      filePath:   e.currentTarget.dataset.url
    })

  },
  fujianshanchu:function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认要删除此附件',
      success:function(res){
      if (res.confirm) {
        that.data.fujianurlArray.splice(e.currentTarget.dataset.index,1);
        that.setData({fujianurlArray:that.data.fujianurlArray})
      } 
      }
    })
    
    
  },
  tupianshanchu:function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认要删除此图片',
      success:function(res){
      if (res.confirm) {
        that.data.tupianurlArray.splice(e.currentTarget.dataset.index,1);
        that.setData({tupianurlArray:that.data.tupianurlArray})
      } 
      }
    })
    
    
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
    console.log(this.data.time)
    this.setData({date1:this.data.time.substring(0,4)+"-"+this.data.time.substring(5,7)+"-"+this.data.time.substring(8,10),date2:this.data.time.substring(0,4)+"-"+this.data.time.substring(5,7)+"-"+this.data.time.substring(8,10),date3:this.data.time.substring(0,4)+"-"+this.data.time.substring(5,7)+"-"+this.data.time.substring(8,10)})


     var app = getApp();
     var that = this;
    app.requestGet("https://juyou.17lhd.com/juyou/api/activityPropagandaExperience/list").then(res => {
      var temp = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex,
        array:this.data.rangeArray,
      };
      temp.multiArray[0]=res.data;
      temp.array[1]=res.data;
      that.setData({xuanchuan:res.data,multiArray:temp.multiArray,rangeArray:temp.array})
      
      
  }).catch(res => {
  })
    app.requestGet("https://juyou.17lhd.com/juyou/api/activitySocialAffair/list").then(res => {
      var temp = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };
      temp.multiArray[1]=res.data;
      that.setData({shejiao:res.data,multiArray:temp.multiArray})

    }).catch(res => {
    })

    app.requestGet("https://juyou.17lhd.com/juyou/api/enterpriseCertification/auditPassList").then(res => {
      console.log(res)
      for (let index = 0; index < res.data.length; index++) {
        that.data.faburenrange.push(res.data[index])
       
        
      }
      that.data.faburenrange.push({id:0,companyName:"个人账户"})
      that.data.faburenrange.push({id:-1,companyName:"匿名"})
      that.setData({faburenrange:that.data.faburenrange})
      console.log(that.data.faburenrange)
    }).catch(res => {
    })
    app.requestGet("https://juyou.17lhd.com/juyou/api/activityVolunteerRecruitment/list").then(res => {
      var temp = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };
      temp.multiArray[2]=res.data;
      that.setData({zhiyuan:res.data,multiArray:temp.multiArray})

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

  inputzhuti:function(e){
    if(e.detail.value.length>0){
    this.data.onzhuti=1;
    this.data.zhuti=e.detail.value;}
    else{
      
    this.data.onzhuti=0;
    }
  },
 
  inputshuoming:function(e){
    if(e.detail.value.length>0){
      this.data.onshuoming=1;
      this.data.shuoming=e.detail.value;}
      else{
        
      this.data.onshuoming=0;
      }
  },

  uploadonebyone:function (counter) {
    var that = this;
    

    wx.uploadFile({
      filePath:that.data.fujiantotallist[counter],
      header: {
        
        "Token":getApp().globalData.token
      },
      name: 'enclosure',
      url: 'https://juyou.17lhd.com/juyou/api/enclosure/upload',
      success:function(e){
        console.log(e)
        var idfujian  = JSON.parse(e.data).data
        
        console.log(idfujian)
        that.data.fujianidlist.push(idfujian)
        
       
      },
  
      complete:function (e) {
        counter++;
        if(counter==that.data.fujiantotallist.length){
          wx.showToast({
            title: '上传完成',
            icon:'none',
            duration:500,
          })
        }else{
          that.uploadonebyone(counter)
        }
        
      }
  
  })
    

    
  }
 
})



