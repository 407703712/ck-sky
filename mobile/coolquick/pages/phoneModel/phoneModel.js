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
    ],
    isInput:false,
    inputback:false,
    searchItems:[]
  },
  selectBrand:function(e){ //点击切换机型展示页
    var self=this;
    var selectActive = e.currentTarget.dataset.id;  //获取自定义的ID值  
    var phoneid=e.currentTarget.dataset.phoneid; 
    this.setData({
      selectActive: selectActive
    })
    // if (selectActive=="2"){
    //   var xiaomiDatas = [
    //     { "img": "../images/img_mobile_5.png", "name": "老子是小米 5" },
    //     { "img": "../images/img_mobile_6p.png", "name": "iphone 6p" },
    //     { "img": "../images/img_mobile_6s.png", "name": "iphone 6S" },
    //     { "img": "../images/img_mobile_5.png", "name": "iphone 5" },
    //     { "img": "../images/img_mobile_6p.png", "name": "iphone 6p" },
    //   ]
    //   this.setData({
    //     showLogos: xiaomiDatas
    //   })
    // }else{
    //   const initDatas = self.data.initDatas;
    //   this.setData({
    //     showLogos: initDatas
    //   })
    // } 
    var obj={
      url:"https://apikk.zikang123.com/mobile/series",
      data:{
        brand_id:phoneid
      },
      success:function(res){
        console.log("选中对应侧边栏手机型号展示对应图文数据：",res);
        if (res.data.errno==200) {
          var data=res.data.datas;
          for(var x in data){
            data[x].img="https://apikk.zikang123.com"+data[x].img;
          }
          self.setData({
            showLogos:data
          })
        }
      }
    }
        wx.request(obj);
  },
  searchStarting:function(e){
    var self=this;
    self.setData({
      isInput:true
    });
    var obj={
      url:"https://apikk.zikang123.com/mobile/series_search",
      data:{
        series_name:e.detail.value
      },
      success:function(res){
        console.log("手机型号搜索返回数据",res.data.datas)
        if(res.errno==200){
          self.setData({
            searchItems:res.data.datas
          })
        }
      }
    };
    wx.request(obj);
  },
  searchfocus:function(){
    var self=this;
    self.setData({
      isInput:true,
      inputback:true
    });

  },
  searchblur:function(){
    var self=this;
    self.setData({
      isInput:false,
      inputback:false
    });
  },
  goIndex:function(e){
    var message = e.currentTarget.dataset.message;  //获取自定义的flag值  
    var Index='../index/index?'+message;
    wx.reLaunch({
      url:Index
    });
  },
  hideLayer:function(){
    this.setData({
      isInput:false,
      inputback:false
    })
  },
  onLoad:function(){
    var self=this;
    var obj={
      url:"https://apikk.zikang123.com/mobile/brand",
      method:'GET',
      header: {  
        'content-type': 'application/json'  
      },  
      success:function(res){
        console.log("手机侧边栏型号数据：",res);
        if (res.data.errno==200) {
          var data=res.data.datas;
          var sliders=[];
          for(var x in data){
            sliders.push(data[x].name);
          }
          self.setData({
            sliders: res.data.datas
          })
        }else{
          wx.showToast(res.data.info)
        }
      }
    };
    var obj1={
      url:"https://apikk.zikang123.com/mobile/series",
      data:{
        brand_id:1
      },
      success:function(res){
        console.log("手机型号图文数据：",res);
        if (res.data.errno==200) {
          var data=res.data.datas;
          for(var x in data){
            data[x].img="https://apikk.zikang123.com"+data[x].img;
          }
          self.setData({
            showLogos:data
          })
        }
      }
    }
    wx.request(obj);
    wx.request(obj1);
  }
 
})
