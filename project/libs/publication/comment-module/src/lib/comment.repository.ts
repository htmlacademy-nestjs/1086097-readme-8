import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentFactory } from './comment.factory';
import { PrismaClientService } from '@project/models';

@Injectable()
export class CommentRepository extends CommentFactory {

  constructor(
    private readonly client: PrismaClientService
    ) {super()}

  public async save(publicationId: string, dto: CreateCommentDto): Promise<CommentEntity> {
    const publication = await this.client.publication.findFirst({
      where: {publicationId},
    })

    if (!publication) {
      throw new NotFoundException(`Publication width id ${publicationId} not found`);
    }

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

    return this.create({...dto, publicationId});
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

    return comments.map(comment => this.create(comment))
  }
}
