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
            background-size: 100% 100%;
            background-repeat: no-repeat;
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
    </style>
</head>
<body class="layui-anim layui-anim-up">
<div class="all-contain">
    <div class="fenda-title-contain">

        <div class="fenda-logo">
            <img src="/Public/admin/images/logo.png" alt="">
        </div>
        <div class="back-contain">
            奋达会议室列表
        </div>

    </div>
    <div class="x-body">
        <div class="table-contain">
            <table class="layui-table">
                <thead>
                <tr>
                    <th>会议室名</th>
                    <th>使用时间</th>
                    <th>使用人</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody id="workbody">
                <?php if(is_array($list)): foreach($list as $key=>$vo): ?><tr>
                        <td><?php echo ($vo["workname"]); ?></td>
                        <td><?php echo ($vo["worktime"]); ?></td>
                        <td><?php echo ($vo["workuser"]); ?></td>
                        <td><?php echo ($vo["status"]); ?></td>
                        <td class="td-manage" data-workid="<?php echo ($vo["workid"]); ?>">
                            <button class="layui-btn layui-btn-mini <?php echo ($vo["status==='已启用'?'layui-btn-primary':'layui-btn-normal'"]); ?>" onclick="inner_x_admin_show(this,'编辑品牌','<?php echo U('/mroom/show/datetime');?>')" <?php echo ($vo["status==='已启用'?'disabled':''"]); ?>>
                                申请
                            </button>
                        </td>
                    </tr><?php endforeach; endif; ?>
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
<script>

    function inner_x_admin_show(self,title,url,w,h){
        var workname=$($(self).parent().prevAll().eq(3)).text();
        var workid=$(self).parent().data('workid');
        sessionStorage.setItem('workname',workname);
        sessionStorage.setItem('workid',workid);
        if (title == null || title == '') {
            title=false;
        }
        if (url == null || url == '') {
            url="404.html";
        }
        if (w == null || w == '') {
            w=($(window).width()*0.9);
        }
        if (h == null || h == '') {
            h=($(window).height() - 50);
        }
        var layerOpen = layer.open({
            type: 2,
            area: [w+'px', h +'px'],
            fix: false, //不固定
            maxmin: true,
            shadeClose: true,
            shade:0.4,
            title: title,
            content: url
        });
    }
</script>
</body>
</html>