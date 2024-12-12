import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { PublicationEntity } from './publication.entity';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationFactory } from './publication.factory';

@Injectable()
export class PublicationRepository extends BaseMemoryRepository<PublicationEntity> {
  constructor(entityFactory: PublicationFactory) {
    super(entityFactory);
  }

  public async createPublication(dto: CreatePublicationDto): Promise<PublicationEntity> {
    const newPublicationEntity = new PublicationEntity(dto);
    await this.save(newPublicationEntity);
    return newPublicationEntity;
  }

  public async findPublicationById(id: string): Promise<PublicationEntity | null> {
    const publication = await this.findById(id);

    if (! publication) {
      return null;
    }
    // return new PublicationEntity(publication);
    return publication;
  }


  public async updatePublication(dto: UpdatePublicationDto): Promise<PublicationEntity | null> {
    const entities = Array.from(this.entities.values());
    const publication = entities.find((entity) => entity.id === dto.id);

    if (! publication) {
      return null;
    }

    return new PublicationEntity({...publication, ...dto});
  }

  public async deletePublicationById(id: string): Promise<void> {
    await this.deleteById(id);
  }

  public async find() {
    const entities = Array.from(this.entities.values());
    return entities;
  }

  public async findByTile(title: string): Promise<PublicationEntity | null> {
    const entities = Array.from(this.entities.values());
    const publication = entities.find((entity) => entity.titleText && entity.titleText.includes(title));

    if (! publication) {
      return null;
    }

    return new PublicationEntity(publication);
  }
}
