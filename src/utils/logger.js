import debug from "debug";

export const createLogger =
  ({ config }) =>
  (logName) => {
    const { applicationName } = config;
    return debug(`${applicationName}:${logName}`);
  };
