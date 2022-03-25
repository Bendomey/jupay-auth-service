import { create } from "./create";
import { login } from "./login";
import { update } from "./update";

export default (ctx) => ({
  create: create(ctx),
  login: login(ctx),
  update: update(ctx),
});
