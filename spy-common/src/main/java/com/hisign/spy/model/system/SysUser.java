package com.hisign.spy.model.system;

import com.alibaba.fastjson.annotation.JSONField;

import java.io.Serializable;
import java.util.Date;

public class SysUser implements Serializable {

    private static final long serialVersionUID = 424834830L;

    public SysUser() {

    }

    /**
     * 构造方法
     * @param trueName 真名
     */
    public SysUser(String trueName){
        setTrueName(trueName);
        setUserName(trueName);
    }

    private String id;

    @JSONField(name = "username")
    private String userName;

    @JSONField(name = "password")
    private String userPwd;

    private String userPwd2;

    private String newPassword;

    private String roleNameString;//角色字符串

    private String policeId;

    private String cardId;

    private String userTel;

    private String userUnitZh;

    /**
     * 不包含的用户名
     */
    private String notContainUserName;

    private String userLevel;

    private String defaultModule;

    private String ipFlag;

    private String ipAddress;

    private String remark;

    private String deleteFlag;

    private String transferTime;

    private String createUnit;

    private String createUnitCn;

    private String createDate;

    private String createUserId;

    private String createUser;

    private String modifyUser;

    private String createUserName;

    private String modifyDate;

    private String modifyUserId;

    private String modifyUserName;

    private Date createDatetime;

    private Date modifyDatetime;

    /**
     * 序号
     */
    private String rownum;

    private String sysUserRoleIds;

    private String rev1;

    private String rev2;

    private String rev3;

    private String rev4;

    private String rev5;

    private String rev6;

    private String rev7;

    private String rev8;

    /**
     * 启用状态
     */
    private String openFlag;

    /**
     * 启用状态中文
     */
    private String openFlagZw;

    /**
     * 用户姓名
     */
    private String trueName;

    /**
     * 用户所在单位
     */
    private String userUnit;

    /**
     * 开始条数
     */
    private int begin;

    /**
     * 结束条数
     */
    private int end;

    /**
     * 角色id
     */
    private String roleId;

    /**
     * 角色名称
     */
    private String roleName;

    private String sortName;

    private String sortOrder;

    private String orderByString;

    /**
     * token编号
     */
    private String token;

    /**
     * 数据库连接名
     */
    private String connectionName;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName;
    }

    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd == null ? null : userPwd;
    }

    public String getUserPwd2() {
		return userPwd2;
	}

	public void setUserPwd2(String userPwd2) {
		this.userPwd2 = userPwd2;
	}

    public String getRoleNameString() {
		return roleNameString;
	}

	public void setRoleNameString(String roleNameString) {
		this.roleNameString = roleNameString;
	}

	public String getTrueName() {
        return trueName;
    }

    public void setTrueName(String trueName) {
        this.trueName = trueName == null ? null : trueName.trim();
    }

    public String getPoliceId() {
        return policeId;
    }

    public void setPoliceId(String policeId) {
        this.policeId = policeId == null ? null : policeId.trim();
    }

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId == null ? null : cardId.trim();
    }

    public String getUserTel() {
        return userTel;
    }

    public void setUserTel(String userTel) {
        this.userTel = userTel == null ? null : userTel.trim();
    }

    public String getUserUnit() {
        return userUnit;
    }

    public void setUserUnit(String userUnit) {
        this.userUnit = userUnit == null ? null : userUnit.trim();
    }

    public String getOpenFlag() {
        return openFlag;
    }

    public void setOpenFlag(String openFlag) {
        this.openFlag = openFlag == null ? null : openFlag.trim();
    }

    public String getUserLevel() {
        return userLevel;
    }

    public void setUserLevel(String userLevel) {
        this.userLevel = userLevel == null ? null : userLevel.trim();
    }

    public String getDefaultModule() {
        return defaultModule;
    }

    public void setDefaultModule(String defaultModule) {
        this.defaultModule = defaultModule == null ? null : defaultModule.trim();
    }

    public String getIpFlag() {
        return ipFlag;
    }

    public void setIpFlag(String ipFlag) {
        this.ipFlag = ipFlag == null ? null : ipFlag.trim();
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress == null ? null : ipAddress.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(String deleteFlag) {
        this.deleteFlag = deleteFlag == null ? null : deleteFlag.trim();
    }

    public String getTransferTime() {
        return transferTime;
    }

    public void setTransferTime(String transferTime) {
        this.transferTime = transferTime == null ? null : transferTime.trim();
    }

    public String getCreateUnit() {
        return createUnit;
    }

    public void setCreateUnit(String createUnit) {
        this.createUnit = createUnit == null ? null : createUnit.trim();
    }

    public String getCreateUnitCn() {
        return createUnitCn;
    }

    public void setCreateUnitCn(String createUnitCn) {
        this.createUnitCn = createUnitCn == null ? null : createUnitCn.trim();
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate == null ? null : createDate.trim();
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId == null ? null : createUserId.trim();
    }

    public String getCreateUserName() {
        return createUserName;
    }

    public void setCreateUserName(String createUserName) {
        this.createUserName = createUserName == null ? null : createUserName.trim();
    }

    public String getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(String modifyDate) {
        this.modifyDate = modifyDate == null ? null : modifyDate.trim();
    }

    public String getModifyUserId() {
        return modifyUserId;
    }

    public void setModifyUserId(String modifyUserId) {
        this.modifyUserId = modifyUserId == null ? null : modifyUserId.trim();
    }

    public String getModifyUserName() {
        return modifyUserName;
    }

    public void setModifyUserName(String modifyUserName) {
        this.modifyUserName = modifyUserName == null ? null : modifyUserName.trim();
    }

    public String getRev1() {
        return rev1;
    }

    public void setRev1(String rev1) {
        this.rev1 = rev1 == null ? null : rev1.trim();
    }

    public String getRev2() {
        return rev2;
    }

    public void setRev2(String rev2) {
        this.rev2 = rev2 == null ? null : rev2.trim();
    }

    public String getRev3() {
        return rev3;
    }

    public void setRev3(String rev3) {
        this.rev3 = rev3 == null ? null : rev3.trim();
    }

    public String getRev4() {
        return rev4;
    }

    public void setRev4(String rev4) {
        this.rev4 = rev4 == null ? null : rev4.trim();
    }

    public String getRev5() {
        return rev5;
    }

    public void setRev5(String rev5) {
        this.rev5 = rev5 == null ? null : rev5.trim();
    }

    public String getRev6() {
        return rev6;
    }

    public void setRev6(String rev6) {
        this.rev6 = rev6 == null ? null : rev6.trim();
    }

    public String getRev7() {
        return rev7;
    }

    public void setRev7(String rev7) {
        this.rev7 = rev7 == null ? null : rev7.trim();
    }

    public String getRev8() {
        return rev8;
    }

    public void setRev8(String rev8) {
        this.rev8 = rev8 == null ? null : rev8.trim();
    }

    public String getUserUnitZh() {
		return userUnitZh;
	}

	public void setUserUnitZh(String userUnitZh) {
		this.userUnitZh = userUnitZh;
	}

    public String getRownum() {
        return rownum;
    }

    public void setRownum(String rownum) {
        this.rownum = rownum;
    }

    public String getSysUserRoleIds() {
        return sysUserRoleIds;
    }

    public void setSysUserRoleIds(String sysUserRoleIds) {
        this.sysUserRoleIds = sysUserRoleIds;
    }

    public int getBegin() {
        return begin;
    }

    public void setBegin(int begin) {
        this.begin = begin;
    }

    public int getEnd() {
        return end;
    }

    public void setEnd(int end) {
        this.end = end;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getSortName() {
        return sortName;
    }

    public void setSortName(String sortName) {
        this.sortName = sortName;
    }

    public String getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(String sortOrder) {
        this.sortOrder = sortOrder;
    }

    public String getOrderByString() {
        return orderByString;
    }

    public void setOrderByString(String orderByString) {
        this.orderByString = orderByString;
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }

    public Date getModifyDatetime() {
        return modifyDatetime;
    }

    public void setModifyDatetime(Date modifyDatetime) {
        this.modifyDatetime = modifyDatetime;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getOpenFlagZw() {
        return openFlagZw;
    }

    public void setOpenFlagZw(String openFlagZw) {
        this.openFlagZw = openFlagZw;
    }

    public String getNotContainUserName() {
        return notContainUserName;
    }

    public void setNotContainUserName(String notContainUserName) {
        this.notContainUserName = notContainUserName;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setUserId(String userId) {
        this.id = userId;
    }

    public String getConnectionName() {
        return connectionName;
    }

    public void setConnectionName(String connectionName) {
        this.connectionName = connectionName;
    }
}