import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { RequestIdInterceptor } from '@project/interceptors';
import { GLOBAL_PREFIX, PORT } from './app/app.const';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalInterceptors(new RequestIdInterceptor());

  await app.listen(PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${PORT}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
