package com.hisign.spy.web.action.system;


import com.hisign.spy.api.common.ICacheService;
import com.hisign.spy.api.system.SysDictService;
import com.hisign.spy.model.common.JsonResult;
import com.hisign.spy.model.system.SysDict;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.net.URLDecoder;
import java.util.List;

/**
 * 系统字典控件控制器
 * @Author yejiansuo
 * @Date 2016/5/30 17:53
 */
@Controller
public class SysDictAction {

	@Resource
	private SysDictService sysDictService;

	@Resource
	private ICacheService cacheService;

	/**
	 * 单级字典查询
	 * @param root
	 * @return
     */
	@RequestMapping(value="/api/dict/single/{root}", method= RequestMethod.GET)
	@ResponseBody
	public JsonResult singleDict(@PathVariable("root") String root) {
		List<SysDict> list = sysDictService.querySingleDictByRoot(root);
		JsonResult result = new JsonResult();
		result.setFlag(1);
		result.setData(list);
		return result;
	}

	/**
	 * 单级字典查询
	 * @param root
	 * @return
	 */
	@RequestMapping(value="/api/dict/single/{root}/json", method= RequestMethod.GET)
	@ResponseBody
	public JsonResult singleDictWithFlag(@PathVariable("root") String root) {
		JsonResult result = new JsonResult();
		try{
			List<SysDict> list = sysDictService.querySingleDictByRoot(root);
			result.setFlag(1);
			result.setData(list);
			return result;
		}catch (Exception e){
			result.setFlag(0);
			result.setMsg(e.getMessage());
			return result;
		}
	}


	/**
	 * 多级字典查询
	 * @param root
	 * @return
     */
	@RequestMapping(value="/api/dict/multi/{root}", method= RequestMethod.GET)
	@ResponseBody
	public JsonResult multiDict(@PathVariable("root") String root) {
		String cacheKey = "dict_multi_"+root;
		List<SysDict> list = null;
		list = cacheService.get(cacheKey, List.class);
		if(list == null) {
			list = sysDictService.queryMultiDictByRoot(root);
			cacheService.put(cacheKey, list);
		}
		JsonResult result = new JsonResult();
		result.setFlag(1);
		result.setData(list);
		return result;
	}

	/**
	 * 根据字典key查询字典信息
	 * @param root
	 * @param key
     * @return
     */
	@RequestMapping(value="/api/dict/{root}/{key}", method= RequestMethod.GET)
	@ResponseBody
	public JsonResult getDictByKey(@PathVariable("root") String root, @PathVariable("key") String key) {
		SysDict dict = this.sysDictService.queryDictByKey(root, key);
		JsonResult result = new JsonResult();
		result.setFlag(1);
		result.setData(dict);
		return result;
	}

	/**
	 * 根据多个字典key查询字典信息（英文逗号分隔）
	 * @param root
	 * @param keys
     * @return
     */
	@RequestMapping(value="/api/dict/{root}/keys/{keys}", method= RequestMethod.GET)
	@ResponseBody
	public JsonResult getDicstByKeys(@PathVariable("root") String root, @PathVariable("keys") String keys) {
		List<SysDict> list = this.sysDictService.queryDictListByKeys(root, keys);
		JsonResult result = new JsonResult();
		result.setFlag(1);
		result.setData(list);
		return result;
	}

	/**
	 * 根据条件查询字典信息
	 * @param root
	 * @param queryType
	 * @param queryString
     * @return
     */
	@RequestMapping(value="/api/dict/{root}/query", method= RequestMethod.GET,produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public JsonResult queryDictList(@PathVariable("root")String root, @RequestParam("queryType")String queryType, @RequestParam("queryString")String queryString) {
		String query = "";
		try {
			query = URLDecoder.decode(queryString, "UTF-8");
		}catch (Exception e){
			query = queryString;
		}
		List<SysDict> list = this.sysDictService.queryDictListByCondition(root, queryType, query);
		JsonResult result = new JsonResult();
		result.setFlag(1);
		result.setData(list);
		return result;
	}

	/**
	 * 根据条件查询字典信息
	 * @param root
	 * @param queryType
	 * @param queryString
	 * @return
	 */
	@RequestMapping(value="/api/dict/{root}/query/json", method= RequestMethod.GET,produces = {"application/json;charset=UTF-8"})
	@ResponseBody
	public JsonResult queryDictListWithFlag(@PathVariable("root")String root, @RequestParam("queryType")String queryType, @RequestParam("queryString")String queryString) {
		JsonResult result = new JsonResult();
		try {
			String query = URLDecoder.decode(queryString, "UTF-8");
			List<SysDict> list = this.sysDictService.queryDictListByCondition(root, queryType, query);
			result.setFlag(1);
			result.setData(list);
			return result;
		}catch (Exception e){
			result.setFlag(0);
			result.setData(e.getMessage());
			return result;
		}
	}

}
