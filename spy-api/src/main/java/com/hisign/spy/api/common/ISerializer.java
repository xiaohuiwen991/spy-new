package com.hisign.spy.api.common;

/**
 * 序列化接口
 * @author wangping
 * @version 1.0
 * @since 2016/8/1 11:40
 */
public interface ISerializer<T> {

    /**
     * 序列化对象
     * @param obj
     * @return
     */
    byte[] serialize(T obj);

    /**
     * 反序列化字节数组转换为对应类型的对象
     * @param bytes
     * @param type
     * @return
     */
    T deserialize(byte[] bytes, Class<T> type);
}
