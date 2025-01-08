import { Document, Schema as SchemaM } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser } from '@project/core';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements AuthUser {
  @Prop({
    unique: true,
  })
  public override id!: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email!: string;

  @Prop({
    required: true,
  })
  public name!: string;

  @Prop()
  public avatar?: string;

  @Prop({
    required: true,
  })
  public createAt!: Date;

  @Prop()
  public publicationsCount!: number;

  @Prop()
  public subscribers?: string[];

  @Prop()
  public passwordHash!: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

UserSchema.pre<UserModel>('save', function (next) {
  if (!this.id && this._id) {
    // @ts-ignore
    this.id = this._id.toString();
  }
  next();
});
