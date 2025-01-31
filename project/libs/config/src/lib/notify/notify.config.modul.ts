import { Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import notifyConfig from "./notify.config";
const ENV_FILE_PATH  = "apps/notify/.env"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notifyConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ]
})

export class NotifyConfigModule implements OnModuleInit  {
  onModuleInit() {
    console.log('NotifyConfigModule initialized');
  }
}
