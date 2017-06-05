package com.hisign.spy.api.system;

import com.hisign.spy.model.system.SysLoginLog;

import java.util.List;

/**
 * 系统登录日志接口
 * @Author xiaohuiwen
 * @Date 2016/6/8 11:02
 */
public interface SysLoginLogService {
    /**
     *
     * 查询登录用户日志
     * @param sysLoginLog 登录日志model
     * @return
     * @throws Exception
     */
    public List<SysLoginLog> findSysLoginLogList(SysLoginLog sysLoginLog) throws Exception;

    /**
     * 查询登录用户日志Count
     * @param sysLoginLog  登录日志model
     * @return
     * @throws Exception
     */
    public int findSysLoginLogListForCount(SysLoginLog sysLoginLog) throws Exception;
}
