import { Context } from "koa";
import { UnauthorizedError } from "../errors/http.error";
import { AuthService } from "../../auth/auth.service";
import { UserRepository } from "../../user/user.reposytory";

export function AuthGuard(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const authService = AuthService.getInstance();
    const userRepository = UserRepository.getInstance();
    let ctx: Context;
    for (const arg of args) {
      if (arg && arg.request && arg.response) {
        ctx = arg as Context;
        break;
      }
    }
    if (ctx === undefined) {
      throw new UnauthorizedError("authorization is required");
    }
    const userId = authService.checkUserAuthByCtx(ctx);
    if (!userId) {
      throw new UnauthorizedError("authorization is required");
    }
    const user = await userRepository.findOnePk(userId, ctx.db);
    if (!user) {
      throw new UnauthorizedError("authorization is required");
    }
    ctx.state.user = user;
    const result = await originalMethod.apply(this, args);
    return result;
  };

  return descriptor;
}
