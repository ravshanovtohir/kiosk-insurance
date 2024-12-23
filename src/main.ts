import { json } from 'express'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import { App } from './app'
import { appConfig } from 'config/app.config'
import { swaggerConfig } from '@config'
import { IoAdapter } from '@nestjs/platform-socket.io'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(App, new ExpressAdapter(), {
    cors: {
      origin: '*',
      maxAge: 0,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      credentials: false,
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: [],
      preflightContinue: false,
      optionsSuccessStatus: 200,
    },
  })

  app.use(
    json({
      limit: '5mb',
    }),
  )

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  })

  app.set('env', appConfig.env)
  app.set('etag', 'strong')
  app.set('trust proxy', true)
  app.set('x-powered-by', false)

  const document = SwaggerModule.createDocument(app, swaggerConfig.options)
  SwaggerModule.setup(swaggerConfig.path, app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  })

  const server = app.getHttpServer()

  const io = new IoAdapter(server)
  app.useWebSocketAdapter(io)

  await app.listen(appConfig.port, appConfig.host)
}
bootstrap()
