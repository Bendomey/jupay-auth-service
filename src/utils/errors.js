import { is } from "@meltwater/phi";

export const createErrors = () => {
  class BaseError extends Error {
    constructor(message) {
      super();
      this.message = message;
    }

    getCode() {
      if (is(BadRequest, this)) return 400;
      if (is(NotFound, this)) return 404;
      if (is(UnauthorizedUser, this)) return 401;
      if (is(UserAlreadyExists, this)) return 409;
      return 500;
    }
  }

  class BadRequest extends BaseError {}
  class NotFound extends BaseError {}
  class UnauthorizedUser extends BaseError {}
  class UserAlreadyExists extends BaseError {}

  return {
    BaseError,
    BadRequest,
    NotFound,
    UnauthorizedUser,
    UserAlreadyExists,
  };
};
