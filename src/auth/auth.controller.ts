import { Context, Next } from "koa";
import Router from "koa-router";
import Logger from "../common/decorators/logger.decorator";
import { AuthService } from "./auth.service";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import { BadRequestError } from "../common/errors/http.error";
import { CreateUserDto } from "./dto/create_user.dto";
import { SingInDto } from "./dto/sing_in.dto";

class AuthController {
  @Logger(AuthController.name)
  async getHello(ctx: Context, next: Next) {
    throw new BadRequestError("test error");
  }

  async singUp(ctx: Context, next: Next) {
    const authService = AuthService.getInstance();
    const inputData = plainToInstance(CreateUserDto, ctx.request.body);
    await validateOrReject(inputData);
    const result = await authService.userSingUp(
      inputData.username,
      inputData.password,
      ctx.db,
    );
    ctx.body = result;
  }

  async singIn(ctx: Context, next: Next) {
    const inputData = plainToInstance(SingInDto, ctx.request.body);
    await validateOrReject(inputData);
    const authService = AuthService.getInstance();
    const jwt = await authService.userSingIn(
      inputData.username,
      inputData.password,
      ctx.db,
    );
    ctx.body = {
      jwt,
    };
  }
}

const authController = new AuthController();
export const authRouter = new Router();

authRouter.get("/auth", authController.getHello);
authRouter.post("/auth/sing-up", authController.singUp);
authRouter.post("/auth/sing-in", authController.singIn);
