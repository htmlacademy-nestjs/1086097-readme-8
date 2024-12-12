import { Injectable } from '@nestjs/common';

import { AuthUser, EntityFactory } from '@project/core';
import { PublicUserEntity } from './public-user.entity';

@Injectable()
export class PublicUserFactory implements EntityFactory<PublicUserEntity> {
  public create(entityPlainData: AuthUser): PublicUserEntity {
    return new PublicUserEntity(entityPlainData);
  }
}
