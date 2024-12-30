import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'User ID',
    example: '12345',
  })
  @IsString()
  @IsMongoId()
  public userId!: string;

  @ApiProperty({
    description: 'Video Title',
    example: 'Video Title',
  })
  @IsString()
  @MinLength(MinLengthCheck.Title)
  @MaxLength(MaxLengthCheck.Title)
  @IsOptional()
  @IsNotEmpty()
  public titleVideo?: string;
  @ApiProperty({
    description: 'Video Link',
    example:
      'https://www.youtube.com/watch?v=2BcYD_F3QrA&list=RD2BcYD_F3QrA&start_radio=1',
  })
  @IsString()
  @IsUrl()
  public video?: string;

  @ApiProperty({
    description: 'Text Title',
    example: 'Text Title',
  })
  @IsString()
  @MinLength(MinLengthCheck.Title)
  @MaxLength(MaxLengthCheck.Title)
  public titleText?: string;
  @ApiProperty({
    description: 'Announcement text',
    example: 'Время подключить базу данных.',
  })
  @IsString()
  @MinLength(MinLengthCheck.Announcement)
  @MaxLength(MaxLengthCheck.Announcement)
  public announcement?: string;
  @ApiProperty({
    description: 'Text Description',
    example: 'Пришло время подключить базу данных для первого микросервиса.',
  })
  @IsString()
  @MinLength(MinLengthCheck.Text)
  @MaxLength(MaxLengthCheck.Text)
  public text?: string;


  @ApiProperty({
    description: 'Quote Text',
    example:
      'Сервисы, предоставляющие REST API содержат документацию в формате OpenAPI',
  })
  @IsString()
  @MinLength(MinLengthCheck.Quote)
  @MaxLength(MaxLengthCheck.Quote)
  public quote?: string;
  @ApiProperty({
    description: 'Quote Author Name',
    example:
      'Игорь Антонов',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(MinLengthCheck.Author)
  @MaxLength(MaxLengthCheck.Author)
  public author?: string;


  @ApiProperty({
    description: 'Photo Link',
    example:
      'https://yandex.ru/images/search?text=%D0%9C%D0%BE%D1%80%D1%81%D0%BA%D0%B0%D1%8F%20%D0%A1%D0%B2%D0%B8%D0%BD%D0%BA%D0%B0&nl=1&source=morda',
  })
  @IsString()
  @IsNotEmpty()
  public photo?: string;


  @ApiProperty({
    description: 'Link',
    example: 'https://htmlacademy.ru',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  public link?: string;
  @ApiProperty({
    description: 'Link Description',
    example: 'HTMLAcademy',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(MaxLengthCheck.Description)
  public descriptionLink?: string;


  @ApiProperty({
    description: 'Tags',
    example: 'Друзья',
  })
  @IsString()
  @IsOptional()
  public tags?: string[];

  @ApiProperty({
    description: 'Publication Status',
    example: 'published',
  })
  @IsEnum(PublicationStatus)
  public publicStatus!: keyof typeof PublicationStatus;
  @ApiProperty({
    description: 'Publication Type',
    example: 'video',
  })
  @IsEnum(PublicationType)
  public publicType!: keyof typeof PublicationType;

  @ApiProperty({
    description: 'Repost Public',
    example: 'false',
  })
  @IsBoolean()
  @IsNotEmpty()
  public isRepost!: boolean;

  @ApiProperty({
    description: 'Original Author ID',
    example: '12345',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public originalAuthorId?: string;

  @ApiProperty({
    description: 'Original Publication ID',
    example: '1234',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public originalPublicationId?: string;

  @ApiProperty({
    description: 'Comments Count',
    example: '1',
  })
  @IsNumber()
  @IsNotEmpty()
  public commentsCount!: number;
  @ApiProperty({
    description: 'Likes Count',
    example: '1',
  })
  @IsNumber()
  @IsNotEmpty()
  public likesCount!: number;
}
