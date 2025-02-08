import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { rabbitConfig } from '@project/config';
import { RabbitRouting } from '@project/core';
import { SendNewsletterDto } from './dto/send-newsletter.dto';

@Injectable()
export class PublicationNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async sendNewsletter(dto: SendNewsletterDto) {
    const exchange = this.rabbitOptions.exchange;
    if (!exchange) {
      throw new Error('Exchange key (config env) is undefined');
    }

    return await this.rabbitClient.publish(
      exchange,
      RabbitRouting.SendNewsletter,
      { ...dto }
    );
  }
}
