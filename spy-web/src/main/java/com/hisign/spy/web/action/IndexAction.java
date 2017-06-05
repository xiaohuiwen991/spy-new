package com.hisign.spy.web.action;

import com.hisign.spy.api.system.SysModuleService;
import com.hisign.spy.model.system.SysUser;
import com.hisign.spy.web.bind.annotation.CurrentUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import javax.annotation.Resource;

/**
 * 登录后的准备action
 * @author wangping
 * @version 1.0
 * @since 2016/4/20 9:45
 */
@Controller
public class IndexAction {
    @Resource
    private SysModuleService sysModuleService;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    //socket服务地址URL
//    @Value("#{configProperties['socket.server.url']}")
//    private String socketServer;

    //upload服务地址URL
//    @Value("#{configProperties['upload.server.url']}")
//    private String uploadServer;

    /**
     *  页面参数初始化
     * @param user 用户对象
     * @param model 模型
     * @param tokenId 接口id
     * @return
     */
//    @RequestMapping("/index")
    public String index(@CurrentUser SysUser user, Model model,String tokenId) {
//        JsonResult jsonResult = new JsonResult();
//        jsonResult = searchUserLimt(user,tokenId);
//        list = searchUserLimt(user,tokenId);
//        List<String> roleList = searchUserRole(user) ;
//        model.addAttribute("limits", JSON.toJSONString(list));
//        model.addAttribute("roles",JSON.toJSONString(roleList));
//        model.addAttribute(Constants.CURRENT_USER, user);
//        model.addAttribute(Constants.SOCKET_SERVER, socketServer);
//        model.addAttribute(Constants.UPLOAD_SERVER, uploadServer);
        return "index";
    }

    /**
     * 获取页面所需参数
     * @author xiaohuwien
     * @param user 登录用户对象
     * @param tokenId 接口id
     * @return
     */
//    public JsonResult searchUserLimt(SysUser user,String tokenId) {
//        JsonResult jsonResult = new JsonResult();
//        List<SysModule> parentList = new ArrayList<SysModule>();//父id
//        List<SysModule> childList = new ArrayList<SysModule>();//子id
//        List<SysModule> pageLimit = new ArrayList<SysModule>();//页面权限
//        List<SysModule> childNodeList = new ArrayList<SysModule>();//页面子权限
//        Map<String,Object> resultMap = new HashMap<String,Object>();
//        Map<String,Object> tempMap = new HashMap<String,Object>();
//        try {
//            List<SysModule> list = sysModuleService.findLogUserPower(user.getUserName());//查询所有页面权限
//            for(int i=0 ; i<list.size();i++){
//                if(null==list.get(i).getParentId()){
//                    parentList.add(list.get(i));
//                }else{
//                    childList.add(list.get(i));
//                }
//            }
//            for (int i=0;i<childList.size();i++){
//                for(int j=childList.size()-1;j>=0;j--){
//                    if(childList.get(i).getModuleId().equals(childList.get(j).getParentId())){
//                        childNodeList.add(0,childList.get(j));
//                        childList.remove(j);
//                        i--;
//                        j++;
//                    }
//                }
//            }
//            pageLimit = sysModuleService.toolsForList(parentList,childList,childNodeList);//拼接List
//            List<SysModule> operateLimit = sysModuleService.findLogUserPowerLimt(user.getUserName());//查询所有操作权限
//            List<String> roleList = searchUserRole(user);;//获取用户角色
//            tempMap.put("pages",pageLimit);
//            tempMap.put("operates",operateLimit);
//            resultMap.put("token",tokenId);//接口id
//            resultMap.put("limits",tempMap);//全部页面权限
//            resultMap.put("roles",roleList);//用户角色
//            resultMap.put("socketServer",socketServer);//socket
//            resultMap.put("uploadServer",uploadServer);//上传服务器地址
//            resultMap.put("currentUser",user);
//            jsonResult.setData(resultMap);
//            jsonResult.setFlag(1);
//        } catch (Exception e) {
//            logger.error("获取登录用户模块权限出错",user,e);
//            jsonResult.setFlag(0);
//        }
//        return jsonResult;
//    }
//
//    /**
//     * 获取登录用户的角色
//     * @author xiaohuwien
//     * @param user 登录用户对象
//     * @return
//     */
//    public List<String> searchUserRole(SysUser user) {
//        List<String> list = new ArrayList<String>();
//        try {
//            list = sysModuleService.findRoleList(user.getUserName());
//        } catch (Exception e) {
//            logger.error("获取登录用户角色出错",user,e);
//        }
//        return list;
//    }
}
