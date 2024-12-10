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

export class CreatePublicationDto {
  @IsString()
  public id?: string;
  @IsString()
  @IsMongoId()
  public userId!: string;


  @IsString()
  @IsNotEmpty()
  @MinLength(MinLengthCheck.Title)
  @MaxLength(MaxLengthCheck.Title)
  public titleVideo?: string;
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  public video?: string;


  @IsString()
  public titleText?: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(MinLengthCheck.Announcement)
  @MaxLength(MaxLengthCheck.Announcement)
  public announcement?: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(MinLengthCheck.Text)
  @MaxLength(MaxLengthCheck.Text)
  public text?: string;


  @IsString()
  @IsNotEmpty()
  @MinLength(MinLengthCheck.Quote)
  @MaxLength(MaxLengthCheck.Quote)
  public quote?: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(MinLengthCheck.Author)
  @MaxLength(MaxLengthCheck.Author)
  public author?: string;


  @IsString()
  @IsNotEmpty()
  public photo?: string;


  @IsString()
  @IsNotEmpty()
  @IsUrl()
  public link?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(MaxLengthCheck.Description)
  public descriptionLink?: string;


  @IsString()
  @IsOptional()
  public tags?: string[];

  @IsEnum(PublicationStatus)
  public publicStatus!: PublicationStatus;
  @IsEnum(PublicationType)
  public publicType!: PublicationType;


  @IsBoolean()
  @IsNotEmpty()
  public isRepost!: boolean;
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  public originalAuthorId?: string;
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  public originalPublicationId?: string;


  @IsNumber()
  @IsNotEmpty()
  public commentsCount!: number;
  @IsNumber()
  @IsNotEmpty()
  public likesCount!: number;
}
