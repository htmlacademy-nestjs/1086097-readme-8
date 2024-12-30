import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicationEntity } from './publication.entity';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationFactory } from './publication.factory';
import { PrismaClientService } from '@project/models';

@Injectable()
export class PublicationRepository extends PublicationFactory {
  constructor(
    private readonly client: PrismaClientService
    ) {
    super();
  }

  public async createPublication(dto: CreatePublicationDto): Promise<PublicationEntity> {
    let newPublicationEntity = this.create(dto);

    const record = await this.client.publication.create({
      data: {
        ...newPublicationEntity.toPOJO(),
        comments: {
          connect: [],
        },
      },
    });
    // console.log(record);
    newPublicationEntity.publicationId = record.publicationId;
    return newPublicationEntity;
  }

  public async findPublicationById(publicationId: string): Promise<PublicationEntity> {

    const publication = await this.client.publication.findFirst({
      where: {
        publicationId,
      },
    });

    if (!publication) {
      // return null;
      throw new NotFoundException(`Publication with id ${publicationId} not found.`);
    }
    return this.create(publication);
  }

  public async deletePublicationById(publicationId: string): Promise<void> {
    await this.findPublicationById(publicationId);

    await this.client.publication.delete({
      where: {
        publicationId,
      },
    });
  }

  public async updatePublication(dto: UpdatePublicationDto): Promise<PublicationEntity> {
    await this.findPublicationById(dto.publicationId);
    const pojo = this.create(dto).toPOJO();
    const updatePublication = await this.client.publication.update({
      where: { publicationId: dto.publicationId },
      data: {
        userId: pojo.userId,
        titleVideo: pojo.titleVideo,
        video: pojo.video,
        titleText: pojo.titleText,
        announcement: pojo.announcement,
        text: pojo.text,
        quote: pojo.quote,
        author: pojo.author,
        photo: pojo.photo,
        link: pojo.link,
        descriptionLink: pojo.descriptionLink,
        tags: pojo.tags,
        createAt: pojo.createAt,
        publicStatus: pojo.publicStatus,
        publicType: pojo.publicType,
        isRepost: pojo.isRepost,
        originalAuthorId: pojo.originalAuthorId,
        originalPublicationId: pojo.originalPublicationId,
        commentsCount: pojo.commentsCount,
        likesCount: pojo.likesCount,
      }
    });

    return this.create(updatePublication);
  }

  public async find() {
    const publications = await this.client.publication.findMany();
    return publications.map((publication) => this.create(publication));
  }

  public async findPublicationByTitle(title: string): Promise<PublicationEntity[]> {
    const publications = await this.client.publication.findMany({
      where: {
        titleText: title,
      },
      include: {
        comments: true,
        likes: true,
      },
    });

    if (!publications) {
      throw new NotFoundException(`Publication with title ${title} not found.`);
    }
    return publications.map((publication) => this.create(publication));
  }
}
