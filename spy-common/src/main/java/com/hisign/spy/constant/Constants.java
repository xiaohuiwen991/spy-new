package com.hisign.spy.constant;

import java.util.HashMap;
import java.util.Map;

public class Constants {

	/**
	 * 行政区划代码级别(两位为一个级别)
	 */
    public static final String XZQHDM_LEVEL_MASK = "00";

	public static final String CURRENT_USER = "currentUser";

	public static final String SOCKET_SERVER = "socketServer";

	public static final String UPLOAD_SERVER = "uploadServer";

	public static final String SFDM_S = "1";

	public static final String SFDM_F = "0";

	public static final String SUCCESS = "success";

	public static final String ERROR = "error";

	/**
	 * 参数名
	 */
	public static final String PARAMETER_NAME = "jsonStr";

	/**
	 * token名
	 */
	public static final String TOKEN = "token";

	/**
	 * 系统参数
	 */
	public static Map<String, String> SYS_PARAM_MAP = new HashMap<String, String>();

	public static Map<String, String> TRANSLATION_MAP = new HashMap<>();

	/**
     * 消息级别
     * 类名称：MSG_TYPE
     * 类描述：
     * 创建人：wangping
     * 修改人：wangping
     * 修改时间： 2015年3月21日 下午3:28:05
     * 修改备注：
     */
    public enum MSG_TYPE {
        success, danger, warning, info;
    }

}
