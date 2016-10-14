package com.easychat.site.service.impl;

import com.easychat.site.service.EchoService;

public class EchoServiceImpl implements EchoService {
	private final String echoFormat;

	public EchoServiceImpl(String echoFormat) {
		this.echoFormat = (echoFormat != null) ? echoFormat : "%s";
	}

	@Override
	public String getMessage(String message) {
		return String.format(this.echoFormat, message);
	}
}