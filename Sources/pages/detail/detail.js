// pages/detail.js
const prjData = (require('../../model/prjdata.js')).ProjectData;
const app = getApp();
Page({
  data: {
    bookId : 0,
    playerInfo : {},
    collected : false,
    isIphoneX : false
  },

  clickCollect : function(event){
    if(this.data.collected){
      this.setData({
        collected : false
      })
    }else{
      this.setData({
        collected : true
      })
    }
    //
    
    var listBookCollected = wx.getStorageSync("bookCollectedList").book;
    if(listBookCollected.length == 0){
      if(this.data.collected){
        console.debug('Create List :: 第一次收藏')
        listBookCollected.push(this.data.bookId);
        this.setBookCollectedStorage(listBookCollected);
      }
    }else{
      for (var i = 0; i < listBookCollected.length; i++) {
        if(listBookCollected[i] == this.data.bookId){
          if (!this.data.collected) {
            console.debug('不再收藏');
            listBookCollected.splice(i, 1);
            this.setBookCollectedStorage(listBookCollected);
          }
        }else{
          if(this.data.collected){
            console.debug('收藏')
            listBookCollected.push(this.data.bookId)
            this.setBookCollectedStorage(listBookCollected);
            break;
          }
        }
      }
    }
    
  },

  setBookCollectedStorage : function(listBookCollected){
    var obj = {
      book : listBookCollected
    }; 
    wx.setStorageSync("bookCollectedList", obj)
  },

  /**
   * Get InitCollected
   */
  getInitCollected : function(queryId){
    var collected = false;
    var listBookCollected = wx.getStorageSync("bookCollectedList").book;
    for (var i = 0; i < listBookCollected.length; i++) {
      if(listBookCollected[i] == queryId){
        collected = true;
        break;
      }
    }
    return collected;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var queryId = parseInt(options.id);
    var playerInfo = prjData.listPlayers[queryId];
    //
    var collected = this.getInitCollected(queryId);
    //
    this.setData({
      bookId : queryId,
      playerInfo : playerInfo,
      collected : collected,
      isIphoneX: app.globalData.isIphoneX
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

  }
})