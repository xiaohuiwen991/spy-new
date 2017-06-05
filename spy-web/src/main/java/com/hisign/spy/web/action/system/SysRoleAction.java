package com.hisign.spy.web.action.system;

import com.github.pagehelper.StringUtil;
import com.hisign.spy.api.system.SysRoleService;
import com.hisign.spy.api.system.SysUserService;
import com.hisign.spy.model.common.JsonResult;
import com.hisign.spy.model.system.*;
import com.hisign.spy.web.bind.annotation.CurrentUser;
import com.hisign.spy.web.bind.annotation.TranslateObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 系统角色管理action
 * @author jiangpeng
 * @date 2016/6/6 10:06
 */
@Controller
@RequestMapping(value="/api/{recordLog}/system/role")
public class SysRoleAction {
    @Resource
    private SysRoleService sysRoleService;

    @Resource
    private SysUserService sysUserService;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 获得系统角色管理列表数据
     * @param filter
     * @return
     * @throws InterruptedException
     */
    @RequestMapping(value="/list", method= RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public JsonResult getSysRoleList(@TranslateObject SysRole filter) throws InterruptedException {
        JsonResult jsonResult = new JsonResult();
        try {
            logger.info("获取角色管理列表");
            if(filter.getRoleName() != null) {
                filter.setRoleName(filter.getRoleName().replaceAll("%", "\\\\%").replaceAll("_", "\\\\_"));
            }
            if(filter.getDescription() != null) {
                filter.setDescription(filter.getDescription().replaceAll("%", "\\\\%").replaceAll("_", "\\\\_"));
            }
            List<SysRole> list = sysRoleService.findSysRoleByFilter(filter);
            int count = sysRoleService.findSysRoleByFilterForCount(filter);
            jsonResult.setSuccessData(list, count);
            return jsonResult;
        } catch (Exception e) {
            logger.error("获取角色管理列表失败！", e);
            jsonResult = new JsonResult(0, "获取角色管理列表失败！");
            return jsonResult;
        }
    }

    /**
     * 删除角色数据
     * @param sysRole
     * @return
     * @throws InterruptedException
     */
    @RequestMapping(value="/delete", method= RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public JsonResult sysRoleDelete(@TranslateObject SysRole sysRole) throws InterruptedException {
        JsonResult jsonResult = new JsonResult();
        try {
            logger.info("删除id为[{}]的角色数据", sysRole.getId());
            sysRoleService.deleteSysRoleById(sysRole.getId());
            jsonResult.setFlag(1);
            return jsonResult;
        } catch (Exception e) {
            logger.error("删除id为[{}]的角色数据", sysRole.getId(), e);
            jsonResult = new JsonResult(0, "删除角色失败！");
            return jsonResult;
        }
    }

    /**
     * 新增角色管理列表数据
     * @param sysRole
     * @param user
     * @return
     * @throws InterruptedException
     */
    @RequestMapping(value="/add", method= RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public JsonResult sysRoleAdd(@TranslateObject SysRole sysRole, @CurrentUser SysUser user) throws InterruptedException {
        JsonResult jsonResult = new JsonResult();
        try {
            logger.info("新增角色名为[{}]的角色数据", sysRole.getRoleName());
            String id = sysRoleService.insertSysRole(sysRole,user);
            if("error".equals(id)) {
                jsonResult = new JsonResult(0, "角色名称已存在,请重新输入!");
            } else {
                jsonResult.setFlag(1);
            }
            return jsonResult;
        } catch (Exception e) {
            logger.error("新增角色名为[{}]的角色数据失败", sysRole.getRoleName(), e);
            jsonResult = new JsonResult(0, "新增失败!");
            return jsonResult;
        }
    }

    /**
     * 进入角色管理修改
     * @param id
     * @return
     * @throws InterruptedException
     */
    @RequestMapping(value="/_edit", method= RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public JsonResult sysRoleIntoEdit(@RequestParam(value="id", required=true) String id) throws InterruptedException {
        JsonResult jsonResult = new JsonResult();
        try {
            logger.info("获得id为[{}]的角色数据", id);
            SysRole sysRole = new SysRole();
            sysRole.setId(id);
            List<SysRole> list = sysRoleService.findSysRoleList(sysRole);
            jsonResult.setSuccessData(list,0);
            return jsonResult;
        } catch (Exception e) {
            logger.error("获得id为[{}]的角色数据失败", id, e);
            jsonResult = new JsonResult(0, "获得数据失败!");
            return jsonResult;
        }
    }

    /**
     * 提交角色管理修改
     * @param sysRole
     * @param user
     * @return
     */
    @RequestMapping(value="/edit", method= RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public JsonResult sysRoleSubmit(@TranslateObject SysRole sysRole, @CurrentUser SysUser user) {
        JsonResult jsonResult = new JsonResult();
        try {
            logger.info("修改id为[{}]的角色数据", sysRole.getRoleId());
            sysRoleService.updateSysRoleById(sysRole, user);
            jsonResult.setFlag(1);
            return jsonResult;
        } catch (Exception e) {
            logger.error("修改id为[{}]的角色数据失败", sysRole.getRoleId(), e);
            jsonResult = new JsonResult(0, "角色修改失败!");
            return jsonResult;
        }
    }

    /**
     * 进入角色分配
     * @param id
     * @return
     * @throws InterruptedException
     */
    @RequestMapping(value="/_user", method= RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public Map<String,Object> intoUserSelect(@RequestParam(value="id", required=true) String id) throws InterruptedException {
        Map<String,Object> maps = new HashMap<String,Object>();
        try {
            logger.info("获得id为[{}]的角色分配数据", id);
            SysRole sysRoleFilter = new SysRole();
            sysRoleFilter.setId(id);
            SysRole sysRole =  sysRoleService.findSysRoleList(sysRoleFilter).get(0);
            List<SysUser> associatedUserList = sysUserService.findUserListByRoleId(id);
            //获得未分配用户查询条件
            SysUser filter = new SysUser();
            if(associatedUserList !=null && associatedUserList.size() > 0) {
                StringBuffer buffer = new StringBuffer();
                buffer.append("(");
                for (SysUser sysUser : associatedUserList) {
                    buffer.append("'" + sysUser.getUserName() + "',");
                }
                filter.setNotContainUserName(buffer.substring(0, buffer.length() - 1).toString() + ")");
            }
            filter.setOpenFlag("1");
            List<SysUser> allUserList = sysUserService.findSysUserListByUserFilter(filter);
            Map<String,Object> map = new HashMap<String,Object>();
            map.put("sysRole",sysRole);
            map.put("associatedUserList",associatedUserList);
            map.put("allUserList",allUserList);
            maps.put("data",map);
            maps.put("flag",1);
            return maps;
        } catch (Exception e) {
            logger.error("获得id为[{}]的角色分配数据失败", id, e);
            maps.put("flag",0);
            return maps;
        }
    }


    /**
     * 加入用户
     * @param id
     * @param selectUserId
     * @param user
     * @return
     * @throws InterruptedException
     */
    @RequestMapping(value="/add_user", method= RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public JsonResult addUserSelect(@RequestParam(value="id", required=true) String id,
                                    @RequestParam(value="selectUserId", required=true) String selectUserId,
                                    @CurrentUser SysUser user) throws InterruptedException {
        JsonResult jsonResult = new JsonResult();
        try {
            logger.info("对id为[{}]的角色加入用户", id);
            sysRoleService.insertUserRole(id,selectUserId,user);
            jsonResult.setFlag(1);
            return jsonResult;
        } catch (Exception e) {
            logger.error("对id为[{}]的角色加入用户失败", id, e);
            jsonResult = new JsonResult(0, "加入用户失败!");
            return jsonResult;
        }
    }

    /**
     * 移除用户
     * @param id
     * @param associatedUserId
     * @return
     * @throws InterruptedException
     */
    @RequestMapping(value="/remove_user", method= RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public JsonResult removeUserSelect(@RequestParam(value="id", required=true) String id,
                                       @RequestParam(value="associatedUserId", required=true) String associatedUserId) throws InterruptedException {
        JsonResult jsonResult = new JsonResult();
        try {
            logger.info("对id为[{}]的角色移除用户", id);
            sysRoleService.removeUserRole(id,associatedUserId);
            jsonResult.setFlag(1);
            return jsonResult;
        } catch (Exception e) {
            logger.error("对id为[{}]的角色移除用户失败", id, e);
            jsonResult = new JsonResult(0, "移除用户失败!");
            return jsonResult;
        }
    }


    /**
     * 进入角色授权
     * @param id
     * @param moduleId
     * @return
     * @throws InterruptedException
     */
    @RequestMapping(value="/_permission", method= RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public Map<String,Object> intoGivePermission(@RequestParam(value="id", required=true) String id,
                                              @RequestParam(value="moduleId") String moduleId) throws InterruptedException {
        Map<String,Object> maps = new HashMap<String,Object>();
        try {
            logger.info("获得id为[{}]的角色授权数据", id);
            SysRole sysRoleFilter = new SysRole();
            sysRoleFilter.setId(id);
            SysRole sysRole = sysRoleService.findSysRoleList(sysRoleFilter).get(0);
            List<SysModule> sysModuleList = sysRoleService.findALLSysModule();
            if(StringUtil.isEmpty(moduleId)){
                moduleId =  sysModuleList.get(0).getId();
            }
            SysRolePermis sysRolePermis = new SysRolePermis();
            sysRolePermis.setRoleId(id);
            List<SysRolePermis> sysRolePermisList = sysRoleService.findSysRolePermisListByFilter(sysRolePermis);
            SysPermission permission = sysRoleService.findSysPermissionListByFilter(moduleId).get(0);
            //查询出模块所有的子模块
            List<SysModule> moduleList = sysRoleService.findSysModuleByParentId(moduleId);
            //查询出子模块所有的权限
            for(int i=0;i<moduleList.size();i++){
                SysModule sysModule = moduleList.get(i);
                String moduleId1 = sysModule.getId();
                //查询模块的子模块
                List<SysModule> moduleSonList = sysRoleService.findSysModuleByParentId(moduleId1);
                //子模块的所有权限集合
                List<SysPermission> sysModulepermissionList_son = new ArrayList();
                if(!moduleSonList.isEmpty()){
                    for(int m = 0; m < moduleSonList.size(); m++) {
                        List<SysPermission> tempPermissionList = sysRoleService.findSysPermissionListByFilter(moduleSonList.get(m).getId());
                        if(!tempPermissionList.isEmpty()){
                            sysModulepermissionList_son.addAll(tempPermissionList);
                        }
                    }
                }
                //模块对应的权限
                List<SysPermission> sysModulepermissionList = sysRoleService.findSysPermissionListByFilter(moduleId1);
                sysModulepermissionList.addAll(sysModulepermissionList_son);
                sysModule.setSysModulepermissionList(sysModulepermissionList);
            }
            Map<String,Object> map = new HashMap<String,Object>();
            map.put("sysRole",sysRole);
            map.put("permission",permission);
            map.put("sysModuleList",sysModuleList);
            map.put("moduleList",moduleList);
            map.put("sysRolePermisList",sysRolePermisList);
            maps.put("data",map);
            maps.put("flag",1);
            return maps;
        } catch (Exception e) {
            logger.error("获得id为[{}]的角色授权数据失败", id, e);
            maps.put("flag",0);
            return maps;
        }
    }

    /**
     * 修改角色授权
     * @param roleId
     * @param sysRolePermisIds
     * @return
     * @throws InterruptedException
     */
    @RequestMapping(value="/permission", method= RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public JsonResult submitGivePermission(@CurrentUser SysUser user, @RequestParam(value="roleId", required=true) String roleId,
                                           @RequestParam(value="sysRolePermisIds") String sysRolePermisIds, @RequestParam(value="currentRolePermisIds") String currentRolePermisIds) throws InterruptedException {
        JsonResult jsonResult = new JsonResult();
        try {
            logger.info("修改id为[{}]的角色授权数据", roleId);
            Map<String,Object> map = new HashMap<String,Object>();
            map.put("roleId",roleId);
            map.put("sysRolePermisIds",sysRolePermisIds);
            map.put("currentRolePermisIds","'"+currentRolePermisIds.replaceAll(",","','")+"'");
            sysRoleService.updateSysRolePermisById(map, user);
            jsonResult.setFlag(1);
            return jsonResult;
        } catch (Exception e) {
            logger.error("修改id为[{}]的角色授权数据失败", roleId, e);
            jsonResult = new JsonResult(0, "修改角色授权数据失败!");
            return jsonResult;
        }
    }

    /**
     * 获得字典角色数据
     * @return 字典角色数据
     * @throws InterruptedException
     */
    @RequestMapping(value="/roleDict", method= RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public JsonResult findAllRole() throws InterruptedException{
        JsonResult jsonResult = new JsonResult();
        try {
            logger.info("获得字典角色数据");
            List<SysRole> list = sysRoleService.findAllRole();
            jsonResult.setSuccessData(list, 0);
            return jsonResult;
        } catch (Exception e) {
            logger.error("获得字典角色数据失败", e);
            jsonResult = new JsonResult(0, "获得字典角色数据失败!");
            return jsonResult;
        }
    }

}
