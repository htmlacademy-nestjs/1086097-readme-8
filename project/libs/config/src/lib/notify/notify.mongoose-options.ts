import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";

import { getMongoConnectionString } from "@project/helpers";

export function getNotifyMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('appnotify.db.user'),
          password: config.get<string>('appnotify.db.password'),
          host: config.get<string>('appnotify.db.host'),
          port: config.get<string>('appnotify.db.port'),
          databaseName: config.get<string>('appnotify.db.name'),
          authDatabase: config.get<string>('appnotify.db.authBase'),
        })
      }
    },
    inject: [ConfigService]
  }
}
