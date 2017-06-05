package com.hisign.spy.service.impl.system;

import com.hisign.spy.api.system.SysLogService;
import com.hisign.spy.model.system.OperationLog;
import com.hisign.spy.model.system.SysUser;
import com.hisign.spy.persist.mapper.system.SysLogMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 用户登录日志接口实现类
 * @Author xiaohuiwen
 * @Date 2016/6/7 9:31
 */
@Service("sysLogService")
public class SysLogServiceImpl implements SysLogService {

    @Resource
    private SysLogMapper sysLogMapper;

    /**
     * 根据用户名查找用户信息
     * @Author xiaohuiwen
     * @param userName 用户名
     * @return
     */
    @Override
    public SysUser findLogUserInfo(String userName){
        SysUser sysUser= sysLogMapper.findLogUserInfo(userName);
        return sysUser;
    }

    /**
     *插入登录用户信息表
     * @Author xiaohuiwen
     * @param sysUser 用户Model
     */
    public void insertLogUserInfo(SysUser sysUser){
        sysLogMapper.insertLogUserInfo(sysUser);
    }

    /**
     * 登出时更新用户登录信息
     * @Author xiaohuiwen
     * @param sysUser 用户Model
     */
    public void updateLogUserInfo(SysUser sysUser){
        sysLogMapper.updateLogUserInfo(sysUser);
    }

    /**
     * 插入操作日志
     * @param paraStr
     * @param requestPath
     * @param ip
     * @param sysUser
     * @return
     */
    public String insertOperLog(String paraStr,String requestPath,String ip,SysUser sysUser) throws Exception{
        String[] arr = requestPath.split("/");
        OperationLog operationLog = new OperationLog();
        operationLog.setModule(arr[0]);
        operationLog.setModuleSon(arr[1]);
        operationLog.setOperType(arr[2]);
        operationLog.setOperData(paraStr);
        operationLog.setSysUser(sysUser);
        operationLog.setIp(ip);
        sysLogMapper.insertOperLog(operationLog);
        return "success";
    }
}
