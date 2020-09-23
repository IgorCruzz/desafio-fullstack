import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  const PORT = 3333
  const HOST = "0.0.0.0"


  await app.listen(PORT, HOST)
}
bootstrap()
