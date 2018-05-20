//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    moneyNum:"￥99.00",
    selectActive:0, //当前选中的slider索引值
  },
  selectBrand:function(e){ //点击切换机型展示页
    var self=this;
    var selectActive = e.currentTarget.dataset.id;  //获取自定义的ID值  
    this.setData({
      selectActive: selectActive
    })
    if (selectActive=="2"){
      var xiaomiDatas = [
        { "img": "../images/img_mobile_5.png", "name": "老子是小米 5" },
        { "img": "../images/img_mobile_6p.png", "name": "iphone 6p" },
        { "img": "../images/img_mobile_6s.png", "name": "iphone 6S" },
        { "img": "../images/img_mobile_5.png", "name": "iphone 5" },
        { "img": "../images/img_mobile_6p.png", "name": "iphone 6p" },
      ]
      this.setData({
        showLogos: xiaomiDatas
      })
    }else{
      const initDatas = self.data.initDatas;
      this.setData({
        showLogos: initDatas
      })
    } 
  },
  onLoad:function(){
  }
 
})
