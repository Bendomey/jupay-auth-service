import createDepContainer from "./dependency";
import server from "./server";

// Introduce dependency injection
const container = createDepContainer();
const config = container.resolve("config");
const createLogger = container.resolve("createLogger");
const createSentryTracker = container.resolve("createSentryTracker");
const createMongoConnection = container.resolve("createMongoConnection");
const endpoints = container.resolve("api");

export const startServer = async (config) => {
  const log = createLogger("main");
  const { port } = config;

  // starting sentry tracking
  createSentryTracker();

  // Starting DB
  await createMongoConnection();

  // Start server
  await server.listen(port, () => {
    log("Started Successfully");
    // Printing server information. This is just debug for demo
    for (let i = 0; i < endpoints.endpointInformation.length; i++) {
      const endpoint = endpoints.endpointInformation[i];
      log(
        `Path - http://localhost:${port}`,
        endpoint.path,
        "Method -",
        endpoint.method
      );
    }
  });
};

startServer(config).catch(console.error);
