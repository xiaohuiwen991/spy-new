/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {

	config.font_names='宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑;'+ config.font_names;
	config.image_previewText=' ';
	config.removeDialogTabs = 'image:advanced;image:Link';
	config.filebrowserUploadUrl = top.uploadPath+'/api/upload?host='+localData.get('userInfo').serverIp+'&port='+localData.get('userInfo').serverPort+'&project='+top.path;
	config.skin = 'kama'; //ckeditor的皮肤，风格设置
	config.removePlugins = 'save';//移除保存按钮
	config.removePlugins = 'image';//移除保存按钮
	config.language = 'zh-cn';
	config.extraPlugins = 'myImage';
};
