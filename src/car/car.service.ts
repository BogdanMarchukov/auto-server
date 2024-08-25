import { Db } from "mongodb";
import AsyncLogger from "../common/decorators/logger.decorator";
import { CarRepository } from "./car.reposytory";
import { CreateCarDto } from "./dto/create_car.dto";
import { UserDocument } from "../user/user.document";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { CarDocument } from "./car.document";
import { GetCarsDto } from "./dto/get_cars.dto";
import { FindManyFilter } from "./types/type";
import { UpdateCarDto } from "./dto/update_car.dto";
import { NotFoundError } from "../common/errors/http.error";

export class CarService {
  static instance: CarService;
  private static Logger = AsyncLogger(CarService.name);
  private carRepository = CarRepository.getInstance();

  @CarService.Logger
  async createOneCar(inputData: CreateCarDto, db: Db, user: UserDocument) {
    const data = plainToInstance(CarDocument, {
      ...inputData,
      authorId: user._id.toString(),
    });
    return await this.carRepository.createOneCar(data, db);
  }

  async updateByPk(carId: string, inputData: UpdateCarDto, db: Db) {
    const car = await this.carRepository.findOnePk(carId, db);
    if (!car) {
      throw new NotFoundError(`car not found, carId: ${carId}`);
    }
    delete inputData.carId;
    return await this.carRepository.updateByPk(
      carId,
      instanceToPlain(inputData),
      db,
    );
  }

  @CarService.Logger
  async getCarsByQuery(input: GetCarsDto, db: Db) {
    const filter = instanceToPlain(input) as FindManyFilter;
    const result = await this.carRepository.fineMany(filter, db);
    return result;
  }

  public static getInstance(): CarService {
    if (!CarService.instance) {
      CarService.instance = new CarService();
    }
    return CarService.instance;
  }
}
