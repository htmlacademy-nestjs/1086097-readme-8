import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { GLOBAL_PREFIX, CONFIG_SERVICE, configDocumentBuilder } from './app/app.const';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle(configDocumentBuilder.Title)
  .setDescription(configDocumentBuilder.Description)
  .setVersion(configDocumentBuilder.Version)
  .build();

  app.setGlobalPrefix(GLOBAL_PREFIX);

  app.useGlobalPipes(new ValidationPipe({transform: true}));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  const configService = app.get(NestConfigService);
  const port = configService.get(CONFIG_SERVICE);

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`);
}

bootstrap();
