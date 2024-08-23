import { pbkdf2 } from "crypto";
import { ConfigKeys, RootConfig } from "../common/config/types";
import Logger from "../common/decorators/logger.decorator";
import { ConfigService } from "../common/config/config.service";

export class AuthService {
  static AuthLogger = Logger(AuthService.name);
  private static instance: AuthService;
  private configService = ConfigService.getInstance();

  @AuthService.AuthLogger
  async userSingUp(login: string, password: string) {
    const passwordHash = await this.getPasswordHash(password);
    return passwordHash;
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

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
}
