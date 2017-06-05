CKEDITOR.plugins.add('myImage', {
    init: function(editor){
        editor.addCommand('myImage', new CKEDITOR.dialogCommand('myImage'));
        editor.ui.addButton('addMyImg',
            {
                label: '上传图片',
                icon: './plugins/myImage/img/myimg.png',
                command: 'myImage'
            });
        CKEDITOR.dialog.add('myImage', function(a) {
            return {
                title: '上传图片',
                minWidth: 390,
                minHeight: 150,
                contents: [{
                    id: 'myImgTab1',
                    label: '',
                    title: '',
                    expand: 0,
                    padding: 0,
                    elements: [
                        {
                            type: 'html',
                            html: '<form id="my-ck-upload-form">'+
                                    '<div id="my-ck-upload-div" style="position: absolute;width: 100px;height: 20px;line-height: 20px;text-align: center;border: 1px solid #ccc;border-radius: 3px;background: #ddd">选择图片并上传</div><input id="my-ck-file"  onmouseenter="mymouseenter();" onmouseleave="mymouseleave();" style="position: absolute;width: 100px;height: 20px;opacity: 0;margin-right: 10px" type="file" onchange="mychange();"/>'+
                                    // '<a style="-webkit-user-select: none;" href="javascript:void(0)" onclick="myupload();" title="上传到服务器" hidefocus="true" class="cke_dialog_ui_fileButton cke_dialog_ui_button" role="button" aria-labelledby="cke_168_label" id="my-ck-upload-a"><span id="my-ck-upload-span" class="cke_dialog_ui_button">上传到服务器</span></a><br>'+
                                    '<br><input id="my-ck-show-url" class="cke_dialog_ui_input_text" type="text" placeholder="图片上传成功后，显示图片地址" style="height: 22px;margin-top: 15px;border: 1px solid #bbb; padding: 2px 5px; width: 370px;"/>'+
                                '</form>'
                        }
                    ]
                }],
                buttons: [
                    CKEDITOR.dialog.okButton,
                    CKEDITOR.dialog.cancelButton
                ],
                onOk: function () {
                    if($('#my-ck-show-url').val() != '') {
                        editor.insertHtml('<img src="' + $('#my-ck-show-url').val() + '"/>');
                    }else{
                        alert('请先上传图片');
                        return false;
                    }
                    $('#my-ck-file').val('');
                    $('#my-ck-show-url').val('');
                }
            }
        });
    }
});

function mychange(){
    myupload();
}

function mymouseenter(){
    $('#my-ck-upload-div').css({
        'border':'1px solid #444'
    });
}

function mymouseleave(){
    $('#my-ck-upload-div').css({
        'border':'1px solid #ccc'
    });
}

function myupload(){
    var fileUrl = top.uploadPath+'/api/upload?host='+localData.get('userInfo').serverIp+'&port='+localData.get('userInfo').serverPort+'&project='+top.path;

    var data = new FormData();
    var files = document.querySelector('#my-ck-file').files;
    var i = files.length;
    while(i--){
        data.append('ckFile', files[i]);
    }
    $.ajax({
        type: 'POST',
        url: fileUrl,
        data: data,
        dataType: 'JSON',
        cache: false,
        processData: false,
        contentType: false,
        success: function(res){
            if(res.result == 1){
                $('#my-ck-file').val('');
                $('#my-ck-show-url').val(res.data);
            }else{
                toast(res.msg).err();
            }
        }
    });
}

