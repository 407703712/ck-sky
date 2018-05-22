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
    activeIndexM:0,
    isShangmen:true,
    isDaodian:false,
    isYouji:false,
    isXianchang:false,
    showLayer:false,
    isGetShop:false
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
    switch (activeIndexM) {
      case 0:
          this.setData({
            isShangmen:true,
            isDaodian:false,
            isYouji:false,
            isXianchang:false
          });
          break;
       case 1:
          this.setData({
            isShangmen:false,
            isDaodian:true,
            isYouji:false,
            isXianchang:false
          });    
        break;
      case 2:
          this.setData({
            isShangmen:false,
            isDaodian:false,
            isYouji:true,
            isXianchang:false
          });    
        break;
      case 3:
          this.setData({
            isShangmen:false,
            isDaodian:false,
            isYouji:false,
            isXianchang:true
          });    
        break;    
      default:
        this.setData({
            isShangmen:true,
            isDaodian:false,
            isYouji:false,
            isXianchang:false
          });
        break;
    }
  },
  goAddress:function(e){
    var self=this;
    var setFlag = e.currentTarget.dataset.flag;  //获取自定义的flag值  
    wx.getSetting({
      success: (res) => {
         if (res.authSetting['scope.address']) {
            wx.chooseAddress({
              success:function(res){
                var name=res.userName;
                var phone=res.telNumber;
                var address=res.detailInfo;
                  if (setFlag=="address") {
                     self.setData({
                        getname:name,
                        getphone:phone,
                        getaddress:address,
                        isGetAdress:true
                     }); 
                  }else if(setFlag=="email"){
                     self.setData({
                        emailgetname:name,
                        emailgetphone:phone,
                        emailgetaddres:address,
                        isGetEmail:true
                     }); 
                  }
              },
              fail:function(res){
                  self.setData({
                    isGetAdress:false,
                    isGetEmail:false
                  });
                
                // if (res.errMsg=="chooseAddress:fail cancel") {
                //   console.log(res);
                // }else{
                //   wx.showToast({
                //     title:res.errMsg
                //   })
                // }
              }
            })
         }else{
            self.setData({
              showLayer:true
            })
         }
      }
    })
  },
  hideLayer:function(){
    this.setData({
      showLayer: false
    });
  },
  goSelectShop:function(){
    wx.navigateTo({
      url:'../selectShop/selectShop'
    });
    wx.setNavigationBarTitle({
      title: '门店列表'//页面标题为路由参数
    })
  },
  goIndex:function(){
    wx.navigateTo({
      url:'../index/index'
    });
    wx.setNavigationBarTitle({
      title: '酷快手机维修'//页面标题为路由参数
    })
  },
  onLoad:function(option){
    // var query=option.query;
    console.log(option);
    if (option.shopAddress) {
      this.setData({
        isGetShop:true,
        activeIndexM:1,
        shopAddress:option.shopAddress,
        shopTime:option.shopTime,
        shopPhone:option.shopPhone,
        isShangmen:false,
        isDaodian:true,
        isYouji:false,
        isXianchang:false
      })
    }
    
  }
 
})
