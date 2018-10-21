package com.instantalert.incident;

import static com.instantalert.util.Release.release;

import java.lang.invoke.MethodHandles;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.instantalert.util.ConnectionManager;

class IncidentDao {
	private Connection conn = null;
	final static Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

	/**
	 * The constructor makes a connection to database
	 * @throws SQLException
	 */
	protected IncidentDao() throws SQLException{
		if(conn == null){
			conn = ConnectionManager.getInstance().getConnection();
			if (conn == null){
				throw new SQLException("Could not make a connection to database");
			}
		}
	}
	
	//return all incidents
	protected List<Incident> getAllIncidents(){
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		List<Incident> incidents = new ArrayList<Incident>();
		try {
			String sql = "SELECT * FROM incident_table";
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			while (rs.next()) {
				int incidentId = rs.getInt("incident_id");
				float lat = rs.getInt("latitude");
				float lon = rs.getFloat("longitude");
				int color = rs.getInt("color");
				String msg = rs.getString("message");
				Incident incident = new Incident(incidentId, lat, lon, color, msg);
				incidents.add(incident);
			}
		}catch (SQLException ex) {
			logger.error("addIncident() failed. " + ex.getMessage());
		}finally {
			release(pstmt,rs);
		}
		return incidents;	
	}
	
	protected int addIncident(int userId, float latitude, float longitude, int color, String msg){
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			String sql = "INSERT INTO incident_table VALUES (null,?,?,?,null,null,?,?)";
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, userId);
			pstmt.setFloat(2, latitude);
			pstmt.setFloat(3, longitude);
			pstmt.setInt(4, color);
			pstmt.setString(5, msg);
			pstmt.executeUpdate();
			
			sql = "SELECT LAST_INSERT_ID()";
			release(pstmt);
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			
			return rs.next() ? rs.getInt(1) : -1;
		}catch (SQLException ex) {
			logger.error("addIncident() failed. " + ex.getMessage());
		}finally {
			release(pstmt,rs);
		}
		return -1;
	}

	/**
	 * close connection to database
	 */
	protected void releaseConnection(){
		ConnectionManager.getInstance().releaseConnection(conn);
	}
}
