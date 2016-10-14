package com.easychat.site.settings;

import javax.validation.constraints.NotNull;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "bot",locations = "classpath:robot.properties")  
public class RobotSetting {
	
	@NotNull
	private  Voice voice;
	private Rest rest;
	
	public Voice getVoice() {
		return voice;
	}
	public void setVoice(Voice voice) {
		this.voice = voice;
	}
	public Rest getRest() {
		return rest;
	}
	public void setRest(Rest rest) {
		this.rest = rest;
	}
	
	
}
