package com.easychat.site;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.easychat.site.listenner.ApplicationStartup;
import com.easychat.site.settings.RobotSetting;

@SpringBootApplication
@EnableAutoConfiguration
@EnableConfigurationProperties({RobotSetting.class})
public class App {
    public static void main(String[] args) throws Exception {
    	SpringApplication springApplication =new SpringApplication(App.class);
    	//增加 spring boot 启动监听器
    	springApplication.addListeners(new ApplicationStartup());
    	springApplication.run(args);
    }
}