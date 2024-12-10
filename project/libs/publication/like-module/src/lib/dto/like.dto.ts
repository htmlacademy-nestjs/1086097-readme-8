import { IsMongoId, IsString } from 'class-validator';

export class LikeDto {
  @IsMongoId()
  @IsString()
  public userId!: string;

  @IsString()
  public publicationId!: string;
}
