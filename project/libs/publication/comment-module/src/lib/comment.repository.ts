import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentFactory } from './comment.factory';
import { PrismaClientService } from '@project/models';
import { PaginationResult } from '@project/core';
import { CommentQuery } from './commentQuery';
import { rejects } from 'assert';

@Injectable()
export class CommentRepository extends CommentFactory {

  constructor(
    private readonly client: PrismaClientService
    ) {super()}

  private async getCommentCount(where: Prisma.CommentWhereInput): Promise<number> {
    return this.client.comment.count({ where });
  }

  private calculateCommentPages(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

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
    try {
      const comment = await this.client.comment.delete({where: {id}})

      await this.client.publication.update({
        where: { publicationId: comment.publicationId},
        data: {
          commentsCount: { decrement: 1 },
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }


  public async findCommentsByPublicationId(publicationId: string, query: CommentQuery):Promise<PaginationResult<CommentEntity>> {
    const orderBy: Prisma.CommentOrderByWithRelationInput = {};
    const where: Prisma.CommentWhereInput = {};
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;

    orderBy['createAt'] = query.sortDirection;
    where.publicationId = publicationId;

    const [records, commentsCount] = await Promise.all([
      this.client.comment.findMany({
        where,
        orderBy,
        skip,
        take
      }),
      this.getCommentCount(where)
    ])

    if (!records) {
      throw new NotFoundException(`Comments for publication id ${publicationId} not found`);
    }

    return {
      entities: records.map((record) => this.create(record)),
      currentPage: query?.page,
      totalPages: this.calculateCommentPages(commentsCount, take),
      itemsPerPage: take,
      totalItems: commentsCount,
    };
  }
}
