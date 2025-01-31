import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { getRabbitMQOptions } from '@project/helpers';
import { PublicationNotifyService } from './notify.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('rabbit')),
  ],
  controllers: [],
  providers: [PublicationNotifyService],
  exports: [PublicationNotifyService],
})
export class PublicationNotifyModule {}
