import { Context, Next } from "koa";
import Router from "koa-router";
import Logger from "../common/decorators/logger.decorator";
import { AuthService } from "./auth.service";

class AuthController {
  @Logger(AuthController.name)
  async getHello(ctx: Context, next: Next) {
    const authService = AuthService.getInstance();
    const result = await authService.userSingUp("login", "password", ctx.db);
    ctx.body = result;
  }

  async singUp(ctx: Context, next: Next) {}
}

const authController = new AuthController();
export const authRouter = new Router();

authRouter.get("/auth", authController.getHello);
