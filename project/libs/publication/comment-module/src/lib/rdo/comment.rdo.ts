import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'Comment ID',
    example: '12345',
  })
  @Expose()
  public id!: string;
  @Expose()
  @ApiProperty({
    description: 'User ID',
    example: '12345',
  })
  public userId!: string;
  @ApiProperty({
    description: 'Publication ID',
    example: '12345',
  })
  @Expose()
  public publicationId!: string;
  @ApiProperty({
    description: 'Text of comment',
    example: 'Бесплатный сервис позволяет мгновенно переводить слова.',
  })
  @Expose()
  public text?: string;
  @ApiProperty({
    description: 'Create Date',
    example: '2024-13-12',
  })
  @Expose()
  public createAt!: Date;
  @ApiProperty({
    description: 'Update Date',
    example: '2024-13-12',
  })
  @Expose()
  public updateAt!: Date;
}
