import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { PublicUserEntity } from './public-user.entity';
import { PublicUserFactory } from './public-user.factory';

@Injectable()
export class PublicUserRepository extends BaseMemoryRepository<PublicUserEntity> {

  constructor(entityFactory: PublicUserFactory) {
    super(entityFactory);
  }

  public async findByEmail(email: string): Promise<PublicUserEntity | null> {
    const entities = Array.from(this.entities.values());
    const user = entities.find((entity) => entity.email === email);

    if (! user) {
      return null;
    }

    return this.entityFactory!.create(user);
  }
}
