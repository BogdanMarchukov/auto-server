import { Db } from "mongodb";
import { AuthService } from "../auth.service";
import { connectMongo } from "../../common/database/mongo.connect";
import { UserRepository } from "../../user/user.reposytory";
import { UnauthorizedError } from "../../common/errors/http.error";

describe("AuthService", () => {
  let db: Db;

  beforeAll(async () => {
    db = await connectMongo(27018);
  });

  afterEach(async () => {
    const collection = await db
      .listCollections({ name: UserRepository.collectionName })
      .toArray();
    if (collection.length > 0) {
      await db.collection(UserRepository.collectionName).drop();
    }
  });

  it("registration and successful login", async () => {
    const authService = AuthService.getInstance();
    const login = "testLogin";
    const password = "testPassword";
    const result = await authService.userSingUp(login, password, db);
    const singInResult = await authService.userSingIn(login, password, db);
    expect(result.username).toBe(login);
    expect(typeof singInResult === "string").toBe(true);
  });

  it("error when logging in with incorrect password", async () => {
    expect.assertions(1);
    const authService = AuthService.getInstance();
    const login = "testLogin";
    const password = "testPassword";
    const invalidPassword = "invalidPassword";
    await authService.userSingUp(login, password, db);
    try {
      await authService.userSingIn(login, invalidPassword, db);
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedError);
    }
  });
});
