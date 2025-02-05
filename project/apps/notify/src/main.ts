import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { GLOBAL_PREFIX, CONFIG_SERVICE } from './app/app.const';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);

  const configService = app.get(NestConfigService);
  const port = configService.get(CONFIG_SERVICE);
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
