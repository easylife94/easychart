package com.easychat.site.service;

public interface RobotService {
	/**
	 * 获取声音文件二进制数据
	 * @param id 文件唯一标识
	 * @return
	 */
	public byte[] voiceData(String id);
}
