import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/helpers';
import { UserNotifyService } from './user-notify.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    )
  ],
  controllers: [],
  providers: [UserNotifyService],
  exports: [UserNotifyService],
})
export class UserNotifyModule {}
