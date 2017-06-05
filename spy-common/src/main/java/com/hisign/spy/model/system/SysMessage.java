package com.hisign.spy.model.system;

import com.hisign.spy.model.common.BaseModel;

import java.util.List;

/**
 * 消息实体类
 * @author zhangmengjia
 */
public class SysMessage extends BaseModel {
    //sys-message
    private String subject;//消息标题
    private String content;//消息内容
    private String msgType;//消息收件类型
    private String msgLevel;//消息等级
    private String msgVest;//消息类型
    private String msgDateStr;//消息时间
    private String tslb;//类别
    private String attId;//关注编号
    //sys-receive-box
    private String receiveId;//收件箱ID
    private String msgId;//消息ID
    private String senderName;//发件人姓名
    private String senderId;//发件人账号
    private String senderUnit;//发件人单位
    private String receiverName;//收件人姓名
    private String receiverId;//收件人账号
    private String msgState;//消息状态，已读or未读
    private String msgDateBegin;//消息查询开始时间
    private String msgDateEnd;//消息查询结束时间

    private List<String> listId;
    private List<String> noTslb;
    private String noTslbSql;//右下角弹出消息，不需要弹出的消息类型  话题or任务不需要显示

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getMsgType() {
        return msgType;
    }

    public void setMsgType(String msgType) {
        this.msgType = msgType;
    }

    public String getMsgLevel() {
        return msgLevel;
    }

    public void setMsgLevel(String msgLevel) {
        this.msgLevel = msgLevel;
    }

    public String getMsgVest() {
        return msgVest;
    }

    public void setMsgVest(String msgVest) {
        this.msgVest = msgVest;
    }

    public String getTslb() {
        return tslb;
    }

    public void setTslb(String tslb) {
        this.tslb = tslb;
    }

    public String getAttId() {
        return attId;
    }

    public void setAttId(String attId) {
        this.attId = attId;
    }

    public String getReceiveId() {
        return receiveId;
    }

    public void setReceiveId(String receiveId) {
        this.receiveId = receiveId;
    }

    public String getMsgId() {
        return msgId;
    }

    public void setMsgId(String msgId) {
        this.msgId = msgId;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    public String getMsgState() {
        return msgState;
    }

    public void setMsgState(String msgState) {
        this.msgState = msgState;
    }

    public String getMsgDateStr() {
        return msgDateStr;
    }

    public void setMsgDateStr(String msgDateStr) {
        this.msgDateStr = msgDateStr;
    }

    public List<String> getListId() {
        return listId;
    }

    public void setListId(List<String> listId) {
        this.listId = listId;
    }

    public String getMsgDateBegin() {
        return msgDateBegin;
    }

    public void setMsgDateBegin(String msgDateBegin) {
        this.msgDateBegin = msgDateBegin;
    }

    public String getMsgDateEnd() {
        return msgDateEnd;
    }

    public void setMsgDateEnd(String msgDateEnd) {
        this.msgDateEnd = msgDateEnd;
    }

    public String getSenderUnit() {
        return senderUnit;
    }

    public void setSenderUnit(String senderUnit) {
        this.senderUnit = senderUnit;
    }

    public String getNoTslbSql() {
        return noTslbSql;
    }

    public void setNoTslbSql(String noTslbSql) {
        this.noTslbSql = noTslbSql;
    }

    public List<String> getNoTslb() {
        return noTslb;
    }

    public void setNoTslb(List<String> noTslb) {
        this.noTslb = noTslb;
    }
}
