package com.hisign.spy.api.system;

import com.hisign.spy.model.system.SysMessage;

import java.util.List;

/**
 * 消息
 * @author zhangmengjia
 */
public interface SysMessageService {
    /**
     * 查询消息列表
     * @param filter
     * @return
     */
    public List<SysMessage> findSysMessageByFilter(SysMessage filter) throws Exception;

    /**
     * 查询消息详细信息
     * @param sysMessage
     * @return
     */
    public SysMessage findSysMessage(SysMessage sysMessage) throws Exception;

    /**
     * 查询消息列表总数
     * @param filter
     * @return
     */
    public int findSysMessageByFilterForCount(SysMessage filter) throws Exception;

    /**
     * 将消息设为已读
     * @param sysMessage
     */
    public void setSysMessageRead(SysMessage sysMessage) throws Exception;

    /**
     * 删除消息
     * @param listId
     */
    public void deleteSysMessageByIds(List<String> listId) throws Exception;

    /**
     * 假删除消息 update sys-receive-box del=1
     * @param sysMessage
     * @throws Exception
     */
    public void deleteSysMessageByUser(SysMessage sysMessage) throws Exception;
}
