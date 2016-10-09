package com.tibco.java;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


public class Check 
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
		    	return "error";
		    }
	}
	

	public static int pwCheck (String dbPW, String postPW, String verChk, String userID)
	{
		if (dbPW.equals("")) return -1;
		
		postPW=pw(postPW);
		
		if (!dbPW.equals(postPW))
		{
			return -2;
		}
		
		else if (verChk.equals("true"))
		{
			return Integer.valueOf(userID);
		}

		else
		{
			return -3;
		}

		
	}



}
