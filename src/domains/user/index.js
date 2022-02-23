import { create } from "./create";
import { login } from "./login";

export default (ctx) => ({
  create: create(ctx),
  login: login(ctx),
});
