import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Subscriber } from '@project/core';

@Schema({
  collection: 'email-subscribers',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class EmailSubscriberModel extends Document implements Subscriber {
  @Prop({required: true})
  public email!: string;

  @Prop({required: true})
  public name!: string;

  @Prop({required: true})
  public dateLastNotify!: string;

  public override id?: string;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);

EmailSubscriberSchema.pre<EmailSubscriberModel>('save', function (next) {
  if (!this.id && this._id) {
    // @ts-ignore
    this.id = this._id.toString();
  }
  next();
});
