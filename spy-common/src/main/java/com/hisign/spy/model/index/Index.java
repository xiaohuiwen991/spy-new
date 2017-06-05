package com.hisign.spy.model.index;

import com.hisign.spy.model.common.BaseModel;
import com.hisign.spy.model.system.SysModule;
import com.hisign.spy.model.system.SysUser;

import java.util.List;
import java.util.Map;

/**
 * 页面公共部分参数整理Model
 * @Author xiaohuiwen
 * @Date 2016/7/15 16:03
 */
public class Index extends BaseModel {
    /**
     * 页面权限
     */
    private List<SysModule> pageLimit;
    /**
     * 处理权限
     */
    private List<SysModule> operateLimit;
    /**
     * token
     */
    private String token;
    /**
     * 全部权限
     */
    private Map<String,List<SysModule>> limits;
    /**
     * 全部角色
     */
    private List<Map<String,String>> roles;
    /**
     * socket服务器地址
     */
    private String socketServer;
    /**
     * 上传服务器地址
     */
    private String uploadServer;
    /**
     * 用户对象
     */
    private SysUser currentUser;

    public List<SysModule> getPageLimit() {
        return pageLimit;
    }

    public void setPageLimit(List<SysModule> pageLimit) {
        this.pageLimit = pageLimit;
    }

    public List<SysModule> getOperateLimit() {
        return operateLimit;
    }

    public void setOperateLimit(List<SysModule> operateLimit) {
        this.operateLimit = operateLimit;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Map<String, List<SysModule>> getLimits() {
        return limits;
    }

    public void setLimits(Map<String, List<SysModule>> limits) {
        this.limits = limits;
    }

    public String getSocketServer() {
        return socketServer;
    }

    public void setSocketServer(String socketServer) {
        this.socketServer = socketServer;
    }

    public String getUploadServer() {
        return uploadServer;
    }

    public void setUploadServer(String uploadServer) {
        this.uploadServer = uploadServer;
    }

    public SysUser getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(SysUser currentUser) {
        this.currentUser = currentUser;
    }

    public List<Map<String, String>> getRoles() {
        return roles;
    }

    public void setRoles(List<Map<String, String>> roles) {
        this.roles = roles;
    }
}
