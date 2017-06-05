package com.hisign.spy.web.action.system;


import com.hisign.spy.api.system.SysLogService;
import com.hisign.spy.model.system.SysUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * 系统登录日志
 * @Author yejiansuo
 * @Date 2016/6/6 15:17
 */
@Controller
public class SysLogAction {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private SysLogService sysLogService;
    /**
     * 插入登入日志
     * @param user
     * @return
     */
    @RequestMapping(value="/api/system/log/in", method= RequestMethod.POST)
    @ResponseBody
    public void loginLog(@RequestBody SysUser user) {
        logger.info("记录登入日志,un:{},ip:{}", user.getUserName(), user.getIpAddress());
        SysUser sysUser = new SysUser();
        sysUser = sysLogService.findLogUserInfo(user.getUserName());//根据用户名查询用户信息
        sysUser.setUserName(user.getUserName());
        String ip = user.getIpAddress();
        if(ip.length()>6){
            if("::ffff:".equals(ip.substring(0,7))){
                ip = ip.substring(7,ip.length());
            }
        }
        sysUser.setIpAddress(ip);
        sysLogService.insertLogUserInfo(sysUser);
    }

    /**
     * 更新登出日志
     * @param user
     * @return
     */
    @RequestMapping(value="/api/system/log/out", method= RequestMethod.POST)
    @ResponseBody
    public void logoutLog(@RequestBody SysUser user) {
        logger.info("记录登出日志,un:{},ip:{}", user.getUserName(), user.getIpAddress());
        SysUser sysUser = new SysUser();
        sysUser.setUserName(user.getUserName());
        sysUser.setIpAddress(user.getIpAddress());
        sysLogService.updateLogUserInfo(sysUser);
    }

}
