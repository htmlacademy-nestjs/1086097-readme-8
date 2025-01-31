import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { getRabbitMQOptions } from '@project/helpers';
import { EmailSubscriberModel } from './email-subscriber.model';
import { EmailSubscriberSchema } from './email-subscriber.model';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberFactory } from './email-subscriber.factory';
import { MailModule } from './mail.modul';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: EmailSubscriberModel.name, schema: EmailSubscriberSchema}
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('appnotify.rabbit')
    ),
    MailModule
  ],
  controllers: [EmailSubscriberController],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository,
    EmailSubscriberFactory
  ],
  exports: [EmailSubscriberService],
})
export class EmailSubscriberModule implements OnModuleInit {
  onModuleInit() {
    console.log('EmailSubscriberModule initialized');
  }
}
