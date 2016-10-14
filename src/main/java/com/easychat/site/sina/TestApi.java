package com.easychat.site.sina;

import java.util.ResourceBundle;

public class TestApi {
	
	private static ResourceBundle resourceBundle = ResourceBundle.getBundle("sina_api");
	private static String API_PROTOCOL ;
	private static String API_HOST ;
	private static String API_PORT;
	
	static{
		API_PROTOCOL = resourceBundle.getString("api.protoco");
		API_HOST = resourceBundle.getString("api.host");
		API_PORT = resourceBundle.getString("api.port"); 
	}
	
	
}
