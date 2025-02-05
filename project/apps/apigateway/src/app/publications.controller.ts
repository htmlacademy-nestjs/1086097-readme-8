import {Body, Controller, Get, HttpStatus, Param, Delete, Put, Post, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors, Query} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { FileInterceptor } from '@nestjs/platform-express';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CreatePublicationDto, UpdatePublicationDto, PublicationQuery, SearchPublicationQuery } from '@project/publication-module';
import { CreateCommentDto, CommentQuery } from '@project/comment-module';
import { LikeDto } from '@project/like-module'
import { ApplicationServiceURL } from './app.config';
import { CheckAuthGuard, ValidateAuthorGuard,  ValidateAuthorForCommitGuard} from '@project/guards';
import { UserIdInterceptor } from '@project/interceptors';

@ApiTags('Publications')
@ApiExtraModels(CreatePublicationDto, UpdatePublicationDto)
@Controller('/')
@UseFilters(AxiosExceptionFilter)
export class PublicationController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Publication added successfully',
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('publications')

  public async create(@Body() dto: CreatePublicationDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Publication}/`,
      dto
    );
    return data;
  }



  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Publication added successfully',
  })
  @UseInterceptors(FileInterceptor('image'))
  @Post('files/upload/image')

  public async createPhotoPublication(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Files}/upload/image`,
      file,
      {headers: {
        'Content-Type': req.headers['content-type'],
        'Authorization': req.headers['authorization']}
      }
    );
    return data;
  }



  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Publication updated',
  })
  @UseGuards(CheckAuthGuard, ValidateAuthorGuard)
  @Put('publications/:id')
  public async update(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdatePublicationDto) {
    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Publication}/${id}`,
      dto,
      {headers: {Authorization: req.headers['authorization'],},}
    );
    return data;
  }



  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Publication reposted',
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('publications/repost/:id/:userId')
  public async repost(@Param('id') id: string, @Param('userId') userId: string) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Publication}/repost/${id}/${userId}`,
    );
    return data;
  }


  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Publication removed',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Publication is not deleted',
  })
  @UseGuards(CheckAuthGuard)
  @Delete('publications/:id')
  @UseGuards(CheckAuthGuard, ValidateAuthorGuard)
  public async delete(@Param('id') id: string, @Req() req: Request) {
    await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Publication}/${id}`,
      {headers: {Authorization: req.headers['authorization'],},}
    );
  }



  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Publication is showing',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Publication not found',
  })
  @Get('publications/id/:id')
  public async indexPublication(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Publication}/${id}`,
    );
    return data;
  }



  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of publications is showing',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'There are no posts that can be loaded',
  })
  @UseGuards(CheckAuthGuard)
  @Get('publications')
  public async indexPublications(@Query() query: PublicationQuery) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Publication}`,
      { params: query }
    );

    const newEntities = await Promise.all(data.entities.map(async (entity) => {
      try {
        const { data: userData } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.User}/user/${entity.userId}`);
        const { createdAt, avatar, subscriptions, subscribers, publicationsCount, ...filteredUserData } = userData;
        return { ...entity, user: filteredUserData };
      } catch (error) {
        console.error(`Width ${entity.userId} – ${error}`);
        return { ...entity, user: null };
      }
    }));

    return {...data, entities: newEntities};
  }



  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of publications is showing',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'There are no publications can be loaded',
  })
  @Get('/searchtitle/')
  public async searchPublicationsByTitle(@Query() query: SearchPublicationQuery) {
    const {title} = query;
    const {data} = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Publication}/searchtitle?title=${title}`,
    );
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of publications is showing',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'There are no posts that can be loaded',
  })
  @UseGuards(CheckAuthGuard)
  @Get('publications/drafts/:userId')
  async searchDrafts(@Param('userId') userId: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Publication}/searchdrafts/${userId}`,
    );
    return data;
  }




  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Publications sent',
  })
  @UseGuards(CheckAuthGuard)
  @Get('publications/send-news/:id/:email')
  public async sendNews(@Param('id') id: string, @Param('email') email: string, @Req() req: Request) {
    await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Publication}/send-news/:id/:email`,
      { params: { id, email },
        headers: {Authorization: req.headers['authorization'],},
      },
    );
  }




  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Comment added successfully',
  })
  @UseGuards(CheckAuthGuard)
  @Post('publications/comments/:publicationId')
  public async createComment(@Param('publicationId') publicationId: string, @Body() dto: CreateCommentDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Comment}/${publicationId}`,
      dto
    );
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All comments are shown',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Publication is not found',
  })
  @Get('publications/comments/:publicationId')
  public async showCommentsByPostId(@Param('publicationId') publicationId: string, @Query() query: CommentQuery) {
    const { data: publicComments } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Comment}/publication/${publicationId}`,
      { params: query }
    );
    return publicComments;
  }



  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment removed',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Comment with this id is not found',
  })
  @UseGuards(CheckAuthGuard)
  @Delete(`publications/comments/:commentId`)
  @UseGuards(CheckAuthGuard, ValidateAuthorForCommitGuard)
  public async remove(@Param('commentId') commentId: string) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Comment}/${commentId}`
    );
    return data;
  }



  @ApiResponse({
    type: LikeDto,
    status: HttpStatus.CREATED,
    description: 'Like added successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Post('/publications/likes')
  public async addLike(@Query() {userId, publicationId}: LikeDto, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Like}?userId=${userId}&publicationId=${publicationId}`,
      {headers: {Authorization: req.headers['authorization'],},}
    );
    return data;
  }



  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Like has deleted now',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Publication or like not found',
  })
  @Delete('/publications/likes/:publicationId/:userId')
  public async removeLike(@Param('publicationId') publicationId: string, @Param('userId') userId: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Like}/${publicationId}/${userId}`,
      {headers: {Authorization: req.headers['authorization'],},}
    );
    return data;
  }





}
