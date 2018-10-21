package com.instantalert;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.debug.DebugScreen.enableDebugScreen;

import com.instantalert.home.HomeHandler;
import com.instantalert.util.DatabaseConnection;
import com.instantalert.util.Path;
import static spark.Spark.options;
import static spark.Spark.before;
public class InstantApplication {

	public static void main(String[] args) {
		
		DatabaseConnection.initialize();
		
		//configure Spark
		port(4567);
		enableDebugScreen();
		options("/*",
		        (request, response) -> {

		            String accessControlRequestHeaders = request
		                    .headers("Access-Control-Request-Headers");
		            if (accessControlRequestHeaders != null) {
		                response.header("Access-Control-Allow-Headers",
		                        accessControlRequestHeaders);
		            }

		            String accessControlRequestMethod = request
		                    .headers("Access-Control-Request-Method");
		            if (accessControlRequestMethod != null) {
		                response.header("Access-Control-Allow-Methods",
		                        accessControlRequestMethod);
		            }

		            return "OK";
		        });

		before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
		
		get("/hello/", (req, res) -> "hello world" );
		post(Path.Web.MESSAGE,"application/json",  HomeHandler.handleMessagePost);
		get(Path.Web.MESSAGE,(req, res) ->"hi message");
		get("*", (req, res) -> "Page Not Found");
	}
}
