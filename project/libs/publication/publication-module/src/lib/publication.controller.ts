import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Body, Post, Get, Param, Patch, Delete, NotFoundException, HttpStatus } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { fillDto } from '@project/helpers';
import { PublicationRdo } from './rdo/publication.rdo';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@ApiTags('Publication')
@Controller('publications')
export class PublicationController {
  constructor(
    private readonly publicationServiceRepository: PublicationRepository
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
    const publication = await this.publicationServiceRepository.createPublication(dto);
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
  public async findPublications() {
    const publications = await this.publicationServiceRepository.find();
    return publications;
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
  public async findPublicationsById(@Param('id') id: string) {
    const publication = await this.publicationServiceRepository.findPublicationById(id);

    if (! publication) {
      throw new NotFoundException(`Publication with id ${id} not found`);
    }
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
  public async deletePublicationsById(@Param('id') id: string) {
    await this.publicationServiceRepository.deletePublicationById(id);
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
  @Patch()
  public async updatePublications(@Body() dto: UpdatePublicationDto) {
    const publication = await this.publicationServiceRepository.updatePublication(dto);
    if (! publication) {
      throw new NotFoundException(`Publication with id ${dto.id} not found`);
    }
    return fillDto(PublicationRdo, publication.toPOJO());
  }
}
