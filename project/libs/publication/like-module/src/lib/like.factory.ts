import { Injectable } from '@nestjs/common';

import { EntityFactory } from '@project/core';
import { LikeEntity } from './like.entity';
import { Like } from './like.interface';


@Injectable()
export class LikeFactory implements EntityFactory<LikeEntity> {
  public create(entityPlainData: Like): LikeEntity {
    return new LikeEntity(entityPlainData);
  }
}
