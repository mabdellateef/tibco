package Methods;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

import java.util.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class Methods 
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
	
	public static Boolean validateToken (String tokenDate)
	{
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd' 'HH:mm:ss");
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
	public static Object pwCheck (String postPW,String dbPW, Integer status, String auth)
	{
		
		//#[payload[0]["password"]],#[payload[0]["status"]],#[payload[0]["auth_token"]]
		postPW=pw(postPW);
		if (!dbPW.equals(postPW))
		{
			return "-2";
		}
		else if (status == 1)
		{
			return auth;
		}

		else
		{
			return "-3";
		}
		
	}

}