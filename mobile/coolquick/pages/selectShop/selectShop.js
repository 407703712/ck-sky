//index.js
//获取应用实例
const app = getApp()
const urlhost=getApp().globalData.urlhost;
Page({
  data: {
    listsData:[]
  },
  goLineMap:function(e){
    var lat=parseInt(e.currentTarget.dataset.lat);
    var lng=parseInt(e.currentTarget.dataset.lng);
    var shopname=e.currentTarget.dataset.shopname;
    var shopaddress=e.currentTarget.dataset.shopaddress;
  	console.log("lat",lat);
  	wx.openLocation({
  		latitude:lat,
  		longitude:lng,
  		name:shopname,
  		address:shopaddress
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
    var shopId=e.currentTarget.dataset.shopid;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
        shopAddress:shopAddress,
        shopTime:shopTime,
        shopPhone:shopPhone,
        isGetShop:true,
        shopId:shopId
    })
    // var placeOrderUrl='../placeOrder/placeOrder?'+message;
    console.log(shopAddress);
    wx.navigateBack({
      delta:1
    })
  },
  onLoad:function(){
    var self=this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy;
        var obj={
          url:urlhost+"/mobile/shop",
          data:{
            lng:longitude,
            lat:latitude
          },
          success:function(res){
            console.log("门店列表展示数据：",res);
            self.setData({
              listsData:res.data.datas
            })
          }
        }
        wx.request(obj);
      }
    })
    
  }
})
