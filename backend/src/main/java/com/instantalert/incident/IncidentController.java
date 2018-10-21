package com.instantalert.incident;

import java.lang.invoke.MethodHandles;
import java.sql.SQLException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class IncidentController {

	final static Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

	public static int addIncident(int userId, float latitude, float longitude, int color, String msg){
		try{
			IncidentDao incidentDao = new IncidentDao();
			return incidentDao.addIncident(userId, latitude, longitude, color, msg);
		}catch(SQLException ex){
			logger.error("error when creating addIncident()." + ex.getMessage());
		}
		return -1;
	}

	public static List<Incident> getAllIncidents(){
		try{
			IncidentDao incidentDao = new IncidentDao();
			return incidentDao.getAllIncidents();
		}catch(SQLException ex){
			logger.error("error when creating getAllIncidents()." + ex.getMessage());
		}
		return null;
	}
}
