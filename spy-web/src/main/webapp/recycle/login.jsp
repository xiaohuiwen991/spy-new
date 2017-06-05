<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false"%>
<%--<c:set var="message_login" value="${pageContext.request.getAttribute('message_login')}" />--%>
<c:set var="path" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Pragma" content="no-cache"/>
    <meta http-equiv="Expires" content="-1"/>
    <meta http-equiv="Cache-Control" content="no-cache"/>
    <meta name="author" content="Xiong Ying" />
    <title>登录页</title>
    <script>window.path='${path}';</script>
    <link rel="stylesheet" href="${path}/dist/css/base.css">
    <link rel="stylesheet" href="${path}/dist/css/login.css">
</head>
<body class="over-yh">
<header>
    开发代码管理系统
</header>
<div class="back-img"></div>
<form id="login-form">
    <div id="login-div">
        <input id="username" name="username" type="text" class="login-info" placeholder="请输入用户名" required="required" autocomplete="on" autofocus="autofocus">
        <input id="password" name="password" type="password" class="login-info" placeholder="请输入密码" required="required">
        <input type="button" class="login-btn" value="登 录">
        <div class="other-operation">
            <p id="download-cr">
                <span> | </span>
                <a href="${path}/ftp/chrome.zip">点此下载chrome浏览器</a>
            </p>
            <p>
                <label for="remember-me">自动登录：</label>
                <input id="remember-me" type="checkbox" >
            </p>
        </div>
    </div>
</form>
<p id="error"><i class="icon-warning-sign"></i> <span></span></p>
<p id="browser-tip"></p>
<footer>
    <p>北京海鑫科金高科技股份有限公司</p>
    <p>版本号 v1.1</p>
</footer>
</body>
<script src="${path}/dist/js/base.js"></script>
<script src="${path}/dist/js/login.js"></script>
</html>