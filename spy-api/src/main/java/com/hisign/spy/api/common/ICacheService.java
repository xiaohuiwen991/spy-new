package com.hisign.spy.api.common;

import com.hisign.spy.common.CacheOption;

/**
 * 公共缓存接口
 * @author wangping
 * @version 1.0
 * @since 2016/8/1 11:27
 */
public interface ICacheService {
    /**
     *
     * @param key 键
     * @param <K>
     * @return 目标缓存中是否存在键
     */
    <K> boolean contains(K key);

    /**
     *
     * @param key 键
     * @param value 值
     * @param <K>
     * @param <V>
     * @return 存储到目标缓存是否成功
     */
    <K,V> boolean put(K key, V value);

    /**
     *
     * @param key 键
     * @param value 值
     * @param cacheOption 超时，同步异步控制
     * @param <K>
     * @param <V>
     * @return 存储到目标缓存是否成功
     */
    <K,V> boolean put(K key, V value, CacheOption cacheOption);

    /**
     *
     * @param key 键
     * @param type 值
     * @param <K>
     * @param <V>
     * @return 返回缓存系统目标键对应的值
     */
    <K,V> V get(K key, Class<V> type);

    /**
     *
     * @param key 键
     * @param <K>
     * @return 删除目标缓存键是否成功
     */
    <K> boolean remove(K key);
}
