export declare interface AppConfig {
  env?: string
  name?: string
  host?: string
  port?: number
}

export const appConfig: AppConfig = {
  env: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  host: process.env.APP_HOST,
  port: parseInt(process.env.APP_PORT, 10) ?? 3001,
}
