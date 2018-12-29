# 微信小程序：入门学习

### 功能：
这是一款关于曼城球队、球员的介绍小程序。首页，包含：球员轮播图、球员列表，点击它们可以切换到球员详情页面。球员详情页，除了可以看到球员详情资料外，还可以点击收藏按钮，进行球员收藏。收藏后，点击 tabbar 我的，即可在我的收藏中看到收藏的球员。

### 技术要点：
- 轮播图：使用 Swiper 组件，并且根据图片比例，动态设置了 Swiper 的 Height，从而等比缩放观看图片。
- 收藏与不收藏：该功能使用的是 LocalStorage 本地存储，将用户收藏的记录存放于本地存储中。
- 获取用户头像及昵称：参考了微信官方例子，如未曾授权，点击按钮进行授权；如已授权，直接显示用户信息。

### Cookbook:
#### 条件渲染-三元写法
三元运算符还有一个常用的使用场景是控件class样式输出，达到jQuery.addClass()的效果。

==注意:== **success_circle 值要包裹在引号之中**。小程序实际支持了三元运算符写法，只是文档上没有明说，比较遗憾
```
<icon class="icon" type="{{isDefault? 'success_circle' : 'circle'}}"/>
<view class="button_wrapper {{isIphoneX ? 'p-iphonex' : ''}}"></view>
```

---

#### 获得节点 data 属性（data-*）
==注意==：获得节点信息 - dataset.属性，注意“属性”会自动变为小写，避免混乱，==data-属性名全部小写==

```html
<!--index.wxml-->
<button bindtap="gotoPageDetail" data-itemid="1">Book-1 Detail</button>
```

```javascript
//index.js
gotoPageDetail : function(event){
    var itemId = event.target.dataset.itemid;
    wx.navigateTo({
      url: '../detail/detail?id=' + itemId
    })
}
```
---
#### 动态设置 Swiper 高度
index.wxml
```html
<!--index.wxml-->
<swiper indicator-dots="true" duration="100" autoplay="{{autoplay}}" interval="{{interval}}" style="height:{{swiperHeight}}px;"  >
    <block wx:for="{{imgUrls}}" wx:key="*this">
      <swiper-item>
        <image src="{{item}}" class="auto-image" />
      </swiper-item>
    </block>
  </swiper>
```

```javascript
//index.js
Page({
  data: {
    autoplay: false,
    interval: 3000,
    swiperHeight : 150,
    imgUrls: [
      'http://127.0.0.1/HTML5/MiniProgram/_demo_images/premier_league/carousel/B_Silver_Player.jpg',
      'http://127.0.0.1/HTML5/MiniProgram/_demo_images/premier_league/carousel/Sane_Player.jpg',
      'http://127.0.0.1/HTML5/MiniProgram/_demo_images/premier_league/carousel/D_Silver_Player.jpg'
    ]
  },

  //设置轮播容器的高度
  setSwiperHeight: function () {
    var sysInfo = wx.getSystemInfoSync();
    var screenWidth = sysInfo.windowWidth;
    var imageScale = 0.5;
    this.setData({
      swiperHeight: screenWidth*0.5
    })
  }
  
  onLoad: function () {
    this.setSwiperHeight()
  }
})
```

---
#### rich-text 显示 html 标签内容
rich-text, 只需要给nodes属性赋值要渲染的html节点数组或者直接是html代码即可.

==注意==：全局支持class和style属性，不支持id属性，并且 class 只能一层，不能嵌套。

[查看详情](https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html)

---
#### LocalStorage 本地存储
- getStorageInfoSync() : 实时获取当前storage的相关信息
- setStorageSync(string key, any data) ：实时将数据存储在本地缓存中指定的 key 中。

###### example : 初始化一个 storage

```javascript
setStorageBookCollectedList : function(){
    if(!wx.getStorageSync("bookCollectedList")){
      var obj = {
        book : []
      }; 
      wx.setStorageSync("bookCollectedList", obj)
    }
}
```

###### example : storage 读取与更新

```
//读取
var listBookCollected = wx.getStorageSync("bookCollectedList").book;

//更新
setBookCollectedStorage : function(listBookCollected){
var obj = {
  book : listBookCollected
}; 
wx.setStorageSync("bookCollectedList", obj)
}
```

[查看详情](https://developers.weixin.qq.com/miniprogram/dev/api/wx.getStorageInfoSync.html)


---
#### 获取是否为 iPhoneX
app.js
```javascript
App({
  onLaunch: function () {
    this.checkIsIPhoneX();
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

  globalData: {
    isIphoneX: false, // 当前设备是否为 iPhone X
  }
})
```
