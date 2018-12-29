//app.js
App({
  onLaunch: function () {
    this.getUserInfo();
    this.checkIsIPhoneX();
  },

  getUserInfo : function(){
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                // console.debug('useInfoReady')
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  checkIsIPhoneX: function () {
    const self = this;    
    wx.getSystemInfo({
      success: function (res) {
        // 根据 model 进行判断
        if (res.model.search('iPhone X') != -1) {
          self.globalData.isIphoneX = true;
        }
        // 或者根据 screenHeight 进行判断
        // if (res.screenHeight == 812) {
        //   self.globalData.isIPX = true
        // }
      }
    })
  },

  //http://veron.tirozhang.com/miniprogram/premier_league/
  //http://127.0.0.1/HTML5/MiniProgram/_demo_images/premier_league/
  globalData: {
    assetsUrl: "http://veron.tirozhang.com/miniprogram/premier_league/photos/",
    isIphoneX: false, // 当前设备是否为 iPhone X
    userInfo: null
  }
})