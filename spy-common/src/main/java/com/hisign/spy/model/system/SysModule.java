package com.hisign.spy.model.system;

import com.hisign.spy.model.common.BaseModel;

import java.util.ArrayList;
import java.util.List;

/**
 * 模块管理Model
 * @Author xiaohuiwen
 * @Date 2016/6/8 10:33
 */
public class SysModule extends BaseModel {
    /**
     *模块编号
     */
    private String moduleNo;
    /**
     *父ID
     */
    private String parentId;
    /**
     *标题名
     */
    private String title;
    /**
     *注释
     */
    private String description;
    /**
     *是否显示标记
     */
    private int openFlag;
    /**
     *创建人
     */
    private String createUser;
    /**
     *创建时间
     */
    private String createDatetime;
    /**
     *更新人
     */
    private String updateUser;
    /**
     *更新时间
     */
    private String updateDatetime;
    /**
     *根节点ID
     */
    private String rootId;
    /**
     *模块Id
     */
    private String moduleId;
    /**
     *权限模块对应id
     */
    private String permissionId;
    /**
     *权限关系id
     */
    private String permisResId;
    /**
     *权限Id
     */
    private String resourceId;
    /**
     *URL
     */
    private String url;
    /**
     *排序
     */
    private String sort;
    /**
     *权限注释
     */
    private String permissionDescription;
    /**
     *权限类型
     */
    private String resourceType;
    /**
     * 模块对应的权限列表
     */
    private List sysModulepermissionList;
    /**
     * 模块对应的资源列表
     */
    private List resources = new ArrayList();
    /**
     * 模块对应的子模块列表
     */
    private List modules = new ArrayList();
    /**
     * 默认进入模块
     */
    private String defaultInto;
    /**
     * 权限字符串
     */
    private String resourceStr;
    /**
     * 权限
     */
    private int permissionFlag;//标识这个权限是否对应模块，还是纯粹的权限。0：对应模块，1：不对应
    /**
     * 子权限备注数组
     */
    private String descriptionArray;
    /**
     * 子权限数组
     */
    private String resourceArray;
    /**
     * 权限名
     */
    private String name;
    /**
     * 权限类型
     */
    private String resType;
    /**
     * 权限字符名
     */
    private String resString;
    /**
     * 子权限id
     */
    private String operateNo;
    /**
     * 页面权限id
     */
    private String pageNo;

    private List<SysModule> items;

    public void setResType(String resType) {
        this.resType = resType;
    }

    public void setResString(String resString) {
        this.resString = resString;
    }

    public String getResType() {

        return resType;
    }

    public String getResString() {
        return resString;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getResourceStr() {
        return resourceStr;
    }

    public void setResourceStr(String resourceStr) {
        this.resourceStr = resourceStr;
    }

    public void setSysModulepermissionList(List sysModulepermissionList) {
        this.sysModulepermissionList = sysModulepermissionList;
    }

    public int getPermissionFlag() {
        return permissionFlag;
    }

    public void setPermissionFlag(int permissionFlag) {
        this.permissionFlag = permissionFlag;
    }

    public void setResources(List resources) {
        this.resources = resources;
    }

    public void setModules(List modules) {
        this.modules = modules;
    }

    public void setDescriptionArray(String descriptionArray) {
        this.descriptionArray = descriptionArray;
    }

    public void setResourceArray(String resourceArray) {
        this.resourceArray = resourceArray;
    }

    public List getSysModulepermissionList() {
        return sysModulepermissionList;
    }

    public List getResources() {
        return resources;
    }

    public List getModules() {
        return modules;
    }

    public String getDescriptionArray() {
        return descriptionArray;
    }

    public String getResourceArray() {
        return resourceArray;
    }

    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }

    public String getResourceType() {
        return resourceType;
    }

    public int getOpenFlag() {
        return openFlag;
    }

    public void setOpenFlag(int openFlag) {
        this.openFlag = openFlag;
    }

    public String getModuleNo() {
        return moduleNo;
    }

    public String getParentId() {
        return parentId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getCreateUser() {
        return createUser;
    }

    public String getCreateDatetime() {
        return createDatetime;
    }

    public String getUpdateUser() {
        return updateUser;
    }

    public String getUpdateDatetime() {
        return updateDatetime;
    }

    public String getRootId() {
        return rootId;
    }

    public String getModuleId() {
        return moduleId;
    }

    public String getPermissionId() {
        return permissionId;
    }

    public String getPermisResId() {
        return permisResId;
    }

    public String getResourceId() {
        return resourceId;
    }

    public void setModuleNo(String moduleNo) {
        this.moduleNo = moduleNo;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public void setCreateDatetime(String createDatetime) {
        this.createDatetime = createDatetime;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser;
    }

    public void setUpdateDatetime(String updateDatetime) {
        this.updateDatetime = updateDatetime;
    }

    public void setRootId(String rootId) {
        this.rootId = rootId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public void setPermissionId(String permissionId) {
        this.permissionId = permissionId;
    }

    public void setPermisResId(String permisResId) {
        this.permisResId = permisResId;
    }

    public void setResourceId(String resourceId) {
        this.resourceId = resourceId;
    }

    public void setPermissionDescription(String permissionDescription) {
        this.permissionDescription = permissionDescription;
    }

    public String getPermissionDescription() {
        return permissionDescription;
    }

    public String getUrl() {
        return url;
    }

    public String getSort() {
        return sort;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public void setItems(List<SysModule> items) {
        this.items = items;
    }

    public List<SysModule> getItems() {
        return items;
    }

    public String getPageNo() {
        return pageNo;
    }

    public void setPageNo(String pageNo) {
        this.pageNo = pageNo;
    }

    public String getOperateNo() {
        return operateNo;
    }

    public void setOperateNo(String operateNo) {
        this.operateNo = operateNo;
    }

    public String getDefaultInto() {
        return defaultInto;
    }

    public void setDefaultInto(String defaultInto) {
        this.defaultInto = defaultInto;
    }


}
