import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EmailSubscriberEntity } from "./email-subscriber.entity";
import { EmailSubscriberFactory } from "./email-subscriber.factory";
import { EmailSubscriberModel } from "./email-subscriber.model";

import { BaseMongoRepository } from '@project/data-access';

@Injectable()
// @ts-ignore
export class EmailSubscriberRepository extends BaseMongoRepository<EmailSubscriberEntity, EmailSubscriberModel> {
  constructor (
    entityFactory: EmailSubscriberFactory,
    @InjectModel(EmailSubscriberModel.name) emailSubscriberModel: Model<EmailSubscriberModel>,
  ) {
    super(entityFactory, emailSubscriberModel)
  }

  public async findByEmail(email: string) {
    // @ts-ignore
    const document = await this.model.findOne({ email }).exec();
    if (!document) {return null;};
    return this.createEntityFromDocument(document);
  }
}
