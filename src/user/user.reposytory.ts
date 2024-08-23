import { Db } from "mongodb";
import Logger from "../common/decorators/logger.decorator";

export class UserRepository {
  static Logger = Logger(UserRepository.name);
  static collectionName = "users";
  static instance: UserRepository;

  @UserRepository.Logger
  async createUser(username: string, password: string, db: Db) {
    const newUser = { username, password };
    const result = await db
      .collection(UserRepository.collectionName)
      .insertOne(newUser);
    return result;
  }
  
  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }
}
