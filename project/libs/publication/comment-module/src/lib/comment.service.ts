import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PublicationRepository } from '@project/publication-module';

@Injectable()
export class CommentService extends BaseMemoryRepository<CommentEntity> {

  constructor(private readonly publicationRepisitory: PublicationRepository) {
    super();
  }

  public async createComment(publicationId: string, dto: CreateCommentDto): Promise<CommentEntity> {
    const newObject = {...dto, publicationId};
    const newCommentEntity = new CommentEntity(newObject);
    await this.save(newCommentEntity);
    //test
    console.log(this.publicationRepisitory.find());
    return newCommentEntity;
  }

  public async deleteCommentById(id: string): Promise<void> {
    await this.deleteById(id);
  }

  public async findCommentsByPublicationId(publicationId: string) {
    const entities = Array.from(this.entities.values());
    const findedPublications = entities.filter(entity => entity.publicationId === publicationId);
    return findedPublications;
  }
}
