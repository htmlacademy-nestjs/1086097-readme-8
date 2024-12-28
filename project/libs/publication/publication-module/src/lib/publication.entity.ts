import { Publication } from './publication.interface';
import { StorableEntity, Entity } from '@project/core';
import { PublicationStatus } from '@project/core';
import { PublicationType } from '@project/core';
import { Comment } from '@project/comment-module';

export class PublicationEntity implements StorableEntity<Publication> {
  public publicationId?: string;
  public userId!: string;

  public titleVideo?: string;
  public video?: string;

  public titleText?: string;
  public announcement?: string;
  public text?: string;

  public quote?: string;
  public author?: string;

  public photo?: string;

  public link?: string;
  public descriptionLink?: string;

  public tags?: string[];
  public createAt?: Date;
  public updateAt?: Date;
  public publicStatus!: keyof typeof PublicationStatus;
  public publicType!: keyof typeof PublicationType;

  public isRepost!: boolean;
  public originalAuthorId?: string;
  public originalPublicationId?: string;

  public commentsCount!: number;
  public likesCount!: number;
  public comments?: Comment[];

  constructor(data: Publication) {
    this.populate(data);
  }

  public populate(data: Publication): void {
    if (!data) {
      return;
    }

    this.publicationId = data.publicationId ?? undefined;
    this.userId = data.userId;

    this.titleVideo = data.titleVideo ?? undefined;
    this.video = data.video ?? undefined;

    this.titleText = data.titleText ?? undefined;
    this.announcement = data.announcement ?? undefined;
    this.text = data.text ?? undefined;

    this.quote = data.quote ?? undefined;
    this.author = data.author ?? undefined;

    this.photo = data.photo ?? undefined;

    this.link = data.link ?? undefined;
    this.descriptionLink = data.descriptionLink ?? undefined;

    this.tags = data.tags ?? undefined;
    this.createAt = data.createAt ?? new Date();
    this.updateAt = data.updateAt ?? new Date();
    this.publicStatus = data.publicStatus;
    this.publicType = data.publicType;


    this.isRepost = data.isRepost || false;
    this.originalAuthorId = data.originalAuthorId ?? undefined;
    this.originalPublicationId = data.originalPublicationId ?? undefined;

    this.commentsCount = data.commentsCount || 0;
    this.likesCount = data.likesCount || 0;
    this.comments = data.comments || [];
  }

  public toPOJO() {
    return {
      publicationId: this.publicationId,
      userId: this.userId,
      titleVideo: this.titleVideo,
      video: this.video,
      titleText: this.titleText,
      announcement: this.announcement,
      text: this.text,
      quote: this.quote,
      author: this.author,
      photo: this.photo,
      link: this.link,
      descriptionLink: this.descriptionLink,
      tags: this.tags,
      createAt: this.createAt,
      updateAt: this.updateAt,
      publicStatus: this.publicStatus,
      publicType: this.publicType,
      isRepost: this.isRepost,
      originalAuthorId: this.originalAuthorId,
      originalPublicationId: this.originalPublicationId,
      commentsCount: this.commentsCount,
      likesCount: this.likesCount,
      comments: this.comments,
    };
  }
}
