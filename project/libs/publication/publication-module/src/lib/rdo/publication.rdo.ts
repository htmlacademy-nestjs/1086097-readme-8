import { Expose } from 'class-transformer';
import { PublicationStatus } from '@project/core';

export class PublicationRdo {
  @Expose()
  public id?: string;
  @Expose()
  public userId!: string;
  @Expose()
  public titleVideo?: string;
  @Expose()
  public video?: string;
  @Expose()
  public titleText?: string;
  @Expose()
  public announcement?: string;
  @Expose()
  public text?: string;
  @Expose()
  public quote?: string;
  @Expose()
  public author?: string;
  @Expose()
  public photo?: string;
  @Expose()
  public link?: string;
  @Expose()
  public descriptionLink?: string;
  @Expose()
  public tags?: string[];
  @Expose()
  public createAt!: Date;
  @Expose()
  public updateAt!: Date;
  @Expose()
  public publicStatus!: PublicationStatus;
  @Expose()
  public publicType!: PublicationStatus;
  @Expose()
  public isRepost!: boolean;
  @Expose()
  public originalAuthorId?: string;
  @Expose()
  public originalPublicationId?: string;

  @Expose()
  public commentsCount!: number;
  @Expose()
  public likesCount!: number;
}
