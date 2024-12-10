import { Injectable } from '@nestjs/common';

import { EntityFactory } from '@project/core';

import { PublicationEntity } from './publication.entity';
import { Publication } from './publication.interface';

@Injectable()
export class PublicationFactory implements EntityFactory<PublicationEntity> {
  public create(entityPlainData: Publication): PublicationEntity {
    return new PublicationEntity(entityPlainData);
  }
}
