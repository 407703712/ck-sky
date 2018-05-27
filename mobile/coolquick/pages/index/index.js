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
    notYuyue:true,
    currentEnter:"", //当前点击故障问题按钮
    isEnter:[50,50,50,50,50,50,50,50],//确认选中故障问题的数组
    items: [
      {name: 'USA', content: '超出了上门维修的范围',price:"￥99.00",checked:true},
      {name: 'CHN', content: '下错单了',price:"￥89.00",checked:false},
      {name: 'BRA', content: '不想到店维修',price:"￥79.00",checked:false},
      {name: 'JPN', content: '等待时间太久',price:"￥69.00",checked:false},
      {name: 'ENG', content: '设备已恢复正常',price:"￥59.00",checked:false},
      {name: 'TUR', content: '不放心取机维修',price:"￥49.00",checked:false},
    ],
    pushgzList:[],//传送给维修方案页面的故障列表数据
    descriptsTxt:"1：大阿斯达阿斯达阿斯达哇所多阿斯达䦺地方水电费；2：何贵何贱同一句话铁公鸡一发过火头发；3：电饭锅热点覆盖人地方电饭锅帝国电饭锅",
    allMoney:0,
    allItems:{}, //所有选中的故障情况汇总
    getInfo:false
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
  showLayer:function(e){
    var enter = e.currentTarget.dataset.enter;  //获取自定义的ID值
    this.setData({
      showLayer:true,
      currentEnter:enter,
    });
    console.log(this.data.items);
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
    var notYuyue=this.data.notYuyue;
    var allMoney=this.data.allMoney;
    var allItems=JSON.stringify(this.data.allItems);
    var phoneModel=this.data.phoneModel;
    var postInfo="allMoney="+allMoney+"&allItems="+allItems+"&phoneName="+phoneModel;
    if (notYuyue) {
      wx.showModal({
        title:"提示",
        content:"请先选择故障",
        showCancel:false
      });
      return false;
    }
    wx.navigateTo({
      url:'../placeOrder/placeOrder?'+postInfo
    });
    wx.setNavigationBarTitle({
      title: '维修方案'//页面标题为路由参数
    })
  },
  checkboxChange:function(e){
    /*
     *目前每个故障按钮下面的选项只给单选，因为多选会造成无法取消选中项的BUG，且单选跟加速度手机一样，后续如果需要多选再对这里进行取消checked判断
     */
    console.log(e);
    var currentEnter=this.data.currentEnter; //当前选中元素
    var arr=e.detail.value; //选中的checkbox的集合
    var pushArr=[];
    var items=this.data.items;
    var allItems=this.data.allItems;
    for(var x in arr){
      for(var y in items){
        if(items[y].name==arr[x]){
          pushArr.push(items[y]);
          // items[y].checked=true;
        }
      }
    }
    allItems[currentEnter]=pushArr;
    this.setData({
      pushgzList:pushArr,
      // items:items
    });
    if (!pushArr.length) { //如果没有选中项 则所有checked置为false
      for(var y in items){
        items[y].checked=false;
      }
      this.setData({
        pushgzList:pushArr,
        items:items
      });
    }else{ //如果有选中项 则选中项有checked置为true
      for(var x in arr){
        for(var y in items){
          if(items[y].name==arr[x]){
            items[y].checked=true;
          }else{
            items[y].checked=false;
          }
        }
      }
      this.setData({
        items:items
      });
      // console.log("items",items);
    }
  },  
  selectMb:function(e){
    var currentEnter=this.data.currentEnter; //当前选中元素
    var pushArr=[]; //初始化如果有选中的故障项
    var allItems=this.data.allItems; //所有故障按钮选中的故障项的合集
    allItems[currentEnter]=[]; //对应故障按钮下面的故障项
    var allMoney=0; //总维修费用叠加起始值
    var items=this.data.items;
      for(var y in items){
        if(items[y].checked){
          pushArr.push(items[y]);
        }
      }
    //没有选中故障项
    var hasEnter=this.data.pushgzList.length; //勾选变化产生的结果
    if (!hasEnter&&!pushArr.length) {
      var enter=this.data.currentEnter;
      var endEnter=this.data.isEnter;
      endEnter[enter]=50;
      for(var x in allItems){
        for(var y in allItems[x]){
          allMoney+=parseInt(allItems[x][y].price.split("￥")[1]);
          // console.log(allItems[x][y].price.split("￥")[1]);
        }
      }
      this.setData({
        isEnter:endEnter,
        showLayer:false,
        allMoney:allMoney
      });
      if (allMoney>0) {
        this.setData({
          notYuyue:false
        })
      }else{
        this.setData({
          notYuyue:true
        })
      }
      return false;
    }
    //有选中故障项
    var enter=this.data.currentEnter;
    // console.log(enter);
    var endEnter=this.data.isEnter;
    endEnter[enter]=enter;
    // console.log(endEnter);
    //计算所选故障项的总和
    for(var x in items){
      if(items[x].checked==true){
        var it=items[x];
        var numx=parseInt(x);
        allItems[currentEnter][numx]=it;
      }
    }
    // console.log("items",items);
    // console.log("allItems",allItems);
    for(var x in allItems){
      for(var y in allItems[x]){
        allMoney+=parseInt(allItems[x][y].price.split("￥")[1]);
        // console.log(allItems[x][y].price.split("￥")[1]);
      }
    }
    this.setData({
      isEnter:endEnter,
      showLayer:false,
      allMoney:allMoney
    });
    if (allMoney>0) {
        this.setData({
          notYuyue:false
        })
      }else{
        this.setData({
          notYuyue:true
        })
      }
      return false;
    // console.log("this.data.allMoney",this.data.allMoney);
  },
  onGotUserInfo:function(e){
    var self=this;
    wx.request({  
        url: 'https://apikk.zikang123.com/wechat/info',  
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + self.data.sessionId },  
        data: {  
          openid: self.data.openId,
          raw_data: e.detail.rawData,   
          signature: e.detail.signature,   
          encrypted_data: e.detail.encryptedData,
          iv:e.detail.iv,  
        },  
        success: resUser => {  
          if (resUser.data.errno==200) {
            wx.showToast({
              title:'授权成功！'
            })
            self.setData({
              getInfo:false
            })
          }
        }  
    })  
  },
  closeLayerInfo:function(){
    this.setData({
      getInfo:false
    })
  },
  onLoad:function(option){
    var self=this;
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          var jsCode=res.code;
          wx.request({
            url: 'https://apikk.zikang123.com/wechat/login',
            data: {
              js_code: res.code
            },
            success:function(res){
              console.log("login接口返回数据",res);
              var openId=res.data.datas.openid;
              var sessionId=res.data.datas.session_id;
              self.setData({
                openId:openId,
                sessionId:sessionId
              });
              if(res.data.datas.user_exist){
                self.setData({
                  getInfo:false
                })
              }else{
                self.setData({
                  getInfo:true
                })
              } 
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    });
    if (option.modelName) {
      this.setData({
       phoneModel:option.modelName,
       phoneLogo:option.phoneLogo
      });
      return false
    }
    wx.getSystemInfo({
      success:function(res){
        var phoneModel=res.model.split('<')[0];
        console.log(phoneModel);
        self.setData({
          phoneModel:phoneModel
        })
      }
    })
  }
})
