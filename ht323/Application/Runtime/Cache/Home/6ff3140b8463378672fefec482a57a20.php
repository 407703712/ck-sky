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
    </style>
</head>
<body class="layui-anim layui-anim-up">
<div class="all-contain">
    <div class="x-body">
        <div class="layui-row">
            <form class="layui-form layui-col-md12 x-so">
                <input class="layui-input" placeholder="情输入相关信息" name="search" id="search" lay-key="1"  style="width: 500px;vertical-align: middle">
                <button class="layui-btn" type="button" id="searchBtn"><i class="layui-icon"></i></button>
            </form>
        </div>
        <div class="table-contain">
            <table class="layui-table">
                <thead>
                <tr>
                    <th>文件名</th>
                    <th>Mac地址</th>
                    <th>操作</th>

                </tr>
                </thead>
                <tbody id="workbody">
                </tbody>
            </table>
        </div>
        <div class="page">
            <div>
                <a class="prev" href="#">&lt;&lt;</a>
                <a class="current" href="#">1</a>
                <a class="next" href="#">&gt;&gt;</a>
            </div>
        </div>
    </div>
</div>
<div class="file-open-contain">
    <table class="layui-table">
        <thead>
        <tr>
            <th>文件名</th>
            <th>操作</th></tr>
        </thead>
        <tbody id="filebody">
        </tbody>
    </table>
</div>
<script>
    layui.use(['laydate','form','layer'], function(){
        var laydate = layui.laydate;
        var  form = layui.form;
        var layer = layui.layer;
        window.form=form;
    });
    $(function () {
        var origin=window.location.origin+"/";
        $(document).on('click','#searchBtn',function(e){
            if($("#search").val()==""){
                layer.msg('文件名不能为空！');
                return false;
            }
            $.ajax({
                type: "GET",
                url: "<?php echo U('Workspace/searchData');?>",
                dataType: "json",
                data:{'filename':$("#search").val()},
                success: function(data) {
                    console.log("搜索返回数据：",data.datas);
                    var addList="";
                    $.each(data.datas,function(i,v){
                        addList+='<tr id="'+ v.workid+'">'+
                                '<td class="changetxt">'+v.filename+'</td>'+
                                '<td class="changetxt">'+v.address+'</td>'+
                                '<td class="td-manage">'+
                                '<a href="'+origin+ v.address+'">'+
                                '下载'+
                                '</a>'+
                                '</td>'+
                                '</tr>';
                    });
                    $("#filebody").html(addList);
                    var layopen=layer.open({
                        type: 1,
                        fix: true, //不固定
                        maxmin: true,
                        shadeClose: true,
                        shade:0.4,
                        title: '文件列表',
                        content: $(".file-open-contain").html() //这里content是一个普通的String
                    });
                    layer.full(layopen);
                }
            });

        });
        var fileDatas=JSON.parse(sessionStorage.getItem('fileDatas'));
        var addList='';
        console.log("文件列表数据",fileDatas);

        $.each(fileDatas,function(i,v){
            addList+='<tr id="'+ v.workid+'">'+
                    '<td class="changetxt">'+v.filename+'</td>'+
                    '<td class="changetxt">'+v.address+'</td>'+
                    '<td class="td-manage">'+
                    '<a href="'+origin+ v.address+'">'+
                    '下载'+
                    '</a>'+
                    '</td>'+
                    '</tr>';
        });
        $("#workbody").html(addList);
        var wH=$("html").height();
        $(".all-contain").height(wH);
    })
</script>

<div class="layui-layer-move"></div></body>
</html>