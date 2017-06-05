package com.hisign.spy.api.system;

import com.github.pagehelper.Page;
import com.hisign.spy.model.system.SysUser;
import com.hisign.spy.model.system.SysUserRole;

import java.util.List;

/**
 * 用户信息接口
 * @author wangping
 * @version 1.0
 * @since 2016/4/22 14:51
 */
public interface SysUserService {
    /**
     * 根据用户信息取得对应的列表
     * @param user
     * @return
     */
    public Page<SysUser> findSysUserListByFilter(SysUser user);

    /**
     * 根据用户名取得对应的用户信息
     * @param userName
     * @return
     */
    public SysUser findSysUserByUserName(String userName) throws Exception;

    /**
     * 获得登录用户列表
     * @param sysUser
     * @return
     */
    public List<SysUser> findSysUserListByUserFilter(SysUser sysUser) throws Exception;

    /**
     * 删除登录用户
     * @param sysUser
     */
    public void deleteSysUserList(SysUser sysUser) throws Exception;

    /**
     * 获得登录用户总数
     * @param sysUser
     * @return
     */
    public int findSysUserListByFilterForCount(SysUser sysUser) throws Exception;

    /**
     * 获得登录用户信息列表
     * @param sysUser
     * @return
     */
    public List<SysUser> findSysUserList(SysUser sysUser) throws Exception;

    /**
     * 获得角色用户列表
     * @param filter
     * @return
     */
    public List<SysUser> findSysUserRoleListByFilter(SysUser filter) throws Exception;

    /**
     * 更新用户-角色表
     * @param sysUserRole
     * @param currentUser
     */
    public void updateSysUserRoleById(SysUserRole sysUserRole, SysUser currentUser) throws Exception;

    /**
     * 更新用户表
     * @param sysUser
     * @param currentUser
     */
    public void updateSysUser(SysUser sysUser, SysUser currentUser) throws Exception;

    /**
     * 新增用户
     * @param sysUser
     * @param currentUser
     * @return
     */
    public String appendSysUser(SysUser sysUser, SysUser currentUser) throws Exception;

    /**
     * 根据角色id获得用户列表
     * @param roleId 角色id
     * @return 用户列表
     */
    public List<SysUser> findUserListByRoleId(String roleId) throws Exception;

    /**
     * 获得角色信息
     * @param userName 用户名
     * @return 角色信息
     */
    public String getRoleInfo(String userName) throws Exception;

    /**
     * 新增token信息
     * @param userId 用户编号
     * @return token
     */
    public String addUserToken(String userId) throws Exception;

    /**
     * 删除用户token信息
     * @param token token编号
     */
    public void deleteUserToken(String token) throws Exception;

    /**
     * 根据token获得用户信息
     * @param token token编号
     * @return 用户信息
     */
    public SysUser getUserByToken(String token) throws Exception;

    /**
     * 修改用户密码
     * @param user 当前用户
     */
    public void updatePassword(SysUser user);
}
