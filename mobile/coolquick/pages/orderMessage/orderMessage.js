//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   	shopMessage:[
   	{"name":"门店地址","content":"广东省佛山也广东鸿是也"},
   	{"name":"服务时间","content":"10:00-22:22"},
   	{"name":"联系电话","content":"010-249945451"}
   	],
   	faultMessage:[
   	{"name":"手机型号","content":"Iphone6S"},
   	{"name":"手机型号","content":"Iphone6S"},
   	{"name":"手机型号","content":"Iphone6S"},
   	{"name":"手机型号","content":"Iphone6S"},
   	{"name":"手机型号","content":"Iphone6S"},
   	],
   	orderState:true,
   	showLayer:false,
   	items: [
      {name: 'USA', value: '超出了上门维修的范围',},
      {name: 'CHN', value: '下错单了', checked: 'true'},
      {name: 'BRA', value: '不想到店维修'},
      {name: 'JPN', value: '等待时间太久'},
      {name: 'ENG', value: '设备已恢复正常'},
      {name: 'TUR', value: '不放心取机维修'},
    ]
  },
  closeLayer:function(){
  	this.setData({
  		showLayer:false
  	})
  },
  goSuccess:function(){
    wx.navigateTo({
      url:'../success/success'
    });
    wx.setNavigationBarTitle({
      title: '下单成功'//页面标题为路由参数
    });
  },
  showLayer:function(){
  	this.setData({
  		showLayer:true
  	})
  },
  onLoad:function(){
  }
 
})
