package com.hisign.spy.web.action.system;

import com.hisign.spy.api.system.SysModuleService;
import com.hisign.spy.constant.Constants;
import com.hisign.spy.model.common.JsonResult;
import com.hisign.spy.model.system.SysModule;
import com.hisign.spy.model.system.SysUser;
import com.hisign.spy.web.bind.annotation.CurrentUser;
import com.hisign.spy.web.bind.annotation.TranslateObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * 系统模块管理Action
 * @Author xiaohuiwen
 * @Date 2016/5/30 18:03
 */
@Controller
public class SysModuleAction {

    /**
     * 系统模块管理接口
     */
    @Resource
    private SysModuleService sysModuleService;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 进入系统模块管理页初始化数据
     * @Author xiaohuiwen
     * @return
     */
    @RequestMapping("api/{recordLog}/system/module")
    @ResponseBody
    public JsonResult intoSysModuleManager() {
        JsonResult jsonResult = new JsonResult();
        try {
            List<SysModule> list = sysModuleService.findModuleList();
            jsonResult.setTotalCount(list.size());
            jsonResult.setData(list);
            jsonResult.setFlag(1);
        } catch (Exception e) {
            logger.error("进入模块管理出错", e);
            jsonResult.setFlag(0);
        }
        return jsonResult;
    }

    /**
     * 查看模块信息
     * @Author xiaohuiwen
     * @param moduelId 模块id
     * @return
     */
    @RequestMapping(value = "api/{recordLog}/system/module/view")
    @ResponseBody
    public JsonResult viewModuleInfo(@TranslateObject String moduelId) {
        JsonResult jsonResult = new JsonResult();
        try {
            List<SysModule> list = sysModuleService.findSysModuleInfoById(moduelId);
            jsonResult.setData(list);
            jsonResult.setFlag(1);
            jsonResult.setMsg(Constants.SUCCESS);
        } catch (Exception e) {
            logger.error("查看id为[{}]模块信息出错",moduelId,e);
            jsonResult.setFlag(0);
            jsonResult.setMsg(Constants.ERROR);
        }
        return jsonResult;
    }

    /**
     * 删除模块
     * @Author xiaohuiwen
     * @param moduleId 模块id
     * @return
     */
    @RequestMapping(value = "api/{recordLog}/system/module/delete")
    @ResponseBody
    public JsonResult deleteModuleInfo(@TranslateObject String moduleId) {
        try {
            sysModuleService.deleteResource(moduleId);//首先删除资源表
            sysModuleService.deletePermisRes(moduleId);//其次删除映射关系表
            sysModuleService.deletePermission(moduleId);//再次删除权限表
            sysModuleService.deleteModule(moduleId); //最后删除模块表
            return  new JsonResult(1, "删除成功");
        } catch (Exception e) {
            logger.error("删除id为[{}]模块信息出错",moduleId,e);
            return  new JsonResult(0, "删除失败");
        }
    }

    /**
     * 更新模块信息
     * @Author xiaohuiwen
     * @param sysModule 模块id
     * @param user 用户对象
     * @return
     */
    @RequestMapping(value = "api/{recordLog}/system/module/update", method= RequestMethod.POST)
    @ResponseBody
    public JsonResult upDateModuleInfo(@TranslateObject SysModule sysModule, @CurrentUser SysUser user) {
        try {
            sysModule.setUpdateUser(user.getUserName());
            sysModuleService. upDateModuleInfo(sysModule);
            return  new JsonResult(1, "保存成功");
        } catch (Exception e) {
            logger.error("修改[{}]模块信息出错",sysModule.getModuleNo(),e);
            return  new JsonResult(0, "保存失败");
        }
    }

    /**
     * 新增模块
     * @Author xiaohuiwen
     * @param sysModule 模块id
     * @param user 用户对象
     * @return
     */
    @RequestMapping(value = "api/{recordLog}/system/module/add", method= RequestMethod.POST)
    @ResponseBody
    public JsonResult addModuleInfo(@TranslateObject SysModule sysModule, @CurrentUser SysUser user) {
        try {
            sysModule.setCreateUser(user.getUserName());
            sysModuleService.addModuleInfo(sysModule);
            return  new JsonResult(1, "保存成功");
        } catch (Exception e) {
            logger.error("新增[{}]模块信息出错",sysModule.getModuleNo(),e);
            return  new JsonResult(0, "保存失败");
        }
    }

}
