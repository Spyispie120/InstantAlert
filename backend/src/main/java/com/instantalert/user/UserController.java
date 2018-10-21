package com.instantalert.user;

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
				
				//userDao.addUser(username, firstName, lastName, salt, hashedPassword);
			}
			
		}catch(SQLException ex){
			logger.error("error when creating GroupDao()." + ex.getMessage());
		}
	}
}
