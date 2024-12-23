import type { OpenAPIObject } from '@nestjs/swagger'

export declare interface SwaggerConfig {
  path?: string
  options?: Omit<OpenAPIObject, 'paths'>
}

export const swaggerConfig: SwaggerConfig = {
  path: process.env.SWAGGER_PATH ?? '/docs',
  options: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'REST API Documentation',
    },
  },
}
