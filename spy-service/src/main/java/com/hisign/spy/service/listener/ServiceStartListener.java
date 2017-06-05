package com.hisign.spy.service.listener;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Service;

/**
 * 项目启动初始化类
 * @author yinxiaoyong
 * @mailto yinxiaoyong@hisign.com.cn
 * 2016年11月26日
 */
@Service
public class ServiceStartListener implements ApplicationListener<ContextRefreshedEvent>{

	
	@Override
	public void onApplicationEvent(ContextRefreshedEvent event){

	}

}
