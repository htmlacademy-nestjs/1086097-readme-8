import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import appConfig from '../app.config';
import mongoConfig from './mongo.config';
import jwtConfig from './jwt.config';
import rabbitConfig from '../rabbit/rabbit.config';

const ENV_USER_FILE_PATH = 'apps/user/.env';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, mongoConfig, jwtConfig, rabbitConfig],
      envFilePath: ENV_USER_FILE_PATH
    }),
  ]
})
export class ConfigModule {}
