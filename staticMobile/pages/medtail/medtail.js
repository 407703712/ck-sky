//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    listDatas:[
      {'img':"../images/img19.jpg",'title':'刘思高','content':'在讨论组中提交了新的观点','time':'刚刚'},
      {'img':"../images/img19.jpg",'title':'刘思高','content':'完成了本日作业，获得98分','time':'20分钟前'},
      {'img':"../images/img19.jpg",'title':'刘思高','content':'完成了本日作业，获得97分','time':'3小时前'},
      {'img':"../images/img19.jpg",'title':'刘思高','content':'加入了新讨论组','time':'1天前'},
      {'img':"../images/img19.jpg",'title':'刘思高','content':'在讨论组中提交了新的观点','time':'1天前'},
      {'img':"../images/img19.jpg",'title':'刘思高','content':'在讨论组中提交了新的观点','time':'1天前'},
      {'img':"../images/img19.jpg",'title':'刘思高','content':'在讨论组中提交了新的观点','time':'1天前'},
      {'img':"../images/img19.jpg",'title':'刘思高','content':'在讨论组中提交了新的观点','time':'1天前'},
    ]
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: '我的' })
  }
})
