package com.easychat.site.listenner;

import java.io.File;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

import com.easychat.site.settings.RobotSetting;

public class ApplicationStartup implements ApplicationListener<ContextRefreshedEvent> {
	private static Logger logger = Logger.getLogger(ApplicationStartup.class);
	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		/*SourceRepository sourceRepository = event.getApplicationContext().getBean(SourceRepository.class);
		Source je =new Source("justice_eternal吧","http://tieba.baidu.com/f?kw=justice_eternal");
		sourceRepository.save(je);*/
		logger.info("应用启动监听器");
		RobotSetting robotSetting =  event.getApplicationContext().getBean(RobotSetting.class);
		createBotVoiceTempDirectory(robotSetting);
		
		
		
	}
	/**
	 * 创建机器人语音文件临时目录
	 */
	public void createBotVoiceTempDirectory(RobotSetting setting){
		String tmp = setting.getVoice().getTmp();
		File file = new File(tmp);
		if(!file.exists()){
			file.mkdirs();
		}
		logger.info("\t创建机器人语音临时目录："+tmp);
	}

	
}


