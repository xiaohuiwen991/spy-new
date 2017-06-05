package com.hisign.spy.constant;

/**
 * JSON字符串的解析后的类型（json类型：1-json数组，2-json对象,3-未知）
 * @author wangping
 * @version 1.0
 * @since 2016/5/31 15:12
 */
public enum JsonType {
    JSON_ARRAY(1, "json数组"), JSON_OBJECT(2, "json对象"), JSON_UNKNOWN(3, "未知");

    private Integer id;
    private String  jsonType;// json类型：1-json数组，2-json对象,3-未知

    JsonType(Integer id, String jsonType) {
        this.id = id;
        this.jsonType = jsonType;
    }

    /**
     * @return the id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return the jsonType
     */
    public String getJsonType() {
        return jsonType;
    }

    /**
     * @param jsonType the jsonType to set
     */
    public void setJsonType(String jsonType) {
        this.jsonType = jsonType;
    }

    public static JsonType getById(int id) {
        JsonType result = null;
        for (JsonType type : JsonType.values()) {
            if (type.getId() == id) {
                result = type;
            }
        }
        return result;
    }
}

