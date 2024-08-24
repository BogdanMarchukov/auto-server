import { Context, Next } from "koa";
import Router from "koa-router";
import Logger from "../common/decorators/logger.decorator";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import { BadRequestError } from "../common/errors/http.error";

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
}

const authController = new AuthController();
export const authRouter = new Router();

authRouter.get("/auth", authController.getHello);
authRouter.post("/auth/sing-up", authController.singUp);
