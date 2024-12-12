import { PublicationStatus } from "@project/core";
import { PublicationType } from '@project/core';

export interface Publication {
  // publicationId?: string;
  id?: string;
  userId: string;

  titleVideo?: string;
  video?: string;

  titleText?: string;
  announcement?: string;
  text?: string;

  quote?: string;
  author?: string;

  photo?: string;

  link?: string;
  descriptionLink?: string;

  tags?: string[];
  createAt?: Date;
  updateAt?: Date;
  publicStatus: PublicationStatus;
  publicType: PublicationType;

  isRepost?: boolean;
  originalAuthorId?: string;
  originalPublicationId?: string;

  commentsCount: number;
  likesCount: number;
}
