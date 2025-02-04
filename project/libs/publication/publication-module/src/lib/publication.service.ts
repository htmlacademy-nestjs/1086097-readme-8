import { Injectable } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationQuery } from './publicationQuery';
import { PublicationEntity } from './publication.entity';
import { SearchPublicationQuery } from './dto/search.query';
import { PublicationNotifyService } from './notify/notify.service';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationRepository: PublicationRepository,
    private readonly publicationNotifyService: PublicationNotifyService,
    ) {}

    public async createPublication(dto: CreatePublicationDto) {
      const publication = await this.publicationRepository.createPublication(dto);

      await this.publicationNotifyService.sendNewsletter({
        email: 'ya@dont_now.ru',
        publication,
        id: publication.userId,
      });

      return publication;
    }

    public async deletePublication(publicationId: string) {
      return await this.publicationRepository.deletePublicationById(publicationId);
    }

    public async findPublicationById(publicationId: string) {
      const publication = await this.publicationRepository.findPublicationById(publicationId);
      return publication;
    }

    public async findDetailPublicationById(publicationId: string) {
      const publication = await this.publicationRepository.findPublicationById(publicationId);
      return publication;
    }

    public async updatedPublicationById(publicationId: string, dto: UpdatePublicationDto) {
      const publication = await this.publicationRepository.updatePublication(publicationId, dto);
      return publication;
    }

    public async getPublications(query: PublicationQuery) {
      const publications = await this.publicationRepository.find(query);
      return publications;
    }

    public async getPublicationsByTitle(query: SearchPublicationQuery) {
      const publications = await this.publicationRepository.findPublicationsByTitle(query);
      return publications;
    }

    public async getDraftsPublications(userId: string) {
      return await this.publicationRepository.findDrafts(userId);
    }

    public async getPublicationsCountByUserId(userId: string) {
      const count =  await this.publicationRepository.getPublicationsByUserId(userId);
      return count;
    }

    public async createRepostPublication(publicationId: string, userId: string): Promise<PublicationEntity> {
      const repostingPublication = await this.publicationRepository.findPublicationById(publicationId);
      await this.publicationRepository.findRepost(publicationId, userId);

      repostingPublication.publicationId = undefined;
      repostingPublication.originalPublicationId = publicationId;
      repostingPublication.originalAuthorId = repostingPublication.userId;
      repostingPublication.isRepost = true;
      repostingPublication.userId = userId;
      repostingPublication.commentsCount = 0;
      repostingPublication.likesCount = 0;

      return await this.publicationRepository.createPublication(repostingPublication);
    }
}
