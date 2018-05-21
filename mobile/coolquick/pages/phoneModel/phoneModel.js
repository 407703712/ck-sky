//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    sliders: ["苹果", "三星", "小米", "华为", "OPPO", "VIVO", "魅族", "索尼爱立信", "苹果", "三星", "小米", "华为", "OPPO", "VIVO", "魅族", "索尼爱立信"],
    slidersHeight:"auto",
    selectActive:0, //当前选中的slider索引值
    showLogos:[
      {"img":"../images/img_mobile_5.png","name":"iphone 5"},
      {"img": "../images/img_mobile_6p.png", "name": "iphone 6p"},
      {"img": "../images/img_mobile_6s.png", "name": "iphone 6S"},
      { "img": "../images/img_mobile_5.png", "name": "iphone 5" },
      { "img": "../images/img_mobile_6p.png", "name": "iphone 6p" },
      { "img": "../images/img_mobile_6s.png", "name": "iphone 6S" },
      { "img": "../images/img_mobile_5.png", "name": "iphone 5" },
      { "img": "../images/img_mobile_6p.png", "name": "iphone 6p" },
      { "img": "../images/img_mobile_6s.png", "name": "iphone 6S" },
      { "img": "../images/img_mobile_5.png", "name": "iphone 5" },
      { "img": "../images/img_mobile_6p.png", "name": "iphone 6p" },
      { "img": "../images/img_mobile_6s.png", "name": "iphone 6S" },
      ],
    initDatas: [
      { "img": "../images/img_mobile_5.png", "name": "iphone 5" },
      { "img": "../images/img_mobile_6p.png", "name": "iphone 6p" },
      { "img": "../images/img_mobile_6s.png", "name": "iphone 6S" },
      { "img": "../images/img_mobile_5.png", "name": "iphone 5" },
      { "img": "../images/img_mobile_6p.png", "name": "iphone 6p" },
      { "img": "../images/img_mobile_6s.png", "name": "iphone 6S" },
      { "img": "../images/img_mobile_5.png", "name": "iphone 5" },
      { "img": "../images/img_mobile_6p.png", "name": "iphone 6p" },
      { "img": "../images/img_mobile_6s.png", "name": "iphone 6S" },
      { "img": "../images/img_mobile_5.png", "name": "iphone 5" },
      { "img": "../images/img_mobile_6p.png", "name": "iphone 6p" },
      { "img": "../images/img_mobile_6s.png", "name": "iphone 6S" },
    ]
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
