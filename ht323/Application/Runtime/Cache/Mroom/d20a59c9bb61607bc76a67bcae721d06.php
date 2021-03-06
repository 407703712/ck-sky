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
        .xhd{
            background-color: red;
            width:8px;
            height: 8px;
            position: absolute;
            top: 0;
            right: 0;
            border-radius: 500px;
            display: none;
        }
        .td-manage p{
            display: inline-block;
            padding: 5px;
        }
    </style>
</head>
<body class="layui-anim layui-anim-up">
<div class="all-contain">
    <div class="x-nav">
      <span class="layui-breadcrumb" style="visibility: visible;">
        <a href="">首页</a><span lay-separator="">/</span>
        <a>
          <cite>会议室</cite>
        </a>
      </span>
    </div>
    <div class="x-body">
      <div class="layui-row">
        <form class="layui-form layui-col-md12 x-so">
          <input style="width: 400px" class="layui-input" placeholder="使用时间" name="start" id="start" lay-key="1" readonly>
          <input type="text" name="username" placeholder="申请人" autocomplete="off" class="layui-input">
          <button class="layui-btn" id="searchspace" type="button"><i class="layui-icon"></i></button>
        </form>
      </div>
      <xblock>
        <button class="layui-btn layui-btn-danger" onclick="delAll()"><i class="layui-icon"></i>批量删除</button>
        <button class="layui-btn" onclick="index_x_admin_show('添加会议室','memberAdd',600,400)"><i class="layui-icon"></i>添加</button>
          <button class="layui-btn" style="position: relative" onclick="my_x_admin_show('申请列表','<?php echo U('/mroom/workspace/showlist');?>')">申请列表 <span class="xhd"></span></button>
      </xblock>
        <div class="table-contain">
              <table class="layui-table">
                <thead>
                  <tr>
                    <th>
                      <div class="layui-unselect header layui-form-checkbox" lay-skin="primary"><i class="layui-icon"></i></div>
                    </th>
                    <th>会议室名</th>
                    <th>使用时间</th>
                    <th>使用人</th>
                    <th>状态</th>
                    <th>操作</th></tr>
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
    <div id="memberAdd" style="display: none;">
        <div class="x-body layui-anim layui-anim-up">
        <form class="layui-form">
          <div class="layui-form-item">
              <label for="workname" class="layui-form-label">
                  <span class="x-red">*</span>会议室名
              </label>
              <div class="layui-input-inline">
                  <input type="text" id="workname" name="workname"  lay-verify="required"  class="layui-input paste-input">
              </div>
          </div>
          <div class="layui-form-item">
              <label for="usertime" class="layui-form-label">
                  <span class="x-red">*</span>使用时间
              </label>
              <div class="layui-input-inline">
                  <input type="text" id="usertime" name="usertime"  readonly  class="layui-input paste-input">
              </div>
          </div>
          <div class="layui-form-item">
              <label for="username" class="layui-form-label">
                  <span class="x-red">*</span>使用者（申请人）
              </label>
              <div class="layui-input-inline">
                  <input type="text" id="username" name="username"  class="layui-input paste-input">
              </div>
          </div>
         <div class="layui-form-item">
              <label for="username" class="layui-form-label">
                  <span class="x-red">*</span>使用状态
              </label>
              <div class="layui-input-inline">
                    <select id="shipping" name="shipping" class="valid paste-input" value="disable">
                        <option value="disable">未用</option>
                        <option value="use">启用</option>
                    </select>
                    <div class="layui-unselect layui-form-select"> 
                        <dl class="layui-anim layui-anim-upbit" style="">
                            <dd lay-value="disable" class="disable">未用</dd>
                            <dd lay-value="use" class="use">启用</dd>
                        </dl>
                    </div>
              </div>
          </div>
          <div class="layui-form-item">
              <label class="layui-form-label">
              </label>
              <div class="layui-btn isadd" lay-filter="add" lay-submit="">
                  增加
              </div>
              <div class="layui-btn isedit" lay-filter="edit" lay-submit="">
                  修改
              </div>
          </div>
      </form>
    </div>
    </div>
</div>
    <script id="addScript">
        layui.use(['form','layer'], function(){
            $ = layui.jquery;
          var form = layui.form
          ,layer = layui.layer;
        
          //自定义验证规则
          form.verify({
            required: function(value){
             if(value==""||value==null||value==undefined){
                return "会议室名不能为空"
             }
            }
          });

          //监听提交 添加数据
          form.on('submit(add)', function(data){
                console.log(data);
                // //发异步，把数据提交给php
              var data=data;
              var getStatus='';
              data.field.shipping=="use"?getStatus='已启用':getStatus='未启用';
              $.ajax({
                  type: "GET",
                  url: "<?php echo U('Workspace/addData');?>",
                  dataType: "json",
                  data:{workname:data.field.workname,
                      workuser:data.field.username,
                      worktime:data.field.usertime,
                      status:getStatus
                  },
                  success: function(res){
//                      console.log("编辑数据返回：",res);
                      console.log("添加数据返回：",res);
//                      if(res.info!='200'){
//                          return false;
//                      }
                      if(data.field.shipping=="use"){
                          var status='<span class="layui-btn layui-btn-normal layui-btn-mini changetxt">已启用</span>'
                      }else{
                          var status='<span class="layui-btn layui-btn-mini layui-btn-primary changetxt">未启用</span>'
                      }
                      var workid=$("#workbody tr").length+1;
                      var addList='<tr id="'+workid+'">'+
                              '<td>'+
                              '<div class="layui-unselect layui-form-checkbox" lay-skin="primary" data-id="2"><i class="layui-icon"></i></div>'+
                              '</td>'+
                              '<td class="changetxt">'+data.field.workname+'</td>'+
                              '<td class="changetxt">'+data.field.usertime+'</td>'+
                              '<td class="changetxt">'+data.field.username+'</td>'+
                              '<td class="td-status">'+
                              status+
                              '</td>'+
                              '<td class="td-manage">'+
                              '<p  onclick="edit_x_admin_show(this,\'编辑\',\'memberAdd\',600,400)" >'+
                              '编辑'+
                              '</p>'+
                              '<p  onclick="member_del(this,workid)" >'+
                              '删除'+
                              '</p>'+
                              '</td>'+
                              '</tr>';
                      $("#workbody").append(addList);
                      layer.msg('添加成功!',{icon:1,time:1000});
                      form.render();
                  }
              });

          });
          //监听编辑 更新数据
          form.on('submit(edit)', function(data){
                console.log(data);
                // //发异步，把数据提交给php
              var data=data;
              var getStatus='';
              data.field.shipping=="use"?getStatus='已启用':getStatus='未启用';
              $.ajax({
                  type: "GET",
                  url: "<?php echo U('Workspace/updateData');?>",
                  dataType: "json",
                  data:{workname:data.field.workname,
                      workuser:data.field.username,
                      worktime:data.field.usertime,
                      status:getStatus,
                      workid:window.trid
                  },
                  success: function(res){
                      console.log("编辑数据返回：",res);
                  }
              });
                var ctxt=$.ctxt;
                $(ctxt[0]).text(data.field.workname);
                $(ctxt[1]).text(data.field.usertime);
                $(ctxt[2]).text(data.field.username);
                if (data.field.shipping=="use") {
                    $(ctxt[3]).text('已启用');
                    $(ctxt[3]).removeClass('layui-btn-primary');
                    $(ctxt[3]).addClass('layui-btn-normal');
                }else if(data.field.shipping=="disable"){
                    $(ctxt[3]).text('未启用');
                    $(ctxt[3]).addClass('layui-btn-primary');
                    $(ctxt[3]).removeClass('layui-btn-normal');
                }
                layer.closeAll();
                return false;
          });
        });
    </script>
    <script>
      layui.use(['laydate','form'], function(){
        var laydate = layui.laydate;
        var  form = layui.form;
        window.form=form;
        //执行一个laydate实例
        laydate.render({
          elem: '#start' //指定元素
          ,type: 'datetime'
          ,range:true
        });

        //执行一个laydate实例
        laydate.render({
          elem: '#usertime' //指定元素
          ,type: 'datetime'
          ,range:true
        });
      });
      function index_x_admin_show(title,content,w,h){
           $(".isadd").show();
           $(".isedit").hide();
            if (w == null || w == '') {
                w=($(window).width()*0.9);
            }
            if (h == null || h == '') {
                h=($(window).height() - 50);
            }
            var layerOpen = layer.open({
                type: 1,
                area: [w+'px', h +'px'],
                fix: true, //不固定
                maxmin: true,
                shadeClose: true,
                shade:0.4,
                title: title,
                content: $("#"+content)
            });
            layer.full(layerOpen);   
      }
      function edit_x_admin_show(self,title,content,w,h){
          window.trid=$(self).parent().parent().attr('id');
          console.log('window.trid',window.trid);
           $(".isadd").hide();
           $(".isedit").show();
            if (w == null || w == '') {
                w=($(window).width()*0.9);
            }
            if (h == null || h == '') {
                h=($(window).height() - 50);
            }
            var layerOpen = layer.open({
                type: 1,
                area: [w+'px', h +'px'],
                fix: true, //不固定
                maxmin: true,
                shadeClose: true,
                shade:0.4,
                title: title,
                content: $("#"+content)
            });
            layer.full(layerOpen);
            var datas=[];
            var ctxt=[];
            $(self).parent().parent().find('.changetxt').each(function(index, el) {
                datas.push($(this).text());
                ctxt.push(el);
            });
            $.extend(true,{'ctxt':ctxt});  
            console.log(datas);
            $(".paste-input").each(function(index, el) {
                if (index==3) {
                    datas[index]=="已启用"?$(this).val('use'):$(this).val('disable');
                    form.render('select');
                }
                $(this).val(datas[index]);
            });
      }
       /*用户-停用*/
      function member_stop(obj,id){
          layer.confirm('确认要停用吗？',function(index){
              if($(obj).attr('title')=='启用'){

                //发异步把用户状态进行更改
                $(obj).attr('title','停用')
                $(obj).find('i').html('&#xe62f;');
                $(obj).parents("tr").find(".td-status").find('span').addClass('layui-btn-disabled').html('已停用');
                layer.msg('已停用!',{icon: 5,time:1000});

              }else{
                $(obj).attr('title','启用')
                $(obj).find('i').html('&#xe601;');

                $(obj).parents("tr").find(".td-status").find('span').removeClass('layui-btn-disabled').html('已启用');
                layer.msg('已启用!',{icon: 5,time:1000});
              }
          });
      }

      /*用户-删除*/
      function member_del(obj,id){
          var workid=id;
          layer.confirm('确认要删除吗？',function(index){
              //发异步删除数据
              $.ajax({
                  type: "GET",
                  url: "<?php echo U('Workspace/delSample');?>",
                  dataType: "json",
                  data:{workid:workid},
                  success: function(data){
                      if(data.info=="200"){
                          $(obj).parents("tr").remove();
                          layer.msg('已删除!',{icon:1,time:1000});
                      }
                  }
              })

          });
      }



      function delAll (argument) {

        var data = tableCheck.getData();
  
        layer.confirm('确认要删除吗？'+data,function(index){
            //捉到所有被选中的，发异步进行删除
            $.ajax({
                type: "GET",
                url: "<?php echo U('Workspace/delAll');?>",
                dataType: "json",
                success: function(data){
                    if(data.info=="200"){
                        layer.msg('删除成功', {icon: 1});
                        $(".layui-form-checked").not('.header').parents('tr').remove();
                    }
                }
            })
        });
      }
        $(function () {
            $("#searchspace").click(function () {
                layer.msg('搜索功能暂未开放!',{icon:1,time:1000});
            })
            $.ajax({
                type: "GET",
                url: "<?php echo U('Workspace/getWorkspaceData');?>",
                dataType: "json",
                success: function(data){
                   console.log("会议室列表数据：",data.datas);
                    var addList='';
                    $.each(data.datas,function(i,v){
                        if(v.status=="已启用"){
                            var status='<span class="layui-btn layui-btn-normal layui-btn-mini changetxt">已启用</span>'
                        }else{
                            var status='<span class="layui-btn layui-btn-mini layui-btn-primary changetxt">未启用</span>'
                        }
                        addList+='<tr id="'+ v.workid+'">'+
                                '<td>'+
                                '<div class="layui-unselect layui-form-checkbox" lay-skin="primary" data-id="2"><i class="layui-icon"></i></div>'+
                                '</td>'+
                                '<td class="changetxt">'+v.workname+'</td>'+
                                '<td class="changetxt">'+v.worktime+'</td>'+
                                '<td class="changetxt">'+v.workuser+'</td>'+
                                '<td class="td-status">'+
                                status+
                                '</td>'+
                                '<td class="td-manage">'+
                                '<p  onclick="edit_x_admin_show(this,\'编辑\',\'memberAdd\',600,400)" >'+
                                '编辑'+
                                '</p>'+
                                '<p  onclick="member_del(this,'+ v.workid+')" >'+
                                '删除'+
                                '</p>'+
                                '</td>'+
                                '</tr>';
                    })
                    $("#workbody").append(addList);

                }
            });
            var wH=$("html").height();
            $(".all-contain").height(wH);
            $.ajax({
                type: "GET",
                url: "<?php echo U('Workspace/getlistNum');?>",
                dataType: "json",
                success: function(data){
                    console.log("请求列表数量：",data);
                    if(data.datas.length>0){
                        $(".xhd").show();
                    }
                }
            });
        })
        function my_x_admin_show(title,url,w,h){
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
                content: url,
                end:function(){
                    location.reload();
                }
            });
            layer.full(layerOpen);
        }
    </script>

<div class="layui-layer-move"></div></body>
</html>