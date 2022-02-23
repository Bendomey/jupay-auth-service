import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export const createHashPassword = () => async (password) =>
  bcrypt.hash(password, 8);

export const createComparePassword =
  () =>
  async ({ password, hashedPassword }) =>
    bcrypt.compare(password, hashedPassword);

export const createSignPayload =
  ({ config }) =>
  async (payload) => {
    const {
      authentication: {
        jwt: { secretKey, expirationTime },
      },
    } = config;
    return jwt.sign(payload, secretKey, { expiresIn: expirationTime });
  };

export const createVerifyPayload =
  ({ config }) =>
  async (token) => {
    const {
      authentication: {
        jwt: { secretKey },
      },
    } = config;
    return jwt.verify(token, secretKey);
  };
