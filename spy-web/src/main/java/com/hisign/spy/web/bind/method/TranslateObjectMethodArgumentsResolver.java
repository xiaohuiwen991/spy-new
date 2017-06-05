package com.hisign.spy.web.bind.method;

import com.alibaba.fastjson.JSON;
import com.hisign.spy.constant.JsonType;
import com.hisign.spy.util.JsonUtil;
import com.hisign.spy.web.bind.annotation.TranslateObject;
import com.hisign.spy.web.util.RequestUtil;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 用于绑定@TranslateObject的方法参数解析器
 * @author wangping
 * @version 1.0
 * @since 2016/5/28 10:19
 */
public class TranslateObjectMethodArgumentsResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(TranslateObject.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        TranslateObject translateObjectAnnotation = parameter.getParameterAnnotation(TranslateObject.class);
        HttpServletRequest req = ((HttpServletRequest)webRequest.getNativeRequest());
        String jsonStr = RequestUtil.getParameter(req, translateObjectAnnotation.value());
        JsonType jsonType = JsonUtil.getJsonTypeFromJsonStr(jsonStr);
        Object obj = null;
        switch (jsonType) {
            case JSON_ARRAY:
                obj = JSON.parseArray(jsonStr, translateObjectAnnotation.type());
                break;
            case JSON_OBJECT:
                if (String.class.equals(parameter.getParameterType())) {
                    Map<String, String> map = JSON.parseObject(jsonStr, HashMap.class);
                    obj = map.get(parameter.getParameterName());
                } else {
                    obj = JSON.parseObject(jsonStr, parameter.getParameterType());
                }
                break;
            case JSON_UNKNOWN:
                obj = JSON.parseObject(jsonStr, HashMap.class);
                break;
        }
        return obj;
    }
}
