package com.hisign.spy.service.impl.system;

import com.hisign.spy.api.system.SysModuleService;
import com.hisign.spy.model.system.SysModule;
import com.hisign.spy.persist.mapper.system.SysModuleMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 系统模块管理接口实现
 * 访问方法
 * @Author xiaohuiwen
 * @Date 2016/6/3 18:53
 */
@Service("sysModuleService")
public class SysModuleServiceImpl implements SysModuleService {

    /**
     * 系统模块管理Mapper
     */
    @Resource
    protected SysModuleMapper sysModuleMapper;

    /**
     * 获取全部模块
     * @return
     * @throws Exception
     */
    @Override
    public List<SysModule> findModuleList() throws Exception{
        List<SysModule> list = new ArrayList<SysModule>();
        list = sysModuleMapper.findAllModuleList();
        return list;
    };

    /**
     * 根据模块id获取模块信息
     * @param moduelId 模块id
     * @return
     * @throws Exception
     */
    public List<SysModule> findSysModuleInfoById( String moduelId) throws Exception{
        List<SysModule> list = new ArrayList<SysModule>();
        list = sysModuleMapper.findSysModuleInfoById(moduelId);
        return list;
    }

    /**
     * 删除资源表
     * @param moduelId 模块id
     * @throws Exception
     */
    public void deleteResource(String moduelId) throws Exception{
        sysModuleMapper.deleteResource(moduelId);
    }

    /**
     * 删除映射关系表
     * @param moduelId 模块id
     * @throws Exception
     */
    public void deletePermisRes(String moduelId) throws Exception{
        sysModuleMapper.deletePermisRes(moduelId);
    }

    /**
     * 删除权限表
     * @param moduelId 模块id
     * @throws Exception
     */
    public void deletePermission(String moduelId) throws Exception{
        sysModuleMapper.deletePermission(moduelId);
    }

    /**
     * 删除模块表
     * @param moduelId 模块id
     * @throws Exception
     */
    public void deleteModule(String moduelId) throws Exception{
        sysModuleMapper.deleteModule(moduelId);
    }

    /**
     * 更新模块信息
     * @param sysModule 模块model
     * @throws Exception
     */
    public void upDateModuleInfo(SysModule sysModule) throws Exception{
        //设置进入模块权限名称
        sysModule.setPermissionDescription("进入"+sysModule.getDescription());
        sysModule.setModuleId(sysModule.getParentId());
        sysModule.setParentId(null);
        sysModuleMapper.upDateModuleInfo(sysModule);//更新模块表
        sysModuleMapper.updatePermission(sysModule);//更新权限资源表
        sysModuleMapper.updatePermisRes(sysModule);//更新权限资源表
        sysModuleMapper.updateResource(sysModule);//更新资源表

        String id = sysModule.getModuleId();
        //删除单纯的权限
        sysModuleMapper.deleteResourceForPer(id);//首先删除资源表
        sysModuleMapper.deletePermisResForPer(id);//其次删除映射关系表
        sysModuleMapper.deletePermissionForPer(id);//再次删除权限表

        SysModule sysModuleTemp = sysModuleMapper.findSysModuleInfoByModuleId(id);

        sysModule.setCreateUser(sysModuleTemp.getCreateUser());
        sysModule.setCreateDatetime(sysModuleTemp.getCreateDatetime());
        sysModule.setResourceType("FUNC");

        //添加单纯的权限
        toolForUpdeatSysModuelConfig(sysModule);
    }

    /**
     * 新增模块
     * @param sysModule 模块model
     * @throws Exception
     */
    public void addModuleInfo(SysModule sysModule) throws Exception{
        sysModule.setResourceType("FUNC");
        sysModule.setPermissionDescription("进入"+sysModule.getDescription());
        String moduleId ;
        String permissionId ;
        String resourceId ;
        String permisResId ;
        sysModule.setPermissionFlag(0);
        moduleId = sysModuleMapper.getGuid();
        sysModule.setModuleId(moduleId);
        sysModuleMapper.insertModule(sysModule); //增加一个module

        permissionId =  sysModuleMapper.getGuid();
        sysModule.setId(permissionId);
        sysModuleMapper.insertPermission(sysModule); //增加一个权限

        resourceId = sysModuleMapper.getGuid();
        sysModule.setResourceId(resourceId);
        sysModuleMapper.insertResource(sysModule); //增加一个资源

        permisResId = sysModuleMapper.getGuid();
        sysModule.setPermisResId(permisResId);
        sysModuleMapper.insertPermisRes(sysModule); //增加一个对应关系

        //添加单纯的权限
        toolForUpdeatSysModuelConfig(sysModule);
    }

    /**
     * 获取登录用户的权限
     * @param userName 用户名
     * @return
     * @throws Exception
     */
    public List<SysModule> findLogUserPower(String userName) throws Exception{
        List<SysModule> list = new ArrayList<SysModule>();
        list = sysModuleMapper.findLogUserPower(userName);
        return list;
    }

    /**
     * 获取登录用户的子权限
     * @param userName 用户名
     * @return
     * @throws Exception
     */
    public List<SysModule> findLogUserPowerLimt(String userName) throws Exception{
        List<SysModule> list = new ArrayList<SysModule>();
        list = sysModuleMapper.findLogUserPowerLimt(userName);
        return list;
    }

    /**
     * 拼装页面权限list工具方法
     * @param parentList 页面权限
     * @param childList   二级模块权限
     * @param childNodeList 三级模块权限
     * @return
     */
    public List<SysModule> toolsForList(List<SysModule> parentList,List<SysModule> childList,List<SysModule> childNodeList) throws Exception{
        List<SysModule> result = new ArrayList<SysModule>();
        List<SysModule> resultParent = new ArrayList<SysModule>();
        resultParent = toolsForResultForEach(childList,childNodeList);
        result = toolsForResultForEach(parentList,resultParent);
        return result;
    }

    /**
     * 工具类遍历对象
     * @param list 模块list
     * @param nodesList 节点list
     * @return
     */
    public List<SysModule> toolsForResultForEach(List<SysModule> list,List<SysModule> nodesList) throws Exception{
        List<SysModule> resultTemp;
        List<SysModule> result = new ArrayList<SysModule>();
        for(int i=0;i<list.size();i++){
            resultTemp = new ArrayList<SysModule>();
            result.add(list.get(i));
            for(SysModule childSysModule:nodesList){
                if(list.get(i).getModuleId().equals(childSysModule.getParentId())){
                    resultTemp.add(childSysModule);
                }
            }
            if(resultTemp.size()!=0){
                result.get(i).setItems(resultTemp);
            }
        }
        return result;
    }

    /**
     * 获取登录用户角色
     * @param userName 用户名
     * @return
     */
    public List<Map<String,String>> findRoleList(String userName) throws Exception{
        List<Map<String,String>> list = new ArrayList<Map<String,String>>();
        list = sysModuleMapper.findRoleList(userName);
        return list;
    }
    /**
     * 工具方法更新权限信息
     * @param sysModule  模块model
     * @throws Exception
     */
    public void toolForUpdeatSysModuelConfig(SysModule sysModule) throws Exception{
        String permissionId;
        String resourceId;
        String permisResId;
        if(null!=sysModule.getDescriptionArray()&&null!=sysModule.getResourceArray()) {
            String[] descriptionArray = sysModule.getDescriptionArray().split(",");
            String[] resourceArray = sysModule.getResourceArray().split(",");
            for (int i = 0; i < descriptionArray.length; i++) {
                if (null != descriptionArray[i] && !descriptionArray[i].equals("") && null != resourceArray[i] && !resourceArray[i].equals("")) {
                    sysModule.setPermissionDescription(descriptionArray[i]);
                    sysModule.setResourceStr(resourceArray[i]);
                    sysModule.setPermissionFlag(1);

                    permissionId = sysModuleMapper.getGuid();
                    sysModule.setId(permissionId);
                    sysModuleMapper.insertPermission(sysModule); //增加一个权限

                    resourceId = sysModuleMapper.getGuid();
                    sysModule.setResourceId(resourceId);
                    sysModuleMapper.insertResource(sysModule); //增加一个资源

                    permisResId = sysModuleMapper.getGuid();
                    sysModule.setPermisResId(permisResId);
                    sysModuleMapper.insertPermisRes(sysModule); //增加一个对应关系
                }
            }
        }
    }


}
