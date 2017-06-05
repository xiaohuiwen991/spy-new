package com.hisign.spy.web.bind.method;

import com.hisign.spy.web.bind.annotation.CurrentUser;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;

/**
 * 用于绑定@CurrentUser的方法参数解析器
 * @author wangping
 * @version 1.0
 * @since 2016/5/22 16:28
 */
public class CurrentUserMethodArgumentsResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(CurrentUser.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        CurrentUser currentUserAnnotation = parameter.getParameterAnnotation(CurrentUser.class);
        HttpServletRequest servletRequest = (HttpServletRequest) webRequest.getNativeRequest();
        Object user = servletRequest.getAttribute(currentUserAnnotation.value());
        return user;
    }
}
