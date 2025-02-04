import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { Subscriber, Publication } from '@project/core';
import { NotifyConfig } from '@project/config';

export const EMAIL_ADD_SUBSCRIBER_SUBJECT = 'Подписка на рассылку оформлена';
export const NEWS_LETTER =  'Подборка новых публикаций';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(NotifyConfig.KEY)
  private readonly notifyConfig!: ConfigType<typeof NotifyConfig>;

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        name: `${subscriber.name}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendNewsletter(email: string | string[], publicationInfo: Publication) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: email,
      subject: NEWS_LETTER,
      template: './newsletter',
      context: {
        publics: publicationInfo,
      },
    });
  }
}
