package com.tibco.REST;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

public class Signup 
{
	
	public static String pw (String pw)
	{
		  MessageDigest md;		   
		    try {
		        md = MessageDigest.getInstance("MD5");
		        byte[] passBytes = pw.getBytes();
		        md.reset();
		        byte[] digested = md.digest(passBytes);
		        StringBuffer sb = new StringBuffer();
		        for(int i=0;i<digested.length;i++)
		        {
		            sb.append(Integer.toHexString(0xff & digested[i]));
		        }
		        return sb.toString();
		    } 
		    catch (NoSuchAlgorithmException ex) 
		    {
		        return "Password error";
		    }
	}
	
	public static String token ()

	{
		String token = null;
		token = Long.toString(System.currentTimeMillis()) + UUID.randomUUID().toString().replaceAll("-","");
		
		return token;
	}
	
	public static boolean response (int dbUpdate)
	{
		
		if(dbUpdate==1)
		{
			return true;
		}
		
		return false;
	}
}
