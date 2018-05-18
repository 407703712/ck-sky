Page({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    slatitude:0,
    slongitude:0,
    scale:5,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function () {
    console.log("1");
    var self=this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        self.setData({
          "latitude": latitude,
          "longitude": longitude
        });
        wx.chooseLocation({
          success:function(res){
            self.setData({
              "slatitude": res.name,
              "slongitude":res.address
            })
          }
        })
      }
    })
  }
})
