import { ValidationError } from "class-validator";
import { Context, Next } from "koa";

export async function exceptionFilter(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err) {
    console.error(err);
    if (Array.isArray(err) && err[0] instanceof ValidationError) {
      ctx.status = 400;
      ctx.body = {
        message: JSON.stringify(err[0].constraints || {}),
      };
      return;
    }
    ctx.status = err.status || 500;
    ctx.body = {
      message: err.message || "Internal Server Error",
      status: ctx.status,
    };
  }
}
