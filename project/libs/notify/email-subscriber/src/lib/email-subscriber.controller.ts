import { Controller, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { NewsletterDto } from './dto/newsletter.dto';
import { getNewPublications } from '@project/helpers';
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
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.SendNewsletter,
    queue: 'readme.notify.newsletter',
  })
  public async sendNewsletter(dto: NewsletterDto) {
    const { email, publications } = dto;
    const recipient = await this.subscriberService.getSubscriber(email);
    if (recipient && publications.length > 0) {
      const newPublics = getNewPublications(dto, recipient);

      if (newPublics.length > 0) {
        await this.mailService.sendNewsletter(recipient.email, newPublics);
        await this.subscriberService.updateDateSent(recipient);
      }
    }
  }
}
