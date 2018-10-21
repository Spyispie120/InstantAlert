package com.instantalert.user;

import org.mindrot.jbcrypt.*;
import java.lang.invoke.MethodHandles;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserController {

	final static Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

	public static void addUser(String username, String firstName, String lastName, String password) {
		//TODO: login feature needs deployed later
		try{
			UserDao userDao = new UserDao();
			if(!userDao.doesExist(username)){
				Password passwd = new Password(password);
				userDao.addUser(username, firstName, lastName, passwd.getSalt(), passwd.getHashedPassword());
			}
			
		}catch(SQLException ex){
			logger.error("error when creating addUser()." + ex.getMessage());
		}
	}
}
