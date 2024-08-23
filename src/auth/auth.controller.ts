import Router from "koa-router";

export const authController = new Router();

authController.get("/auth", (ctx, next) => {
  ctx.body = "Hello auth!";
});
