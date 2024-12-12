import { Controller, Body, Post, Get, Param, Delete, NotFoundException } from '@nestjs/common';

import { fillDto } from '@project/helpers';
import { CommentRdo } from './rdo/comment.rdo';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
// import { UpdatePublicationDto } from './dto/update-publication.dto';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @Post(':publicationId')
  public async createComment(@Param('publicationId') publicationId: string, @Body() dto: CreateCommentDto) {
    const comment = await this.commentService.createComment(publicationId, dto);
    return fillDto(CommentRdo, comment.toPOJO());
  }

  @Delete(':id')
  public async deleteCommentById(@Param('id') id: string) {
    await this.commentService.deleteCommentById(id);
  }

  @Get('publication/:id')
  public async findCommentsByPublicationId(@Param('id') id: string) {
    const comments = await this.commentService.findCommentsByPublicationId(id);
    console.log(comments, 'controller by id');
    if (! comments) {
      throw new NotFoundException(`Comments for publication id ${id} not found`);
    }
    return fillDto(CommentRdo, comments);
  }
}
