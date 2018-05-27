define([], function () {

    return {   
        //baseUrl : App.sysDir,frameWorkExtend
        baseUrl:'../public/',
        paths : {
            wechatSDK : '//res.wx.qq.com/open/js/jweixin-1.0.0'                              //微信SDK
            ,jquery : 'jquery/jquery-3.0.0.min'                                              //jquery库
            ,Swiper : '/swiper/swiper.min'                                                   //swiper库
            ,jqScroll:'jquery/jquery-scroll'                                                 //滚动条监听库
            ,common:'common'                                                                 //公共拓展方法库，需依赖jQuery
            ,Bootstrap:'bootstrap/bootstrap'                                                 //bootstrap库文件
        },
        shim : {
            'jqScroll': {exports:'jqScroll'},
            // 'common':{exports:'common'}
            'Bootstrap':{exports:'Bootstrap'}
        },
        waitSeconds: 20
    };

});