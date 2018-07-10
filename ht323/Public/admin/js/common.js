// jquery拓展。获取url链接地址参数
// 示例： $.getUrlVars();
$.extend({
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

$(function () {
    // 通用表单数据提交
    layui.use(['form'], function () {
        var form = layui.form;

        // 表单登陆
        form.on('submit(login)', function (layDom) {
            var shade = layer.load(1, {shade: [0.1, '#fff']});
            $.post(layDom.form.action, layDom.field, function (res) {
                if (parseInt(res.code) === 0) {
                    layer.close(shade);
                    layer.msg(res.msg);
                } else {
                    window.location.href = res.url;
                }
            }, 'json');
            return false;
        });

        // 表单新增+修改
        form.on('submit(submit)', function(layDom){
            var shade = layer.load(1, {shade: [0.1, '#fff']});
            $.post(layDom.form.action, layDom.field, function (res) {
                if (parseInt(res.code) === 0) {
                    var msg = res.msg;
                    if(msg === '登陆已过期'){
                        layer.msg('登陆已过期,3秒后请重新登陆');
                        setTimeout(function(){
                            var index = parent.layer.getFrameIndex(window.name);
                            parent.layer.close(index);
                            parent.$("#outLoginBtn").click();
                        }, 3000);
                    } else {
                        layer.close(shade);
                        layer.msg(msg);
                    }
                } else {
                    parent.location.reload();
                }
            });
            return false;
        });

        form.verify({
            'urlExist': [/(^$)|(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/,"链接格式不正确"],
            'int': [/(^\d+$)/,"数字类型不正确"],
            'price': [/(^\d+$)|(^\d+\.\d{1,2}$)/,"价格格式不正确"],
        });
    });

    // 列表搜索，自动填充默认值
    layui.use(['form'], function () {
        var form = layui.form;
        var param = $.getUrlVars();
        for (var key in param) {
            var value = param[key];
            $('[name="' + key + '"]').val(value);
        }
        form.render();
    });

    // 时间控件渲染
    layui.use('laydate', function () {
        var laydate = layui.laydate;

        laydate.render({
            elem: '#date_start' //指定元素
        });

        laydate.render({
            elem: '#date_end' //指定元素
        });
    });

});

// 正常-禁用
function status_change(obj, url) {
    layui.use(['layer'], function () {
        layer.confirm('请确认是否更改状态？', function (index) {
            var title = $(obj).attr('title');
            var status = title === '正常' ? 0 : 1;
            $.post(url, {'status': status}, function (res) {
                if (parseInt(res.code) === 0) {
                    layer.msg(res.msg);
                    return false;
                }

                if (title === '正常') {
                    $(obj).attr('title', '禁用');
                    $(obj).find('i').html('&#xe62f;');

                    $(obj).parents("tr").find(".td-status").find('span').addClass('layui-btn-disabled').html('禁用');
                    layer.msg('已禁用!', {icon: 2, time: 1000});
                } else {
                    $(obj).attr('title', '正常')
                    $(obj).find('i').html('&#xe601;');

                    $(obj).parents("tr").find(".td-status").find('span').removeClass('layui-btn-disabled').html('正常');
                    layer.msg('已启用!', {icon: 1, time: 1000});
                }
            }, 'json');
        })
    })
}