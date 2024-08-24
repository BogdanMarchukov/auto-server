import { Db } from "mongodb";
import AsyncLogger from "../common/decorators/logger.decorator";
import { CarRepository } from "./car.reposytory";
import { CreateCarDto } from "./dto/create_car.dto";
import { Context } from "koa";
import { UserDocument } from "../user/user.document";
import { plainToInstance } from "class-transformer";
import { CarDocument } from "./car.document";

export class CarService {
  static instance: CarService;
  private static Logger = AsyncLogger(CarService.name);
  private carRepository = CarRepository.getInstance();

  @CarService.Logger
  async createOneCar(inputData: CreateCarDto, ctx: Context) {
    const user = ctx.state.user as UserDocument;
    const db = ctx.db;
    const data = plainToInstance(CarDocument, {
      ...inputData,
      authorId: user._id,
    });
    return await this.carRepository.createOneCar(data, db);
  }

  public static getInstance(): CarService {
    if (!CarService.instance) {
      CarService.instance = new CarService();
    }
    return CarService.instance;
  }
}
