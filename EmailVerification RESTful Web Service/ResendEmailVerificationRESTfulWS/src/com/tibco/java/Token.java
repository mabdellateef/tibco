package com.tibco.java;

import java.util.UUID;

public class Token 
{
	public static String generate_token ()
	{
		String token = null;
		token = Long.toString(System.currentTimeMillis()) + UUID.randomUUID().toString().replaceAll("-","");
		
		return token;
	}

}
