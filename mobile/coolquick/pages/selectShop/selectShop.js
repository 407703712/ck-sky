//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    listsData:[
     {"shopName":"深圳直营店","address":"广东省深圳市福田华强北山寨基地帝国大厦101室","time":"10:00-19:00","traffic":"地铁7号线华强北站D2出口","phone":"13528456331"},
     {"shopName":"深圳直营店","address":"广东省深圳市福田华强北山寨基地帝国大厦102室","time":"10:00-19:00","traffic":"地铁7号线华强北站D3出口","phone":"13528456331"},
     {"shopName":"深圳直营店","address":"广东省深圳市福田华强北山寨基地帝国大厦103室","time":"10:00-19:00","traffic":"地铁7号线华强北站D4出口","phone":"13528456331"}
    ]
  },
  goLineMap:function(){
  	console.log(11);
  	wx.openLocation({
  		latitude:65,
  		longitude:65,
  		name:"喜马拉雅山",
  		address:"印第安纳斯山脉"
  	})
  },
  callPhone:function(){
  	wx.makePhoneCall({
  		phoneNumber:"13528456331"
  	})
  },
  goPlaceOrder:function(e){
    // var message = e.currentTarget.dataset.message;  //获取自定义的flag值  
    var shopAddress=e.currentTarget.dataset.shopaddress;
    var shopTime=e.currentTarget.dataset.shoptime;
    var shopPhone=e.currentTarget.dataset.shopphone;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
        shopAddress:shopAddress,
        shopTime:shopTime,
        shopPhone:shopPhone,
        isGetShop:true
    })
    // var placeOrderUrl='../placeOrder/placeOrder?'+message;
    console.log(shopAddress);
    wx.navigateBack({
      delta:1
    })
  },
  onLoad:function(){
  }
 
})
