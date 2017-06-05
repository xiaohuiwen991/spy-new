package com.hisign.spy.util;

import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.hisign.spy.constant.JsonType;

/**
 * json工具
 * @author wangping
 * @version 1.0
 * @since 2016/5/31 15:11
 */
public class JsonUtil {

    /**
     * 根据json字符串取得解析后的数据类型
     *
     * @param jsonStr json字符串
     * @return 返回json数据类型（json类型：1-json数组，2-json对象,3-未知）
     */
    public static int getJsonType(String jsonStr) {
        int jsonType = 3;
        if (StringUtils.isEmpty(jsonStr)) return jsonType;
        try {
            Object obj = JSON.parse(jsonStr);
            if (obj instanceof JSONObject) {
                jsonType = JsonType.JSON_OBJECT.getId();
            } else if (obj instanceof JSONArray) {
                jsonType = JsonType.JSON_ARRAY.getId();
            }
        } catch (Exception e) {
            jsonType = JsonType.JSON_UNKNOWN.getId();
        }
        return jsonType;
    }

    /**
     * 根据json字符串取得解析后的数据类型
     *
     * @param jsonStr json字符串
     * @return 返回json数据类型（json类型：1-json数组，2-json对象,3-未知）
     */
    public static JsonType getJsonTypeFromJsonStr(String jsonStr) throws Exception {
        JsonType jsonType = JsonType.JSON_UNKNOWN;
        if (StringUtils.isEmpty(jsonStr)) return jsonType;
        Object obj = JSON.parse(jsonStr);
        if (obj instanceof JSONObject) {
            jsonType = JsonType.JSON_OBJECT;
        } else if (obj instanceof JSONArray) {
            jsonType = JsonType.JSON_ARRAY;
        }
        return jsonType;
    }

}

