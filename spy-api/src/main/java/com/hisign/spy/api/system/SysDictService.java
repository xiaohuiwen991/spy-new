package com.hisign.spy.api.system;

import com.hisign.spy.model.system.SysDict;

import java.util.List;

/**
 * 系统字典服务接口
 * @Author yejiansuo
 * @Date 2016/5/30 19:49
 */
public interface SysDictService {

    /**
     * 单级字典查询
     * @param root 字典类型
     * @return
     */
    public List<SysDict> querySingleDictByRoot(String root);

    /**
     * 多级字典查询
     * @param root 字典类型
     * @return
     */
    public List<SysDict> queryMultiDictByRoot(String root);

    /**
     * 根据字典代码查询字典信息
     * @param root 字典类型
     * @param key 字典代码
     * @return
     */
    public SysDict queryDictByKey(String root, String key);

    /**
     * 根据多个字典代码(使用英文逗号分隔)查询字典信息
     * @param root 字典类型
     * @param keys 字典代码字符串
     * @return
     */
    public List<SysDict> queryDictListByKeys(String root, String keys);

    /**
     * 字典查询
     * @param root 字典类型
     * @param queryType 查询类型 1-代码 2-拼音 3-中文
     * @param queryString 查询条件
     * @return
     */
    public List<SysDict> queryDictListByCondition(String root, String queryType, String queryString);

}
