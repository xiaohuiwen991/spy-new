package com.hisign.spy.api.system;

import com.hisign.spy.model.system.SysModule;

import java.util.List;
import java.util.Map;

/**
 * 系统参数管理接口
 * @author xiaohuiwen
 * @since 2016/06/01 14:51
 */
public interface SysModuleService {
    /**
     * 查询所有模块信息
     * @Author xiaohuiwen
     * @throws Exception
     * @return
     */
    public List<SysModule> findModuleList() throws Exception;

    /**
     *查询模块信息
     * @Author xiaohuiwen
     * @param moduelId 模块id
     * @throws Exception
     * @return
     */
    public List<SysModule> findSysModuleInfoById(String moduelId) throws Exception;

    /**
     * 删除资源表
     * @Author xiaohuiwen
     * @param moduelId 模块id
     * @throws Exception
     */
    public void deleteResource(String moduelId) throws Exception;

    /**
     * 删除映射关系表
     * @Author xiaohuiwen
     * @param moduelId 模块id
     * @throws Exception
     */
    public void deletePermisRes(String moduelId) throws Exception;

    /**
     *删除权限表
     * @Author xiaohuiwen
     * @param moduelId 模块id
     * @throws Exception
     */
    public void deletePermission(String moduelId) throws Exception;

    /**
     * 删除模块表
     * @Author xiaohuiwen
     * @param moduelId 模块id
     * @throws Exception
     */
    public void deleteModule(String moduelId) throws Exception;

    /**
     *更新模块信息
     * @Author xiaohuiwen
     * @param sysModule 模块model
     * @throws Exception
     */
    public void upDateModuleInfo(SysModule sysModule) throws Exception;

    /**
     * 添加模块信息
     * @Author xiaohuiwen
     * @param sysModule 模块model
     * @throws Exception
     */
    public void addModuleInfo(SysModule sysModule) throws Exception;


    /**
     * 获取登录用户的权限
     * @Author xiaohuiwen
     * @param userName 用户名
     * @throws Exception
     * @return
     */
    public List<SysModule> findLogUserPower(String userName) throws Exception;

    /**
     * 获取登录用户的子权限
     * @Author xiaohuiwen
     * @param userName 用户名
     * @throws Exception
     * @return
     */
    public List<SysModule> findLogUserPowerLimt(String userName) throws Exception;

    /**
     * 工具类拼接权限list
     * @Author xiaohuiwen
     * @param parentList 页面权限
     * @param childList   二级模块权限
     * @param childNodeList 三级模块权限
     * @throws Exception
     * @return
     */
    public List<SysModule> toolsForList(List<SysModule> parentList, List<SysModule> childList, List<SysModule> childNodeList) throws Exception;

    /**
     * 获取登录用户角色
     * @Author xiaohuiwen
     * @param userName 用户名
     * @throws Exception
     * @return
     */
    public List<Map<String,String>> findRoleList(String userName) throws Exception;
}
