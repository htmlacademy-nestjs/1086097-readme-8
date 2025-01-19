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

EmailSubscriberSchema.virtual('id').get(function() {
  //@ts-ignore
  return this._id.toString();
});
