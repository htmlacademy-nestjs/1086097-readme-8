import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsUUID, IsMongoId } from 'class-validator';

import { SortDirection, PublicationStatus, PublicationType } from '@project/core';


const DEFAULT_PUBLICATION_COUNT_LIMIT = 25;
const DEFAULT_SORTING_TYPE = 'createAt';
const DEFAULT_SORTING_DIRECTION = SortDirection.Asc;
const DEFAULT_PUBLICATION_STATUS = PublicationStatus.Published;
const DEFAULT_PAGE_COUNT = 1;

export class PublicationQuery {
  @Transform(({ value }) => +value || DEFAULT_PUBLICATION_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_PUBLICATION_COUNT_LIMIT;

  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsNumber()
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;

  @IsMongoId()
  @IsOptional()
  public userId?: string;

  @IsOptional()
  public publicationType?: keyof typeof PublicationType;;

  @IsOptional()
  public publicationStatus?: keyof typeof PublicationStatus = DEFAULT_PUBLICATION_STATUS;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  @Transform(({ value }) => value || DEFAULT_SORTING_DIRECTION)
  public sortingDirection: SortDirection = DEFAULT_SORTING_DIRECTION;

  @Transform(({ value }) => value || DEFAULT_SORTING_TYPE)
  @IsOptional()
  public sortingType?: 'createAt' | 'commentsCount' | 'likesCount';

  @IsOptional()
  public tag?: string;

  // @IsUUID('all', { each: true })
  // @IsArray()
  // @IsOptional()
  // public categories?: string[];
}
