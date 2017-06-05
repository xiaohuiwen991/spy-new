package com.hisign.spy.service.impl.system;

import com.hisign.spy.api.system.SysMessageService;
import com.hisign.spy.model.system.SysMessage;
import com.hisign.spy.persist.mapper.system.SysMessageMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 消息
 * @author zhangmengjia
 */
@Service("sysMessageService")
public class SysMessageServiceImpl implements SysMessageService {
    @Resource
    private SysMessageMapper sysMessageMapper;

    /**
     * 查询消息列表
     * @param filter
     * @return
     */
    @Override
    public List<SysMessage> findSysMessageByFilter(SysMessage filter)  throws Exception{
        filter.setNoTslbSql(getTslbSql(filter.getNoTslb()));
        return sysMessageMapper.findSysMessageByFilter(filter);
    }

    /**
     * 查询消息详细信息
     * @param sysMessage
     * @return
     */
    @Override
    public SysMessage findSysMessage(SysMessage sysMessage) throws Exception{
        return sysMessageMapper.findSysMessage(sysMessage);
    }

    /**
     * 查询消息列表总数
     * @param filter
     * @return
     */
    @Override
    public int findSysMessageByFilterForCount(SysMessage filter)  throws Exception{
        filter.setNoTslbSql(getTslbSql(filter.getNoTslb()));
        return sysMessageMapper.findSysMessageByFilterForCount(filter);
    }

    /**
     * 将消息设为已读
     * @param sysMessage
     */
    @Override
    public void setSysMessageRead(SysMessage sysMessage) throws Exception{
        if(sysMessage.getListId()!=null){
            for(String id : sysMessage.getListId()){
                sysMessage.setId(id);
                sysMessageMapper.setSysMessageRead(sysMessage);
            }
        }
    }

    /**
     * 删除消息
     * @param listId
     */
    @Override
    public void deleteSysMessageByIds(List<String> listId)  throws Exception{
        if(listId!=null){
            for(String id : listId){
                sysMessageMapper.deleteSysMessageById(id);
                sysMessageMapper.deleteSysReceiveByMsgId(id);
            }
        }
    }

    /**
     * 假删除消息 update sys-receive-box del=1
     * @param sysMessage
     * @throws Exception
     */
    @Override
    public void deleteSysMessageByUser(SysMessage sysMessage) throws Exception{
        SysMessage message = new SysMessage();
        if(sysMessage.getListId()!=null){
            for(String id : sysMessage.getListId()){
                message.setId(id);
                message.setUser(sysMessage.getUser());
                sysMessageMapper.deleteSysReceiveByUser(message);
            }
        }
    }

    /**
     * 获取右下角不需要弹出的消息类型
     */
    public String getTslbSql(List<String> noTslb){
        if(noTslb != null && noTslb.size() > 0){
            StringBuffer noTslbSql = new StringBuffer();;
            noTslbSql.append("(");
            for(String tslb : noTslb){
                noTslbSql.append("'"+tslb+"',");
            }
            noTslbSql.deleteCharAt(noTslbSql.toString().lastIndexOf(',')).append(")");
            return noTslbSql.toString();
        }
        return null;
    }
}
