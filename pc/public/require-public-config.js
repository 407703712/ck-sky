define([], function () {

    return {   
        //baseUrl : App.sysDir,frameWorkExtend
        baseUrl:'../public/',
        paths : {
            wechatSDK : '//res.wx.qq.com/open/js/jweixin-1.0.0'                //微信SDK
            ,jquery : 'jquery/jquery-1.8.3.min'              //jquery库
            ,Swiper : '/swiper/swiper.min'                    //swiper库
            ,jqScroll:'jquery/jquery-scroll'                //滚动条监听库
            ,common:'common'                             //公共拓展方法库，需依赖jQuery
        },
        shim : {
            'jqScroll': {exports:'jqScroll'}
            // 'common':{exports:'common'}
        },
        waitSeconds: 20
    };

});