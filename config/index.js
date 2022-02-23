import dotenv from "dotenv";
import { defaultTo } from "@meltwater/phi";
import { name as applicationName } from "../package.json";

dotenv.config({});

export default {
  env: defaultTo("development", process.env.NODE_ENV),
  applicationName,
  port: process.env.PORT,
  database: {
    mongodb: {
      uri: defaultTo(
        "localhost:27017/auth-service",
        process.env.MONGODB_DATABASE_URI
      ),
      useUnifiedTopology: defaultTo(
        true,
        process.env.MONGODB_USE_UNIFIED_TOPOLOGY
      ),
      useNewUrlParser: defaultTo(true, process.env.MONGODB_USE_NEW_URL_PARSER),
    },
  },
  authentication: {
    jwt: {
      secretKey: defaultTo(
        "90jw98hnw9uehnfiuhgwu9hg9u",
        process.env.JWT_SECRET_KEY
      ),
      expirationTime: defaultTo("2 days", process.env.JWT_EXPIRATION_TIME),
    },
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    environment: defaultTo("auth-service", process.env.SENTRY_ENVIRONMENT),
  },
};
