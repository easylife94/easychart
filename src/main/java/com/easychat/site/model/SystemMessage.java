package com.easychat.site.model;

import java.util.Map;

public class SystemMessage {
	
	public static final int TYPE_USER_JOIN = 1;
	
	private Map content;
	private int type;
	
	
	public Map getContent() {
		return content;
	}
	public void setContent(Map content) {
		this.content = content;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	
	
}
