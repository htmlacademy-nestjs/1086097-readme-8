import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { Logger,ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService as NestConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('The «Publication» service')
  .setDescription('Publication service API')
  .setVersion('1.0')
  .build();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe({transform: true}));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  const configService = app.get(NestConfigService);
  const port = configService.get('app.port');
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
