import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class SearchPublicationQuery {
  @Transform(({ value }) => decodeURIComponent(value))
  @IsString()
  public title!: string;
}
