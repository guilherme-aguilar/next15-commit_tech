export interface IEnvConfig {
  JWT_SECRET(): string;
  JWT_EXPIRATION_TIME(): string;
  JWT_REFRESH_TOKEN_SECRET(): string;
  JWT_REFRESH_TOKEN_EXPIRATION_TIME(): string;
}
