import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { NewsletterDto } from './dto/newsletter.dto';
import { RabbitRouting } from '@project/core';
import { MailService } from './mail.service';

@ApiTags('notify')
@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify.income',
  })
  public async create(subscriber: CreateSubscriberDto) {
    await this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.SendNewsletter,
    queue: 'readme.notify.newsletter',
  })
  public async sendNewsletter(dto: NewsletterDto) {
    const { email, publication } = dto;
    const recipient = await this.subscriberService.getSubscriber(email);
    if (recipient && publication) {
      await this.mailService.sendNewsletter(recipient.email, publication);
      await this.subscriberService.updateDateSent(recipient);
    }
  }
}
