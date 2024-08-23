import { Context, Next } from "koa";
import Router from "koa-router";
import Logger from "../common/decorators/logger.decorator";

class AuthController {
  @Logger(AuthController.name)
  async getHello(ctx: Context, next: Next) {
    ctx.body = "Hollo auth1113331";
  }

  async singUp(ctx: Context, next: Next) {}
}

export const authRouter = new Router();
const authController = new AuthController();

authRouter.get("/auth", authController.getHello);
