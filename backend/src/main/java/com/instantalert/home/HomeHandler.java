package com.instantalert.home;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.instantalert.incident.IncidentController;

import spark.Request;
import spark.Response;
import spark.Route;

public class HomeHandler {

	public static Route handleMessagePost = (Request request, Response response) -> {
		Gson gson = new GsonBuilder().create();
		JsonObject json = gson.fromJson(request.body(), JsonObject.class);
		int userId = json.get("user_id").getAsInt();
		float lat = json.get("lat").getAsFloat();
		float lon = json.get("lon").getAsFloat();
		int color = json.get("color").getAsInt();
		String msg = json.get("msg").getAsString();
		System.out.println("msg received");
		return IncidentController.addIncident(userId, lat, lon, color, msg);
	};
}
