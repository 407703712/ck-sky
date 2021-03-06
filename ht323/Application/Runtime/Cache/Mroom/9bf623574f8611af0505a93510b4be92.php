<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>奋达智能</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"
          content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8,target-densitydpi=low-dpi"/>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="/Public/admin/css/font.css">
    <link rel="stylesheet" href="/Public/admin/css/xadmin.css">
    <link rel="stylesheet" href="/Public/admin/css/common.css">
    <script type="text/javascript" src="/Public/jquery/jquery.min.js"></script>
    <script src="/Public/admin/lib/layui/layui.js" charset="utf-8"></script>
    <script type="text/javascript" src="/Public/admin/js/xadmin.js"></script>
    <script type="text/javascript" src="/Public/admin/js/common.js"></script>
    <script type="text/javascript" src="/Public/wangEditor/release/wangEditor.min.js"></script>
    <!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
    <!--[if lt IE 9]>
    <script src="/Public/admin/html5.min.js"></script>
    <script src="/Public/admin/respond.min.js"></script>
    <![endif]-->
    <style type="text/css">
        .layui-layer-title{
            min-width: 50%;
        }
        .layui-layer-content{
            padding: 20px;
        }
        .layui-form-label{
            padding-left: 0;
            padding-right: 0;
            width:200px;
            margin-right: 20px;
        }
        .td-manage{
            cursor:pointer
        }
        /*.table-contain{*/
        /*height: 500px;*/
        /*overflow: hidden;*/
        /*}*/
        .all-contain{
            overflow-y: auto;
        }
        .fenda-title-contain{
            width: 97%;
            margin: 0 auto;
            font-size: 0px;
            height: 50px;
            border-radius: 10px;
            overflow: hidden;
            background-image: url("/Public/admin/images/navBg.png");
            background-size: 100%;
            line-height: 50px;
            margin-top: 15px;
        }
        .fenda-logo{
            height: 100%;
            display: inline-block;
            float: left;
        }
        .fenda-logo img{
            width: 255px;

        }
        .back-contain{
            float: left;
            color: white;
            font-size: 20px;
            display: inline-block;
            width: calc(100% - 255px);
            text-align: center;
            text-indent: -125px;
        }
        .x-body{
            padding: 0 20px;
        }
        .layui-form-label{
            text-align: left;
        }
    </style>
</head>
<body class="layui-anim layui-anim-up">
    <div class="x-body layui-anim layui-anim-up">
        <form class="layui-form">
            <div class="layui-form-item">
                <label for="starts" class="layui-form-label">
                    <span class="x-red">*</span>申请使用时间
                </label>
                <div class="layui-input-inline">
                    <input class="layui-input" placeholder="使用时间" name="starts" id="starts" lay-key="1" readonly>
                </div>
            </div>
            <div class="layui-form-item">
                <label for="username" class="layui-form-label">
                    <span class="x-red">*</span>申请人
                </label>
                <div class="layui-input-inline">
                    <input type="text" id="username" name="username"  class="layui-input paste-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">
                </label>
                <div class="layui-btn isadd" lay-filter="add" lay-submit="">
                    申请
                </div>
            </div>
        </form>
    </div>
<script>
    layui.use(['laydate','form','layer'], function(){
        var laydate = layui.laydate;
        var  form = layui.form;
        var  layer = layui.layer;
        window.form=form;
        //执行一个laydate实例
        laydate.render({
            elem: '#starts' //指定元素
            ,type: 'datetime'
        });
    });
    console.log(window.location.href);
    $(".isadd").click(function(){
        var worktime=$("#starts").val();
        var workuser=$("#username").val();
        var workid=sessionStorage.getItem('workid');
        var workname=sessionStorage.getItem('workname');
        if(worktime==""||workname==""){
            layer.alert("名字与时间不能为空");
        }
        var postData={
            worktime:worktime,
            workname:workname,
            workid:workid,
            workuser:workuser
        }
        $.ajax({
           url:"<?php echo U('Show/upshenQing');?>",
            type:"GET",
            data:postData,
            success:function(res){
                console.log(res);
                if(res.info=="200"){
                    parent.layer.closeAll();
                    parent.layer.msg("发送申请成功！");
                }
            }
        });
    })
</script>
</body>
</html>