import * as Sentry from "@sentry/node";

export const createSentryTracker =
  ({ config, createLogger }) =>
  () => {
    const log = createLogger("sentryTracker");
    const {
      sentry: { dsn, environment },
    } = config;

    if (process.env.NODE_ENV === "production") {
      Sentry.init({
        dsn,
        environment,

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
      });
      log("Initiated");
    }
  };
