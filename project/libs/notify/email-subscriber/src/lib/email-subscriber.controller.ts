import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { NewsletterDto } from './dto/newsletter.dto';
import { RabbitRouting } from '@project/core';
import { MailService } from './mail.service';
import { getNewPublications } from '@project/helpers';

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
    const { email, publications } = dto;
    const subscriber = await this.subscriberService.getSubscriber(email);

    if (subscriber && publications.length > 0) {
      const newPublications = getNewPublications(dto, subscriber);

      if (newPublications.length > 0) {
        await this.mailService.sendNewsletter(subscriber.email, newPublications);
        await this.subscriberService.updateDateSent(subscriber);
      }
    }
  }
}
