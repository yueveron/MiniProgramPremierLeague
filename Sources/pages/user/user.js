const prjData = (require('../../model/prjdata.js')).ProjectData;
const app = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'), //return boolean : 当前版本是否支持 open-type.getUserInfo 方法
    collectionList : []
  },
  
  initCollectionData : function(){
    var listBookCollected = wx.getStorageSync("bookCollectedList").book;
    if(!listBookCollected) return;
    var collectionList = [];
    for (var i = 0; i < listBookCollected.length; i++) {
      var bookId = listBookCollected[i];
      var imgSrc = prjData.listPlayers[bookId].src;
      var name = prjData.listPlayers[bookId].name;
      var dataObj = {
        id : bookId,
        name : name,
        src: imgSrc
      }
      collectionList.push(dataObj)      
    }
    this.setData({
      collectionList : collectionList
    })
    // console.debug(this.data.collectionList)
  },

  gotoPageDetail : function(event){
    // console.debug('goto page-detail')
    var itemId = event.currentTarget.dataset.itemid;
    // console.debug(itemId)
    wx.navigateTo({
      url: '../detail/detail?id=' + itemId
    })
  },

  onLoad: function (options) {
    this.initUserInfo()
  },

  // 初始化用户信息：姓名及头像
  initUserInfo : function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      // console.debug('case :: canIUse')
      // 如果之前已授权，则 app.js 将 fire app.userInfoReadyCallback() 来显示用户信息
      app.userInfoReadyCallback = res => {
        // console.debug('res:', res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  // getUserInfo方法 为 button.open-type.getUserInfo 对应的回调方法，名字不能变动
  getUserInfo: function (e) {
    // console.log('getUserInfo:', e)
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },

  onShow: function () {
    // console.debug('user page :: onShow: set collectionList')
    this.initCollectionData();
  }
  
})