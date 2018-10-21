package com.instantalert.user;

import java.lang.invoke.MethodHandles;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import static com.instantalert.util.Release.release;
import com.instantalert.util.ConnectionManager;

class UserDao {

	private Connection conn = null;
	final static Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

	/**
	 * The constructor makes a connection to database
	 * @throws SQLException
	 */
	protected UserDao() throws SQLException{
		if(conn == null){
			conn = ConnectionManager.getInstance().getConnection();
			if (conn == null){
				throw new SQLException("Could not make a connection to database");
			}
		}
	}

	protected boolean doesExist(String username){
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			String sql = "SELECT user_name FROM user_table WHERE user_name=?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString( 1, username);
			rs = pstmt.executeQuery();
			return rs.next();
		}catch (SQLException ex) {
			logger.error("doesExist() failed. " + ex.getMessage());
		}finally {
			release(pstmt, rs);
		}
		return false;
	}

	/**
	 * add group id and leader id to corresponding table in mysql
	 * @param groupId
	 */
	protected void addUser(String username, String firstName, String lastName, String salt, String hashedPassword){
		PreparedStatement pstmt = null;
		try {
			String sql = "INSERT INTO user_table VALUES (null,?,?,?,?,?)";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, username);
			pstmt.setString(2, firstName);
			pstmt.setString(3, lastName);
			pstmt.setString(4, salt);
			pstmt.setString(5, hashedPassword);
			pstmt.executeUpdate();
		}catch (SQLException ex) {
			logger.error("addUser() failed. " + ex.getMessage());
		}finally {
			release(pstmt);
		}
	}

	/**
	 * close connection to database
	 */
	protected void releaseConnection(){
		ConnectionManager.getInstance().releaseConnection(conn);
	}
}
