import { Controller, Post, Get, Query, Param, Delete } from '@nestjs/common';

import { fillDto } from '@project/helpers';
import { LikeDto } from './dto/like.dto';
import { LikeRdo } from './rdo/like.rdo';
import { LikeService } from './like.service';

@Controller('likes')
export class LikeController {
  constructor(
    private readonly likeService: LikeService
  ) {}

  @Post('')
  public async createComment(@Query() query: LikeDto) {
    const like = await this.likeService.createLike(query);
    return fillDto(LikeRdo, like.toPOJO());
  }

  @Get(':publicationId')
  public async getCommentsByPublicationId(@Param('publicationId') publicationId: string) {
    return await this.likeService.getLikesCounByPublicationId(publicationId);
  }

  @Delete(':publicationId')
  public async deleteCommentById(@Param('publicationId') publicationId: string) {
    await this.likeService.deleteLikesByPublicationId(publicationId);
  }
}
