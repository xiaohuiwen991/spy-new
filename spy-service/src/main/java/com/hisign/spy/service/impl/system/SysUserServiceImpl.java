package com.hisign.spy.service.impl.system;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.StringUtil;
import com.hisign.spy.api.system.SysUserService;
import com.hisign.spy.model.system.SysUser;
import com.hisign.spy.model.system.SysUserRole;
import com.hisign.spy.model.system.SysUserToken;
import com.hisign.spy.persist.mapper.system.SysUserMapper;
import com.hisign.spy.util.Md5Helper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.UUID;

/**
 * 用户信息接口实现
 * 访问方法：
 * rmi：通过spring访问
 * webservice：http://localhost:8023/com.hisign.code.api.system.SysUserService?wsdl
 * rest：http://localhost:8022/users/sys
 *
 * @author wangping
 * @version 1.0
 * @since 2016/4/22 14:53
 */
@Service("sysUserService")
public class SysUserServiceImpl implements SysUserService {

    @Resource
    private SysUserMapper sysUserMapper;

    /**
     * 根据用户信息取得对应的列表
     *
     * @param user
     * @return
     */
    @Override
    public Page<SysUser> findSysUserListByFilter(SysUser user) {
        PageHelper.startPage(1, 500);
        List<SysUser> list = sysUserMapper.findSysUserListByFilter(user);
        return (Page<SysUser>) list;
    }


    @Override
    public SysUser findSysUserByUserName(String userName) throws Exception {
        return sysUserMapper.findSysUserByUserName(userName);
    }

    /**
     * 获得登录用户列表
     *
     * @param sysUser
     * @return
     */
    @Override
    public List<SysUser> findSysUserListByUserFilter(SysUser sysUser) throws Exception {
        if (StringUtil.isNotEmpty(sysUser.getSortName()) && StringUtil.isNotEmpty(sysUser.getSortOrder())) {
            sysUser.setOrderByString(sysUser.getSortName() + " " + sysUser.getSortOrder());
        } else {
            sysUser.setOrderByString("createDatetime desc");
        }
        return sysUserMapper.findSysUserListByUserFilter(sysUser);
    }

    /**
     * 获得登录用户总数
     *
     * @param sysUser
     * @return
     */
    @Override
    public int findSysUserListByFilterForCount(SysUser sysUser) throws Exception {
        return sysUserMapper.findSysUserListByUserFilterForCount(sysUser);
    }

    /**
     * 删除登录用户
     *
     * @param sysUser
     */
    @Override
    public void deleteSysUserList(SysUser sysUser) throws Exception {
        sysUserMapper.deleteSysUserList(sysUser);
        sysUserMapper.deleteSysUserRoleByUserId(sysUser.getId());
    }

    /**
     * 获得登录用户信息列表
     *
     * @param sysUser
     * @return
     */
    @Override
    public List<SysUser> findSysUserList(SysUser sysUser) throws Exception {
        return sysUserMapper.findSysUserList(sysUser);
    }

    /**
     * 获得角色用户列表
     *
     * @param filter
     * @return
     */
    @Override
    public List<SysUser> findSysUserRoleListByFilter(SysUser filter) throws Exception {
        return sysUserMapper.findSysUserRoleListByFilter(filter);
    }

    /**
     * 更新用户-角色表
     *
     * @param sysUserRole
     * @param currentUser
     */
    @Override
    public void updateSysUserRoleById(SysUserRole sysUserRole, SysUser currentUser) throws Exception {
        sysUserMapper.deleteSysUserRoleByUserId(sysUserRole.getUserId());
        if (StringUtils.isNotEmpty(sysUserRole.getSysUserRoleIds())) {
            insertSysUserRole(sysUserRole, currentUser);
        }
    }

    /**
     * 新增用户-角色表数据
     *
     * @param sysUserRole
     * @param currentUser
     */
    public void insertSysUserRole(SysUserRole sysUserRole, SysUser currentUser) {
        if (StringUtils.isNotEmpty(sysUserRole.getSysUserRoleIds())) {
            String[] sysUserRoleIds = sysUserRole.getSysUserRoleIds().split(",");
            for (int i = 0; i < sysUserRoleIds.length; i++) {
                String id = UUID.randomUUID().toString().replaceAll("-", "");
                sysUserRole.setId(id);
                sysUserRole.setRoleId(sysUserRoleIds[i]);
                sysUserRole.setUser(currentUser);
                sysUserMapper.insertSysUserRole(sysUserRole);
            }
        }
    }

    /**
     * 更新用户表
     *
     * @param sysUser
     * @param currentUser
     */
    @Override
    public void updateSysUser(SysUser sysUser, SysUser currentUser) throws Exception {
        if (StringUtils.isNotEmpty(sysUser.getNewPassword())) {
            sysUser.setNewPassword(Md5Helper.getMD5(sysUser.getNewPassword()));
        }
        sysUser.setUserLevel("1");
        sysUser.setCreateUser(currentUser.getTrueName());
        sysUserMapper.updateSysUserById(sysUser);
    }

    /**
     * 新增用户
     *
     * @param sysUser     用户信息
     * @param currentUser 当前用户
     * @return 用户编号
     */
    @Override
    public String appendSysUser(SysUser sysUser, SysUser currentUser) throws Exception {
        //MD5加密
        if (StringUtils.isNotEmpty(sysUser.getUserPwd())) {
            sysUser.setUserPwd(Md5Helper.getMD5(sysUser.getUserPwd()));
        }
        List<SysUser> list = sysUserMapper.findSysUserList(sysUser);
        if (list != null && list.size() > 0) {
            return "error";
        }
        String id = UUID.randomUUID().toString().replaceAll("-", "");
        sysUser.setId(id);
        sysUser.setDefaultModule("0");
        sysUser.setUserLevel("1");
        sysUser.setCreateUser(currentUser.getTrueName());
        sysUserMapper.insertSysUser(sysUser);
        return id;
    }

    /**
     * 根据角色id获得角色列表
     *
     * @param roleId
     * @return
     */
    @Override
    public List<SysUser> findUserListByRoleId(String roleId) throws Exception {
        return sysUserMapper.findUserListByRoleId(roleId);
    }

    /**
     * 获得角色信息
     *
     * @param userName 用户名
     * @return 角色信息
     */
    @Override
    public String getRoleInfo(String userName) throws Exception {
        return sysUserMapper.getRoleInfo(userName);
    }

    /**
     * 新增token信息
     *
     * @param userId 用户编号
     * @return token
     */
    @Override
    public String addUserToken(String userId) throws Exception {
        SysUserToken sysUserToken = new SysUserToken();
        //生成token
        String token = UUID.randomUUID().toString().replaceAll("-", "");
        sysUserToken.setToken(token);
        sysUserToken.setUserId(userId);
        sysUserMapper.addUserToken(sysUserToken);
        return token;
    }

    /**
     * 根据token获得用户信息
     *
     * @param token token编号
     * @return 用户信息
     */
    @Override
    public SysUser getUserByToken(String token) throws Exception {
        return sysUserMapper.getUserByToken(token);
    }

    /**
     * 删除用户token信息
     *
     * @param token token编号
     */
    @Override
    public void deleteUserToken(String token) throws Exception {
        sysUserMapper.deleteUserToken(token);
    }

    /**
     * 修改用户密码
     *
     * @param user 当前用户
     */
    public void updatePassword(SysUser user) {
        sysUserMapper.updatePassword(user);
    }

}
