import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { SortDirection } from '@project/core';

export const MAX_COMMENTS_COUNT = 50;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;

export class CommentQuery {
  @Transform(({ value }) => +value || MAX_COMMENTS_COUNT)
  @IsNumber()
  @IsOptional()
  public limit = MAX_COMMENTS_COUNT;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}
