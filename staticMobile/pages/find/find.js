//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    listDatas:[
      {'img':"../images/img19.jpg",'title':'课程标题','content':'课程简介课程简介课程简介课程简介课程简介。','studynum':'4553'},
      {'img':"../images/img19.jpg",'title':'课程标题','content':'课程简介课程简介课程简介课程简介课程简介。','studynum':'4553'},
      {'img':"../images/img19.jpg",'title':'课程标题','content':'课程简介课程简介课程简介课程简介课程简介。','studynum':'4553'},
      {'img':"../images/img19.jpg",'title':'课程标题','content':'课程简介课程简介课程简介课程简介课程简介。','studynum':'4553'},
      {'img':"../images/img19.jpg",'title':'课程标题','content':'课程简介课程简介课程简介课程简介课程简介。','studynum':'4553'},
      {'img':"../images/img19.jpg",'title':'课程标题','content':'课程简介课程简介课程简介课程简介课程简介。','studynum':'4553'},
      {'img':"../images/img19.jpg",'title':'课程标题','content':'课程简介课程简介课程简介课程简介课程简介。','studynum':'4553'},
      {'img':"../images/img19.jpg",'title':'课程标题','content':'课程简介课程简介课程简介课程简介课程简介。','studynum':'4553'},
    ]
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: '发现' })
  }
})
