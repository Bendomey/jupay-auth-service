import mongoose from "mongoose";
import { user } from "./models/user";

export const compileModel = ({ name, schema }) => {
  const compiledSchema = mongoose.Schema(schema, { timestamps: true });
  return mongoose.model(name, compiledSchema);
};

export const compileDiscriminatorModel = ({ name, schema, model }) => {
  const compiledSchema = mongoose.Schema(schema);
  return model.discriminator(name, compiledSchema);
};

export const createMongoConnection =
  ({ config, createLogger }) =>
  async () => {
    const log = createLogger("databaseConnection");
    const {
      database: {
        mongodb: { uri, ...options },
      },
    } = config;
    await mongoose.connect(uri, options);
    log("Connection to mongodb has been made at", uri);
  };

export const createModels = () => {
  return {
    User: compileModel({ name: "user", schema: user }),
  };
};
