package com.easychart.com.site.bot;

import java.net.URLEncoder;
import java.util.ResourceBundle;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

public  class Robot {
	
	
	private static ResourceBundle resourceBundle = ResourceBundle.getBundle("robot");
	private static String REST_PROTOCOL ;
	private static String REST_HOST ;
	private static int REST_PORT;
	private static String REST_URL ;
	
	static{
        REST_PROTOCOL = resourceBundle.getString("rest.bot.protocol");
        REST_HOST = resourceBundle.getString("rest.bot.host");
        REST_PORT = Integer.valueOf(resourceBundle.getString("rest.bot.port"));
        REST_URL = resourceBundle.getString("rest.bot.url");
          
	}
	public static String response(String message){
		String response = "...";
		DefaultHttpClient httpclient = new DefaultHttpClient();
	    try {
	      HttpHost target = new HttpHost(REST_HOST, REST_PORT, REST_PROTOCOL);
	      message = URLEncoder.encode(message, "UTF-8");
	      HttpGet get = new HttpGet(REST_URL+"?req="+message);
	     
	      HttpResponse httpResponse = httpclient.execute(target, get);
	      HttpEntity entity = httpResponse.getEntity();
	      if (entity != null) {
	    	  response = EntityUtils.toString(entity);
	      }

	    } catch (Exception e) {
	      e.printStackTrace();
	    } finally {
	      httpclient.getConnectionManager().shutdown();
	    }
		return response;
	}
}
