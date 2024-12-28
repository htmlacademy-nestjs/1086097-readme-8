import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { LikeEntity } from './like.entity';
import { Like } from './like.interface';
import { LikeDto } from './dto/like.dto';
import { PrismaClientService } from '@project/models';

@Injectable()
export class LikeService {
  constructor (
    	private readonly client: PrismaClientService
  ) {}
  public async createLike(dto: LikeDto): Promise<LikeEntity> {
    const existLike = await this.findByUserId(dto.publicationId, dto.userId);
    if (existLike) { throw new ConflictException(`Like already exists`);}

    const newLike = await this.client.like.create({
      data: {
        userId: dto.userId,
        publicationId: dto.publicationId,
      }
    })

    await this.client.publication.update({
      where:  { publicationId: dto.publicationId },
      data: {
        likesCount: {increment: 1},
      }
    })

    return new LikeEntity(newLike);
  }

  public async deleteLikesByPublicationId(publicationId: string, userId: string): Promise<void> {
    const existLike = await this.findByUserId(publicationId, userId);

    if (!existLike) { throw new NotFoundException(`You dont Liked it publication`); }

    await this.client.like.delete({
      where: { id: existLike.id, },
    })

    await this.client.publication.update({
      where:  { publicationId },
      data: {
        likesCount: {decrement: 1},
      }
    })
  }

  public async findByUserId(publicationId: string, userId: string): Promise<Like | null> {
    const like = await this.client.like.findFirst({
      where: { userId, publicationId },
    });
    return like;
  }
}

