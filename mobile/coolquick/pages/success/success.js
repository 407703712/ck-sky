//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    listsData:[
     {"shopName":"深圳直营店","address":"广东省深圳市福田华强北山寨基地帝国大厦101室","time":"10:00-19:00","traffic":"地铁7号线华强北站D2出口"},
    ]
  },
  goIndex:function(){
  	wx.reLaunch({
      url:'../index/index'
    });
    wx.setNavigationBarTitle({
      title: '酷快手机维修'//页面标题为路由参数
    })
  },
  goback:function(){
  	wx.navigateBack({
	  delta: 1
	})
  },
  onLoad:function(){
  }
 
})
