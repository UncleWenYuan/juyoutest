// pages/huodongfabu/huodongfabu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canGo:0,
    fujianidlist:[],
    occupationID:null,
    name:"",
    longitude:"",
    latitude:"",
    qiandao:'',
    canFabu:1,
    baoming:'',
    education:null,
    index10:0,
    array1: ['不限','男', '女'],
    index1: 0,
    defaultValue1: "不限",
    currentTab1: 0,
    currentTab3: 0,
    currentTab11: 0,
    dituxuan: 0,
    multiArray: [[], [], []],
    multiIndex: [0, 0, 0],
    start: 0,
    jiaoyushuiping:'不限',
    congshihangye:'不限',
    address:'',
    age:[],
    array2: [],
    index2:0,
    defaultValue2: "65-70 周岁",
    currentTab2:0,
    currentTab1111:0,
    onQiandao:0,
    onBaoming:0,

    fujiantotallist:[],

    region:['','',''],
    custonItem: "全部",

    postParam:{"bonusStandard":"" ,"endTimeTimestamp":"" , "explain":"" , "imageId":"" , "peopleNumber":"" , "propagandaExperienceId":"" , "registrationDeadlineTimestamp":"" , "socialAffairId":"" , "startTimeTimestamp":"" , "theme":"" , "totalBonusBudget":"" , "volunteerRecruitmentId":"" , "addressCityId":"" , "addressCountyId":"" , "addressProvinceId":"" , "ageRangeId":"" , "educationId":"" , "enclosureId":"" , "enrollRange":"" , "gender":"" , "locationAddress":"" , "locationLatitude":"" , "locationLongitude":"" , "locationName":"" , "occupationId":"","anonymous":"","enterpriseCertificationId":""}

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
  bindPickerChange1: function (e) {

    let array = this.data.array1
    let index = e.detail.value
    this.setData({
      currentTab1: 1,
      defaultValue1: array[index]
    })
  }, 
  bindPickerChange2: function (e) {

    let array = this.data.array2
    let index = e.detail.value
    this.setData({
      currentTab2: 1,
      defaultValue2: array[index],
      index2:index
    })
  }, 

  bindPickerChange10: function (e) {
var that = this;
    let array = this.data.education
    let index = e.detail.value
    this.setData({
      currentTab11:1,
      indexEducation:e.detail.value,
      jiaoyushuiping: array[e.detail.value].name
    })
  }, 
  
  /**
   * 生命周期函数--监听页面加载
   */
zhiye:function(){
  wx:wx.navigateTo({
    url: '/pages/xuanzezhiye/xuanzezhiye',
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
},

  bindMultiPickerChange: function (e) {
    var that = this;
    this.setData({
      start: 1, currentTab3: 1,
      multiIndex: e.detail.value
    })
  },

  onLoad: function (options) {
    var app = getApp();
    var that = this;

    app.requestGet("https://juyou.17lhd.com/juyou/api/address/list?").then(res => {
      //请求成功，do something
      var temp = [{"name":"不限"}];
      temp = temp.concat(res.data);
      console.log(temp);
      that.data.multiArray[0]=temp;
  
      that.setData({ multiArray: that.data.multiArray })
    }).catch(res => {
    })
    
    app.requestGet("https://juyou.17lhd.com/juyou/api/education/list").then(res => {
    var temp = [{"name":"不限"}];
    temp = temp.concat(res.data);
    console.log(temp);
    that.setData({education:temp})
  }).catch(res => {
    console.log("fail");
  })

  app.requestGet("https://juyou.17lhd.com/juyou/api/ageRange/list").then(res => {
    // console.log(res.data);


    var temp = [{"name":"不限"}];
    temp = temp.concat(res.data);
    console.log(temp);
    that.setData({age:temp})
    

    

  }).catch(res => {
    console.log("fail");
  })


  },
  fabu:function(){
    let pages = getCurrentPages();
    var that = this;
    let prevPage = pages[pages.length - 2];
    var idImage = null;
    

    if (prevPage.route == "pages/huodongfabu2/huodongfabu2"&&that.data.canFabu==1) {
      that.data.canFabu=0;
    //prevPage.data.on1&&prevPage.data.on2&&prevPage.data.on3&&prevPage.data.on4&&prevPage.data.on5&&prevPage.data.on6&&prevPage.data.on7&&prevPage.data.onzhuti&&prevPage.data.onshuoming&&prevPage.data.ontupian
      wx.showToast({title: '上传中', icon: 'loading', duration: 10000});
      if(1){

        wx.uploadFile({
          filePath: prevPage.data.imageUrl,
          header: {
            
            "Token":getApp().globalData.token
       },
          name: 'image',
          url: 'https://juyou.17lhd.com/juyou/api/image/upload',
          success:function(e){
            console.log(e.data)
            idImage  = JSON.parse(e.data).data
            
          //on决定前一页每一项是否按标准填写了 确认后改写参数 发布
          that.data.postParam.imageId = idImage;
          that.data.postParam.theme = prevPage.data.zhuti;
          that.data.postParam.bonusStandard  = parseInt(prevPage.data.renshu2);
          that.data.postParam.explain  = prevPage.data.shuoming;
          that.data.postParam.peopleNumber  = parseInt(prevPage.data.renshu1);
          if(prevPage.data.rangeArray[0][prevPage.data.multiIndex[0]].name=="宣传体验")
          {
            that.data.postParam.propagandaExperienceId  = prevPage.data.rangeArray[1][prevPage.data.multiIndex[1]].id;
          }
          if(prevPage.data.rangeArray[0][prevPage.data.multiIndex[0]].name=="志愿招募")
          {
            that.data.postParam.volunteerRecruitmentId  = prevPage.data.rangeArray[1][prevPage.data.multiIndex[1]].id;
            
          }
          if(prevPage.data.rangeArray[0][prevPage.data.multiIndex[0]].name=="社交活动")
          {
            that.data.postParam.socialAffairId  = prevPage.data.rangeArray[1][prevPage.data.multiIndex[1]].id;
            
          }
            
         
          
            var repTime = prevPage.data.date3.replace(/-/g, '/');
            var timeTamp = Date.parse(repTime) ;
          that.data.postParam.registrationDeadlineTimestamp  =  timeTamp;



          var repTime = prevPage.data.date2+" "+prevPage.data.time2;
          repTime=repTime.replace(/-/g, '/');  
          var time = Date.parse(new Date(repTime)); 
          console.log(time)
          that.data.postParam.endTimeTimestamp  = time;



          var repTime = prevPage.data.date1+" "+prevPage.data.time1;
          repTime=repTime.replace(/-/g, '/');  
          var time = Date.parse(new Date(repTime)); 
          console.log(time)
          that.data.postParam.startTimeTimestamp  = time;


          that.data.postParam.totalBonusBudget  = parseInt(prevPage.data.renshu3);

            if(prevPage.data.faburenID==0){

            }else if(prevPage.data.faburenID==-1){

              that.data.postParam.anonymous = true;
            }else{

              that.data.postParam.enterpriseCertificationId = prevPage.data.faburenID;
            }


          
          
          if( that.data.multiArray[0][that.data.multiIndex[0]].name!="不限"){
          that.data.postParam.addressCityId = that.data.multiArray[1][that.data.multiIndex[1]].id;
          that.data.postParam.addressCountyId = that.data.multiArray[2][that.data.multiIndex[2]].id;
          that.data.postParam.addressProvinceId = that.data.multiArray[0][that.data.multiIndex[0]].id;
        }
          if(that.data.currentTab2==1&&that.data.age[that.data.index2].name!="不限"){

            that.data.postParam.ageRangeId = that.data.age[that.data.index2].id;
          }
          if(that.data.currentTab11==1&&that.data.education[that.data.indexEducation].name!="不限"){

          
          that.data.postParam.educationId = that.data.education[that.data.indexEducation].id;}

          
          that.data.postParam.enrollRange = that.data.baoming==""?"":parseInt(that.data.baoming)*1000;
          that.data.postParam.signInRange = prevPage.data.qiandao==""?"":parseInt(prevPage.data.qiandao)*1000;//zhuan meter
          
          if(that.data.defaultValue1=="女"){
            that.data.postParam.gender=2;

          }else if(that.data.defaultValue1=="男"){
            that.data.postParam.gender=1;
          }
          

          that.data.postParam.locationAddress = prevPage.data.address;
          that.data.postParam.locationLatitude = prevPage.data.latitude;
          that.data.postParam.locationLongitude = prevPage.data.longitude;
          that.data.postParam.locationName = prevPage.data.name;

          for (let index = 0; index < prevPage.data.fujianidlist.length; index++) {
            
            if(index==prevPage.data.fujianidlist.length-1){
              that.data.postParam.enclosureId+=prevPage.data.fujianidlist[index].toString();

            }
            else{that.data.postParam.enclosureId+=prevPage.data.fujianidlist[index].toString()+",";}
          }


          if(that.data.occupationID!=null&&that.data.congshihangye!="不限")
          that.data.postParam.occupationId = that.data.occupationID;
          var app = getApp();
            console.log(that.data.postParam)
          app.requestPost("https://juyou.17lhd.com/juyou/api/activity/release?", that.data.postParam).then(res => {
            wx.hideToast({
              complete: () => {

                wx.showToast({
                  title: res.msg,
                  icon:'none',
                  success:function(){



                    setTimeout(function() {
                      //请求成功，do something
                      console.log(res);
                                  
                      that.data.canFabu=1;

                      if(res.code==1){
                      wx.switchTab({
                        url: '/pages/shouye/shouye',
                        
                      })
                    }
                    }, 1000);
                      


                  }
                })
              },
            })
            
            
          }).catch(res => {
            that.data.canFabu==1
            console.log("fail");
          })


         

          }
        })
        

          
      }else{
        wx.showToast({
          title: '完成上一页信息',
          icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000     
        }) 
        that.data.canFabu=1;
      }
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
    console.log(this.data)
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
  bindMultiPickerColumnChange: function (e) {
    
    let that = this
    var app = getApp();
    that.setData({ start: 1 ,currentTab3: 1})

    // console.log(that.data.currentTab3)
    var temp = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    temp.multiIndex[e.detail.column] = e.detail.value;
    console.log(temp.multiIndex);
    if(this.data.multiIndex[0]!=0){//不限
      switch (e.detail.column) {
        case 0:
          //第一列改变  设置第二列数据

          app.requestGet("https://juyou.17lhd.com/juyou/api/address/list?", "superiorId=" + that.data.multiArray[0][temp.multiIndex[0]].id).then(res => {
            //请求成功，do something
            temp.multiArray[1] = res.data;
            that.setData({
              multiArray: temp.multiArray,
              multiIndex: temp.multiIndex
            })
            app.requestGet("https://juyou.17lhd.com/juyou/api/address/list?", "superiorId=" + that.data.multiArray[1][that.data.multiIndex[1]].id).then(res => {
              //请求成功，do something
              temp.multiArray[2] = res.data;
              that.setData({
                multiArray: temp.multiArray,
                multiIndex: temp.multiIndex
              })


            }).catch(res => {
            })

          }).catch(res => {
          })
          break;
        case 1:
          app.requestGet("https://juyou.17lhd.com/juyou/api/address/list?", "superiorId=" + that.data.multiArray[1][temp.multiIndex[1]].id).then(res => {
            //请求成功，do something
            temp.multiArray[2] = res.data;
            that.setData({
              multiArray: temp.multiArray,
              multiIndex: temp.multiIndex
            })


          }).catch(res => {
          })
          break;
        case 2:
          that.setData({
            multiArray: temp.multiArray,
            multiIndex: temp.multiIndex
          })
          break;
      }
    }else{
      var temp = that.data.multiArray;
      temp[1] = [];
      temp[2] = [];
      that.setData({multiArray:temp})
    }
    that.setData({
      multiArray: that.data.multiArray,
      multiIndex:  that.data.multiIndex
    })
  },

  bindMultiPickerChange: function (e) {
    var that = this;

    this.setData({ start: 1 })
    this.setData({
      multiIndex: e.detail.value
    })
  },
  
  baomingConfirm:function(e){
    if(e.detail.value.length>0){
      this.setData({onBaoming:1})
      this.data.baoming=e.detail.value;
      }else{
        this.setData({onBaoming:0})
      this.data.baoming=e.detail.value;
      }
  },
  baomingBlur:function(e){
    this.data.baoming=e.detail.value;
  },
  

  
  
  

})