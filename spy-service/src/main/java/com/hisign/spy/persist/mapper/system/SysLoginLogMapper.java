package com.hisign.spy.persist.mapper.system;

import com.hisign.spy.model.system.SysLoginLog;

import java.util.List;

/**
 * 系统登录日志
 * @Author xiaohuiwen
 * @Date 2016/6/8 9:45
 */
public interface SysLoginLogMapper {

    /**
     * 查询登录用户日志
     * @Author xiaohuiwen
     * @param sysLoginLog    登录日志model
     * @return
     */
    public List<SysLoginLog> findSysLoginLogList(SysLoginLog sysLoginLog);

    /**
     * 查询登录用户日志Count
     * @Author xiaohuiwen
     * @param sysLoginLog    登录日志model
     * @return
     */
    public int findSysLoginLogListForCount(SysLoginLog sysLoginLog);
}
