package com.instantalert.home;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.instantalert.incident.Incident;
import com.instantalert.incident.IncidentController;
import com.instantalert.util.JsonUtil;

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
		int incidentId = IncidentController.addIncident(userId, lat, lon, color, msg);
		Map<String, Integer> object = new HashMap<String,Integer>();
		object.put("incident_id", incidentId);
		return JsonUtil.dataToJson(object);
	};
	
	public static Route handleAllIncidentsGet = (Request request, Response response) -> {
		List<Incident> incidents = IncidentController.getAllIncidents();
		return JsonUtil.dataToJson(incidents);
	};
}
