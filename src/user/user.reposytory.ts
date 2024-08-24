import { Db, ObjectId, WithId } from "mongodb";
import AsyncLogger from "../common/decorators/logger.decorator";
import { UserDocument } from "./user.document";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";

export class UserRepository {
  static Logger = AsyncLogger(UserRepository.name);
  static collectionName = "users";
  static instance: UserRepository;

  @UserRepository.Logger
  async createUser(
    username: string,
    password: string,
    db: Db,
  ): Promise<WithId<UserDocument>> {
    const newUser = { username, password };
    const result = await db
      .collection(UserRepository.collectionName)
      .insertOne(newUser);
    const user = await db
      .collection(UserRepository.collectionName)
      .findOne({ _id: result.insertedId });
    const userDocument = await this.validateResult(user);
    return userDocument;
  }

  @UserRepository.Logger
  async findOne(
    filter: { username: string },
    db: Db,
  ): Promise<UserDocument | null> {
    const user = await db
      .collection(UserRepository.collectionName)
      .findOne(filter);
    if (!user) {
      return null;
    }
    return await this.validateResult(user);
  }

  @UserRepository.Logger
  async findOnePk(id: ObjectId | string, db: Db): Promise<UserDocument | null> {
    if (typeof id === "string") {
      id = new ObjectId(id);
    }
    const result = await db
      .collection(UserRepository.collectionName)
      .findOne({ _id: id });
    if (!result) {
      return null;
    }
    return await this.validateResult(result);
  }

  private async validateResult(result: any): Promise<UserDocument> {
    const userDocument = plainToInstance(UserDocument, result);
    await validateOrReject(userDocument, {
      forbidNonWhitelisted: true,
      whitelist: true,
    });
    return userDocument;
  }

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }
}
