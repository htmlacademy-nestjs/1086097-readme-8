import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { BaseMongoRepository } from '@project/data-access';
import { UserModel } from './user-model';
import { CreateUserDto } from 'libs/user/authentication/src/lib/dto/create-user.dto';
import { UserRdo } from '@project/authentication';

@Injectable()
// @ts-ignore
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {

  constructor(
    entityFactory: UserFactory,
    @InjectModel(UserModel.name) userModel: Model<UserModel>
  ) {
    super(entityFactory, userModel);
  }

  public async findByEmail(email: string) {
    // @ts-ignore
    const document = await this.model.findOne({ email }).exec();
    if (!document) {return null;};
    return this.createEntityFromDocument(document);
  }

  // public async cteateEntityFromDocument(dto: UserRdo) {
  //   return this.entityFactory.create(dto);
  // }
}
