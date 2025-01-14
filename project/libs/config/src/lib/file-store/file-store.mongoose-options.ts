import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { getMongoConnectionString } from '@project/helpers';

export function getFileStoreMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('appfile.db.user'),
          password: config.get<string>('appfile.db.password'),
          host: config.get<string>('appfile.db.host'),
          port: config.get<string>('appfile.db.port'),
          authDatabase: config.get<string>('appfile.db.authBase'),
          databaseName: config.get<string>('appfile.db.name'),
        })
      }
    },
    inject: [ConfigService]
  }
}
