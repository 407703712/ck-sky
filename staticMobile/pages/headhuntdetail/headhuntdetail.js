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
    ],
    textDemo:'1、本科或以上学历，艺术设计类相关专业毕业\n2、1年以上互联网UI设计经验，能独立完成设计方案；\n    3、掌握不同平台（IOS、Android、web）的设计规范，对界面设计、交互设计、用户体验有深入理解，能根据产品的需求给出合理、易用、美观的设计方案，并持续跟进、保证上线效果；\n    4、有专业的设计表达技巧、优秀的理解和沟通能力，能精准的叙述设计的内容以及思路，有卓越的执行力，大胆的创新能力，能与产品经理、开发工程师等进行高效的沟通与协作；\n    5. 精通Photoshop，Sketch，Illustrator等设计相关软件；\n    6. 请在简历中附上作品集~期待我们更好的相遇\n'
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: '猎头职位详情' })
  }
})
