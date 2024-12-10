import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { LikeEntity } from './like.entity';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikeService extends BaseMemoryRepository<LikeEntity> {
  public async createLike(dto: LikeDto): Promise<LikeEntity> {
    const newLikeEntity = new LikeEntity(dto);
    await this.save(newLikeEntity);
    return newLikeEntity;
  }

  public async deleteLikesByPublicationId(publicationId: string): Promise<void> {
    const entities = Array.from(this.entities.values());
    const likes = entities.filter((entity) => entity.publicationId === publicationId);

    if (likes.length < 1) {
      throw new NotFoundException(`likes with id ${publicationId} not found`);
    }

    await this.deleteMany(likes);
  }

  public async getLikesCounByPublicationId(publicationId: string): Promise<number>  {
    const entities = Array.from(this.entities.values());
    const likes = entities.filter((entity) => entity.publicationId === publicationId);

    if (! likes) {
      throw new NotFoundException(`likes with id ${publicationId} not found`);
    }
    return likes.length;
  }
}

