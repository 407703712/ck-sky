// TODO 此处可预留对App里面的配置进行特定的修改
require(['../public/require-public-config.js'], function(requireConfig) {
    "use strict";
 
    require.config(requireConfig);//用最新的配置配置require

    //开始正式启动页面
    require(['jquery','common','jqScroll','Bootstrap'], 
        function(jQuery,common) {
                common.init();
                var bodyH=$("body").height();
                $('div').waypoint(function() {
                    if ($($(this)[0].element).hasClass('needleft')) {
                        $($(this)[0].element).addClass('animated fadeInLeft');
                    }else if($($(this)[0].element).hasClass('needright')){
                        $($(this)[0].element).addClass('animated fadeInRight');
                    }else if($($(this)[0].element).hasClass('needflipinx')){
                        $($(this)[0].element).addClass('animated flipInX');
                    }else if($($(this)[0].element).hasClass('needjack')){
                        $($(this)[0].element).addClass('animated jackInTheBox');
                    }  
                },{offset:bodyH+"px"});
                $("input[type=button]").on('click',function(e){
                    e.preventDefault();
                })
        }
    );
});