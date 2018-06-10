//index.js
//获取应用实例
const app = getApp()
const urlhost=getApp().globalData.urlhost;
Page({
  data: {
    imgUrls: [],//banner图数据
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    circular:true,
    showLayer:false,
    phoneLogo:'../images/home_img_mobile.png',
    phoneModel:"iPhone 7",
    faultArr:[],
    notYuyue:true, //是否没有选择故障
    currentEnter:"", //当前点击故障问题按钮
    isEnter:[50,50,50,50,50,50,50,50],//确认选中故障问题的数组
    // items: [
    //   {name: 'USA', content: '超出了上门维修的范围',price:"￥99.00",checked:true},
    //   {name: 'CHN', content: '下错单了',price:"￥89.00",checked:false},
    //   {name: 'BRA', content: '不想到店维修',price:"￥79.00",checked:false},
    //   {name: 'JPN', content: '等待时间太久',price:"￥69.00",checked:false},
    //   {name: 'ENG', content: '设备已恢复正常',price:"￥59.00",checked:false},
    //   {name: 'TUR', content: '不放心取机维修',price:"￥49.00",checked:false},
    // ],
    items:[],//配置问题详情的渲染数据
    descriptsTxt:"1：大阿斯达阿斯达阿斯达哇所多阿斯达䦺地方水电费；2：何贵何贱同一句话铁公鸡一发过火头发；3：电饭锅热点覆盖人地方电饭锅帝国电饭锅",
    allMoney:0,
    allItems:{}, //所有配件选中的配置问题详情汇总
    getInfo:false,
    shopId:'',
    isNone:false
  },
  // checkboxChange: function(e) {
  //   var self=this;
  //   var obj={

  //   }
  //   var arrs=this.data.items;
  //   var lastName=e.detail.value[e.detail.value.length-1];
  //   for (var x in arrs) {
  //     if (lastName==arrs[x].name) {
  //       arrs[x]['checked']=true;
  //     }else{
  //       arrs[x]['checked']=false;
  //     }
  //   }
  //   self.setData({
  //         items:arrs,
  //   })
  // },    
  closeLayer:function(){
    this.setData({
      showLayer:false
    })
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
  showLayer:function(e){  //点击部件弹出具体问题框事件->1：根据allItems进行问题详情视图渲染
    var self=this;
    var enter = e.currentTarget.dataset.enter;  //获取自定义的ID值(当前选中元素标识)
    var sfid = e.currentTarget.dataset.sfid;    //获取后台定义的ID值
    var allItems=this.data.allItems;  //所有故障按钮选中的故障项的合集
    this.setData({
      showLayer:true,
      currentEnter:enter,
      sfid:sfid
    });
    var obj={
      url:urlhost+"/mobile/problem",
      data:{
        series_fitting_id:sfid
      },
      success:function(res){
        console.log("手机部件的具体问题：",res);
        if(allItems[enter]&&allItems[enter].length>0){
          self.setData({
            items:allItems[enter]
          });
          console.log("详情问题渲染视图的数据：",allItems[enter]);
        }else{
          self.setData({
            items:res.data.datas
          });
        }
      }
    };
    wx.request(obj);
  },  
  checkboxChange:function(e){ //记录allItems数据变化（不更新视图只更改数据则不用使用setData方法）
    /*
     *目前每个故障按钮下面的选项只给单选，因为多选会造成无法取消选中项的BUG，且单选跟加速度手机一样，后续如果需要多选再对这里进行取消checked判断
     */
    console.log("CheckBox改变事件对象：",e);
    var currentEnter=this.data.currentEnter; //当前选中元素
    var arr=e.detail.value; //选中的checkbox的集合
    var items=this.data.items;
    var allItems=this.data.allItems; //所有故障按钮选中的故障项的合集
    var flagArr=[];//当选项大于一个的时候记录被选项的index
    allItems[currentEnter]=[];
    if (arr.length==0) {//如果arr长度为0表示没有选中项,则items全部置空
        flagArr=[];
        for(var y in items){
          items[y].checked=false;
        }
    }
    for(var x in arr){
      if (arr.length==0) {//如果arr长度为0表示没有选中项,则items全部置空
        flagArr=[];
        for(var y in items){
          items[y].checked=false;
        }
      }else if(arr.length==1){
        flagArr=[];
        for(var y in items){
          if(arr[x]==items[y].name){
            items[y].checked=true;
          }else{
            items[y].checked=false;
          }
        }
      }else if(arr.length>1){
        for(var y in items){
          if(arr[x]==items[y].name){
            items[y].checked=true;
            flagArr.push(y);
          }else{
            items[y].checked=false;
          }
        }
      }
    }
    if(flagArr.length){
      for(var x in flagArr){
        items[flagArr[x]].checked=true;
      }
    }
    for(var y in items){
      allItems[currentEnter].push(items[y]);
    }
    console.log("当选项大于1时记录的index值",flagArr);
    console.log("checkboxChange:items",items);
    console.log("checkboxChange:allItems",allItems);
  },  
  selectMb:function(e){ //确定按钮->1：算钱；2：改变按钮状态；3：判断是否有预约问题确定跳转下一个页面的权限；4：记录id为全局变量供后续页面调接口传参
    var self=this;
    var currentEnter=this.data.currentEnter; //当前选中元素
    var allItems=this.data.allItems; //所有故障按钮选中的故障项的合集
    console.log("selectMb:allItems",allItems);
    var allMoney=this.data.allMoney; //总维修费用
    var items=this.data.items; //wxml渲染数据
    var endEnter=this.data.isEnter; //映射手机配置按钮组选中状态的数组
    var notYuyue=this.data.notYuyue //是否有选择配置问题
    var problemId=[];
    //算钱开始&&记录id为全局变量
    allMoney=0;//钱数初始化
    for(var x in allItems){
      for(var y in allItems[x]){
        if(allItems[x][y].checked){ //筛选所有选中项的金钱合集
          allMoney+=parseInt(allItems[x][y].price);
          problemId.push(allItems[x][y].id);
        }
      }
    }
    //改变按钮状态
    for(var x in allItems[currentEnter]){ 
      if (allItems[currentEnter][x].checked){//如果当前模块有选中项则改变该按钮的颜色为黄色，否则为默认白色；
          endEnter[currentEnter]=currentEnter;
          break;
      }else{
          endEnter[currentEnter]=50;
      }
    }
    console.log("配置按钮选中状态数组：",endEnter);
    //判断是否有预约问题确定跳转下一个页面的权限
    for(var x in endEnter){
      if(endEnter[x]!=50){
        notYuyue=false;
        break;
      }else{
        notYuyue=true;
      }
    }
    self.setData({ //更新视图数据
      isEnter:endEnter,
      showLayer:false,
      allMoney:allMoney,
      notYuyue:notYuyue
    });
    app.globalData.problemId=problemId.join(',');
    console.log("problemId:",problemId);
    console.log("problemIdStr:",app.globalData.problemId);
    return false;
    // console.log("this.data.allMoney",this.data.allMoney);
  },
  onGotUserInfo:function(e){
    var self=this;
    wx.request({  
        url: urlhost+'/wechat/info',  
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
    console.log("globalData",getApp().globalData.globalDemo);
    var pages = getCurrentPages() //获取加载的页面
var currentPage = pages[pages.length-1] //获取当前页面的对象
    var self=this;
    var bannerobj={ //banner图接口
      url:urlhost+"/mobile/banner",
      success:function(res){
        self.setData({
          imgUrls:res.data.datas
        })
        console.log("res.data.datas",res.data.datas);
        console.log("currentPage.route",currentPage.route);
      }
    };
    wx.request(bannerobj);
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
              app.globalData.openId=openId;
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
        }else{
          console.log('登录失败！' + res.errMsg);
        }
      }
    });
    if (option.modelName) {
      this.setData({
       phoneModel:option.modelName,
       phoneLogo:option.phoneLogo,
      });
      var obj={
        url:urlhost+"/mobile/fitting",
        data:{series_id:option.phoneId},
        success:function(res){
          console.log("手机配置信息：",res);
          app.globalData.problem=res.data.datas.id;
          if (res.data.datas.length==0) {
            self.setData({
              faultArr:[{fitting_name:"没有对应故障问题！"}],
              isNone:true
            });
            return false
          }
          self.setData({
            faultArr:res.data.datas
          });
        }
      }
      wx.request(obj);
      return false
    }
    wx.getSystemInfo({
      success:function(res){
        var phoneModel=res.model.split('<')[0];
        console.log(phoneModel);
        self.setData({
          phoneModel:phoneModel
        })
        var obj={
          url:urlhost+"/mobile/series_search",
          data:{
            series_name:phoneModel
          },
          success:function(res){
            console.log("初始化手机品牌对应信息",res);
            self.setData({ //初始化手机图片
              phoneLogo:urlhost+res.data.datas[0].img
            })
            var obj1={
              url:urlhost+"/mobile/fitting",
              data:{
                series_id:res.data.datas[0].series_id
              },
              success:function(res){
                console.log("初始化手机配置信息",res);
                app.globalData.problem=res.data.datas.id;
                if (res.data.datas.length==0) {
                  self.setData({
                    faultArr:[{fitting_name:"没有对应故障问题！"}],
                    isNone:true
                  });
                  return false
                }
                self.setData({
                  faultArr:res.data.datas
                });
              }
            }
            wx.request(obj1);
          }
        }
        wx.request(obj);
      }
    });

  }
})
