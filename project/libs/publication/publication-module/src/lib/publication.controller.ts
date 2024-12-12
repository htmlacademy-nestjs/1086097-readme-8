import { Controller, Body, Post, Get, Param, Patch, Delete, NotFoundException, ConsoleLogger } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { fillDto } from '@project/helpers';
import { PublicationRdo } from './rdo/publication.rdo';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Controller('publications')
export class PublicationController {
  constructor(
    private readonly service: PublicationRepository
  ) {}

  @Post('')
  public async save(@Body() dto: CreatePublicationDto) {
    const publication = await this.service.createPublication(dto);
    return fillDto(PublicationRdo, publication.toPOJO());
  }

  @Get('')
  public async findPublications() {
    const publications = await this.service.find();
    return publications;
  }

  @Get(':id')
  public async findPublicationsById(@Param('id') id: string) {
    const publication = await this.service.findPublicationById(id);

    if (! publication) {
      throw new NotFoundException(`Publication with id ${id} not found`);
    }
    return fillDto(PublicationRdo, publication.toPOJO());
  }

  @Delete(':id')
  public async deletePublicationsById(@Param('id') id: string) {
    await this.service.deletePublicationById(id);
  }

  @Patch()
  public async updatePublications(@Body() dto: UpdatePublicationDto) {
    const publication = await this.service.updatePublication(dto);
    if (! publication) {
      throw new NotFoundException(`Publication with id ${dto.id} not found`);
    }
    return fillDto(PublicationRdo, publication.toPOJO());
  }
}
