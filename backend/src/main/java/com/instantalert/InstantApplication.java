package com.instantalert;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.debug.DebugScreen.enableDebugScreen;

import com.instantalert.home.HomeHandler;
import com.instantalert.util.DatabaseConnection;
import com.instantalert.util.Path;

public class InstantApplication {

	public static void main(String[] args) {
		
		DatabaseConnection.initialize();
		
		//configure Spark
		port(4567);
		enableDebugScreen();
		get("/hello/", (req, res) -> "hello world" );
		post(Path.Web.MESSAGE, HomeHandler.handleMessagePost);
	}
}
