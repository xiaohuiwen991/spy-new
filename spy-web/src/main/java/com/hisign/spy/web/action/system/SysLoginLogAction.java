package com.hisign.spy.web.action.system;

import com.hisign.spy.api.system.SysLoginLogService;
import com.hisign.spy.model.common.JsonResult;
import com.hisign.spy.model.system.SysLoginLog;
import com.hisign.spy.web.bind.annotation.TranslateObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 系统用户登录日志
 * @Author xiaohuiwen
 * @Date 2016/6/8 9:43
 */
@Controller
public class SysLoginLogAction {

    /**
     * 系统用户的路日志接口
     */
    @Resource
    public SysLoginLogService sysLoginLogService;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 查询登录用户日志
     * @Author xiaohuiwen
     * @param sysLoginLog 登录日志model
     * @return
     */
    @RequestMapping(value="/api/{recordLog}/system/login/log", method= RequestMethod.POST)
    @ResponseBody
    public JsonResult findSysLoginLogList(@TranslateObject SysLoginLog sysLoginLog){
        JsonResult jsonResult = new JsonResult();
        List<SysLoginLog> list = new ArrayList<SysLoginLog>();
        try {
            //排序字段拼接
            if(null!=sysLoginLog.getSortName()) {
                sysLoginLog.setOrderByString("ORDER BY " + sysLoginLog.getSortName() + "  " + sysLoginLog.getSortOrder());
            }else{
                sysLoginLog.setOrderByString("ORDER BY LOG_TIME DESC" );
            }

            sysLoginLog.setOprUser(sysLoginLog.getOprUser().replaceAll("%","\\\\%").replaceAll("_", "\\\\_"));//过滤百分号查询
            list = sysLoginLogService.findSysLoginLogList(sysLoginLog);//查询数据
            jsonResult.setData(list);
            int count = sysLoginLogService.findSysLoginLogListForCount(sysLoginLog);//查询count
            jsonResult.setTotalCount(count);
            jsonResult.setFlag(1);
        }catch (Exception e){
            logger.error("查询错误",sysLoginLog,e);
            jsonResult.setFlag(0);
            jsonResult.setMsg("数据载入异常，请联系管理员");
        }
        return jsonResult;
    }
}
