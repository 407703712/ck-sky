/**
 * @author  xupan1@sinosafe.com.cn
 * craeted  2016-09-19
 * modify   2016-11-18
 * App   全局配置对象    用于进行全局的配置，PC，移动通用
 *
 *          .----.
 *       _.'__    `.
 *   .--(@)(@)----/#\
 * .' @          /###\
 * :         ,   #####
 *  `-..__.-' _.-\###/
 *        `;_:    `"'
 *      .'"""""`.
 *     //  作者  \
 *    //  萌萌哒  \
 *    `-._______.-'
 *    ___`. | .'___
 *   (______|______)
 * 
 */
;(function(global, factory) {
    'use strict';
    
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        //CommonJS规范/如NodeJs  
        module.exports = factory();
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        //amd或cmd模式规范/如requireJs
        define(factory);
    } else {
        /****************************************
         * 请注意，这里可能和你有关，可能要修改 *
         ****************************************/
        //如果是直接script引入的，则挂全局window或this下，根据自己的情况定义命名global.*** = factory();即可
        global.App = factory();

        //如下，其他js可以忽略，不用下面的这段代码，请删掉，删掉，删掉！
        //我这里因特殊需求，如果是挂全局下引入的，则默认自动执行init，其它模式请手动执行！
        global.App.init();
    }
    
    //window不存在则传this
})( (typeof window === 'object' && window) || this, function() {
    'use strict';

    /***********************************************************************
     *          Hello, 您还好不？前面的代码你不用管，看不懂没关系          *
     *               正文从下边开始，前方高能，姿势准备好没？              *
     ***********************************************************************/

    var win = window,
        doc = document;

    //这里定义的是局部变量，所以名字随便取，require或挂global下时请起一个合适的且不和其它对象冲突的名字
    var _app = {
        //配置一些调试等开关 
        isMock : false,         //是否使用模拟数据           tips: url参数上如下对应字段的值优先级最高，可这里的配置
        isLog : true,           //"生产环境"是否打印日志     tips: 生产环境默认为false，测试和本地环境默认打印日志，除非url参数覆盖，url参数上如下对应字段的值优先级最高，可这里的配置，
        isAlert : false,        //是否alert日志新消息        tips: url参数上如下对应字段的值优先级最高，可这里的配置，并且仅当isLog为ture时此开关有效
        isPrint : false,        //是否将日志信息加载到页面当中显示出来   tips: url参数上如下对应字段的值优先级最高，可这里的配置，并且仅当isLog为ture时此开关有效
        isGlobal : false,       //是否将一些js对象全局       tips: url参数上如下对应字段的值优先级最高，这个全句化方便调试，具体组要自己在模块最后return之前根据此标识将相应模块全局化
        
        //以下参数基本不会变
        url : win.gRealUrl || win.location.href,    //实际url地址，如果通过jsp 301地址优化，则取jsp里取得的地址window.gRealUrl
        version : '_VERSION_',  //版本号，不用手动修改，会通过gulp打包自动更新为时间戳
        theme : 'default',      //主体样式，待启用
        sysDir : '',            //系统上下文目录如/eb-web/，这边会根据url参数自动设置，但是你也可以在这里手动强制配置
        projectDir:'',          //项目项目目录如pay/,blockchain/名字，这边会根据url参数自动设置，但是你也可以在这里手动强制配置，你也在自己的main.js里面去重置它
        
        //以下可能需要根据自己的项目情况去自己赋值
        productName : '',       //产品名称
        productCode : '',       //产品代码
        openid : null,          //微信公众号访问用户标识
        appid : '',             //微信公众号商户标识

        //以下参数根据环境等情况动态配置，不用手动设置，不用手动设置，不用手动设置
        //基础域名相关
        baseUrl : '',           //基础域名+系统名，如：//agent.sinosafe.com.cn/pay/(不带协议，用的是//www.sinasafe.com.cn这种相对协议写法，如下同)
        comUrl : '',            //基础公共域名，主要用于调用其他系统，如：//agent.sinosafe.com.cn
        cdnUrl : '',            //cdn域名+系统名，目前暂未启用CDN，故配置成和baseUrl一样，但是我们对静态资源的引用要一开始就习惯写成cdn，方便后续启用cdn之后在此一键修改启用，如：//agent.sinosafe.com.cn/pay/
        
        //环境产品等标识字段
        oServerDate : null,     //服务器时间，对象      tips: 默认区客户端时间,仅精确到年月日, 如果服务器有返回请自行覆盖
        sServerDate : '',       //服务器时间，字符串    tips: 默认区客户端时间,仅精确到年月日, 如果服务器有返回请自行覆盖
        evn : 'prd',            //环境标识，默认生产环境prd，其他分别为测试环境stg，开发环境dev
        params : null,          //url参数对象集合
        bakHtmlFontSize : null, //备份最原本css里面设计的html的字体大小，用以回滚通过 setRem 设置后的情况
        isMobile : false,       //是否为移动端          tips: 根据浏览器代理自动判断赋值
        isIE : false,           //是否为IE              tips: 根据浏览器代理自动判断赋值
        verIE : 0,              //IE版本号              tips: 根据浏览器代理自动判断赋值
        isWeixin : false,       //是否为微信浏览器      tips: 根据浏览器代理自动判断赋值
        verWeixin : 0,          //微信版本号            tips: 根据浏览器代理自动判断赋值
        device : '',            //系统设备信息          tips: navigator.platform + '---' + navigator.userAgent
        client : null,          //系统设备详细解析信息  tips: 根据浏览器代理自动判断赋值

        /**
         * [init 全局配置初始化]
         * @param  {[type]} options [可配置的参数，待扩展]
         * @return {[type]}     [this]
         */
        init : function (options) {
            var self = this;

            //默认选项
            self.opt = options||{};

            //初始化设置参数，环境标识，设备标识，基础配置，rem设置，加载json库
            //self.setContext.setParams().setEvn().setDevice().setBase().setRem(self.opt).loadJSON();//外部用不到的方法私有化，不再这样链式访问
            _setParams();   //初始化设置参数
            _setFlag();     //设置配置标识
            _setContext();  //自动设置统上下文目录
            _setEvn();      //环境标识
            _setDevice();   //设备标识
            _setBase();     //基础配置
            _loadJSON2();   //加载json2库
            //rem设置、初始化百度统计
            self.setRem(self.opt).initBaidu();
            _setFlag();     //设置配置标识
            _bindError();   //捕获js等报错信息，打印日志

            //返回当前对象，便于链式操作
            return self;
        },

        /**
         * [config 手动覆盖基本配置]
         */
        config : function(opt) {
            var self = this,
                opt = opt || {};
            // TODO
        },

        /**
         * 移动端设置基准rem
         * rem单位说明：
         * 基于最常用的iPhone6 375*667 屏幕设置基础像素50px 详见js代码 100 * (clientWidth / 750) ---clientWidth为375时刚好50px
         * 目的是这边设计稿一般按750宽来设置原型，这样我们这边定义rem可方便直接转换，比如设计稿上35px，我们这边定义为.35rem刚好(即除以100)
         * 另，平时我们其他的已经用像素作为单位的地方比如设置的是35px，则转换成rem大概是.7rem(即乘2除以100也就是除以50)
         * 之所以选择50px，是因为换算方便，要么除以100，要么乘2除以100，都是偶数，
         * 如果设置成100，那小数点太多，设置成10px，由于chrome最低12px，故你设置html的基础字体为10px，其实是12px。
         * 综上
         * 1、750宽设计图的px转rem             除以100
         * 2、以iphone6模式下访问，页面上已经按px定义好的转rem      乘2除以100
         * 3、以iphone6模式下访问，页面上rem转回成使用px            除以2乘100
         * 4、设计图px单位转换成页面上的px     除以2
         * 
         * opt.remRollback      是否回滚字体
         * opt.remForceSet      是否强制设置rem，主要用于PC端要设置rem的情况
         * opt.remVminFlag      基准屏幕宽是否设置为屏宽与屏高中的较小者，这样可以保证手机竖屏横屏字体大小一样
         * opt.remBigScrScale   当vminFlag为false的情况下，可以设置大于414宽屏幕(iPhone6plus)之后，不同比例放大，而是适当打折，免得大屏幕字体感觉太大
         * opt.remMaxWidth      最大适配屏幕限制，大于此宽则不再放大，始终按此宽度进行基准宽度计算
         * opt.remDesignWidth   设计效果图的设计宽度   默认750，即iPhone6宽的2倍
         * opt.remBaseTimes     rem转换比例调整配置    默认100
         *
         */
        setRem : function (opt){
            var self = this,
                opt = opt || self.opt || {},
                docEl = doc.documentElement;    //documentElement变量缓存下来

            //如果没有备份过字体大小，首先备份原始html字体大小，以便回滚
            !self.bakHtmlFontSize && (self.bakHtmlFontSize = self.getStyle(docEl)['font-size']);

            //如果是回滚字体并且已经备份过
            if(opt.remRollback && self.bakHtmlFontSize){
                docEl.style.fontSize = self.bakHtmlFontSize;
                return self;
            }

            //非移动端且没配置为强制设置则不进行rem设置，也就是如果是PC端但是设置了强制设置标识，也可以进行rem设置
            if(!self.isMobile && !opt.remForceSet){
                return self;
            }

            var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                // 基准屏幕宽是否设置为屏宽与屏高中的较小者，这样可以保证手机竖屏横屏字体大小一样
                vminFlag = typeof(opt.remVminFlag)==='boolean' ?  opt.remVminFlag : false,
                // 当vminFlag为false的情况下，可以设置大于414宽屏幕(iPhone6plus)之后，不同比例放大，而是适当打折，免得大屏幕字体感觉太大
                bigScrScale = opt.remBigScrScale    || 0.7,
                // 最大适配屏幕限制，大于此宽则不再放大，始终按此宽度进行基准宽度计算
                maxWidth = opt.remMaxWidth          || 750,
                // 设计效果图的设计宽度   默认750，即iPhone6宽的2倍
                designWidth = opt.remDesignWidth    || 750,
                // rem转换比例调整配置    默认100
                baseTimes = opt.remBaseTimes        || 100,
                //是否打印日志
                logFlag = true;

            //计算欲设值字体大小
            var recalc = function () {
                var clientWidth = docEl.clientWidth,//获取屏幕宽度
                    clientHeight = docEl.clientHeight,//获取屏幕高度
                    baseWidth = clientWidth,        //基准宽度，默认取屏幕宽度
                    resPx = "50px";                 //最终的基准像素大小,先给个默认值
                //没获取到宽的，则还回，所以我们css里面设置了html的基准像素是50px，然后body设置回16px,以防出现这个情况
                if (!baseWidth) {
                    //docEl.style.fontSize = resPx;
                    return self;
                }
                //如果配置基准宽度取屏宽与屏高中的较小者，且屏宽与屏高都存在
                if(vminFlag && clientWidth && clientHeight){
                    baseWidth = clientWidth>clientHeight ? clientHeight : clientWidth;
                }else if(!vminFlag && bigScrScale && baseWidth>414 && baseWidth<=maxWidth){
                    //当vminFlag为false的情况下，如果有设置大屏缩小比例，则。。。这里大屏已414屏幕即iphone6plus为基准
                    baseWidth = parseInt(baseWidth*bigScrScale);
                }
                //最终的基准还大于最大适配屏幕限制，那基准就设计为最大适配屏幕限制大小
                if(baseWidth > maxWidth){
                    baseWidth = maxWidth;
                }
                //默认是iPhone6 w375 下 100 * (clientWidth / 750) 的50px;
                resPx = parseInt( baseTimes * (baseWidth/designWidth) ) + 'px';
                //开始设置html字体大小
                docEl.style.fontSize = resPx;
                //日志打印
                logFlag && self.log('rem单位相关配置计算结果：' + baseWidth + ' - ' + resPx);
            };
            //事件监听支持的判断
            if (!doc.addEventListener){
                return self;
            }
            //事件绑定，当屏幕大小改变，最常见的比如横竖屏切换时重新计算基准像素
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);

            return self;
        },

        /**
         * [remRollback rem回滚简易调用函数]
         */
        remRollback : function () {
            this.setRem({
                remRollback:true
            });
            return this;
        },

        /**
         * [getStyle 获取元素的css样式]
         * @param  {[type]} ele [原生dom节点]
         */
        getStyle : function (ele) {
            var style = null;
            if(win.getComputedStyle) {
                style = win.getComputedStyle(ele, null);
            }else{
                style = ele.currentStyle;
            }
            return style;
        },

        /**
         * [log 简易日志打印]
         * @param  {[type]} msg     [日志主体，可字符串可对象等]
         * @param  {[type]} title   [日志标题，可选]
         */
        log : function (msg, title, opt) {
            //额外的控制属性
            opt = opt || {};
            opt.style = opt.style || '';
            opt.styleTitle = opt.styleTitle || '';
            opt.styleC = opt.style ? '%c ' : '';

            var self = this,
                title = title || '日志',
                strFlag = typeof(msg)=='string',
                content = strFlag ? msg : self.toString(msg),
                html = '<b style="color:green;' + opt.styleTitle + '"><--------- ' + title + ' ---------></b> <br/>\n' + content;
            
            if(!self.isLog){//打印日志开关为开才打印
                return self;
            }

            if(win.console){//先判断是否支持console
                console.log('%c<--------- '+title+' --------->', 'font-weight:bold;color:green;' + opt.styleTitle);
                //如果是Ie则需要将对象转换为字符串，因为ie控制台中对象会显示{...}这样，什么鬼哦。。。
                var temp = self.isIE&&!strFlag ? self.toString(msg) : msg;
                if(typeof(msg)=='string'){
                    console.log(opt.styleC+temp, opt.style);
                }else{
                    console.log(temp);
                }
            }

            if(self.isAlert){//是否需要alert日志信息，主要用于移动端调试
                alert( html );
            }

            if(self.isPrint){//是否将日志信息打印添加到页面上显示
                try{
                    setTimeout(function(){
                        var newDom = doc.createElement('div');
                            //txt = doc.createTextNode(html);
                        newDom.setAttribute('class', 'logTips');
                        newDom.setAttribute('style', 'font-size:12px;margin:50px 10px;word-break:break-all; word-wrap:break-word;');
                        newDom.innerHTML = html;
                        //newDom.appendChild(txt);
                        doc.body.appendChild(newDom);

                        var newDom2 = doc.createElement('textarea');
                        newDom2.setAttribute('class', 'logTipsArea');
                        newDom2.setAttribute('style', 'display:none;font-size:12px;margin:50px 10px;word-break:break-all; word-wrap:break-word;width:90%;height:50px;');
                        newDom2.innerHTML = content;
                        doc.body.appendChild(newDom2);

                        self.addEvent(newDom, 'click', function(){
                            newDom2.style.display='block';
                            newDom.style.display='none';
                        });
                    }, 100);
                }catch(e){};
            }

            return self;
        },

        /**
         * [toString json转字符串]
         */
        toString : function (obj) {
            return win.JSON && JSON.stringify ? JSON.stringify(obj) : obj;
        },

        /**
         * [toObject 字符串转json或bool等]
         */
        toObject : function (str) {
            return win.JSON && JSON.parse ? JSON.parse(str) : str;
        },

        /**
         * [loadJs 动态加载js，支持加载多个]
         * @param  {[type]}   urls        [js列表，支持多个组成的数组或单个的字符串]
         * @param  {Function} callback    [加载完成的反调函数，没加载完成一个会调一次，并且会传当前是加载完第几个(0开始)]
         * @param  {[type]}   asyncFlag   [是否异步加载]
         * @param  {[type]}   versionFlag [是否加上版本号]
         * @param  {[type]}   cdnFlag     [是否加cdn域名的前缀]
         */
        loadJs : function(urls, callback, asyncFlag, versionFlag, cdnFlag) {
            var self = this;

            typeof urls==='string' && (urls = [urls]);//支持多个组成的数组或单个的字符串

            //加载单个js
            var _loadJsFile = function(_urls, _callback, _asyncFlag, _versionFlag, _cdnFlag){
                var script = doc.createElement('script'),
                    cdn = _cdnFlag ? self.cdnUrl : '',
                    url = cdn + _urls;
                //有反调，则绑定加载完成后的一些事件
                if(_callback){
                    if(script.readyState) {
                        script.onreadystatechange = function() {
                            if(script.readyState == 'loaded' || script.readyState == 'complete') {
                                _callback.call();
                            }
                        }
                    } else {
                        script.onload = _callback;
                    }
                }
                script.type = 'text/javascript';
                //异步加载
                if(_asyncFlag){
                    script.async = true;
                }
                //加版本号
                if(_versionFlag){
                    script.src = url.indexOf('?') == -1 ? 
                                (url + '?v=' + self.version) : 
                                (url + '&v=' + self.version);
                }else{
                    script.src = url;
                }
                doc.getElementsByTagName('head')[0].appendChild(script);
            };

            //加载js列表递归
            var _loadJsList = function(_urls, _callback, _index, _asyncFlag, _versionFlag, _cdnFlag) {
                var index = _index || 0;
                if(_urls[index]) {
                    _loadJsFile(_urls[index], function() {
                        _loadJsList(_urls, _callback, index + 1);
                    }, _asyncFlag, _versionFlag, _cdnFlag);
                }
                if(_callback) {
                    _callback(index);//执行反调，并传入索引
                }
            }

            _loadJsList(urls, callback, 0, asyncFlag, versionFlag, cdnFlag);

            return self;
        },

        /**
         * [loadCss 动态加载css]
         * @param  {[type]} urls        [js列表，支持多个组成的数组或单个的字符串]
         * @param  {[type]} cdnFlag     [是否加cdn域名的前缀]
         * @param  {[type]} versionFlag [是否加版本号]
         */
        loadCss : function(urls, cdnFlag, versionFlag) {
            var self = this;

            typeof urls==='string' && (urls = [urls]);//支持多个组成的数组或单个的字符串

            var html = [], 
                v = versionFlag ? ('?ver='+self.version) : '',
                cdn = cdnFlag ? self.cdnUrl : '';
            for(var i = 0, len = urls.length; i < len; i++) {
                urls[i] && html.push('<link type="text/css" rel="stylesheet" href="' + cdn + urls[i] + v + '" />');
            }
            doc.write(html.join(""));

            return self;
        },

        /**
         * [initBaidu 初始化百度统计]
         */
        initBaidu : function(){
            win._hmt = win._hmt || [];
            var hm = doc.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?d6471f45d65f7b64ba334e3c4a25d830";
            var s = doc.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        },

        /**
         * [filter 变量过滤]
         * @param  {[type]}  arg [要过滤的变量 0 null undefined false 以及他们的字符串形式都判断为假最终当null返回]
         */
        filter : function (arg, boolFlag) {
            var temp = arg;
            if(!arg || arg=='0' || arg=='null' || arg=='undefined' || arg=='false'){
                temp = '';
            }
            if(boolFlag){//强制当bool值返回
                return Boolean(temp);
            }else{//返回null或原值
                return temp;
            }
        },

        /**
         * [getUrlValue 获取url参数，转换成对象]
         * @param  {[string]} url [支持传自己的url，没有则去window.location下的]
         */
        getUrlValue : function (url) {
            var url = url ? url : win.location.href;
            if (url.indexOf('#') > -1) {
                url = url.split('#')[0];
            }
            var variable = url.split('?')[1];
            if (!variable) {
                return null;
            } else {
                var value = {};
                variable = variable.split('&');
                for (var i = 0, m = variable.length; i < m; i++) {
                    var tempv=variable[i].split('=')[1];
                    if( typeof(tempv)!='undefined' ){
                        if(tempv=='null' || tempv=='undefined'){
                            tempv='';
                        }
                        tempv=decodeURIComponent(tempv).replace(/</g, '&lt;').replace(/>/g, '&gt;');
                        value[variable[i].split('=')[0]] = tempv;
                    }
                }
                return value;
            }
        },

        /**
         * [cookie 获取cookie]
         * @param  {[type]} name [字段名]
         * @param  {[type]} value [字段名]
         */
        cookie : function(key,value,options) {
            if(arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
                options = options || {};

                if(value === null || value === undefined) {
                    options.expires = -1;
                }

                if( typeof options.expires === 'number') {
                    var days = options.expires, t = options.expires = new Date();
                    t.setDate(t.getDate() + days);
                }
                value = String(value);

                return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
            }

            options = value || {};

            var decode = options.raw ? function(s) {
                return s;
            } : decodeURIComponent;

            var pairs = document.cookie.split('; ');
            for(var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
                if(decode(pair[0]) === key)
                return decode(pair[1] || '');
            }
            return null;
        },
        /**
         * [addEvent 事件绑定]
         * @param {[type]}   elem  [原生js元素]
         * @param {[type]}   event [事件名]
         * @param {Function} fn    [反调函数]
         */
        addEvent : function (elem, event, fn) {  
            if(elem.addEventListener){  
                elem.addEventListener(event, fn, false);  
            }else if (elem.attachEvent){  
                elem.attachEvent('on'+event, fn);  
            }else{  
                elem['on'+event] = fn;  
            }  
        },

        /**
         * [hasGetUserMedia 检测用户是否支持多原生媒体调用]
         * @return {Boolean} [description]
         */
        hasGetUserMedia : function() {  //检测用户是否支持多原生媒体调用
            return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        }
    };


    /**************************************
          ︿︿︿╮  低  调    ︿︿︿╮     
         {/ o o /}  分隔线   {/ @ @ /}   
         ( (oo) )   猪  猪   ( (oo) )     
          ︶︶︶    说你呢   ︶ ︶ ︶     
    ***************************************/ 

    /**
     * [bindError js报错捕获]
     */
    function _bindError (){
        var self = _app;
        /** 
        * @param {String} errorMessage  错误信息 
        * @param {String} scriptURI   出错的文件 
        * @param {Long}  lineNumber   出错代码的行号 
        * @param {Long}  columnNumber  出错代码的列号 
        * @param {Object} errorObj    错误的详细信息，Anything 
        */
        win.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj){
            var d = new Date();
            var params = {
                time : d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ' '+ d.getHours() + ':'+ d.getMinutes() + ':'+ d.getSeconds()
                ,error : errorMessage
                ,file : '第'+lineNumber+'行第'+columnNumber+'列; '+scriptURI
                ,device : self.device
                ,url : self.url
                ,openid : self.openid
            };
            var str = '【时间】' + params.time + ' <br/>\n' +
                      '【错误】' + params.error + ' <br/>\n' +
                      '【文件】' + params.file + ':' + lineNumber + ' <br/>\n' +
                      '【设备】' + params.device + ' <br/>\n' +
                      '【地址】' + params.url + ' <br/>\n' +
                      '【openid】' + params.openid + ' <br/>\n';
            self.log(str, 'Error --- JS报错拉拉拉 --- Error', { 
                styleTitle : 'color:red;font-size:14px;'
            });
        }
        /*self.addEvent(win, 'error', function(msg, url, line){
            self.log({ msg: msg, url: url, line: line }, '报错拉');
        });*/
    };

    function _setFlag () {
        var self = _app;
        //根据url参数的配置最高级，覆盖之前的配置
        self.params.isAlert && ( self.isAlert = self.filter(self.params.isAlert, true) );
        self.params.isPrint && ( self.isPrint = self.filter(self.params.isPrint, true) );
        self.params.isGlobal && ( self.isGlobal = self.filter(self.params.isGlobal, true) );
        self.params.isMock && ( self.isMock = self.filter(self.params.isMock, true) );
        self.openid = self.cookie('openid')||'';
    };

    /**
     * [setContext 自动设置系统上下文目录以及项目目录 如果有手动配置，则取消自动设置]
     */
    function _setContext () {
        var self = _app;
        var contextPath = doc.location.pathname.substr(1),
            arr = contextPath.split('/')||[],
            sysName = arr[0] || '',
            proName = arr[1] || '';
        if(!self.sysDir){
            self.sysDir = '/' + sysName + (sysName ? '/' : '');
        }
        if(!self.projectDir){
            self.projectDir = proName + (proName ? '/' : '');
        }
    };

    /**
     * [_setParams 设置url参数相关]
     * @param {[type]} url [url地址]
     */
    function _setParams() {
        var self = _app,
            params = self.getUrlValue(self.url||null)||{};

        self.params = params;
    };

    /**
     * [_setEvn 设置环境标识]
     */
    function _setEvn() {
        var self = _app,
            evn,
            host = win.location.hostname;

        if (/10|127|localhost/.test(host)) {//本地环境
            evn = 'dev';
        } else if (/stg|test/.test(host)) {//测试环境
            evn = 'stg';
        }else{
            evn = 'prd';//生产环境
        }
        self.evn = evn;
    };

    /**
     * [_setDevice 设置设备标识]
     */
    function _setDevice() {
        var self = _app;

        //各种设备的userAgent列举
        //
        //徐攀 iPhone6s：微信、QQ浏览器、UC浏览器、Safari
        //iPhone---Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Mobile/14A403 MicroMessenger/6.3.30 NetType/WIFI Language/zh_CN
        //iPhone---Mozilla/5.0 (iPhone 6s; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/6.0 MQQBrowser/6.9.1 Mobile/14A403 Safari/8536.25 MttCustomUA/2
        //iPhone---Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_1 like Mac OS X; zh-CN) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/14A403 UCBrowser/11.0.6.831 Mobile
        //iPhone---Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1
        //
        //徐攀 电脑：模拟iPhone6、模拟galaxy note3、chrome、IE8
        //Win32---Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1
        //Win32---Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
        //Win32---Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36
        //Win64---Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Win64; x64; Trident/4.0; .NET CLR 2.0.50727; SLCC2; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; Tablet PC 2.0; .NET4.0C; .NET4.0E)
        //
        //毛志荣 华为畅享5 微信、自带浏览器
        //Linux aarch64---Mozilla/5.0 (Linux; Android 5.1; HUAWEI TIT-AL00 Build/HUAWEITIT-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/37.0.0.0 Mobile MQQBrowser/6.8 TBS/036872 Safari/537.36 MicroMessenger/6.3.31.940 NetType/WIFI Language/zh_CN
        //Linux aarch64---Mozilla/5.0 (Linux; Android 5.1; zh-cn; HUAWEI TIT-AL00 Build/HUAWEI TIT-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/39.0.0.0 Mobile Safari/537.36
        //
        //王月 电脑 64位 win10：  chrome、 火狐、 edge、 IE8、 IE9、 IE10、 IE11
        //Win32---Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36
        //Win32---Mozilla/5.0 (Windows NT 10.0; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0
        //Win32---Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586
        //Win32---Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3)
        //Win32---Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3)
        //Win32---Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3)
        //Win32---Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko
        //
        //王月 手机 iPhone6splus：  微信、 safari、 chrome、 UC
        //iPhone---Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_2 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Mobile/14A456 MicroMessenger/6.3.25 NetType/WIFI Language/zh_CN
        //iPhone---Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_2 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A456 Safari/602.1
        //iPhone---Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_2 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/54.0.2840.91 Mobile/14A456 Safari/602.1
        //iPhone---Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_2 like Mac OS X; zh-CN) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/14A456 UCBrowser/11.2.6.887 Mobile  AliApp(TUnionSDK/0.1.6)
        //
        //冯黎亚 手机 小米4max：微信、UC、自带浏览器
        //Linux armv8l---Mozilla/5.0 (Linux; Android 6.0.1; MI MAX Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/37.0.0.0 Mobile MQQBrowser/6.8 TBS/036872 Safari/537.36 MicroMessenger/6.3.30.920 NetType/WIFI Language/zh_CN
        //Linux armv8l---Mozilla/5.0 (Linux; U; Android 6.0.1; zh-CN; MI MAX Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/40.0.2214.89 UCBrowser/11.2.1.888 Mobile Safari/537.36
        //Linux armv8l---Mozilla/5.0 (Linux; U; Android 6.0.1; zh-cn; MI MAX Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.85 Mobile Safari/537.36 XiaoMi/MiuiBrowser/8.4.4
        //
        //
        if(win.navigator){
            self.device = navigator.platform + '---' + navigator.userAgent;
            var lDev = self.device.toLowerCase(),
                mReg = self.device.match(/(iphone|ipod|ipad|android|ios|windows phone)/i),
                ieReg = self.device.match(/msie ([\d\.]+)/i),
                weixinReg = self.device.match(/micromessenger\/([\d\.]+)/i);
            if( mReg ){
                self.isMobile = true;
            }
            if( ieReg ){
                self.isIE = true;
                self.verIE = ieReg[1];
            }
            if( weixinReg ){
                self.isWeixin = true;
                self.verWeixin = weixinReg[1];
            }
            //对userAgent不做具体解析了，麻烦且不够准确，反正稍微对userAgent熟悉点看一眼就知道是什么系统、浏览器、内核
            self.log(self.device, '系统设备信息');
        }
    };

    /**
     * [_setBase 根据环境不同进行域名等基础配置]
     */
    function _setBase() {
        var self = _app,
            host = location.host;
        
        //设置系统时间
        var oTodayMS = new Date(),
            year = oTodayMS.getFullYear(),
            month = oTodayMS.getMonth()+1,
            day = oTodayMS.getDate();
        self.oServerDate = new Date(year, month-1, day);
        month = month<10 ? ('0'+month) : month;
        day = day<10 ? ('0'+day) : day;
        self.sServerDate = year + '-' + month + '-' + day;
        

        //设置相对协议域名
        self.comUrl = '//' + host;
        self.baseUrl = '//' + host + self.sysDir;
        self.cdnUrl = '//' + host + self.sysDir;

        if(self.evn == 'dev'){
            //self.appid = '';
            self.isLog = true;      //本地、测试环境开启日志打印功能

            //本地开发环境，调用会员等公共系统时需要修改为测试环境
            //如果你需要全部本地联调，可以在此进行注释或修改，甚至修改为别人的机器
            //另外，移动端和pc端测试环境的域名可能不一样，这里根据情况修改成自己的域名
            self.comUrl = self.isMobile ? '//mtest.sinosafe.com.cn' : '//test.sinosafe.com.cn';

            //本地测试可修改cdn域名
            //self.cdnUrl = '//' + host + self.sysDir;
            
            //本地测试可修改联调ajax域名
            //self.ajaxUrl = '//' + host + self.sysDir;

        }else if(self.evn == 'stg'){
            //self.appid = '';
            self.isLog = true;      //本地、测试环境开启日志打印功能

            //后续生产改成具体的cdn域名
            //self.cdnUrl = '//' + host + self.sysDir;
            //
        }else if(self.evn == 'prd'){
            //self.appid = '';
            //生产环境，先看url上有没有配置，有则取之，无则不设置吗，用最前面用户定义的开关
            self.params.isLog && ( self.isLog = self.filter(self.params.isLog, true) );

            //后续生产改成具体的cdn域名
            //self.cdnUrl = '//' + host + self.sysDir;
        }
    };


    /**
     * [_loadJSON2 动态加载JSON2库 主要是IE7及以下不支持]
     */
    function _loadJSON2() {
        var self = _app;

        if(!win.JSON || !JSON.stringify || !JSON.parse){
            self.loadJs(self.cdnUrl + 'libs/json2/json2.js', null, true, false);
        }
    };


    return _app;
});