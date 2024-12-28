import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaClientService } from '@project/models';

@Injectable()
export class CommentService {

  constructor(
    private readonly client: PrismaClientService
    ) {}

  public async createComment(publicationId: string, dto: CreateCommentDto): Promise<CommentEntity> {
    const record = await this.client.comment.create({
      data: {
        publicationId,
        userId: dto.userId,
        text: dto.text,
      }
    })

    await this.client.publication.update({
      where: {publicationId},
      data: {
        commentsCount: {increment: 1},
      },
    })

    return new CommentEntity({...dto, publicationId});
  }

  public async deleteCommentById(id: string): Promise<void> {
    const comment = await this.client.comment.delete({where: {id}})

    await this.client.publication.update({
      where: { publicationId: comment.id},
      data: {
        commentsCount: { decrement: 1 },
      },
    });
  }

  public async findCommentsByPublicationId(publicationId: string) {
    const comments = await this.client.comment.findMany({
      where: {publicationId}
    })

    if (!comments) {
      throw new NotFoundException(`Comments for publication id ${publicationId} not found`);
    }

    return comments;
  }
}
