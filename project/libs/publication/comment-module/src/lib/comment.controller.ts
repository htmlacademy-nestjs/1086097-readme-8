import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Body, Post, Get, Param, Query, Delete, HttpStatus } from '@nestjs/common';

import { fillDto } from '@project/helpers';
import { CommentRdo } from './rdo/comment.rdo';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentWithPaginationRdo } from './rdo/comments-with-pagination.rdo';
import { CommentQuery } from './commentQuery';

@ApiTags('Comment')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @ApiResponse({
    type: CreateCommentDto,
    status: HttpStatus.OK,
    description: 'Comment created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Post('/:publicationId')
  public async createComment(@Param('publicationId') publicationId: string, @Body() dto: CreateCommentDto) {
    const comment = await this.commentService.createComment(publicationId, dto);
    return fillDto(CommentRdo, comment.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @Delete('/:id')
  public async deleteCommentById(@Param('id') id: string) {
    await this.commentService.deleteCommentById(id);
  }

  @ApiResponse({
    type: CommentWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Comments received',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @Get('/publication/:id')
  public async findCommentsByPublicationId(@Param('id') id: string, @Query() query: CommentQuery) {
    const commentsWithPagination = await this.commentService.findCommentsByPublicationId(id, query);
    const result = {
      ...commentsWithPagination,
      entities: commentsWithPagination.entities.map((entity) => entity.toPOJO()),
    };

    return fillDto(CommentWithPaginationRdo, result);
  }
}
