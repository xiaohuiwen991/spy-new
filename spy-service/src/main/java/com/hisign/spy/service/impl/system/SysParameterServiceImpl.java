package com.hisign.spy.service.impl.system;

import com.hisign.spy.api.system.SysParameterService;
import com.hisign.spy.model.system.SysParam;
import com.hisign.spy.persist.mapper.system.SysParameterMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 系统参数管理接口实现
 * 访问方法：
 * @author xiaohuiwen
 * @version 1.0
 * @since 2016/5/25 14:53
 */

@Service("sysParameterService")
public class SysParameterServiceImpl implements SysParameterService {

    /**
     * 系统参数管理Mapper
     */
    @Resource
    protected SysParameterMapper sysParameterMapper;

    /**
     * 查找所有配置
     * @Author xiaohuiwen
     * @return
     * @throws Exception
     */
    @Override
    public List<SysParam> findSysConfigList() throws Exception {
        List<SysParam> list = new ArrayList<SysParam>();
        list = sysParameterMapper.findSysConfigList();
        return list;
    }

    /**
     * 新增系统参数
     * @Author xiaohuiwen
     * @param sysParam 参数model
     * @throws Exception
     */
    public void insertSysParameter(SysParam sysParam) throws Exception {
            sysParameterMapper.insertSysParameter(sysParam);
    }

    /**
     * 修改系统参数
     * @Author xiaohuiwen
     * @param sysParam 参数model
     * @throws Exception
     */
    public void editSysParameter(SysParam sysParam) throws Exception {
        sysParameterMapper.updateSysParameter(sysParam);
    }

    /**
     * 检查参数是否唯一
     * @Author xiaohuiwen
     * @param englishName 参数英文名
     * @return
     */
    public int checkSysParameter(String englishName) throws Exception {
        int count = sysParameterMapper.checkSysParameter(englishName);
        return count;
    }

    /**
     * 查询字典值
     * @Author xiaohuiwen
     * @param str 参数字符
     * @return
     */
    public List<String> findSysDictValueByRootKey(String str) throws Exception {
        List<String> list = new ArrayList<String>();
        list = sysParameterMapper.findSysDictValueByRootKey(str);
        return list;
    }
}
