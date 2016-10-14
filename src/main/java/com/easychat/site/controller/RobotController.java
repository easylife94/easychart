package com.easychat.site.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.easychat.site.service.RobotService;


@RestController
@EnableAutoConfiguration
public class RobotController {
	private static Logger logger = Logger.getLogger(RobotController.class);
	private static String VOICE_TEMP;
	private static String VOICE_DEFAULT;
	@Autowired private RobotService robotService;
	
	
	@RequestMapping("/bot/voice")
    public void voice(@RequestParam(value="id", required=false, defaultValue="default") String id,  HttpServletResponse response,Model model) {
        
		logger.info("voice id:"+id);
		try {
			byte[] data = robotService.voiceData(id);
			OutputStream stream = response.getOutputStream();
			if(data != null){
				stream.write(data);
				stream.flush();
				stream.close();
			}else{
				logger.info("声音数据为空");
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
    }


	public RobotService getRobotService() {
		return robotService;
	}


	public void setRobotService(RobotService robotService) {
		this.robotService = robotService;
	}
	
	
}
