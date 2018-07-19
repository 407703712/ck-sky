//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    circular:true,
    indicatorColor:"#C4C4C4",
    indicatorActiveColor:"#1B7ED5",
    swiperItems:[{'img':'../images/banner1.png'},{'img':'../images/banner1.png'},{'img':'../images/banner1.png'}]
  },
  goPartIndex:function(){
    wx.navigateTo({
      url: '/pages/partindex/partindex'
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: '首页' })
  }
})
