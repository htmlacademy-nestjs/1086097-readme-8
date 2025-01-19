import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { getNotifyMongooseOptions, NotifyConfigModule } from '@project/config';
import { EmailSubscriberModule } from '@project/email-subscriber';

@Module({
  imports: [
    MongooseModule.forRootAsync(getNotifyMongooseOptions()),
    EmailSubscriberModule,
    NotifyConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log('NotifyModule initialized');
  }
}
