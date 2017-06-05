package com.hisign.spy.web.util;

import com.alibaba.fastjson.JSON;
import com.hisign.spy.constant.Constants;
import com.hisign.spy.model.system.SysUser;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;

import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

/**
 * 请求工具
 * @author wangping
 * @version 1.0
 * @since 2016/6/13 15:22
 */
public class RequestUtil {

    /**
     * 根据请求和对应的参数名取得对应的参数值
     * @param req
     * @param parameterName
     * @return
     * @throws IOException
     */
    public static String getParameter(HttpServletRequest req, String parameterName) throws IOException {
        String str = "";
        String contentType = req.getContentType();
        str = req.getParameter(parameterName);
        Map<String, String> map = new HashMap<>();
        if (StringUtils.isEmpty(str)) {
            str = req.getReader().readLine();
            if (StringUtils.isNotEmpty(str)) {
                str = URLDecoder.decode(str, "utf-8");
                String[] strArr = str.split("&");
                for (String s : strArr) {
                    if (s.contains(parameterName + "=")) {
                        str = s.replace(parameterName + "=", "");
                        break;
                    }
                }

            }
        }

        if (StringUtils.isEmpty(str)) {
            if (!StringUtils.equals(parameterName, Constants.TOKEN)) {
                for (Map.Entry<String, String[]> entry : req.getParameterMap().entrySet()) {
                    if (!StringUtils.equals(entry.getKey(), Constants.TOKEN)) {
                        map.put(entry.getKey(), entry.getValue()[0]);
                    }
                }
                str = JSON.toJSONString(map);
            }
        }
        return str;
    }

    /**
     * 根据请求判断是否允许访问
     * @param req
     * @param response
     * @return
     * @throws Exception
     */
    public static boolean checkError(HttpServletRequest req, ServletResponse response, SysUser user, Logger logger) throws Exception {
        boolean flag = true;
        if (null == user) {
            PrintWriter pw = null;
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            String msg = null;

            msg = "{\"flag\":0,\"msg\":\"token不存在！\"}";
            flag = false;
            try {
                if (StringUtils.isNotEmpty(msg)) {
                    pw = response.getWriter();
                    pw.write(msg);
                    pw.flush();
                    pw.close();
                }
            } catch (IOException e) {
                logger.error("writer error!", e);
                msg = "{\"flag\":0,\"msg\":\"token不存在！\"}";
                pw = response.getWriter();
                pw.write(msg);
                pw.flush();
                pw.close();
                flag = false;
            }
        } else {
            req.setAttribute(Constants.CURRENT_USER, user);
        }
        return flag;
    }
}
