package com.hisign.spy.persist.mapper.system;

import com.hisign.spy.model.system.SysMessage;

import java.util.List;

/**
 * 消息查询
 * @author zhangmengjia
 */
public interface SysMessageMapper {

    /**
     * 查询收件箱列表
     * @param filter
     * @return
     */
    List<SysMessage> findSysMessageByFilter(SysMessage filter);

    /**
     * 查询消息详细信息
     * @param sysMessage
     * @return
     */
    SysMessage findSysMessage(SysMessage sysMessage);

    /**
     * 查询收件箱列表总数
     * @param filter
     * @return
     */
    int findSysMessageByFilterForCount(SysMessage filter);

    /**
     * 收件箱设置已读标记
     * @param sysMessage
     */
    void setSysMessageRead(SysMessage sysMessage);

    /**
     * 删除sys-message数据
     * @param id
     */
    void deleteSysMessageById(String id);

    /**
     * 删除sys-receive-box数据
     * @param id
     */
    void deleteSysReceiveByMsgId(String id);

    /**
     * 假删除sys-receive-box的数据，update del=1
     * @param sysMessage
     */
    void deleteSysReceiveByUser(SysMessage sysMessage);

}


