package com.instantalert.incident;

import java.lang.invoke.MethodHandles;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class IncidentController {

	final static Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

	public static int addIncident(int userId, float latitude, float longitude, int color, String msg){
		try{
			IncidentDao incidentDao = new IncidentDao();
			return incidentDao.addIncident(userId, latitude, longitude, color, msg);
		}catch(SQLException ex){
			logger.error("error when creating GroupDao()." + ex.getMessage());
		}
		return -1;
	}
}
