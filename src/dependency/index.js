import { asValue, asFunction, createContainer } from "awilix";

// Env vars
import config from "../../config";

// Adapters
import { createLogger } from "../utils/logger";
import { createSentryTracker } from "../utils/sentry";
import { createValidate } from "../utils/validate";

import {
  createGenerateRandomString,
  createGenerateVerificationCode,
} from "../utils/string-manager";

import { createErrors } from "../utils/errors";

// Storage
import { createMongoConnection, createModels } from "../storage/mongodb";

// Mongodb helper functions
import {
  createFindOneCollection,
  createNewCollection,
  createFindByIdCollection,
  createGetDocumentsFromCollection,
  createCountDocumentsFromCollection,
} from "../utils/mongodb";

// Services
import createUserService from "../domains/user";

// Routes
import createApi from "../api";

import createErrorHandlerMiddleware from "../middlewares/error-handler";

const container = createContainer();
container.register("config", asValue(config));
container.register("createLogger", asFunction(createLogger).scoped());
container.register(
  "createSentryTracker",
  asFunction(createSentryTracker).scoped()
);

container.register(
  "createGenerateRandomString",
  asFunction(createGenerateRandomString).scoped()
);
container.register(
  "createGenerateVerificationCode",
  asFunction(createGenerateVerificationCode).scoped()
);

container.register("createValidate", asFunction(createValidate).scoped());
container.register("errors", asFunction(createErrors).scoped());

container.register(
  "createMongoConnection",
  asFunction(createMongoConnection).scoped()
);

container.register("models", asFunction(createModels).scoped());

container.register(
  "findOneCollection",
  asFunction(createFindOneCollection).scoped()
);

container.register(
  "findByIdCollection",
  asFunction(createFindByIdCollection).scoped()
);
container.register(
  "getDocumentsFromCollection",
  asFunction(createGetDocumentsFromCollection).scoped()
);
container.register(
  "countDocumentsFromCollection",
  asFunction(createCountDocumentsFromCollection).scoped()
);

container.register("newCollection", asFunction(createNewCollection).scoped());

container.register("userService", asFunction(createUserService).scoped());

container.register(
  "errorHandlerMiddleware",
  asFunction(createErrorHandlerMiddleware).scoped()
);

container.register("api", asFunction(createApi).scoped());

export default () => container;
