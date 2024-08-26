import { Db } from "mongodb";
import { CarService } from "../car.service";
import { connectMongo } from "../../common/database/mongo.connect";
import { CarRepository } from "../car.reposytory";
import { CreateCarDto } from "../dto/create_car.dto";
import { plainToInstance } from "class-transformer";
import { ValidationError } from "class-validator";

describe("Testing GRUD for cars", () => {
  let db: Db;

  beforeAll(async () => {
    db = await connectMongo(27018);
  });

  afterEach(async () => {
    const collection = await db
      .listCollections({ name: CarRepository.collectionName })
      .toArray();
    if (collection.length > 0) {
      await db.collection(CarRepository.collectionName).drop();
    }
  });

  it("create new car", async () => {
    const carService = CarService.getInstance();
    const authorId = "1234567890";
    const inputData = {
      brand: "BMW",
      model: "3",
      productionYear: 2000,
      price: 1000000,
    };
    const inputDtoData = plainToInstance(CreateCarDto, inputData);
    const result = await carService.createOneCar(inputDtoData, db, {
      _id: authorId,
    } as any);
    delete result._id;
    expect(result).toEqual({ ...inputData, authorId });
  });

  it("when trying to create an object with invalid properties, it will throw an error", async () => {
    expect.assertions(3);
    const carService = CarService.getInstance();
    const authorId = "1234567890";
    const inputData = {
      brand: "BMW",
      model: "5",
      productionYear: 2000,
      price: 1000000,
    };
    const inputDtoData = plainToInstance(CreateCarDto, inputData);
    try {
      await carService.createOneCar(
        { ...inputDtoData, invalidProp: "test" } as any,
        db,
        {
          _id: authorId,
        } as any,
      );
    } catch (error) {
      const isNotCar = await db
        .collection(CarRepository.collectionName)
        .findOne(inputData);
      expect(isNotCar).toBeNull();
      expect(Array.isArray(error)).toBe(true);
      expect(error[0]).toBeInstanceOf(ValidationError);
    }
  });

  it("delete by pk", async () => {
    const carService = CarService.getInstance();
    const inputData = {
      brand: "BMW",
      model: "2",
      productionYear: 2010,
      price: 1000000,
      authorId: "123445555",
    };

    const car = await db
      .collection(CarRepository.collectionName)
      .insertOne(inputData);

    const result = await carService.deleteOnePk(car.insertedId.toString(), db);
    const isNotCar = await db
      .collection(CarRepository.collectionName)
      .findOne(inputData);
    expect(result.deletedCount).toBe(1);
    expect(isNotCar).toBeNull();
  });

  it("find one success result", async () => {
    const carService = CarService.getInstance();
    const inputData = [
      {
        brand: "BMW",
        model: "2",
        productionYear: 2010,
        price: 1000000,
        authorId: "1333323445555",
      },
      {
        brand: "BMW",
        model: "3",
        productionYear: 2010,
        price: 1000000,
        authorId: "123643445555",
      },
      {
        brand: "AUDI",
        model: "rs",
        productionYear: 2010,
        price: 1000000,
        authorId: "1445555",
      },
    ];

    await db.collection(CarRepository.collectionName).insertMany(inputData);
    const result = await carService.getCarsByQuery({ brand: "BMW" }, db);
    expect(result).toContainEqual(inputData[0]);
    expect(result).toContainEqual(inputData[1]);
    expect(result.length).toBe(2)
  });
});
