package com.hisign.spy.persist.mapper.system;

import com.hisign.spy.model.system.SysModule;

import java.util.List;
import java.util.Map;

/**
 * 系统模块管理
 * @Author xiaohuiwen
 * @Date 2016/6/01 17:59
 */
public interface SysModuleMapper {

    /**
     *查询模块树节点
     * @return
     */
    public List<SysModule> findAllModuleList();

    /**
     * 查询模块信息
     * @Author xiaohuiwen
     * @param moduelId 模块id
     * @return
     */
    public List<SysModule> findSysModuleInfoById(String moduelId);

    /**
     * 删除资源表
     * @Author xiaohuiwen
     * @param moduelId 模块id
     */
    public void deleteResource(String moduelId);

    /**
     * 删除映射关系表
     * @Author xiaohuiwen
     * @param moduelId 模块id
     */
    public void deletePermisRes(String moduelId);

    /**
     * 删除权限表
     * @Author xiaohuiwen
     * @param moduelId 模块id
     */
    public void deletePermission(String moduelId);

    /**
     * 删除模块表
     * @Author xiaohuiwen
     * @param moduelId 模块id
     */
    public void deleteModule(String moduelId);

    /**
     * 删除资源表权限
     * @Author xiaohuiwen
     * @param moduelId 模块id
     */
    public void deleteResourceForPer(String moduelId);

    /**
     * 删除映射关系表
     * @Author xiaohuiwen
     * @param moduelId 模块id
     */
    public void deletePermisResForPer(String moduelId);

    /**
     * 删除权限表
     * @Author xiaohuiwen
     * @param moduelId 模块id
     */
    public void deletePermissionForPer(String moduelId);

    /**
     * 更新模块信息
     * @Author xiaohuiwen
     * @param sysModule 模块model
     */
    public void upDateModuleInfo(SysModule sysModule);

    /**
     * 删除权限表
     * @Author xiaohuiwen
     * @param sysModule 模块model
     */
    public void updatePermission(SysModule sysModule);

    /**
     * 删除权限表
     * @Author xiaohuiwen
     * @param sysModule 模块model
     */
    public void updatePermisRes(SysModule sysModule);

    /**
     * 删除权限表
     * @Author xiaohuiwen
     * @param sysModule 模块model
     */
    public void updateResource(SysModule sysModule);

    /**
     * 根据ID查询模块信息
     * @param id 模块id
     * @return
     */
    public SysModule findSysModuleInfoByModuleId(String id);

    /**
     * 增加一个权限
     * @Author xiaohuiwen
     * @param sysModule 模块model
     * @return
     */
    public void insertPermission(SysModule sysModule);

    /**
     * 增加一个资源
     * @Author xiaohuiwen
     * @param sysModule 模块model
     * @return
     */
    public void insertResource(SysModule sysModule);

    /**
     * 增加一个对应关系
     * @Author xiaohuiwen
     * @param sysModule 模块model
     * @return
     */
    public void insertPermisRes(SysModule sysModule);

    /**
     * 增加模块信息
     * @Author xiaohuiwen
     * @param sysModule 模块model
     * @return
     */
    public void insertModule(SysModule sysModule);

    /**
     * 获取guid
     * @Author xiaohuiwen
     * @return
     */
    public String getGuid();

    /**
     * 获取登录用户的权限
     * @Author xiaohuiwen
     * @param userName 用户名
     * @return
     */
    public List<SysModule> findLogUserPower(String userName);

    /**
     * 获取登录用户的子权限
     * @Author xiaohuiwen
     * @param userName 用户名
     * @return
     */
    public List<SysModule> findLogUserPowerLimt(String userName);

    /**
     * 获取登录用户角色
     * @Author xiaohuiwen
     * @param userName 登录用户名
     * @return
     */
    public List<Map<String,String>> findRoleList(String userName);

}
