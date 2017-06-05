package com.hisign.spy.web.bind.annotation;

import com.hisign.spy.constant.Constants;

import java.lang.annotation.*;

/**
 * 绑定当前登录的用户
 * @author wangping
 * @version 1.0
 * @since 2016/5/22 16:22
 */
@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface CurrentUser {
    /**
     * 当前用户在request中的名字
     * @return
     */
    String value() default Constants.CURRENT_USER;
}
