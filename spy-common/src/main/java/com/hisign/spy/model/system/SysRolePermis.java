package com.hisign.spy.model.system;

import com.hisign.spy.model.common.BaseModel;

/**
 * 角色权限Model
 * @Author jiangpeng
 * @Date 2016/6/8 16:31
 */
public class SysRolePermis extends BaseModel {

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId == null ? null : roleId.trim();
    }

    public String getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(String permissionId) {
        this.permissionId = permissionId == null ? null : permissionId.trim();
    }

}