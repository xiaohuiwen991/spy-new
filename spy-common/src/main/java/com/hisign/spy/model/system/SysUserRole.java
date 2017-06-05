package com.hisign.spy.model.system;

import com.hisign.spy.model.common.BaseModel;

/**
 * 角色用户Model
 * @Author jiangpeng
 * @Date 2016/6/8 16:31
 */
public class SysUserRole extends BaseModel {
    /**
     * 授予角色id
     */
    private String sysUserRoleIds;

    /**
     * 用户id
     */
    private String userId;

    /**
     * 编号
     */
    private String id;

    /**
     * 角色编号
     */
    private String roleId;

    /**
     * 权限编号
     */
    private String permissionId;

    public String getSysUserRoleIds() {
        return sysUserRoleIds;
    }

    public void setSysUserRoleIds(String sysUserRoleIds) {
        this.sysUserRoleIds = sysUserRoleIds;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public String getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(String permissionId) {
        this.permissionId = permissionId;
    }
}
