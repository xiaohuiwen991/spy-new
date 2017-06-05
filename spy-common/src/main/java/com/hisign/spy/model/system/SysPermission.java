package com.hisign.spy.model.system;

import com.hisign.spy.model.common.BaseModel;

/**
 * 系统权限model
 * @Author jiangpeng
 * @Date 2016/6/8 16:31
 */
public class SysPermission extends BaseModel {

    /**
     * 模块编号
     */
    private String moduleId;

    /**
     * 模块名
     */
    private String name;

    /**
     * 操作
     */
    private String operation;

    /**
     * 描述
     */
    private String description;

    /**
     * 启用标志
     */
    private String openFlag;

    /**
     * 授权标志
     */
    private String permissionFlag;

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId == null ? null : moduleId.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation == null ? null : operation.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getOpenFlag() {
        return openFlag;
    }

    public void setOpenFlag(String openFlag) {
        this.openFlag = openFlag == null ? null : openFlag.trim();
    }

    public String getPermissionFlag() {
        return permissionFlag;
    }

    public void setPermissionFlag(String permissionFlag) {
        this.permissionFlag = permissionFlag == null ? null : permissionFlag.trim();
    }
}