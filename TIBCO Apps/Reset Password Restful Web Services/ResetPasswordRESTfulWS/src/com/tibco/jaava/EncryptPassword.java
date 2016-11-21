package com.tibco.jaava;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class EncryptPassword 
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
		        return "false";
		    }
	}

	
}
