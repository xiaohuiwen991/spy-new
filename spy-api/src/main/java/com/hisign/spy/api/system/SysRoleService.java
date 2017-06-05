package com.hisign.spy.api.system;

import com.hisign.spy.model.system.*;

import java.util.List;
import java.util.Map;

/**
 * 系统角色管理接口
 * @author jiangpeng
 * @date 2016/6/6 11:10
 */
public interface SysRoleService {
    /**
     * 根据用户id获得角色列表
     * @param userId 用户编号
     * @return 角色列表
     */
    public List<SysRole> findSysRoleListByUserId(String userId) throws Exception;

    /**
     * 根据查询条件获得角色列表
     * @param filter 角色列表查询条件
     * @return 角色列表
     */
    public List<SysRole> findSysRoleByFilter(SysRole filter) throws Exception;

    /**
     * 获得列表数量
     * @param filter
     * @return
     */
    public int findSysRoleByFilterForCount(SysRole filter) throws Exception;

    /**
     * 删除角色
     * @param id
     */
    void deleteSysRoleById(String id) throws Exception;

    /**
     * 新增角色
     * @param sysRole
     * @param user
     * @return
     */
    public String insertSysRole(SysRole sysRole, SysUser user) throws Exception;

    /**
     * 获得角色列表
     * @param sysRole
     * @return
     */
    public List<SysRole> findSysRoleList(SysRole sysRole) throws Exception;

    /**
     * 更新角色列表
     * @param sysRole
     * @param user
     */
    public void updateSysRoleById(SysRole sysRole, SysUser user) throws Exception;

    /**
     * 用户角色表新增数据
     * @param id
     * @param selectUserId
     * @param user
     */
    public void insertUserRole(String id, String selectUserId, SysUser user) throws Exception;

    /**
     * 移除用户角色数据
     * @param id
     * @param associatedUserId
     */
    public void removeUserRole(String id, String associatedUserId) throws Exception;

    /**
     * 获得系统模块数据
     * @return
     */
    public List<SysModule> findALLSysModule() throws Exception;

    /**
     * 根据条件获得角色权限数据
     * @param sysRolePermis 角色权限查询条件
     * @return 角色权限数据
     */
    public List<SysRolePermis> findSysRolePermisListByFilter(SysRolePermis sysRolePermis) throws Exception;

    /**
     * 根据条件获得系统权限数据
     * @param moduleId
     * @return
     */
    public List<SysPermission> findSysPermissionListByFilter(String moduleId) throws Exception;

    /**
     * 根据父模块id获得系统模块
     * @param moduleId
     * @return
     */
    public List<SysModule> findSysModuleByParentId(String moduleId) throws Exception;

    /**
     *根据id更新角色权限表
     * @param map
     * @param user
     */
    public void updateSysRolePermisById(Map<String, Object> map, SysUser user) throws Exception;

    /**
     * 获得字典角色数据
     * @return 字典角色数据
     */
    public List<SysRole> findAllRole() throws Exception;
}
