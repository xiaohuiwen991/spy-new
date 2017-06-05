package com.hisign.spy.persist.mapper.system;

import com.hisign.spy.model.system.SysDict;

import java.util.List;

/**
 * 字典查询
 */
public interface SysDictMapper {

    List<SysDict> querySingleDictByRoot(String root);

    List<SysDict> queryMultiDictByRoot(String root);

    SysDict queryDictByKey(SysDict query);

    List<SysDict> queryDictListByKeys(SysDict query);

    List<SysDict> queryDictListByCondition(SysDict query);

}


