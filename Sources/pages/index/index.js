//index.js
const prjData = (require('../../model/prjdata.js')).ProjectData;
//
const app = getApp();
Page({
  data: {
    motto: 'Hello World',
    autoplay: false,
    interval: 3000,
    swiperHeight : 150,
    imagesList:[
      { id: "0", src: app.globalData.assetsUrl + "carousel/B_Silver_Player.jpg"},
      { id: "1", src: app.globalData.assetsUrl + "carousel/Sane_Player.jpg"},
      { id: "2", src: app.globalData.assetsUrl + "carousel/D_Silver_Player.jpg"}
    ],
    playersList : prjData.listPlayers
  },

  //System Info
  sysInfo : null,

  //设置轮播容器的高度
  setSwiperHeight: function () {
    this.sysInfo = wx.getSystemInfoSync();
    var screenWidth = this.sysInfo.windowWidth;
    var imageScale = 0.5;
    this.setData({
      swiperHeight: screenWidth*0.5
    })
  },

  // 点击 Swiper Item 事件：
  onItemClick:function(event){
    //获得节点信息 - dataset.属性，注意“属性”会自动变为小写
    var itemId = event.target.dataset.itemid;
    console.debug('click item : ' + itemId)
    wx.navigateTo({
      url: '../detail/detail?id=' + itemId
    })
  },
  
  changeText : function(){
    this.setData({
      motto : "Hello My Friend"
    }, function(){
      console.debug("change text")
    })
  },

  gotoPageDetail : function(event){
    // console.debug('goto page-detail')
    var itemId = event.currentTarget.dataset.itemid;
    // console.debug(itemId)
    wx.navigateTo({
      url: '../detail/detail?id=' + itemId
    })
  },

  setStorageBookCollectedList : function(){
    if(!wx.getStorageSync("bookCollectedList")){
      var obj = {
        book : []
      }; 
      wx.setStorageSync("bookCollectedList", obj)
    }
  },

  onLoad: function () {
    this.setStorageBookCollectedList();
    //
    this.setSwiperHeight();
    //
    // this.testCase();
  },

  testCase : function(){
    var itemId = 5;
    wx.navigateTo({
      url: '../detail/detail?id=' + itemId
    })
  },

  onShow: function(){
    // console.debug("index :: onShow")
    
  }  
})
