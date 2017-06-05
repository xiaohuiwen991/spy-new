package com.hisign.spy.persist.mapper.system;

import com.hisign.spy.model.system.OperationLog;
import com.hisign.spy.model.system.SysUser;

/**
 * 用户登录日志
 * @Author xiaohuiwen
 * @Date 2016/6/7 9:30
 */
public interface SysLogMapper {

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
     * 插入日志表
     * @param operationLog 日志module
     */
    public void insertOperLog(OperationLog operationLog);
}
