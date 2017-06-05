package com.hisign.spy.model.system;

/**
 * 系统登录信息Model
 * @Author xiaohuiwen
 * @Date 2016/6/8 14:05
 */
public class SysLoginLog extends SysUser {
    /**
     *登录时间开始
     */
    public String logDateBegin;
    /**
     *登录时间结束
     */
    public String logDateEnd;
    /**
     *用户账号
     */
    public String oprUser;
    /**
     *用户名
     */
    public String oprUserName;
    /**
     *用户单位代码
     */
    public String oprUnit;
    /**
     *用户单位中文
     */
    public String oprUnitCh;
    /**
     *登录时间
     */
    public String logTime;
    /**
     *登出时间
     */
    public String offTime;
    /**
     *创建人单位
     */
    public String createUnit;
    /**
     *创建时间
     */
    public String createDate;
    /**
     *创建用户账号
     */
    public String createPid;
    /**
     *修改时间
     */
    public String modifyDate;
    /**
     *修改用户账号
     */
    public String modifyPid;
    /**
     *登陆地ip
     */
    public String ip;
    /**
     *预留字段1
     */
    public String rev1;
    /**
     *预留字段2
     */
    public String rev2;
    /**
     *预留字段3
     */
    public String rev3;
    /**
     *预留字段4
     */
    public String rev4;
    /**
     *查询用户字段
     */
    public String loginName;
    /**
     *排序字段
     */
    public String orderByString;
    /**
     * 行号
     */
    public String rn;

    public void setRn(String rn) {
        this.rn = rn;
    }

    public String getRn() {

        return rn;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getLoginName() {

        return loginName;
    }

    public void setLogDateBegin(String logDateBegin) {
        this.logDateBegin = logDateBegin;
    }

    public void setLogDateEnd(String logDateEnd) {
        this.logDateEnd = logDateEnd;
    }

    public String getLogDateBegin() {

        return logDateBegin;
    }

    public String getLogDateEnd() {
        return logDateEnd;
    }

    public String getOprUser() {
        return oprUser;
    }

    public String getOprUserName() {
        return oprUserName;
    }

    public String getOprUnit() {
        return oprUnit;
    }

    public String getOprUnitCh() {
        return oprUnitCh;
    }

    public String getLogTime() {
        return logTime;
    }

    public String getOffTime() {
        return offTime;
    }

    @Override
    public String getCreateUnit() {
        return createUnit;
    }

    @Override
    public String getCreateDate() {
        return createDate;
    }

    public String getCreatePid() {
        return createPid;
    }

    @Override
    public String getModifyDate() {
        return modifyDate;
    }

    public String getModifyPid() {
        return modifyPid;
    }

    public String getIp() {
        return ip;
    }

    @Override
    public String getRev1() {
        return rev1;
    }

    @Override
    public String getRev2() {
        return rev2;
    }

    @Override
    public String getRev3() {
        return rev3;
    }

    @Override
    public String getRev4() {
        return rev4;
    }

    public void setOprUser(String oprUser) {
        this.oprUser = oprUser;
    }

    public void setOprUserName(String oprUserName) {
        this.oprUserName = oprUserName;
    }

    public void setOprUnit(String oprUnit) {
        this.oprUnit = oprUnit;
    }

    public void setOprUnitCh(String oprUnitCh) {
        this.oprUnitCh = oprUnitCh;
    }

    public void setLogTime(String logTime) {
        this.logTime = logTime;
    }

    public void setOffTime(String offTime) {
        this.offTime = offTime;
    }

    @Override
    public void setCreateUnit(String createUnit) {
        this.createUnit = createUnit;
    }

    @Override
    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public void setCreatePid(String createPid) {
        this.createPid = createPid;
    }

    @Override
    public void setModifyDate(String modifyDate) {
        this.modifyDate = modifyDate;
    }

    public void setModifyPid(String modifyPid) {
        this.modifyPid = modifyPid;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Override
    public void setRev1(String rev1) {
        this.rev1 = rev1;
    }

    @Override
    public void setRev2(String rev2) {
        this.rev2 = rev2;
    }

    @Override
    public void setRev3(String rev3) {
        this.rev3 = rev3;
    }

    @Override
    public void setRev4(String rev4) {
        this.rev4 = rev4;
    }

    @Override
    public String getOrderByString() {
        return orderByString;
    }

    @Override
    public void setOrderByString(String orderByString) {
        this.orderByString = orderByString;
    }
}
