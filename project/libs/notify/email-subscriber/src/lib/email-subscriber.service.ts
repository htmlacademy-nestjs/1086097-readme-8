import { Injectable } from '@nestjs/common';

import { EmailSubscriberEntity } from './email-subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { Subscriber } from '@project/core';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {  console.log('EmailSubscriberRepository:', emailSubscriberRepository);}

  public async addSubscriber(subscriber: CreateSubscriberDto): Promise<EmailSubscriberEntity> {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      return existsSubscriber;
    }

    const emailSubscriber = new EmailSubscriberEntity(subscriber);
    await this.emailSubscriberRepository.save(emailSubscriber);

    return emailSubscriber;
  }

  public async getSubscriber(email: string) {
    return await this.emailSubscriberRepository.findByEmail(email);
  }

  public async updateDateSent(subscriber: Subscriber) {
    const subscriberData = {
      ...subscriber,
      dateLastNotify: new Date().toISOString(),
    };
    const updatedSubscriber = new EmailSubscriberEntity(subscriberData);

    return this.emailSubscriberRepository.update(
      updatedSubscriber
    );
  }
}
