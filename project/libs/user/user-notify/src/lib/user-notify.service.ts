import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { RabbitRouting } from '@project/core';
import { rabbitConfig } from '@project/config';

@Injectable()
export class UserNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitConfigOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    const exchange = this.rabbitConfigOptions.exchange;
    const routingKey = RabbitRouting.AddSubscriber;

    if (!exchange) {
      throw new Error('Exchange key (config env) is undefined');
    }

    return await this.rabbitClient.publish(
        exchange,
        routingKey,
        {...dto }
    );
  }
}

