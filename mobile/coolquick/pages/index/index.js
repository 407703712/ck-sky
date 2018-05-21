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
    showLayer:false,
    phoneLogo:'../images/home_img_mobile.png',
    phoneModel:"iPhone 7",
    faultArr:["屏幕故障","升级内存","屏幕故障","升级内存","屏幕故障","升级内存","屏幕故障","升级内存",],
    showMoney:"￥0.00",
    isYuyue:false,
    items: [
      {name: 'USA', content: '超出了上门维修的范围',price:"￥99.00"},
      {name: 'CHN', content: '下错单了',price:"￥99.00"},
      {name: 'BRA', content: '不想到店维修',price:"￥99.00"},
      {name: 'JPN', content: '等待时间太久',price:"￥99.00"},
      {name: 'ENG', content: '设备已恢复正常',price:"￥99.00"},
      {name: 'TUR', content: '不放心取机维修',price:"￥99.00"},
    ],
    descriptsTxt:"1：大阿斯达阿斯达阿斯达哇所多阿斯达䦺地方水电费；2：何贵何贱同一句话铁公鸡一发过火头发；3：电饭锅热点覆盖人地方电饭锅帝国电饭锅",
  },
  checkboxChange: function(e) {
    var self=this;
    var arrs=this.data.items;
    var lastName=e.detail.value[e.detail.value.length-1];
    for (var x in arrs) {
      if (lastName==arrs[x].name) {
        arrs[x]['checked']=true;
      }else{
        arrs[x]['checked']=false;
      }
    }
    self.setData({
          items:arrs,
    })
  },    
  closeLayer:function(){
    this.setData({
      showLayer:false
    })
  },
  showLayer:function(){
    this.setData({
      showLayer:true
    })
  },  
  goSelect:function(){
    wx.navigateTo({
      url:'../phoneModel/phoneModel'
    });
    wx.setNavigationBarTitle({
      title: '选择机型'//页面标题为路由参数
    })
  },
  goPlaceOrder:function(){
    wx.navigateTo({
      url:'../placeOrder/placeOrder'
    });
    wx.setNavigationBarTitle({
      title: '维修方案'//页面标题为路由参数
    })
  }
 
})
