package com.easychat.site.settings;

public class Voice {
	/**
	 * 临时目录
	 */
	private String tmp;
	/**
	 * 默认文件名
	 */
	private String del;
	/**
	 * 文件后缀
	 */
	private String suffix;
	public String getTmp() {
		return tmp;
	}
	public void setTmp(String tmp) {
		this.tmp = tmp;
	}
	public String getDel() {
		return del;
	}
	public void setDel(String del) {
		this.del = del;
	}
	public String getSuffix() {
		return suffix;
	}
	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}
	
	public String path(String fielName){
		StringBuilder path = new StringBuilder();
		return path.append(tmp)
				.append(fielName)
				.append(".").append(suffix)
				.toString();
	}
}
