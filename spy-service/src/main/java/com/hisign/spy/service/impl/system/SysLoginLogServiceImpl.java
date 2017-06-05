package com.hisign.spy.service.impl.system;

import com.hisign.spy.api.system.SysLoginLogService;
import com.hisign.spy.model.system.SysLoginLog;
import com.hisign.spy.persist.mapper.system.SysLoginLogMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 系统登录日志接口实现类
 * @Author xiaohuiwen
 * @Date 2016/6/8 11:05
 */
@Service("sysLoginLogService")
public class SysLoginLogServiceImpl implements SysLoginLogService {

    /**
     * 系统登录日志Mapper
     */
    @Resource
    public SysLoginLogMapper sysLoginLogMapper;

    /**
     * 查询登录用户日志
     * @Author xiaohuiwen
     * @param sysLoginLog 登录日志model
     * @return
     */
    public List<SysLoginLog> findSysLoginLogList(SysLoginLog sysLoginLog) throws Exception{
        List<SysLoginLog> userList = new ArrayList<SysLoginLog>();
        userList = sysLoginLogMapper.findSysLoginLogList(sysLoginLog);
        return userList;
    }
    /**
     * 查询登录用户日志Count
     * @Author xiaohuiwen
     * @param sysLoginLog 登录日志model
     * @return
     */
    public int findSysLoginLogListForCount(SysLoginLog sysLoginLog) throws Exception{
        int count = sysLoginLogMapper.findSysLoginLogListForCount(sysLoginLog);
        return count;
    }

}
