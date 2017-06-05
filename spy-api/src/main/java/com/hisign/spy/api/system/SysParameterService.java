package com.hisign.spy.api.system;

import com.hisign.spy.model.system.SysParam;

import java.util.List;

/**
 * 系统参数管理接口
 * @author xiaohuiwen
 * @since 2016/4/22 14:51
 */
public interface SysParameterService {

    /**
     * 查询系统参数配置
     * @Author xiaohuiwen
     * @throws Exception
     * @return
     */
     public List<SysParam> findSysConfigList() throws Exception;

    /**
     * 插入系统参数
     * @Author xiaohuiwen
     * @param sysParam 参数model
     * @throws Exception
     */
    public void insertSysParameter(SysParam sysParam) throws Exception;

    /**
     * 修改系统参数
     * @Author xiaohuiwen
     * @param sysParam 参数model
     * @throws Exception
     */
    public void editSysParameter(SysParam sysParam) throws Exception;

    /**
     * 检查系统参数是否已经存在
     * @Author xiaohuiwen
     * @param englishName 参数英文名
     * @throws Exception
     * @return
     */
    public int checkSysParameter(String englishName) throws Exception;

    /**
     * 查询字典中文
     * @Author xiaohuiwen
     * @param str 参数字符
     * @throws Exception
     * @return
     */
    public List<String> findSysDictValueByRootKey(String str) throws Exception;
}
