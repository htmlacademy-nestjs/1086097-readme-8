import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class LikeDto {
  @ApiProperty({
    description: 'User ID',
    example: '12345',
  })
  @IsMongoId()
  @IsString()
  public userId!: string;

  @ApiProperty({
    description: 'Publication ID',
    example: '12345',
  })
  @IsString()
  public publicationId!: string;
}
