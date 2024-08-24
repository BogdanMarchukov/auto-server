import { Context, Next } from "koa";
import Router from "koa-router";
import AsyncLogger from "../common/decorators/logger.decorator";
import { AsyncAuthGuard } from "../common/guards/async_auth.guard";
import { plainToInstance } from "class-transformer";
import { CreateCarDto } from "./dto/create_car.dto";
import { validateOrReject } from "class-validator";
import { CarService } from "./car.service";
import { UserDocument } from "../user/user.document";

class CarController {
  @AsyncLogger(CarController.name)
  @AsyncAuthGuard
  async createOne(ctx: Context, next: Next, user?: UserDocument) {
    const inputData = plainToInstance(CreateCarDto, ctx.request.body);
    await validateOrReject(inputData);
    const carService = CarService.getInstance();
    const result = await carService.createOneCar(inputData, ctx.db, user!);
    ctx.status = 201;
    ctx.body = result;
  }

  async getCar(ctx: Context, next: Next) {
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

const carController = new CarController();
export const carRouter = new Router();

carRouter.post("/car/create", carController.createOne);
carRouter.get("/car/get", carController.getCar);
carRouter.delete("/car/delete", carController.deleteOne);
carRouter.put("/car/update", carController.updateOne);
