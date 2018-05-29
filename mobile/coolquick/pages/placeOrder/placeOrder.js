//index.js
//获取应用实例
const app = getApp();
const date = new Date();
const dates = [];
const hours = [];
const todayTamp=new Date().getTime(); //当天时间戳
const afterOneMTamp=todayTamp+30*(60*60*24)*1000; //30天后的时间戳
const afMon=new Date(afterOneMTamp).getMonth()+1;//30天后的月
const afDay=new Date(afterOneMTamp).getDate();//30天后的天
const cuMon=new Date().getMonth()+1;  //当前月
const cuDay=new Date().getDate(); //当前天
const cuYear=new Date().getFullYear(); //当前年
let isChange=false;//时间选择器是否变化
const maxDayFun=(cuYear,cuMon)=>{
  return new Date(cuYear, cuMon, 0).getDate();
}
const maxDay=maxDayFun(cuYear,cuMon); //当前月最大天数
for (let i = cuDay ; i <= maxDay; i++) {
  const names=cuMon+"月"+i+"日";
  dates.push(names);
}

for (let i = 1 ; i <= afDay; i++) {
  const names=afMon+"月"+i+"日";
  dates.push(names);
}

for (let i = 10 ; i <= 22; i++) {
  const names=i+":00";
  hours.push(names);
}

Page({
  data: {
    moneyNum:"￥99.00",
    selectActive:0, //当前选中的slider索引值
    phoneColors:[{color:"金色",id:1}],
    repairMethod:["上门维修","到店维修","邮寄维修","现场维修"],
    activeIndexC:0, //当前选中手机颜色
    activeIndexM:0, //当前选中维修方式
    isShangmen:true,
    isDaodian:false,
    isYouji:false,
    isXianchang:false,
    showLayer:false,
    isGetShop:false,
    gzLists:[],
    showDateLayer:false,
    dates: dates,
    hours: hours,
    value: [0, 0],
    setDate:false,
    realName:'',
    mobile:'',
    remark:'',
    emailgetname:'',
    emailgetphone:'',
    emailgetaddres:'',
    colorid:1
  },
  selectColors:function(e){ //点击切换机身颜色
    var self=this;
    var selectActive = e.currentTarget.dataset.id;  //获取自定义的ID值的ID值  
    var colorid = e.currentTarget.dataset.colorid;  //获取colorid
    this.setData({
      activeIndexC: selectActive,
      colorid:colorid
    });
  },
  closeListLayer:function(){
    this.setData({
      showListLayer: false
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
        console.log("获取权限返回",res);
         if (res.authSetting['scope.address']||res.authSetting['scope.userLocation']) {
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
  checkboxChange:function(e){
    var selectd=e.detail.value.length?true:false;
    // console.log(e.detail.value.length);
    this.setData({
      isAgree:selectd
    })
  },
  goIndex:function(){
    wx.navigateBack({
      delta:1
    });
    // wx.setNavigationBarTitle({
    //   title: '酷快手机维修'//页面标题为路由参数
    // })
  },
  showGzList:function(){
    this.setData({
        showListLayer:true,
      });
  },
  //显示日期选择插件
  showDateLayerFun:function(){
    this.setData({
      showDateLayer:true
    });
  },
  //隐藏日期选择插件
  hideDateLayerFun:function(){
    this.setData({
      showDateLayer:false
    });
  },
  //选择时间
  bindChange: function(e) {
    const val = e.detail.value;
    isChange=true;
    console.log(val);
    this.setData({
      date: this.data.dates[val[0]],
      hour: this.data.hours[val[1]]
    })
  },
  enterDate:function(){
    if(!isChange){
      this.setData({
        date:dates[0],
        hour:hours[0]
      })
    }
    this.setData({
      showDateLayer:false,
      setDate:true
    })
  },
  //提交订单
  goOrderMessage:function(){
    var self=this;
    var isGo=this.data.isAgree;
    var real_name="";//用户姓名
    var mobile=""; //用户号码
    //表单校验开始
    if (self.data.activeIndexM==0) { //上门维修
      if (!self.data.isGetAdress||!self.data.setDate) {
        wx.showModal({
          title: '提示',
          content: '请填写服务地址与上门时间',
          showCancel:false
        })
        return false;
      }
     real_name=self.data.getname;
     mobile=self.data.getphone;
    }else if(self.data.activeIndexM==1){//到店维修
      if (!self.data.isGetAdress||self.data.realName==""||self.data.mobile=="") {
        wx.showModal({
          title: '提示',
          content: '请填写您的姓名、电话与所选门店！',
          showCancel:false
        })
        return false;
      }
      real_name=self.data.realName;
      mobile=self.data.mobile;
    }else if(self.data.activeIndexM==2){//邮寄维修
      if (!self.data.isGetEmail) {
        wx.showModal({
          title: '提示',
          content: '请填写您的回寄地址！',
          showCancel:false
        })
        return false;
      }
      real_name=self.data.emailgetname;
      mobile=self.data.emailgetphone;
    }else if(self.data.activeIndexM==3){//现场维修
      if (self.data.emailgetname==""||self.data.emailgetphone==""||self.data.emailgetaddres=="") {
        wx.showModal({
          title: '提示',
          content: '请填写您的姓名、电话与工程师编号！',
          showCancel:false
        })
        return false;
      }
      real_name=self.data.realName;
      mobile=self.data.mobile;
    }
    if (!isGo) {
      wx.showModal({
        title: '提示',
        content: '请先同意相关用户协议！',
        showCancel:false
      });
      return false;
    }
    var repair_type=parseInt(self.data.activeIndexM)+1;
    var phoneColors=self.data.phoneColors;
    var remark=self.data.remark;
    var obj={
      url:"https://apikk.zikang123.com/mobile/order",
      data:{
        openid:getApp().globalData.openId,
        problem:getApp().globalData.problem||1,
        shop_id:self.data.shopId||1,
        color:self.data.colorid,
        repair_type:repair_type,
        real_name:real_name,
        mobile:'13528456331',
        remark:remark
      },
      success:function(res){
        console.log("提交订单返回信息：",res);
        if (res.data.errno==200) {
          var order_no=res.data.datas.order_no;
          wx.navigateTo({
            url:'../orderMessage/orderMessage?order_no='+order_no
          });
          wx.setNavigationBarTitle({
            title: '订单详情'//页面标题为路由参数
          });
        }else{
          wx.showModal({
            title:"提示",
            content:res.data.info,
            showCancel:false
          })
        }
      }
    }
    wx.request(obj);
   
  },
  onLoad:function(option){
    var self=this;
    // var query=option.query;
    if (option.allMoney) { //如果是从index页跳转进来
      var allItems=JSON.parse(option.allItems);
      var gzLists=[];
      for(var x in allItems){
        for(var y in allItems[x]){
          if(allItems[x][y]){
            var obj={"name":allItems[x][y].content,"price":allItems[x][y].price}
            gzLists.push(obj);
          }
        }
      }
      console.log("gzLists",gzLists);
      this.setData({
        moneyNum:option.allMoney,
        phoneName:option.phoneName,
        gzLists:gzLists
      });
    }
    //手机可选颜色初始化
    var obj={
      url:"https://apikk.zikang123.com/mobile/color",
      data:{
        series_id:1
      },
      success:function(res){
        console.log("手机可选颜色数据：",res);
        // self.setData({
        //   phoneColors:res.data.datas
        // })
      }
    };
    wx.request(obj);
    console.log("其他页面跳转维修方案页传输的数据",option);
    if (option.shopAddress) { //从选择店铺页跳转过来
      this.setData({
        activeIndexM:1,
        isShangmen:false,
        isDaodian:true,
        isYouji:false,
        isXianchang:false,

      })
    }
    
  }
 
})
