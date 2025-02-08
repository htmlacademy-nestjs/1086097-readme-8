import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentQuery } from './commentQuery';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {

  constructor(
    private readonly commentRepository: CommentRepository
    ) {}

  public async createComment(publicationId: string, dto: CreateCommentDto): Promise<CommentEntity> {
    return await this.commentRepository.save(publicationId, dto);
  }

  public async deleteCommentById(id: string): Promise<void> {
    return await this.commentRepository.deleteCommentById(id);
  }

  public async findCommentsByPublicationId(publicationId: string, query: CommentQuery) {
    const commentsWithPagination = await this.commentRepository.findCommentsByPublicationId(publicationId,  query);

    const result = {
      ...commentsWithPagination,
      entities: commentsWithPagination.entities.map((entity) => entity.toPOJO()),
    };

    return result;
  }
}
