import { Context, Next } from "koa";

export async function exceptionFilter(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      message: err.message || "Internal Server Error",
      status: ctx.status,
    };
  }
}
