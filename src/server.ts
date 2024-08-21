import { app } from "./app";
import { config } from "./config/serverConfig";

async function startServer() {
  try {
    // DATABASE CONNECTION (Assuming it's an async operation)
    // await connectToDatabase(); // Replace with your actual DB connection logic

    const server = app.listen(config.PORT, () => {
      console.info("APPLICATION_STARTED", {
        meta: {
          PORT: config.PORT,
          SERVER_URL: config.SERVER_URL,
        },
      });
    });

    // Handle server errors
    server.on("error", (error: any) => {
      console.error("SERVER_ERROR", { meta: error });
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle unexpected errors in the process
    process.on("uncaughtException", (error) => {
      console.error("UNCAUGHT_EXCEPTION", { meta: error });
      server.close(() => {
        process.exit(1);
      });
    });

    process.on("unhandledRejection", (reason, promise) => {
      console.error("UNHANDLED_REJECTION", { meta: { reason, promise } });
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (error) {
    console.error("APPLICATION_ERROR", { meta: error });
    process.exit(1); // Exit if the server fails to start
  }
}

// Call the function to start the server
startServer();
