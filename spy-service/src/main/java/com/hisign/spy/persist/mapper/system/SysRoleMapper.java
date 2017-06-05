package com.hisign.spy.persist.mapper.system;

import com.hisign.spy.model.system.*;

import java.util.List;
import java.util.Map;

/**
 * 系统角色管理mapper
 * @author jiangpeng
 * @date 2016/5/28 16:40
 */
public interface SysRoleMapper {
    /**
     * 根据用户id获得角色列表
     * @param userId
     * @return
     */
    List<SysRole> findSysRoleListByUserId(String userId);

    /**
     * 根据查询条件获得角色列表
     * @param filter
     * @return
     */
    List<SysRole> findSysRoleByFilter(SysRole filter);

    /**
     * 获得列表数量
     * @param filter
     * @return
     */
    int findSysRoleByFilterForCount(SysRole filter);

    /**
     * 删除角色
     * @param id
     */
    void deleteSysRoleById(String id);

    /**
     * 删除角色权限表数据
     * @param map
     */
    void deleteSysRolePermisByRoleId(Map<String, Object> map);

    /**
     * 删除用户角色表数据
     * @param id
     */
    void deleteSysUserRoleByRoleId(String id);

    /**
     * 获得角色列表
     * @param sysRole 角色信息
     * @return 角色列表
     */
    List<SysRole> findSysRoleList(SysRole sysRole);

    /**
     * 新增角色
     * @param sysRole 角色信息
     */
    void insertSysRole(SysRole sysRole);

    /**
     * 更新角色列表
     * @param sysRole 角色信息
     */
    void updateSysRoleById(SysRole sysRole);

    /**
     * 用户角色表新增数据
     * @param userRole
     */
    void insertSysUserRole(SysUserRole userRole);

    /**
     * 获得用户角色数据
     * @param sysUserRole 角色数据查询条件
     * @return 角色数据
     */
    SysUserRole findUserRoleByUserRoleId(SysUserRole sysUserRole);

    /**
     * 删除用户角色数据
     * @param map
     */
    void deleteUserRoleByUserRoleId(Map<String, String> map);

    /**
     * 获得所有模块
     * @return
     */
    List<SysModule> findALLSysModule();

    /**
     * 获得权限列表
     * @param moduleId
     * @return
     */
    List<SysPermission> findSysPermissionListByFilter(String moduleId);

    /**
     * 通过过滤条件获得角色权限数据
     * @param sysRolePermis
     * @return
     */
    List<SysRolePermis> findSysRolePermisListByFilter(SysRolePermis sysRolePermis);

    /**
     * 根据父id获得系统模块
     * @param moduleId
     * @return
     */
    List<SysModule> findSysModuleByParentId(String moduleId);

    /**
     * 新增角色权限数据
     * @param sysRolePermis 角色权限数据
     */
    void insertSysRolePermis(SysRolePermis sysRolePermis);

    /**
     * 获得字典角色数据
     * @return 字典角色数据
     */
    List<SysRole> findAllRole();
}
