package com.hisign.spy.web.action.system;


import com.github.pagehelper.Page;
import com.hisign.spy.api.system.SysRoleService;
import com.hisign.spy.api.system.SysUserService;
import com.hisign.spy.model.common.JsonResult;
import com.hisign.spy.model.system.SysDict;
import com.hisign.spy.model.system.SysRole;
import com.hisign.spy.model.system.SysUser;
import com.hisign.spy.model.system.SysUserRole;
import com.hisign.spy.util.Md5Helper;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用户action
 * @author jiangpeng
 * @date 2016/6/6 9:24
 */
@Controller
@RequestMapping(value="/api/{recordLog}/system/user")
public class SysUserAction {

	/**
	 * 用户信息接口
	 */
	@Resource
	private SysUserService sysUserService;

	/**
	 * 角色管理接口
	 */
	@Resource
	private SysRoleService sysRoleService;

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@RequestMapping("/page")
	@ResponseBody
	public Page<SysUser> getList() {
		SysUser user = new SysUser();
		Page<SysUser> page = sysUserService.findSysUserListByFilter(user);
		return page;
	}

	@RequestMapping("/comm")
	public void commitTets(@TranslateObject SysUser user, @TranslateObject SysDict dict){

	}

	/**
	 * 获得登录用户管理列表数据
	 * @param filter
	 * @return
	 * @throws InterruptedException
	 */
	@RequestMapping(value="/list", method= RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public JsonResult getSysUserList(@TranslateObject SysUser filter) throws InterruptedException {
		JsonResult jsonResult = new JsonResult();
		try {
			logger.info("获取登录用户列表");
			if(filter.getUserName() != null) {
				filter.setUserName(filter.getUserName().replaceAll("%", "\\\\%").replaceAll("_", "\\\\_"));
			}
			if(filter.getTrueName() != null) {
				filter.setTrueName(filter.getTrueName().replaceAll("%", "\\\\%").replaceAll("_", "\\\\_"));
			}
			List<SysUser> list = sysUserService.findSysUserListByUserFilter(filter);
			int count = sysUserService.findSysUserListByFilterForCount(filter);
			jsonResult.setSuccessData(list,count);
			return jsonResult;
		} catch (Exception e) {
			logger.error("获取登录用户列表失败", e);
			jsonResult = new JsonResult(0, "获取登录用户列表失败！");
			return jsonResult;
		}
	}

	/**
	 * 删除登录用户
	 * @param user
	 * @return
	 * @throws InterruptedException
     */
	@RequestMapping(value="/delete", method= RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public JsonResult deleteSysUserList(@TranslateObject SysUser user) throws InterruptedException {
		JsonResult jsonResult = new JsonResult();
		SysUser sysUser = new SysUser();
		sysUser.setId(user.getId());
		try {
			logger.info("删除id为[{}]的登录用户", user.getId());
			sysUserService.deleteSysUserList(sysUser);
			jsonResult.setFlag(1);
			return jsonResult;
		} catch (Exception e) {
			logger.error("删除id为[{}]的登录用户失败", user.getId(), e);
			jsonResult = new JsonResult(0, "删除登录用户失败！");
			return jsonResult;
		}
	}

	/**
	 * 查看登录用户
	 * @param id 用户编号
	 * @return 登录用户
	 * @throws InterruptedException
	 */
	@RequestMapping(value="/view", method= RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public JsonResult findSysUser(@RequestParam(value="id", required=true) String id) throws InterruptedException {
		JsonResult jsonResult = new JsonResult();
		SysUser sysUser = new SysUser();
		sysUser.setId(id);
		try {
			logger.info("查看id为[{}]的登录用户", id);
			List<SysUser> list = sysUserService.findSysUserList(sysUser);
			jsonResult.setSuccessData(list.get(0), 0);
			return jsonResult;
		} catch (Exception e) {
			logger.error("查看id为[{}]的登录用户失败", id, e);
			jsonResult = new JsonResult(0, "查看登录用户失败！");
			return jsonResult;
		}
	}

	/**
	 * 获得登录用户编辑数据
	 * @param id
	 * @return
	 * @throws InterruptedException
	 */
	@RequestMapping(value="/_edit", method= RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public Map<String,Object> intoSysUserEdit(@RequestParam(value="id", required=true) String id) {
		Map<String,Object> maps = new HashMap<String,Object>();
		try {
			logger.info("获得id为[{}]的登录用户修改信息", id);
			SysRole sysRoleFilter = new SysRole();
			sysRoleFilter.setOpenFlag("1");
			List<SysRole> roleList = sysRoleService.findSysRoleByFilter(sysRoleFilter);
			SysUser filter = new SysUser();
			filter.setId(id);
			filter.setOpenFlag("1");
			List<SysUser> userRolelist = sysUserService.findSysUserRoleListByFilter(filter);
			String sysUserRoleIds = "";
			if(userRolelist!=null && userRolelist.size()>0){
				StringBuffer sb = new StringBuffer();
				for(int i=0;i<userRolelist.size();i++){
					SysUser sysUser= userRolelist.get(i);
					if(i==0){
						sb.append(sysUser.getRoleId());
					}else{
						sb.append(",");
						sb.append(sysUser.getRoleId());
					}
				}
				sysUserRoleIds = sb.toString();
			}
			SysUser sysUser = new SysUser();
			sysUser.setId(id);
			List<SysUser> sysUserList = sysUserService.findSysUserList(sysUser);
			for(SysUser user : sysUserList) {
				user.setUserPwd("");
			}
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("roleList", roleList);
			map.put("sysUserRoleIds", sysUserRoleIds);
			map.put("sysUser", sysUserList);
			maps.put("data", map);
			maps.put("flag", 1);
			return maps;
		} catch (Exception e) {
			logger.error("获得id为[{}]的登录用户修改信息失败", id, e);
			maps.put("flag", 0);
			maps.put("msg", "获得登录用户修改信息失败！");
			return maps;
		}
	}

	/**
	 * 用户管理修改
	 * @param user
	 * @param sysUser
	 * @return
	 */
	@RequestMapping(value="/edit", method= RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public JsonResult submitSysUserEdit(@CurrentUser SysUser user, @TranslateObject SysUser sysUser) {
		JsonResult jsonResult = new JsonResult();
		try {
			logger.info("修改id为[{}]的登录用户信息", sysUser.getId());
			SysUserRole sysUserRole = new SysUserRole();
			sysUserRole.setUserId(sysUser.getId());
			sysUserRole.setSysUserRoleIds(sysUser.getSysUserRoleIds());
			sysUserService.updateSysUserRoleById(sysUserRole, user);
			sysUserService.updateSysUser(sysUser, user);
			jsonResult.setFlag(1);
			return jsonResult;
		} catch (Exception e) {
			logger.error("修改id为[{}]的登录用户信息失败", sysUser.getId(), e);
			jsonResult = new JsonResult(0, "修改登录用户信息失败！");
			return jsonResult;
		}
	}

	/**
	 * 用户管理新增
	 * @param user
	 * @param sysUser
	 * @return
	 */
	@RequestMapping(value="/add", method= RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public Map<String,Object> submitSysUserSave(@CurrentUser SysUser user,@TranslateObject SysUser sysUser) {
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			logger.info("新增用户名为[{}]的登录用户信息", sysUser.getUserName());
			String id = sysUserService.appendSysUser(sysUser, user);
			if("error".equals(id)) {
				map.put("flag", 0);
				map.put("msg", "用户账号已存在，请重新输入！");
				return map;
			}
			map.put("id", id);
			map.put("flag", 1);
			return map;
		} catch (Exception e) {
			logger.error("新增用户名为[{}]的登录用户信息失败", sysUser.getUserName(), e);
			map.put("flag", 0);
			map.put("msg", "用户新增失败，请联系开发人员或管理员!");
			return map;
		}
	}

	/**
	 * 修改密码
	 * @param oldPassword
	 * @param newPassword
	 * @param user
	 * @return
	 */
	@RequestMapping(value="/password", method= RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public JsonResult editPassword(@RequestParam(value="oldPassword", required=true) String oldPassword,
								   @RequestParam(value="newPassword", required=true) String newPassword,
								   @CurrentUser SysUser user) {
		JsonResult jsonResult = new JsonResult();
		try {
			logger.info("修改用户名为[{}]的用户密码", user.getUserName());
			if(!Md5Helper.getMD5(oldPassword).equals(user.getUserPwd())) {
				jsonResult.setFlag(0);
				jsonResult.setMsg("原密码错误,请重新输入！");
				return jsonResult;
			}
			user.setNewPassword(Md5Helper.getMD5(newPassword));
			sysUserService.updatePassword(user);
			jsonResult.setFlag(1);
			return jsonResult;
		} catch (Exception e) {
			logger.error("修改用户名为[{}]的用户密码失败", user.getUserName(), e);
			jsonResult = new JsonResult(0, "修改密码失败，请联系开发人员或管理员!");
			return jsonResult;
		}
	}

	/**
	 * 获取用户角色信息
	 * @param user 当前用户
	 * @return 用户单位信息
	 * @throws InterruptedException
	 */
	@RequestMapping(value="/role_info", method= RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public JsonResult getRoleInfo(@CurrentUser SysUser user) throws InterruptedException {
		JsonResult jsonResult = new JsonResult();
		logger.info("获取用户角色信息");
		try {
			String roleStr = sysUserService.getRoleInfo(user.getUserName());
			jsonResult.setSuccessData(roleStr, 0);
			return jsonResult;
		} catch (Exception e) {
			logger.error("获取用户角色信息失败", e);
			jsonResult = new JsonResult(0, "获取用户角色信息失败");
			return jsonResult;
		}
	}

	/**
	 * 新增token信息
	 * @param userId 用户编号
	 * @return token
	 * @throws InterruptedException
     */
	@RequestMapping(value="/add_token", method= RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public JsonResult addUserToken(@RequestParam(value="userId", required=true) String userId) throws InterruptedException {
		JsonResult jsonResult = new JsonResult();
		logger.info("新增token信息");
		try {
			String token = sysUserService.addUserToken(userId);
			jsonResult.setSuccessData(token, 0);
			return jsonResult;
		} catch (Exception e) {
			logger.error("新增token信息失败", e);
			jsonResult = new JsonResult(0, "新增token信息失败");
			return jsonResult;
		}
	}

	/**
	 * 根据token获得用户信息
	 * @param token token编号
	 * @return 用户信息
	 * @throws InterruptedException
	 */
	@RequestMapping(value="/token_info", method= RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public JsonResult getUserByToken(@RequestParam(value="token", required=true) String token) throws InterruptedException {
		JsonResult jsonResult = new JsonResult();
		logger.info("根据token获得用户信息", token);
		try {
			SysUser sysUser = sysUserService.getUserByToken(token);
			jsonResult.setSuccessData(sysUser, 0);
			return jsonResult;
		} catch (Exception e) {
			logger.error("根据token获得用户信息失败", token, e);
			jsonResult = new JsonResult(0, "根据token获得用户信息失败");
			return jsonResult;
		}
	}

	/**
	 * 根据token删除用户信息
	 * @param token token编号
	 * @return 删除标志
	 * @throws InterruptedException
	 */
	@RequestMapping(value="/token_delete", method= RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public JsonResult deleteUserToken(@RequestParam(value="token", required=true) String token) throws InterruptedException {
		JsonResult jsonResult = new JsonResult();
		logger.info("根据token删除用户token信息", token);
		try {
			sysUserService.deleteUserToken(token);
			jsonResult.setFlag(1);
			return jsonResult;
		} catch (Exception e) {
			logger.error("根据token删除用户token信息失败", token, e);
			jsonResult = new JsonResult(0, "根据token删除用户token信息失败");
			return jsonResult;
		}
	}

}
