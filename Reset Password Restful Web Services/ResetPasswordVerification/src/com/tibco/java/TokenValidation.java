package com.tibco.java;


import java.util.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;


public class TokenValidation 
{
	public static Boolean validateToken (String tokenDate)
	{
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
		Date date=null;
		try 
		{
			date = format.parse(tokenDate);
		} 
		catch (ParseException e) {
			return false;
		}
		
		Date temp = new Date();
		return date.after(new Date(temp.getTime() - 24 * 3600*1000));
		
	}

}
