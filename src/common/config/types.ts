export interface RootConfig {
  [ConfigKeys.AUTH]: UserPassword;
}

export enum ConfigKeys {
  AUTH = "AUTH",
}

export interface UserPassword {
  saltLength: number;
  hashLength: number;
  hashSecret: string;
  iterations: number;
  digest: string;
  jwtSecret: string;
}
