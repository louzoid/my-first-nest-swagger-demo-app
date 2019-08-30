import { NestFactory } from '@nestjs/core';
import { swaggerInit } from './swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerInit(app);
  await app.listen(3000);
}
bootstrap();
