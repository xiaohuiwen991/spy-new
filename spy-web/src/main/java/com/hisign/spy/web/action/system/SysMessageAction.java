package com.hisign.spy.web.action.system;

import com.hisign.spy.api.system.SysMessageService;
import com.hisign.spy.model.common.JsonResult;
import com.hisign.spy.model.system.SysMessage;
import com.hisign.spy.model.system.SysUser;
import com.hisign.spy.web.bind.annotation.CurrentUser;
import com.hisign.spy.web.bind.annotation.TranslateObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 消息
 * @author zhangmengjia
 */
@Controller
@RequestMapping(value="/api/{recordLog}/system/message")
public class SysMessageAction {
    @Resource
    private SysMessageService sysMessageService;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 查询消息列表
     * @param filter 查询条件
     * @return
     * @throws InterruptedException
     */
    @RequestMapping(value="/list", method= RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public JsonResult getSysMessageList(@CurrentUser SysUser user,@TranslateObject SysMessage filter){
        JsonResult jsonResult = new JsonResult();
        filter.setUser(user);
        try {
            //排序字段拼接
            if(filter.getSortName()!=null) {
                filter.setOrderByString(filter.getSortName() + "  " + filter.getSortOrder());
            }else{
                filter.setOrderByString("t.create_date desc" );
            }
            List<SysMessage> list = sysMessageService.findSysMessageByFilter(filter);
            int count = sysMessageService.findSysMessageByFilterForCount(filter);
            jsonResult.setData(list);
            jsonResult.setTotalCount(count);
            jsonResult.setFlag(1);
        } catch (Exception e) {
            logger.error("查询错误",filter,e);
            jsonResult.setFlag(0);
            jsonResult.setMsg("数据载入异常，请联系管理员");
        } finally {
            return jsonResult;
        }
    }

    /**
     * 查询消息详细信息
     * @param id 消息ID
     * @return
     * @throws InterruptedException
     */
    @RequestMapping(value="/view", method= RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public JsonResult findSysMessage(@CurrentUser SysUser user,@RequestParam(value="id", required=true) String id){
        JsonResult jsonResult = new JsonResult();
        SysMessage sysMessage = new SysMessage();
        sysMessage.setId(id);
        //将查看的id存放在数组中，并设置成已读
        List<String> listId = new ArrayList<String>();
        listId.add(id);
        sysMessage.setListId(listId);
        try {
            //找到对应ID的消息详细信息
            SysMessage message = sysMessageService.findSysMessage(sysMessage);
            //将该消息设置为已读
            sysMessage.setUser(user);
            sysMessageService.setSysMessageRead(sysMessage);
            //封装在返回到前台的json数据中
            jsonResult.setData(message);
            jsonResult.setFlag(1);
        } catch (Exception e) {
            logger.error("查看消息[{id}]详细信息出错",id,e);
            jsonResult.setFlag(0);
            jsonResult.setMsg("查看信息失败");
        } finally {
            return jsonResult;
        }
    }

    /**
     * 删除消息
     * @param sysMessage 消息信息
     * @return
     */
    @RequestMapping(value="/delete", method= RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public JsonResult deleteSysMessage(@CurrentUser SysUser user, @TranslateObject SysMessage sysMessage){
        JsonResult jsonResult = new JsonResult();
        try {
            sysMessage.setUser(user);
            sysMessageService.deleteSysMessageByUser(sysMessage);
//            sysMessageService.deleteSysMessageByIds(sysMessage.getListId());
            jsonResult.setFlag(1);
        } catch (Exception e) {
            logger.error("删除消息[{sysMessage}]出错",sysMessage,e);
            jsonResult.setFlag(0);
            jsonResult.setMsg("删除失败");
        }finally {
            return jsonResult;
        }
    }

    /**
     * 将消息设为已读
     * @param user 当前登录用户
     * @param sysMessage 消息信息
     * @return
     */
    @RequestMapping(value="/setRead", method= RequestMethod.POST)
    @ResponseBody
    public JsonResult setSysMessageRead(@CurrentUser SysUser user,@TranslateObject SysMessage sysMessage){
        JsonResult jsonResult = new JsonResult();
        try {
            sysMessage.setUser(user);
            sysMessageService.setSysMessageRead(sysMessage);
            jsonResult.setFlag(1);
        } catch (Exception e) {
            logger.error("消息[{sysMessage}]设为已读出错",sysMessage,e);
            jsonResult.setFlag(0);
            jsonResult.setMsg("设为已读失败");
        }finally {
            return jsonResult;
        }
    }
}
