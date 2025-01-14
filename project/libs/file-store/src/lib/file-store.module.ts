import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';

import { FileStoreService } from './file-store.service';
import { FileStoreRepository } from './file-store.repository';
import { FileStoreFactory } from './file-store.factory';
import { FileStoreController } from './file-store.controller';
import { FileStoreModel, FileStoreSchema } from './file-store.model';
const SERVE_ROOT = '/static';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('appfile.uploadDirectory');
        return [{
          rootPath,
          serveRoot: SERVE_ROOT,
          serveStaticOptions: {
            fallthrough: true,
            etag: true,
          }
        }]
      }
    }),
    MongooseModule.forFeature([{ name: FileStoreModel.name, schema: FileStoreSchema }])
  ],

  controllers: [FileStoreController],
  providers: [FileStoreFactory, FileStoreService, FileStoreRepository],
  exports: [],
})
export class FileStoreModule {}
