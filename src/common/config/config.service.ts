import { ConfigKeys, RootConfig } from "./types";

export class ConfigService {
  private static instance: ConfigService;
  private config: RootConfig;

  private constructor() {
    this.config = {
      [ConfigKeys.AUTH]: {
        saltLength: parseInt(process.env.AUTH_SALT_LENGTH) || 32,
        hashLength: parseInt(process.env.AUTH_HASH_LENGTH) || 32,
        iterations: parseInt(process.env.AUTH_ITE) || 10,
        hashSecret: process.env.AUTH_SECRET || "secret",
        digest: "sha512",
        jwtSecret: process.env.AUTH_JWT_SECTET || 'jwt_secret'
      },
    };
  }

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  public get<T>(key: ConfigKeys): T {
    return this.config[key] as T;
  }
}
