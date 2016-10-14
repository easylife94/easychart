
package com.easychat.site.websocket;


/*

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.easychart.com.site.service.EchoService;
import com.easychart.com.site.service.impl.EchoServiceImpl;



@Configuration
public class WebSocketConfig implements WebSocketConfigurer{

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(echoWebSocketHandler(), "/ws/chart")
				.setAllowedOrigins("*")
				.withSockJS()
				.setHeartbeatTime(30000)
				.setSessionCookieNeeded(true)
				.setTaskScheduler(taskScheduler());
	}
	
	@Bean
	public WebSocketHandler echoWebSocketHandler() {
		return new EchoWebSocketHandler(echoService());
	}
	
	@Bean
	public EchoService echoService() {
		return new EchoServiceImpl("Did you say \"%s\"?");
	}
	
	@Bean
	public ConcurrentTaskScheduler taskScheduler() {
		ConcurrentTaskScheduler task = new ConcurrentTaskScheduler();
		task.scheduleAtFixedRate(new SockTaskRunner(), 1000*60*SocketSessionInfo.SESSION_INVALID);
		return task;
	}
}*/

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;
@Configuration  
public class WebSocketConfig {  
    @Bean  
    public ServerEndpointExporter serverEndpointExporter (){  
        return new ServerEndpointExporter();  
    }  
}  