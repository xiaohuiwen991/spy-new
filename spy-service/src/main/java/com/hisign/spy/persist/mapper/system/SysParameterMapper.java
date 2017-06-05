package com.hisign.spy.persist.mapper.system;

import com.hisign.spy.model.system.SysParam;

import java.util.List;

/**
 * 系统参数管理
 * @Author xiaohuiwen
 * @Date 2016/5/30 17:59
 */
public interface SysParameterMapper {

    /**
     * 计入系统参数管理页面
     * @return
     */
    public List<SysParam> findSysConfigList() ;

    /**
     * 新增系统管理参数
     * @Author xiaohuiwen
     * @param sysParam 参数model
     */
    public void insertSysParameter(SysParam sysParam);

    /**
     * 更新系统管理参数
     * @Author xiaohuiwen
     * @param sysParam 参数model
     */
    public void updateSysParameter(SysParam sysParam);

    /**
     * 检查参数是否存在
     * @Author xiaohuiwen
     * @param englishName 参数英文名
     */
    public int checkSysParameter(String englishName);

    /**
     * 字典查询
     * @Author xiaohuiwen
     * @param str 参数名(字符串参数)
     * @return
     */
    public List<String> findSysDictValueByRootKey(String str);
}
