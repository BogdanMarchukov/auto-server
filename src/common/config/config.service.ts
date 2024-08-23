import { ConfigKeys, RootConfig } from "./types";

class ConfigService {
  private static instance: ConfigService;
  private config: RootConfig;

  private constructor() {
    this.config = {
      [ConfigKeys.AUTH]: {
        saltLength: parseInt(process.env.PASSWORD_SALT_LENGTH, 32),
        hashLength: parseInt(process.env.PASSWORD_HASH_LENGTH, 32),
        hashSecret: process.env.PASSWORD_SECRET || "secret",
        iterations: parseInt(process.env.PASSWORD_HASH_ITERATIONS, 10),
        digest: "sha512",
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
