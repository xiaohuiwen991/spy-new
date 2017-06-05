<%@ page import="org.apache.shiro.session.UnknownSessionException" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" isErrorPage="true"%>
<!DOCTYPE html>
<html lang="en">
<body>
<%
    if (exception instanceof UnknownSessionException) {
        response.sendRedirect("/exception/timeout");
    } else {
        response.sendRedirect("/exception/error");
    }
%>
</body>
</html>