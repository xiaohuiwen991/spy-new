package com.hisign.spy.service.impl.common;

import com.hisign.spy.api.common.ISerializer;
import org.springframework.util.SerializationUtils;

/**
 * 默认的序列化实现类
 * @author wangping
 * @version 1.0
 * @since 2016/8/1 11:44
 */
public class DefaultSerializer<T> implements ISerializer<T> {
    @Override
    public byte[] serialize(T obj) {
        return SerializationUtils.serialize(obj);
    }

    @Override
    public T deserialize(byte[] bytes, Class<T> type) {
        return (T) SerializationUtils.deserialize(bytes);
    }
}
