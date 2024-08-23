import Router from "koa-router";
import Logger from "../common/decorators/logger.decorator";
import UserEntity from "../common/decorators/userEntity.decorator";

export const userRouter = new Router();

userRouter.get("/user", (ctx, _) => {
  const test = new UserController();
  ctx.body = "Hello user!";
  test.testDecorator(ctx);
});

export class UserController {
  public bar = "bas";

  @Logger(UserController.name)
  testDecorator(ctx: any, @UserEntity user?: any) {
    console.log("test decorator");
  }
}
