import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseGuards, Request, Controller, Body, Post, Get, Param, Patch, Delete, Query, HttpStatus, UsePipes } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { fillDto } from '@project/helpers';
import { PublicationRdo } from './rdo/publication.rdo';
import { DetailPublicationRdo } from './rdo/detail-publication.rdo';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationQuery } from './publicationQuery';
import { ValidateAuthorPipe } from '@project/pipes';
import { JwtAuthGuard } from '@project/guards';
import { Request as RequestEx } from 'express';

@ApiTags('Publication')
@Controller('publications')
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService
  ) {}

  @ApiResponse({
    type: CreatePublicationDto,
    status: HttpStatus.OK,
    description: 'Publication created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Post('')
  public async save(@Body() dto: CreatePublicationDto) {
    const publication = await this.publicationService.createPublication(dto);
    return fillDto(PublicationRdo, publication.toPOJO());
  }


  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete Publication by ID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @Delete(':id')
  @UsePipes(ValidateAuthorPipe)
  public async deletePublicationsById(@Param('id') id: string) {
    await this.publicationService.deletePublication(id);
  }


  @ApiResponse({
    type: PublicationRdo,
    status: HttpStatus.OK,
    description: 'Get Publication by ID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @Get(':id')
  @UsePipes(ValidateAuthorPipe)
  public async findPublicationById(@Param('id') id: string) {
    const publication = await this.publicationService.findPublicationById(id);
    return fillDto(PublicationRdo, publication.toPOJO());
  }


  @ApiResponse({
    type: PublicationRdo,
    status: HttpStatus.OK,
    description: 'Get Publications',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Get('')
  public async getPublications(@Query() query: PublicationQuery) {
    const data = await this.publicationService.getPublications(query);
    const dataWidthDto = {...data, entities: data.entities.map((entity) => fillDto(PublicationRdo, entity))}
    return dataWidthDto;
  }


  @ApiResponse({
    type: PublicationRdo,
    status: HttpStatus.OK,
    description: 'Get detail Publication',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Get('/detail/:id')
  public async getDetailPublication(@Param('id') publicationId: string) {
    const publication = await this.publicationService.findDetailPublicationById(publicationId);
    return fillDto(DetailPublicationRdo, publication);
  }


  @ApiResponse({
    type: UpdatePublicationDto,
    status: HttpStatus.OK,
    description: 'Publication changed',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidateAuthorPipe)
  public async updatePublications(@Param('id') publicationId: string, @Body() dto: UpdatePublicationDto, @Request() rec: RequestEx) {
    console.log(rec.user);
    const publication = await this.publicationService.updatedPublicationById(publicationId, dto);
    return fillDto(PublicationRdo, publication.toPOJO());
  }


  @ApiResponse({
    type: PublicationRdo,
    status: HttpStatus.OK,
    description: 'Get Publication by Title',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidateAuthorPipe)
  @Get('/searchtitle/:title')
  public async findPublicationByTitle(@Param('title') title: string) {
    const publications = await this.publicationService.getPublicationsByTitle(title);
    return fillDto(PublicationRdo, publications);
  }


  @ApiResponse({
    type: PublicationRdo,
    status: HttpStatus.OK,
    description: 'Get Publication by Status Draft',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @Get('/searchdrafts/:id')
  public async findDraftsPublications(@Param('id') userId: string) {
    const publications = await this.publicationService.getDraftsPublications(userId);
    return fillDto(PublicationRdo, publications);
  }


  @ApiResponse({
    type: PublicationRdo,
    status: HttpStatus.OK,
    description: 'Publication reposted',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Exist reposted publication',
  })
  @Post('/repost/:publicationId/:userId') public async repost(@Param('publicationId') publicationId: string, @Param('userId') userId: string) {
    const repostPublication = await this.publicationService.createRepostPublication(
      publicationId,
      userId
    );
    return fillDto(PublicationRdo, repostPublication.toPOJO());
  }
}
