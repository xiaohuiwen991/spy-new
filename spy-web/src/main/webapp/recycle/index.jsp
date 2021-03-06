<%@ page import="java.net.InetAddress" %>
<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false"%>
<c:set var="path" value="${pageContext.request.contextPath}" />
<c:set var="serverIp" value="${pageContext.request.serverName}" />
<c:set var="serverPort" value="${pageContext.request.serverPort}" />
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>::开发代码管理系统::</title>
    <link rel="stylesheet" href="${path}/dist/css/base.css">
    <link rel="stylesheet" href="${path}/dist/css/index.css">
    <link rel="stylesheet" href="${path}/dist/css/message.css">
    <style>
        /*#root-tabs,#root-tabs > div.tabs-header,#root-tabs > div.tabs-panels,#root-tabs > div.tabs-header > div.tabs-wrap  {*/
        /*!*max-width: 100% !important;*!*/
        /*}*/
        /*#root-tabs .tabs{*/
        /*width: auto;*/
        /*}*/
        /*body{*/
        /*display: table;height: 100vh;width:100vw;overflow-y: hidden;*/
        /*}*/
        /*#root-main{*/
        /*display: table-row;height: 100%;*/
        /*}*/
        /*#root-tabs{*/
        /*display: table-cell;height: 100%;*/
        /*}*/
    </style>
    <script>
        top.path='${path}';
        top.uploadPath = '${uploadServer}';
        top.limits = ${limits};
        top.roles = ${roles};
        top.trueName = '${currentUser.trueName}';
        top.userName = '${currentUser.userName}';
        top.socketPath = '${socketServer}';
        top.serverIp = '<%=InetAddress.getLocalHost().getHostAddress()%>';
        top.serverPort = '${serverPort}';
    </script>
</head>
<body class="over-yh">
<header>
    <h1 id="head-txt">刑技实施管理平台</h1>
    <div id="root-info-bar">
        <a id="user-name" title="${currentUser.trueName} 点击更改账户密码">${currentUser.trueName}</a><em class="fff">|</em><a  id="login-out" href="#">注销</a>
        <em class="pl15" id="msg-count-wrap">
            <i class="icon-envelope gold"></i>
            <%--<b class="hs-barge" id="msg-count">6</b>--%>
        </em>
        <em id="more-tool" class="icon-th-list fff"></em>
    </div>
    <nav id="nav-wrap" class="nav-wrap hide waiters">
        <ul id="root-nav" class="nav" tpsource="#nav-tp"></ul>
        <div class="arr-l-wrap hide waiters"><p class="arr-l"></p></div>
        <div class="arr-r-wrap hide waiters"><p class="arr-r"></p></div>
    </nav>
</header>
<%--<div id="root-main">--%>
<%--<div id="root-tabs">--%>
<%--<div title="当前模块:首页" data-options="closable:false">--%>
<%--<div id="main">--%>
<%--<div id="tree-menu"></div>--%>
<%--<div id="content">--%>
<%--<iframe id="main-frame" class="tab-content-frame" src="${path}/view/fst-page.html"></iframe>--%>
<%--</div>--%>
<%--</div>--%>
<%--</div>--%>
<%--</div>--%>
<%--</div>--%>
<%--<div id="root-main"></div>--%>
<div id="root-tabs">
    <div title="当前模块:首页" data-options="closable:false">
        <div id="main">
            <div id="tree-menu"></div>
            <div id="content">
                <iframe id="main-frame" class="tab-content-frame" src="" scrolling="no"></iframe>
            </div>
        </div>
    </div>
</div>
<div id="root-mask" class="mask"></div>
<div id="top-mask" class="mask"></div>
<div id="left-mask" class="mask"></div>
<iframe src="" frameborder="0" width="0" height="0 "id="upframe" name="upframe" class="hidePlus"></iframe>
<div id="edit-pwd-block" class="hide">
    <div class="edit-div">
        <span class="common-field"><span class="orangered">★ </span>原密码：</span><input id="old-pwd" class="common-input mt10 pwd-validate" type="password" data-options="required:true,validType:'length[3,20]'">
        <span class="common-field"><span class="orangered">★ </span>新密码：</span><input id="new-pwd" class="common-input mt10 pwd-validate" type="password" data-options="required:true,validType:'password'">
        <span class="common-field"><span class="orangered">★ </span>确认新密码：</span><input id="confirm-new-pwd" class="common-input mt10 pwd-validate" type="password" data-options="required:true,validType:'password'">
        <p>注：密码均以字母开头，长度在3~20个字符之间，只能包含字母、数字和下划线。</p>
    </div>
    <div class="btn-div">
        <b id="save-edit-pwd" class="cm-save-btn"></b>
        <b id="close-edit-pwd" class="cm-close-btn ml15"></b>
    </div>
</div>
<div id="msg-view-div" class="hide">
    <div id="msg-view-value">
        <p class="mt10">
            <span class="common-field">消息标题：</span>
            <input type="text" class="common-input" unselectable="on" readonly="true" value="{subject}"/>
        </p>
        <p class="mt10">
            <span class="common-field">消息时间：</span>
            <input name="openFlag" type="text" class="common-input" unselectable="on" readonly="true" value="{msgDateStr}"/>
            <span class="common-field">消息等级：</span>
            <input name="userTel" type="text" class="common-input" unselectable="on" readonly="true" value="{msgLevel}"/>
        </p>
        <p class="mt10">
            <span class="common-field fl">消息内容：</span><textarea class="common-textarea" unselectable="on" readonly="true" rows="5">{content}</textarea>
        </p>
    </div>
    <p class="tcenter mt10 mb10">
        <b id="msg-view-ok" class="cm-ok-btn"></b>
    </p>
</div>
</body>
<script type="text/template" id="tree-menu-tp">
    <li class="grade-1" sec-count="{items.length}"  default-into="{defaultInto}"  page-no="{pageNo}">
        <a title="{name}" direct="{direct}">{name}</a>
        <ul class="hide{items.length}">
            {{items:#<li class="grade-2"  page-no="{pageNo}"><a class="nav-link" title="{name}" direct="{direct}" >{name}</a></li>#}}
        </ul>
        <b  class="hide{items.length}"></b>
    </li>
</script>

<script type="text/template" id="nav-tp">
    <li class="nav-first">
        <a href="javascript:;" page-no="{pageNo}" direct="{direct}"  default-into="{defaultInto}" mol-name="{name}">
            {{!isSys && #<span>{name}</span>#}}
            {{isSys && #<i class="icon-cog sys-cog"></i>&nbsp;#}}
        </a>
        <ul class="nav-seconds hide{items.length}">
            {{items:#nav-sec-tp}}
        </ul>
    </li>
</script>

<script type="text/template" id="nav-sec-tp">
    <li class="nav-second-wrap  no-items{items.length}">
        <a class="nav-second-item" href="javascript:;" page-no="{pageNo}" direct="{direct}"  default-into="{defaultInto}">{name}</a><b class="hide{items.length}">▶</b>
        <div class="nav-third-wrap hide{items.length}">{{items:#<a class="nav-third-item" href="javascript:;" page-no="{pageNo}" direct="{direct}">{name}</a>#}}</div>
    </li>
</script>
<script src="${path}/dist/js/base.js"></script>
<script src="${path}/dist/js/index.js"></script>
</html>