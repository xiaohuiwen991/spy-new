package com.hisign.spy.common;

/**
 * 缓存选项类
 * @author wangping
 * @version 1.0
 * @since 2016/8/1 11:37
 */
public class CacheOption {

    /**
     * 超时时间.
     */
    private long expireTime;

    /**
     * 超时类型.
     */
    private ExpireType expireType;

    /**
     * 调用模式.
     * 异步选项,默认同步(非异步)
     */
    private boolean async;

    public CacheOption(){
        // 默认是秒设置.
        expireType = ExpireType.SECONDS;
    }

    public long getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(long expireTime) {

        this.expireTime = expireTime;
    }

    public boolean isAsync() {
        return async;
    }

    public void setAsync(boolean async) {
        this.async = async;
    }

    public ExpireType getExpireType() {
        return expireType;
    }

    public void setExpireType(ExpireType expireType) {
        this.expireType = expireType;
    }
}
