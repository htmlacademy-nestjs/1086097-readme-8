import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LikeRdo {
  @ApiProperty({
    description: 'Like ID',
    example: '12345',
  })
  @Expose()
  public id?: string;
  @ApiProperty({
    description: 'User ID',
    example: '12345',
  })
  @Expose()
  public userId?: string;
  @ApiProperty({
    description: 'Publication ID',
    example: '12345',
  })
  @Expose()
  public publicationId?: string;
}
