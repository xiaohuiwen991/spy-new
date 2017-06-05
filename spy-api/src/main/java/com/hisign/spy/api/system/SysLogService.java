package com.hisign.spy.api.system;

import com.hisign.spy.model.system.SysUser;

/**
 * 用户登录管理接口
 * @Author xiaohuiwen
 * @Date 2016/6/7 9:29
 */
public interface SysLogService {
    /**
     * 根据用户名查找用户信息
     * @Author xiaohuiwen
     * @param userName 用户名
     * @return
     */
    public SysUser findLogUserInfo(String userName);

    /**
     *插入登录用户信息表
     * @Author xiaohuiwen
     * @param sysUser 用户Model
     */
    public void insertLogUserInfo(SysUser sysUser);

    /**
     * 登出时更新用户登录信息
     * @Author xiaohuiwen
     * @param sysUser 用户Model
     */
    public void updateLogUserInfo(SysUser sysUser);

    /**
     * 插入操作日志
     * @param paraStr
     * @param requestPath
     * @param ip
     * @param sysUser
     * @return
     */
    public String insertOperLog(String paraStr, String requestPath, String ip, SysUser sysUser) throws Exception;
}
