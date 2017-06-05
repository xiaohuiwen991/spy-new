package com.hisign.spy.persist.mapper.system;

import com.hisign.spy.model.system.SysUser;
import com.hisign.spy.model.system.SysUserRole;
import com.hisign.spy.model.system.SysUserToken;

import java.util.List;

/**
 * 用户管理
 * @author wangping
 * @version 1.0
 * @since 2016/4/22 14:46
 */
public interface SysUserMapper {

    /**
     * 根据用户信息取得对应的列表
     * @param user
     * @return
     */
    List<SysUser> findSysUserListByFilter(SysUser user);

    /**
     * 根据用户名取得对应的用户信息
     * @param userName
     * @return
     */
    SysUser findSysUserByUserName(String userName);

    /**
     * 获得登录用户列表
     * @param sysUser
     * @return
     */
    List<SysUser> findSysUserListByUserFilter(SysUser sysUser);

    /**
     * 获得登录用户总数
     * @param sysUser
     * @return
     */
    int findSysUserListByUserFilterForCount(SysUser sysUser);

    SysUser getSysUserxxByModel(SysUser sysUser);

    /**
     * 删除登录用户
     * @param sysUser
     */
    void deleteSysUserList(SysUser sysUser);

    void deleteSysUserRoleByUserId(String userId);

    /**
     * 获得登录用户信息列表
     * @param sysUser
     * @return
     */
    List<SysUser> findSysUserList(SysUser sysUser);

    /**
     * 获得角色用户列表
     * @param filter
     * @return
     */
    List<SysUser> findSysUserRoleListByFilter(SysUser filter);

    /**
     * 插入用户-角色表
     * @param sysUserRole
     */
    void insertSysUserRole(SysUserRole sysUserRole);

    /**
     * 更新用户-角色表
     * @param sysUser
     */
    void updateSysUserById(SysUser sysUser);

    /**
     * 插入用户表
     * @param sysUser
     */
    void insertSysUser(SysUser sysUser);

    /**
     * 根据角色id获得用户列表
     * @param roleId
     * @return
     */
    List<SysUser> findUserListByRoleId(String roleId);

    /**
     * 获得角色信息
     * @param userName 用户名
     * @return 角色信息
     */
    String getRoleInfo(String userName);

    /**
     * 新增token
     * @param sysUserToken 当前用户
     */
    void addUserToken(SysUserToken sysUserToken);

    /**
     * 根据token获得用户信息
     * @param token token编号
     * @return 用户信息
     */
    SysUser getUserByToken(String token);

    /**
     * 删除用户token信息
     * @param token token编号
     */
    void deleteUserToken(String token);

    /**
     * 修改用户密码
     * @param user 当前用户
     */
    void updatePassword(SysUser user);
}
