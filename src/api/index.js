import express from "express";
import { defaultTo, pick, prop } from "@meltwater/phi";

const api = express.Router();

export const successCodes = {
  get: 200,
  post: 201,
};

export const getSuccessCode = (method) =>
  defaultTo(200, prop(method, successCodes));

export const createHandleRequestResponse =
  (handler) =>
  ({ path, method, middlewares = [] }) => {
    api[method](path, ...middlewares, async (req, res, next) => {
      try {
        const { query, params, body, user } = pick(
          ["query", "params", "body", "user"],
          req
        );
        const output = await handler({
          ...query,
          ...params,
          ...body,
          user,
        });
        const successCode = getSuccessCode(method);
        return res.status(successCode).json({ success: true, payload: output });
      } catch (e) {
        next(e);
      }
    });
  };

export default ({ userService }) => {
  const endpointInformation = [
    {
      handler: userService.create,
      path: "/api/v1/user",
      method: "post",
    },
    {
      handler: userService.login,
      path: "/api/v1/user/login",
      method: "post",
    },
  ];

  endpointInformation.map(({ handler, ...ctx }) =>
    createHandleRequestResponse(handler)(ctx)
  );

  return { api, endpointInformation };
};
