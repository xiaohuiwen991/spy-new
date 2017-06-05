package com.hisign.spy.model.common;


import com.github.pagehelper.StringUtil;
import com.hisign.spy.model.system.SysUser;

import java.io.Serializable;
import java.util.Date;

/**
 * 业务Model基类
 * @Author yejiansuo
 * @Date 2016/5/31 15:18
 */
public class BaseModel implements Serializable {

    private String rownum;

    private String id;

    private SysUser user;

    private String del;

    private String secrecy;

    private Date createDate;

    private Date modifyDate;

    private Date transferTime;

    private String rev1;

    private String rev2;

    private String rev3;

    private String rev4;

    private String rev5;

    private String rev6;

    private String rev7;

    private String rev8;

    private int begin = 0;

    private int end = 0;

    private String sortOrder;

    private String sortName;

    private String orderByString;

    /**
     * 字典键值
     */
    private String key;

    /**
     * 字典值
     */
    private String value;

    /**
     * 字典父键值
     */
    private String parentKey;

    public String getSortName() {
        return sortName;
    }

    public void setSortName(String sortName) {
        this.sortName = sortName;
    }

    public String getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(String sortOrder) {
        this.sortOrder = sortOrder;
    }

    public String getOrderByString() {
        if(StringUtil.isNotEmpty(getSortName()) && StringUtil.isNotEmpty(getSortOrder())) {
            return getSortName()  + " " + getSortOrder();
        }
        return orderByString;
    }

    public void setOrderByString(String orderByString) {
        this.orderByString = orderByString;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public SysUser getUser() {
        return user;
    }

    public void setUser(SysUser user) {
        this.user = user;
    }

    public String getDel() {
        return del;
    }

    public void setDel(String del) {
        this.del = del;
    }

    public String getSecrecy() {
        return secrecy;
    }

    public void setSecrecy(String secrecy) {
        this.secrecy = secrecy;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }

    public Date getTransferTime() {
        return transferTime;
    }

    public void setTransferTime(Date transferTime) {
        this.transferTime = transferTime;
    }

    public String getRev1() {
        return rev1;
    }

    public void setRev1(String rev1) {
        this.rev1 = rev1;
    }

    public String getRev2() {
        return rev2;
    }

    public void setRev2(String rev2) {
        this.rev2 = rev2;
    }

    public String getRev3() {
        return rev3;
    }

    public void setRev3(String rev3) {
        this.rev3 = rev3;
    }

    public String getRev4() {
        return rev4;
    }

    public void setRev4(String rev4) {
        this.rev4 = rev4;
    }

    public String getRev5() {
        return rev5;
    }

    public void setRev5(String rev5) {
        this.rev5 = rev5;
    }

    public String getRev6() {
        return rev6;
    }

    public void setRev6(String rev6) {
        this.rev6 = rev6;
    }

    public String getRev7() {
        return rev7;
    }

    public void setRev7(String rev7) {
        this.rev7 = rev7;
    }

    public String getRev8() {
        return rev8;
    }

    public void setRev8(String rev8) {
        this.rev8 = rev8;
    }

    public String getRownum() {
        return rownum;
    }

    public void setRownum(String rownum) {
        this.rownum = rownum;
    }

    public int getBegin() {
        return begin;
    }

    public void setBegin(int begin) {
        this.begin = begin;
    }

    public int getEnd() {
        return end;
    }

    public void setEnd(int end) {
        this.end = end;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getParentKey() {
        return parentKey;
    }

    public void setParentKey(String parentKey) {
        this.parentKey = parentKey;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public void setMainId(String mainId) {
        setId(mainId);
    }
}
