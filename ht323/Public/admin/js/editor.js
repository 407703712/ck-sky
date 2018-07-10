var E = window.wangEditor;
var editor = new E('#editor');
var editorContent = $('#editorContent');
editor.customConfig.showLinkImg = false;
editor.customConfig.uploadImgServer = '/admin/upload/editor';
editor.customConfig.zIndex = 0;
editor.customConfig.uploadFileName = 'files';
editor.customConfig.onchange = function (html) {
    editorContent.val(html);
}
editor.create();