import static spark.Spark.get;
import static spark.Spark.port;
import static spark.debug.DebugScreen.enableDebugScreen;

public class InstantApplication {

	public static void main(String[] args) {
		//configure Spark
		port(4567);
		enableDebugScreen();
		get("/hello/", (req, res) -> "hello world" );
	}

}
