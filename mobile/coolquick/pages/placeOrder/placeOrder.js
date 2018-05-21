//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    moneyNum:"￥99.00",
    selectActive:0, //当前选中的slider索引值
    phoneColors:["深空灰色","银色","金色"],
    repairMethod:["上门维修","到店维修","邮寄维修","现场维修"],
    activeIndexC:0,
    activeIndexM:0
  },
  selectColors:function(e){ //点击切换机身颜色
    var self=this;
    var selectActive = e.currentTarget.dataset.id;  //获取自定义的ID值的ID值  
    this.setData({
      activeIndexC: selectActive
    });
  },
  selectMethods:function(e){ //点击切换维修方式
    var self=this;
    var activeIndexM = e.currentTarget.dataset.id;  //获取自定义的ID值  
    this.setData({
      activeIndexM: activeIndexM
    });
  },
  onLoad:function(){
  }
 
})
