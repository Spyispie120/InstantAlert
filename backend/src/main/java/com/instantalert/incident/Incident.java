package com.instantalert.incident;

import lombok.*;

public class Incident {
	@Getter @Setter private int incident_id;
	@Getter @Setter private float lat;
	@Getter @Setter private float lon;
	@Getter @Setter private int color;
	@Getter @Setter private String msg;
	
	public Incident( int incidentId, float lat, float lon, int color, String msg) {
		this.incident_id = incidentId;
		this.lat = lat;
		this.lon = lon;
		this.color = color;
		this.msg = msg;
	}
}
