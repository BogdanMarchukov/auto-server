import AsyncLogger from "../common/decorators/logger.decorator";
import { validateOrReject } from "class-validator";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { CarDocument } from "./car.document";
import { Db, ObjectId } from "mongodb";
import { findManyFilter } from "./types/type";

export class CarRepository {
  static collectionName = "cars";
  static instance: CarRepository;
  private static Logger = AsyncLogger(CarRepository.name);

  async createOneCar(data: CarDocument, db: Db) {
    const newCar = instanceToPlain(data);
    delete newCar._id;
    const result = await db
      .collection(CarRepository.collectionName)
      .insertOne(newCar);
    const car = await this.findOnePk(result.insertedId, db);
    const carDocument = await this.validateResult(car);
    return carDocument;
  }

  @CarRepository.Logger
  async findOnePk(id: ObjectId | string, db: Db): Promise<CarDocument | null> {
    if (typeof id === "string") {
      id = new ObjectId(id);
    }
    const result = await db
      .collection(CarRepository.collectionName)
      .findOne({ _id: id });
    if (!result) {
      return null;
    }
    return await this.validateResult(result);
  }

  async fineMany(filter: findManyFilter, db: Db) {
    filter = Object.fromEntries(
      Object.entries(filter).filter(([_, v]) => v !== undefined),
    ) as findManyFilter;
    const result = await db
      .collection(CarRepository.collectionName)
      .find(filter)
      .toArray();
    return Promise.all(result.map((r) => this.validateResult(r)));
  }

  @CarRepository.Logger
  private async validateResult(result: any): Promise<CarDocument> {
    const carDocument = plainToInstance(CarDocument, result);
    await validateOrReject(carDocument, {
      forbidNonWhitelisted: true,
      whitelist: true,
    });
    return carDocument;
  }

  public static getInstance(): CarRepository {
    if (!CarRepository.instance) {
      CarRepository.instance = new CarRepository();
    }
    return CarRepository.instance;
  }
}
