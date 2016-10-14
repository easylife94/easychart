package com.easychat.site.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easychat.site.service.RobotService;
import com.easychat.site.settings.RobotSetting;
@Service
public class RobotServiceImpl implements RobotService{
	private static Logger logger = Logger.getLogger(RobotServiceImpl.class);
	@Autowired private RobotSetting robotSetting;

	@Override
	public byte[] voiceData(String id) {
		byte[] data = null;
		String path = robotSetting.getVoice().path(id);
		logger.info("声音文件："+path);
	
		File file = new File(path.toString());
		FileInputStream inputStream;
		try {
			inputStream = new FileInputStream(file);
			data = new byte[(int)file.length()];
			inputStream.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return data;
	}

	public RobotSetting getRobotSetting() {
		return robotSetting;
	}

	public void setRobotSetting(RobotSetting robotSetting) {
		this.robotSetting = robotSetting;
	}
	
	
	
	
}
