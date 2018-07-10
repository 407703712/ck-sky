<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>欢迎使用奋达智能管理后台</title>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8,target-densitydpi=low-dpi" />
    <meta http-equiv="Cache-Control" content="no-siteapp" />

    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="/Public/admin/css/font.css">
    <link rel="stylesheet" href="/Public/admin/css/xadmin.css">
    <link rel="stylesheet" href="/Public/admin/css/common.css">
    <script type="text/javascript" src="/Public/jquery/jquery.min.js"></script>
    <script src="/Public/admin/lib/layui/layui.js" charset="utf-8"></script>
    <script type="text/javascript" src="/Public/admin/js/xadmin.js"></script>
    <script type="text/javascript" src="/Public/admin/js/common.js"></script>
    <style>
        #nav li ul{
            padding-left: 15px;
        }
    </style>
</head>
<body>
<!-- 顶部开始 -->
<div class="container">
    <div class="logo"><a href="./index.html">奋达智能</a></div>
    <div class="left_open">
        <i title="展开左侧栏" class="iconfont">&#xe699;</i>
    </div>
    <ul class="layui-nav right" lay-filter="">
        <li class="layui-nav-item">
            <a href="javascript:;"><?php echo (session('nickname')); ?></a>
            <dl class="layui-nav-child"> <!-- 二级菜单 -->
                <!--<dd><a onclick="x_admin_show('个人信息','http://www.baidu.com')">个人信息</a></dd>-->
                <dd><a id="outLoginBtn" href="<?php echo U('/home/login/out_login');?>">退出</a></dd>
            </dl>
        </li>
        <!--<li class="layui-nav-item to-index"><a href="/">前台首页</a></li>-->
    </ul>

</div>
<!-- 顶部结束 -->
<!-- 中部开始 -->
<!-- 左侧菜单开始 -->
<div class="left-nav">
    <div id="side-nav">
        <ul id="nav">
        </ul>
    </div>
</div>
<!-- <div class="x-slide_left"></div> -->
<!-- 左侧菜单结束 -->
<!-- 右侧主体开始 -->
<div class="page-content">
    <div class="layui-tab tab" lay-filter="xbs_tab" lay-allowclose="false">
        <ul class="layui-tab-title">
            <li>我的桌面</li>
        </ul>
        <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">
                <iframe src="<?php echo U('/home/home/welcome');?>" frameborder="0" scrolling="yes" class="x-iframe"></iframe>
            </div>
        </div>
    </div>
</div>
<div class="page-content-bg"></div>
<!-- 右侧主体结束 -->
<!-- 底部开始 -->
<div class="footer">
    <div class="copyright">Copyright ©<?php echo date('Y');?> 奋达智能 All Rights Reserved</div>
</div>
<!-- 底部结束 -->
<input type="hidden" value="<?php echo U('/home/home/menuDatas');?>" id="#menuDatas">
<script>
    $.ajax({
        type: "GET",
        url: "<?php echo U('/home/home/menuDatas');?>",
        dataType: "json",
        success: function(res){
            console.log("res数据：",res);
            var menu1=res.menu1.map(function (v,i) {
                return v.projecttype;
            });
            console.log("menu1：",menu1);
            var menu2={};
            $.each(menu1,function(i,v){
                menu2[v]={};
            });
            console.log("menu2",menu2);
            var record=[];//记录第三级列表数据
            $.each(menu2, function (i,v) {
                $.each(res.datas, function (i1,v1) {
                    if(v1.projecttype==i){
                        if(v1.devicetype!=""){
                            if(v1.datetype!=""){  //如果有第三级导航栏
                                if(typeof menu2[i][v1.devicetype]!="object"){
                                    menu2[i][v1.devicetype]={};
                                    menu2[i][v1.devicetype][v1.datetype]={};
                                }
                                menu2[i][v1.devicetype][v1.datetype]=v1.datetype;
                            }else{ //如果有第二级导航栏
                                menu2[i][v1.devicetype]=v1.devicetype;
                            }
                        }else{ //如果只有第一级导航栏
                            menu2[i]="";
                        }
                    }
                })
            });
            var parentList='';
            for(var x in menu2 ){
                var innerList='';
                var secondList='';
                if(typeof menu2[x]==="object"){
                    for(var y in menu2[x]){
                        if(typeof menu2[x][y]==="object"){ //拥有三级菜单
                            for(var z in menu2[x][y]){
                                secondList+='<ul class="sub-menu">'+
                                        '<li flagid="'+x+','+y+','+z+'">'+
                                        '<a _href="<?php echo U('/home/workspace/index');?>">'+
                                        '<cite>'+z+'</cite>'+
                                        '</a>'+
                                        '</li>'+
                                        '</ul>';
                            }
                            innerList+='<ul class="sub-menu">'+
                                    '<li flagid="'+x+','+y+'">'+
                                    '<a _href="<?php echo U('/home/workspace/index');?>">'+
                                    '<i class="iconfont">&#xe6a7;</i>'+
                                    '<cite>'+y+'</cite>'+
                                    '</a>'+
                                    secondList+
                                    '</li>'+
                                    '</ul>';

                            secondList='';
                        }else{ //只有二级菜单
                            innerList+='<ul class="sub-menu">'+
                                    '<li flagid="'+x+','+menu2[x][y]+'">'+
                                    '<a _href="<?php echo U('/home/workspace/index');?>">'+
                                    '<cite>'+menu2[x][y]+'</cite>'+
                                    '</a>'+
                                    '</li>'+
                                    '</ul>';
                        }
                    }
                    var parentList= '<li class="" flagid="'+x+'">'+
                            '<a _href="<?php echo U('/home/workspace/index');?>">'+
                            '<cite>'+x+'</cite>'+
                            '<i class="iconfont nav_right">&#xe697;</i>'+
                            '</a>'+
                            innerList+
                            '</li>';
                    $("#nav").append(parentList);
                }else{  //只有一级菜单
                    var parentList= '<li class="" flagid="'+x+'">'+
                            '<a _href="<?php echo U('/home/workspace/index');?>">'+
                            '<cite>'+x+'</cite>'+
                            '</a>'+
                            '</li>';
                    $("#nav").append(parentList);
                }
            }
            console.log(parentList);
            console.log("menu2",menu2);
        }
    })
    $(function () {
        $(document).on('click','#nav li', function () {
            if($(this).find('ul').length>0){
                console.log("中断！");
                return false
            }
            var postData={};
            var flagIdarr=$(this).attr('flagid').split(',');
            postDataFuc= function () {
                var postObj={}
                postObj['projecttype']=flagIdarr[0];
                postObj['devicetype']=flagIdarr[1];
                postObj['datetype']=flagIdarr[2];
                return postObj;
            }
            postData=postDataFuc();
            console.log("postData",postData);
            $.ajax({
                type: "GET",
                url:"<?php echo U('/home/home/searchFileDtas');?>",
                dataType: "json",
                data:postData,
                success: function(res){
                    console.log("对应列表返回数据",res);
                    sessionStorage.setItem('fileDatas',JSON.stringify(res.datas));
                }
            })
        })
    })
</script>
</body>
</html>