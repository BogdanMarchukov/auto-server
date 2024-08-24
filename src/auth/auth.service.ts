import { pbkdf2 } from "crypto";
import { ConfigKeys, RootConfig } from "../common/config/types";
import Logger from "../common/decorators/logger.decorator";
import { ConfigService } from "../common/config/config.service";
import { UserRepository } from "../user/user.reposytory";
import { Db } from "mongodb";
import {
  BadRequestError,
  UnauthorizedError,
} from "../common/errors/http.error";
import { UserDocument } from "../user/user.document";
import { sign } from "jsonwebtoken";

export class AuthService {
  static AuthLogger = Logger(AuthService.name);
  private static instance: AuthService;
  private configService = ConfigService.getInstance();
  private userRepository = UserRepository.getInstance();

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  @AuthService.AuthLogger
  async userSingUp(login: string, password: string, db: Db) {
    const existLogin = await this.checkExistUser(login, db);
    if (existLogin) {
      throw new BadRequestError(`Login ${login}, already exist`);
    }
    const passwordHash = await this.getPasswordHash(password);
    const result = await this.userRepository.createUser(
      login,
      passwordHash,
      db,
    );
    return result;
  }

  @AuthService.AuthLogger
  async userSingIn(login: string, password: string, db: Db) {
    try {
      const user = await this.userRepository.findOne({ username: login }, db);
      if (!user) {
        throw new Error();
      }
      const isValidPassword = await this.checkUserPassword(user, password);
      if (!isValidPassword) {
        throw new Error();
      }
      return this.generateJwt(user._id.toString());
    } catch (e) {
      throw new UnauthorizedError("invalid login or password");
    }
  }

  @AuthService.AuthLogger
  private getPasswordHash(password: string): Promise<string> {
    const config = this.configService.get<RootConfig[ConfigKeys.AUTH]>(
      ConfigKeys.AUTH,
    );
    return new Promise((resolve, reject) => {
      pbkdf2(
        password,
        config.hashSecret,
        config.iterations,
        config.hashLength,
        config.digest,
        (err, result) => {
          if (err) reject(err);
          resolve(result.toString("hex"));
        },
      );
    });
  }

  @AuthService.AuthLogger
  private generateJwt(userId: string) {
    const config = this.configService.get<RootConfig[ConfigKeys.AUTH]>(
      ConfigKeys.AUTH,
    );
    return sign({ userId }, config.jwtSecret, { expiresIn: "1h" });
  }

  @AuthService.AuthLogger
  private async checkUserPassword(user: UserDocument, password: string) {
    const hash = await this.getPasswordHash(password);
    return hash === user.password;
  }

  @AuthService.AuthLogger
  private async checkExistUser(username: string, db: Db) {
    const user = await this.userRepository.findOne({ username }, db);
    return user !== null;
  }
}
