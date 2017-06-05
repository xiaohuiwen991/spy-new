package com.hisign.spy.web.bind.interceptor;

import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson.JSON;
import com.hisign.spy.api.system.SysLogService;
import com.hisign.spy.api.system.SysUserService;
import com.hisign.spy.constant.Constants;
import com.hisign.spy.constant.JsonType;
import com.hisign.spy.model.system.SysUser;
import com.hisign.spy.util.JsonUtil;
import com.hisign.spy.web.util.RequestUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * 拦截所有异步请求
 * @author wangping
 * @version 1.0
 * @since 2016/7/13 11:06
 */
public class MyAjaxInterceptor extends HandlerInterceptorAdapter {

    private Logger logger = LoggerFactory.getLogger(this.getClass());


    @Resource
    private SysLogService sysLogService;

    @Resource
    private SysUserService sysUserService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String uri = request.getRequestURI();
        SysUser user = null;
        boolean flag = true;
        if (uri.contains("/api/")) {
            String token = RequestUtil.getParameter(request, Constants.TOKEN);
            user = sysUserService.getUserByToken(token);
            if (user == null && StringUtils.equals(token, "pubservice")) {
                user = new SysUser();
                user.setUserName("outerside");
            }
            request.setAttribute(Constants.CURRENT_USER, user);
            flag = RequestUtil.checkError(request, response, user, logger);
            if (uri.contains("/api/1/") && flag) {
                String requestPath = uri.substring(uri.indexOf("/api/1/") + 7, uri.length());
                String paraStr = "";
                String jsonStr = RequestUtil.getParameter(request, Constants.PARAMETER_NAME);
                String ip = request.getRemoteAddr();
                paraStr = handleParaStr(jsonStr);
                sysLogService.insertOperLog(paraStr, requestPath, ip, user);
            }

        }
        return super.preHandle(request, response, handler);
    }

    /**
     * 处理参数字符串
     * @param paraStr
     * @return
     */
    public static String handleParaStr(String paraStr) throws Exception {
        JsonType jsonType = JsonUtil.getJsonTypeFromJsonStr(paraStr);
        Map<String, String> map = null;
        switch (jsonType) {
            case JSON_ARRAY:
                return paraStr;
            case JSON_OBJECT:
                map = JSON.parseObject(paraStr, HashMap.class);
                break;
            case JSON_UNKNOWN:
                break;
        }
        map.remove("begin");
        map.remove("end");
        paraStr = JSON.toJSONString(map);
        return paraStr;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        super.afterCompletion(request, response, handler, ex);
    }
}
