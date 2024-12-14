import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Get, Query, Param, Delete, HttpStatus } from '@nestjs/common';

import { fillDto } from '@project/helpers';
import { LikeDto } from './dto/like.dto';
import { LikeRdo } from './rdo/like.rdo';
import { LikeService } from './like.service';

@ApiTags('like')
@Controller('likes')
export class LikeController {
  constructor(
    private readonly likeService: LikeService
  ) {}

  @ApiResponse({
    type: LikeDto,
    status: HttpStatus.OK,
    description: 'Like created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Post('')
  public async createComment(@Query() query: LikeDto) {
    const like = await this.likeService.createLike(query);
    return fillDto(LikeRdo, like.toPOJO());
  }

  @ApiResponse({
    type: LikeRdo,
    status: HttpStatus.OK,
    description: 'Likes received',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @Get(':publicationId')
  public async getCommentsByPublicationId(@Param('publicationId') publicationId: string) {
    return await this.likeService.getLikesCounByPublicationId(publicationId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Likes deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @Delete(':publicationId')
  public async deleteCommentById(@Param('publicationId') publicationId: string) {
    await this.likeService.deleteLikesByPublicationId(publicationId);
  }
}
