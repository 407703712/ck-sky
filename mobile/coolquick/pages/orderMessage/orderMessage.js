//index.js
//获取应用实例
const app = getApp()
const urlhost=getApp().globalData.urlhost;
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
    ],
    address:''
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
  cancleOrder:function(){
    var self=this;
    var openId=getApp().globalData.openId;
    var obj={
      url:urlhost+"/mobile/chargeback",
      data:{
        openid:openId,
        order_no:this.data.order_no,
        reason:''
      },
      success:function(res){
        console.log("取消订单返回状态：",res);
        if(res.data.errno==200){
          self.setData({
            showLayer:false,
            orderState:false
          });
          wx.showToast({
            title:"取消订单成功！"
          })
        }
      }
    };
    wx.request(obj)
  },
  onLoad:function(option){
    var self=this;
    var order_no=option.order_no;
    var openId=getApp().globalData.openId;
    var obj={
      url:urlhost+"/mobile/order_detail",
      data:{
        openid:openId,
        order_no:order_no
      },
      success:function(res){
        console.log("订单详情数据接口：",res);
        if (res.data.errno==200) {
          // self.setData({
          //   address:res.data.datas.address,
          //   business_begin_time:res.data.datas.business_begin_time,
          //   business_end_time:res.data.datas.business_end_time,
          //   create_time:res.data.datas.create_time,
          //   door_to_door:res.data.datas.door_to_door,
          //   id:res.data.datas.id,
          //   intro:res.data.datas.intro,
          //   lat:res.data.datas.lat,
          //   lng:res.data.datas.lng,
          //   name:res.data.datas.name,
          //   status:res.data.datas.status,
          //   telephone:res.data.datas.telephone,
          //   traffic:res.data.datas.traffic,
          //   update_time:res.data.datas.update_time
          // });
          self.setData({
            address:res.data.datas.shop.address,
            business_begin_time:res.data.datas.shop.business_begin_time,
            business_end_time:res.data.datas.shop.business_end_time,
            door_to_door:res.data.datas.shop.door_to_door,
            intro:res.data.datas.shop.intro,
            name:res.data.datas.shop.name,
            telephone:res.data.datas.shop.telephone,
            traffic:res.data.datas.shop.traffic,
            price:res.data.datas.order.price,
            repair_type:res.data.datas.order.repair_type,
            status:res.data.datas.order.status,
            order_no:res.data.datas.order.order_no,
            remark:res.data.datas.user.remark,
          });
        }
      }
    }
    wx.request(obj);
  }
 
})
