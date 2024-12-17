import { ApiProperty } from '@nestjs/swagger';

import { IsString, MaxLength, MinLength, IsMongoId } from 'class-validator';
import { MinLengthCheck, MaxLengthCheck } from '@project/core'

export class CreateCommentDto {
  @ApiProperty({
    description: 'User ID',
    example: '12345',
  })
  @IsString()
  @IsMongoId()
  public userId!: string;
  @ApiProperty({
    description: 'Text of comment',
    example: 'Бесплатный сервис позволяет мгновенно переводить слова.',
  })
  @IsString()
  @MinLength(MinLengthCheck.CommentText)
  @MaxLength(MaxLengthCheck.CommentText)
  public text!: string;
}
