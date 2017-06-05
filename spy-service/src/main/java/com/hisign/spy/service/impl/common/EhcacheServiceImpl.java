package com.hisign.spy.service.impl.common;

import com.alibaba.fastjson.JSON;
import com.hisign.spy.api.common.ICacheService;
import com.hisign.spy.common.CacheOption;
import net.sf.ehcache.Cache;
import net.sf.ehcache.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 缓存服务实现类
 * @author wangping
 * @version 1.0
 * @since 2016/8/1 11:42
 */
@Service("cacheService")
public class EhcacheServiceImpl implements ICacheService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private Cache commonCache;

    @Override
    public <K> boolean contains(K key) {
        return commonCache.isElementInMemory(key);
    }

    @Override
    public <K, V> boolean put(K key, V value) {
        boolean flag = false;
        if (null == key) {
            return flag;
        }
        try {
            commonCache.put(new Element(key, value));
            flag = true;
        } catch (Exception e) {
            logger.error("cache put error！key:{},value:{}", JSON.toJSONString(key), JSON.toJSONString(value), e);
            flag = false;
        }
        return flag;
    }

    @Override
    public <K, V> boolean put(K key, V value, CacheOption cacheOption) {
        return put(key, value);
    }

    @Override
    public <K, V> V get(K key, Class<V> type) {
        V obj = null;
        try {
            Element e = commonCache.get(key);
            if (null != e) {
                obj = (V) commonCache.get(key).getObjectValue();
            }
        } catch (Exception e) {
            logger.error("cache get error！key:{}", JSON.toJSONString(key), e);
        }

        return obj;
    }

    @Override
    public <K> boolean remove(K key) {
        boolean flag = false;
        try {
            flag = commonCache.remove(key);
            flag = true;
        } catch (Exception e) {
            logger.error("cache remove error！key:{}", JSON.toJSONString(key), e);
        }
        return flag;
    }
}
