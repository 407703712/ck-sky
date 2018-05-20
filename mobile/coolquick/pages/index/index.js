//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '../images/home_img_banner.png',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    circular:true,
    phoneLogo:'../images/home_img_mobile.png',
    phoneModel:"iPhone 7",
    faultArr:["屏幕故障","升级内存","屏幕故障","升级内存","屏幕故障","升级内存","屏幕故障","升级内存",],
    showMoney:"￥0.00"
  },
  goSelect:function(){
    wx.navigateTo({
      url:'../phoneModel/phoneModel'
    })
  }
 
})
