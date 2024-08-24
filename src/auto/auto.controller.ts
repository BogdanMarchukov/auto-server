import { Context, Next } from "koa";
import Router from "koa-router";
import AsyncLogger from "../common/decorators/logger.decorator";
import { AsyncAuthGuard } from "../common/guards/async_auth.guard";

class AutoController {
  @AsyncLogger(AutoController.name)
  @AsyncAuthGuard
  async createOne(ctx: Context, next: Next) {
    ctx.status = 200;
    ctx.body = "hello";
  }

  async getAuto(ctx: Context, next: Next) {
    ctx.status = 200;
    ctx.body = "hello";
  }

  async updateOne(ctx: Context, next: Next) {
    ctx.status = 200;
    ctx.body = "hello";
  }
  async deleteOne(ctx: Context, next: Next) {
    ctx.status = 200;
    ctx.body = "hello";
  }
}

const autoController = new AutoController();
export const autoRouter = new Router();

autoRouter.post("auto/create", autoController.createOne);
autoRouter.get("auto/get", autoController.getAuto);
autoRouter.delete("auto/delete", autoController.deleteOne);
autoRouter.put("auto/update", autoController.updateOne);
