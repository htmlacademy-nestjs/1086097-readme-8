import { PublicationStatus, PublicationType } from "@project/core";
import { Comment } from "@project/comment-module";

export interface Publication {
  publicationId?: string;
  userId: string;

  titleVideo?: string | null;
  video?: string | null;

  titleText?: string | null;
  announcement?: string | null;
  text?: string | null;

  quote?: string | null;
  author?: string | null;

  photo?: string | null;

  link?: string | null;
  descriptionLink?: string | null;

  tags?: string[];
  createAt?: Date;
  updateAt?: Date;
  publicStatus: keyof typeof PublicationStatus;
  publicType: keyof typeof PublicationType;

  isRepost?: boolean;
  originalAuthorId?: string | null;
  originalPublicationId?: string | null;

  commentsCount: number;
  likesCount: number;
  comments?: Comment[];
}
