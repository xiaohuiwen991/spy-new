package com.hisign.spy.web.action.system;

import com.hisign.spy.api.system.SysParameterService;
import com.hisign.spy.constant.Constants;
import com.hisign.spy.model.common.JsonResult;
import com.hisign.spy.model.system.SysParam;
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
import java.util.ArrayList;
import java.util.List;

/**
 * 系统参数管理Action
 * @Author xiaohuiwen
 * @Date 2016/5/30 18:03
 */
@Controller
public class SysParameterAction {

    /**
     * 系统参数管理接口
     */
    @Resource
    private SysParameterService sysParameterService;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 进入系统参数管理页面
     * @Author xiaohuiwen
     * @return
     */
    @RequestMapping("api/{recordLog}/system/param")
    @ResponseBody
    public JsonResult intoSysManager() {
        JsonResult jsonResult = new JsonResult();
        List<SysParam> list = new ArrayList<SysParam>();
        try {
            list = sysParameterService.findSysConfigList();
            jsonResult.setTotalCount(list.size());
            jsonResult.setData(list);
            jsonResult.setFlag(1);
        } catch (Exception e) {
            logger.error("进入系统参数出错",e);
            jsonResult.setFlag(0);
        }
        return jsonResult;
    }

    /**
     * 新增系统参数
     * @Author xiaohuiwen
     * @param sysParam 参数Model
     * @param sysUser 用户Model
     * @return
     */
    @RequestMapping(value = "api/{recordLog}/system/param/add", method=RequestMethod.POST)
    @ResponseBody
    public JsonResult addSysParameter(@TranslateObject SysParam sysParam, @CurrentUser SysUser sysUser ) {
        try {
            int count = sysParameterService.checkSysParameter(sysParam.getEnglishName()); //判断参数是否已经存在
            if(0!=count){
                return  new JsonResult(0, "英文参数名已经存在，请修改后再进行保存");
            }

            //参数存在继续新增
            sysParam.setCreateUser(sysUser.getUserName());
            if("".equals(sysParam.getValue().trim())){
                sysParam.setValue(sysParam.getDefaultValue());
            }
            sysParameterService.insertSysParameter(sysParam);
            return new JsonResult(1, Constants.SUCCESS);
        }catch (Exception e){
            logger.error("新增[{}]参数信息出错",sysParam.getChineseName(),e);
            return new JsonResult(0, "参数新增失败");
        }
    }

    /**
     * 修改系统参数
     * @Author xiaohuiwen
     * @param sysUser 用户model
     * @param configList 参数model
     * @return
     */
    @RequestMapping(value = "api/{recordLog}/system/param/edit", method=RequestMethod.POST)
    @ResponseBody
    public JsonResult editSysParameter(@CurrentUser SysUser sysUser, @TranslateObject(type=SysParam.class) List<SysParam> configList) {
        try {
            for(int i=0;i<configList.size();i++) {
                configList.get(i).setCreateUser(sysUser.getUserName());
                configList.get(i).setValue(configList.get(i).getValue().trim());
                sysParameterService.editSysParameter( configList.get(i));
            }
            return new JsonResult(1, Constants.SUCCESS);
        }catch (Exception e){
            logger.error("修改参数信息出错",configList,e);
            return new JsonResult(0, Constants.ERROR);
        }
    }

}
