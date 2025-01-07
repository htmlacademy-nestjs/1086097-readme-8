import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { PublicUserEntity } from './user.entity';
import { PublicUserFactory } from './user.factory';
import { BaseMongoRepository } from '@project/data-access';
import { PublicUserModel } from './user-model';

@Injectable()
// @ts-ignore
export class PublicUserRepository extends BaseMongoRepository<PublicUserEntity, PublicUserModel> {

  constructor(
    entityFactory: PublicUserFactory,
    @InjectModel(PublicUserModel.name) userModel: Model<PublicUserModel>
  ) {
    super(entityFactory, userModel);
  }

  public async findByEmail(email: string) {
    // @ts-ignore
    const document = await this.model.findOne({ email }).exec();
    if (!document) {return null;};
    return this.createEntityFromDocument(document);
  }
}
