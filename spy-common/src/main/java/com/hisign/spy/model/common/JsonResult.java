package com.hisign.spy.model.common;

import java.io.Serializable;
import java.util.List;

/**
 * action返回结果类
 * @author jiangpeng
 * @since 2016/5/28 11:46
 */
public class JsonResult implements Serializable {
    /**
     * 返回信息标志
     */
    private int flag;

    /**
     * 返回总条数
     */
    private int totalCount;

    /**
     * 错误信息
     */
    private String msg;

    /**
     * 返回数据
     */
    private Object data;

    /**
     * 页面权限
     */
    private List pages;

    /**
     * 子权限
     */
    private List operates;

    public JsonResult(){}

    public JsonResult(int flag, String msg) {
        this.flag = flag;
        this.msg = msg;
    }

    public void setSuccessData(Object data, int totalCount) {
        this.data = data;
        this.flag = 1;
        this.totalCount = totalCount;
    }

    public void setSuccessData(Object data) {
        this.data = data;
        this.flag = 1;
    }

    public void setErrorMsg(String msg) {
        this.flag = 0;
        this.msg = msg;
    }

    public void setPages(List pages) {
        this.pages = pages;
    }

    public void setOperates(List operates) {
        this.operates = operates;
    }

    public int getFlag() {
        return flag;
    }

    public void setFlag(int flag) {
        this.flag = flag;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public List getPages() {
        return pages;
    }

    public List getOperates() {
        return operates;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
