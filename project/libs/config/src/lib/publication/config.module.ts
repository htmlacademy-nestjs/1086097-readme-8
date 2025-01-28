import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import appConfig from './app.config';

const ENV_USER_FILE_PATH = 'apps/publication/publication.env';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
      envFilePath: ENV_USER_FILE_PATH
    }),
  ]
})
export class PublicationConfigModule {}
