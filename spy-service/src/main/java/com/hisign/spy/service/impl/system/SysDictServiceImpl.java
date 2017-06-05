package com.hisign.spy.service.impl.system;


import com.hisign.spy.api.system.SysDictService;
import com.hisign.spy.model.system.SysDict;
import com.hisign.spy.persist.mapper.system.SysDictMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 系统字典数据服务
 * @Author yejiansuo
 * @Date 2016/5/30 19:49
 */
@Service("sysDictService")
public class SysDictServiceImpl implements SysDictService {

    @Resource
    private SysDictMapper sysDictMapper;

    /**
     * 单级字典查询
     * @param root 字典类型
     * @return
     */
    @Override
    public List<SysDict> querySingleDictByRoot(String root) {
        List<SysDict> list = sysDictMapper.querySingleDictByRoot(root.toUpperCase());
        return list;
    }

    /**
     * 多级字典查询
     * @param root 字典类型
     * @return
     */
    @Override
    public List<SysDict> queryMultiDictByRoot(String root) {
        List<SysDict> list = sysDictMapper.queryMultiDictByRoot(root.toUpperCase());
        return list;
    }

    /**
     * 根据字典代码查询字典信息
     * @param root 字典类型
     * @param key 字典代码
     * @return
     */
    @Override
    public SysDict queryDictByKey(String root, String key) {
        SysDict query = new SysDict();
        query.setRoot(root.toUpperCase());
        query.setKey(key);
        SysDict dict = sysDictMapper.queryDictByKey(query);
        return dict;
    }

    /**
     * 根据多个字典代码(使用英文逗号分隔)查询字典信息
     * @param root 字典类型
     * @param keys 字典代码字符串
     * @return
     */
    @Override
    public List<SysDict> queryDictListByKeys(String root, String keys){
        SysDict query = new SysDict();
        query.setRoot(root.toUpperCase());
        query.setKeys(keys.split(","));
        List<SysDict> list = sysDictMapper.queryDictListByKeys(query);
        return list;
    }

    /**
     * 字典查询
     * @param root 字典类型
     * @param queryType 查询类型 1-代码 2-拼音 3-中文
     * @param queryString 查询条件
     * @return
     */
    @Override
    public List<SysDict> queryDictListByCondition(String root, String queryType, String queryString) {
        SysDict query = new SysDict();
        query.setRoot(root.toUpperCase());
        query.setQueryString(queryString.toUpperCase());
        query.setQueryType(queryType);
        List<SysDict> list = sysDictMapper.queryDictListByCondition(query);
        return list;
    }

}
