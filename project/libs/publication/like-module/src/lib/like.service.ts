import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { LikeEntity } from './like.entity';
import { Like } from './like.interface';
import { LikeDto } from './dto/like.dto';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  constructor (
    private readonly likeReposytory: LikeRepository
  ) {}
  public async createLike(dto: LikeDto): Promise<LikeEntity> {
    return await this.likeReposytory.createLike(dto);
  }

  public async deleteLikesByPublicationId(publicationId: string, userId: string): Promise<void> {
    return this.likeReposytory.deleteLikesByPublicationId(publicationId, userId);
  }

  public async findByUserId(publicationId: string, userId: string): Promise<Like | null> {
    return await this.likeReposytory.findByUserId(publicationId, userId);
  }
}

