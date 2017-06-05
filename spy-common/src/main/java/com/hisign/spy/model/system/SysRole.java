package com.hisign.spy.model.system;

import com.hisign.spy.model.common.BaseModel;

import java.util.List;

/**
 * 系统角色管理model
 * @author jiangpeng
 * @since 2016/5/28 15:42
 */
public class SysRole extends BaseModel {
    /**
     * 角色对应的用户列表
     */
    private List<? extends Object> users;

    private String id;

    private String roleId;

    /**
     * 角色对应的授权列表
     */
    private List<? extends Object> permissions;

    /**
     * 角色名
     */
    private String roleName = null;

    /**
     * 角色描述
     */
    private String description = null;

    /**
     * 是否开放
     */
    private String openFlag = null;

    /**
     * 是否开放中文
     */
    private String openFlagZw;

    /**
     * 角色名英文
     */
    private String roleNameEn;

    public List<? extends Object> getUsers() {
        return users;
    }

    public void setUsers(List<? extends Object> users) {
        this.users = users;
    }

    public List<? extends Object> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<? extends Object> permissions) {
        this.permissions = permissions;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName == null ? null : roleName.trim();
    }

    public String getOpenFlag() {
        return openFlag;
    }

    public void setOpenFlag(String openFlag) {
        this.openFlag = openFlag;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getRoleNameEn() {
        return roleNameEn;
    }

    public void setRoleNameEn(String roleNameEn) {
        this.roleNameEn = roleNameEn;
    }

    public String getOpenFlagZw() {
        return openFlagZw;
    }

    public void setOpenFlagZw(String openFlagZw) {
        this.openFlagZw = openFlagZw;
    }

    private String a;

    public String getA() {
        return a;
    }

    public void setA(String a) {
        this.a = a;
    }
}
