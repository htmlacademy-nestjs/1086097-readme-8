import { IsString,
  MaxLength, MinLength,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsNumber,
  IsEnum
} from 'class-validator';
import { MinLengthCheck, MaxLengthCheck } from '@project/core'
import { PublicationStatus } from '@project/core';
import { PublicationType } from '@project/core';

export class CreateCommentDto {
  @IsString()
  public id?: string;
  @IsString()
  @IsMongoId()
  public userId!: string;
  @IsString()
  @MinLength(MinLengthCheck.CommentText)
  @MaxLength(MaxLengthCheck.CommentText)
  public text!: string;
}
