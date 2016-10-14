package com.easychat.site.settings;

import org.hibernate.validator.constraints.NotBlank;

public class Rest {
	
	@NotBlank
	/**
	 * 请求协议
	 */
	private String protocol;
	/**
	 * 主机地址
	 */
	private String host;
	/**
	 * 端口
	 */
	private String port;
	/**
	 * 请求名称
	 */
	private String url;
	/**
	 * 请求参数
	 */
	private String params;
	
	public String getProtocol() {
		return protocol;
	}
	public void setProtocol(String protocol) {
		this.protocol = protocol;
	}
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public String getPort() {
		return port;
	}
	public void setPort(String port) {
		this.port = port;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getParams() {
		return params;
	}
	public void setParams(String params) {
		this.params = params;
	}
	
}
