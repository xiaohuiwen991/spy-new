package com.hisign.spy.service.impl.system;

import com.github.pagehelper.StringUtil;
import com.hisign.spy.api.system.SysRoleService;
import com.hisign.spy.model.system.*;
import com.hisign.spy.persist.mapper.system.SysRoleMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * 系统角色管理接口实现类
 * @author jiangpeng
 * @version 1.0
 * @since 2016/5/28 16:28
 */
@Service("sysRoleService")
public class SysRoleServiceImpl implements SysRoleService {

    @Resource
    private SysRoleMapper sysRoleMapper;

    /**
     * 根据用户id获得角色列表
     * @param userId
     * @return
     */
    @Override
    public List<SysRole> findSysRoleListByUserId(String userId) throws Exception {
        return sysRoleMapper.findSysRoleListByUserId(userId);
    }

    /**
     * 根据查询条件获得角色列表
     * @param filter
     * @return
     */
    @Override
    public List<SysRole> findSysRoleByFilter(SysRole filter) throws Exception {
        return sysRoleMapper.findSysRoleByFilter(filter);
     }

    /**
     * 获得列表数量
     * @param filter
     * @return
     */
    @Override
    public int findSysRoleByFilterForCount(SysRole filter){
        return sysRoleMapper.findSysRoleByFilterForCount(filter);
    }

    /**
     * 删除角色
     * @param id
     */
    @Override
    public void deleteSysRoleById(String id) throws Exception {
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("roleId",id);
        sysRoleMapper.deleteSysRoleById(id);
        sysRoleMapper.deleteSysRolePermisByRoleId(map);
        sysRoleMapper.deleteSysUserRoleByRoleId(id);
    }

    /**
     * 新增角色
     * @param sysRole
     * @param user
     * @return
     */
    @Override
    public String insertSysRole(SysRole sysRole, SysUser user) throws Exception {
        List<SysRole> list = sysRoleMapper.findSysRoleList(sysRole);
        if(list!=null && list.size()>0) {
            return "error";
        }
        String id = UUID.randomUUID().toString().replaceAll("-","");
        sysRole.setId(id);
        sysRole.setUser(user);
        sysRoleMapper.insertSysRole(sysRole);
        return id;
    }

    /**
     * 获得角色列表
     * @param sysRole
     * @return
     */
    @Override
    public List<SysRole> findSysRoleList(SysRole sysRole){
        return sysRoleMapper.findSysRoleList(sysRole);
    }

    /**
     * 更新角色列表
     * @param sysRole
     * @param user
     */
    @Override
    public void updateSysRoleById(SysRole sysRole, SysUser user){
        sysRole.setUser(user);
        sysRoleMapper.updateSysRoleById(sysRole);
    }

    /**
     * 用户角色表新增数据
     * @param id
     * @param selectUserId
     * @param user
     */
    @Override
    public void insertUserRole(String id, String selectUserId, SysUser user) throws Exception {
        if(StringUtil.isNotEmpty(selectUserId)) {
            String[] strs = selectUserId.split(",");
            SysUserRole userRole = new SysUserRole();
            SysUserRole sysUserRole = new SysUserRole();
            sysUserRole.setRoleId(id);
            userRole.setRoleId(id);
            userRole.setUser(user);
            for(int i=0;i<strs.length;i++){
                userRole.setId(UUID.randomUUID().toString().replaceAll("-", ""));
                userRole.setUserId(strs[i]);
                sysUserRole.setUserId(strs[i]);
                if(sysRoleMapper.findUserRoleByUserRoleId(sysUserRole) == null){
                    sysRoleMapper.insertSysUserRole(userRole);
                }
            }
        }
    }


    /**
     * 移除用户角色数据
     * @param id
     * @param associatedUserId
     */
    @Override
    public void removeUserRole(String id, String associatedUserId) throws Exception {
        if(StringUtil.isNotEmpty(associatedUserId)) {
            String[] strs = associatedUserId.split(",");
            Map<String,String> map = new HashMap<String,String>();
            map.put("roleId",id);
            for(int i=0;i<strs.length;i++){
                map.put("userId",strs[i]);
                sysRoleMapper.deleteUserRoleByUserRoleId(map);
            }
        }
    }

    /**
     * 获得系统模块数据
     * @return
     */
    @Override
    public List<SysModule> findALLSysModule() throws Exception {
        return sysRoleMapper.findALLSysModule();
    }

    /**
     * 根据条件获得角色权限数据
     * @param sysRolePermis
     * @return
     */
    @Override
    public List<SysRolePermis> findSysRolePermisListByFilter(SysRolePermis sysRolePermis) throws Exception {
        return sysRoleMapper.findSysRolePermisListByFilter(sysRolePermis);
    }

    /**
     * 根据条件获得系统权限数据
     * @param moduleId
     * @return
     */
    @Override
    public List<SysPermission> findSysPermissionListByFilter(String moduleId) throws Exception {
        return sysRoleMapper.findSysPermissionListByFilter(moduleId);
    }

    /**
     * 根据父模块id获得系统模块
     * @param moduleId
     * @return
     */
    @Override
    public List<SysModule> findSysModuleByParentId(String moduleId) throws Exception {
        return sysRoleMapper.findSysModuleByParentId(moduleId);
    }

    /**
     *根据id更新角色权限表
     * @param map
     * @param user
     */
    @Override
    public void updateSysRolePermisById(Map<String, Object> map, SysUser user) throws Exception {
        deleteSysRolePermisByRoleId(map);
        if(StringUtil.isNotEmpty((String) map.get("sysRolePermisIds"))){
            insertSysRolePermis((String) map.get("sysRolePermisIds"), (String) map.get("roleId"),user);
        }
    }

    /**
     * 获得字典角色数据
     * @return 字典角色数据
     */
    @Override
    public List<SysRole> findAllRole() throws Exception {
        return sysRoleMapper.findAllRole();
    }

    /**
     * 删除角色授权关联表记录
     * @param map
     */
    public void deleteSysRolePermisByRoleId(Map<String,Object> map) throws Exception {
        sysRoleMapper.deleteSysRolePermisByRoleId(map);
    }

    /**
     * 插入一条角色授权关联表记录
     * @param sysRolePermis
     * @param optUser
     * @return
     */
    public String insertSysRolePermis(String sysRolePermis, String roleId,SysUser optUser)  {
        if(StringUtil.isNotEmpty(sysRolePermis)){
            String[] permissionIds = sysRolePermis.split(",");
            Map<String,Object> map;
            SysRolePermis sysRolePerm;
            for(int i=0;i<permissionIds.length;i++){
                if(StringUtil.isNotEmpty(permissionIds[i])){
                    sysRolePerm = new SysRolePermis();
                    sysRolePerm.setId(UUID.randomUUID().toString().replaceAll("-",""));
                    sysRolePerm.setRoleId(roleId);
                    sysRolePerm.setPermissionId(permissionIds[i]);
                    sysRolePerm.setUser(optUser);
                    sysRoleMapper.insertSysRolePermis(sysRolePerm);
                }
            }
        }
        return "success";
    }

}
