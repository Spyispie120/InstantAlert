package com.instantalert.incident;

import static com.instantalert.util.Release.release;

import java.lang.invoke.MethodHandles;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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
