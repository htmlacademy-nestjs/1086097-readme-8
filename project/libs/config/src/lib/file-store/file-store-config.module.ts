import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import fileStoreConfig from './file-store.config';

const ENV_FILE_PATH = 'apps/filestore/filestore.env';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [fileStoreConfig],
      envFilePath: ENV_FILE_PATH
    }),
  ]
})
export class FileStoreConfigModule {}
