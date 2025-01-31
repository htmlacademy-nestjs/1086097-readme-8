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
    return this.rabbitOptions.exchange && this.rabbitClient.publish(
      this.rabbitOptions.exchange,
      RabbitRouting.SendNewsletter,
      { ...dto }
    );
  }
}
