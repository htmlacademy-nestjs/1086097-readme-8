import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PublicationStatus } from '@project/core';
import { Comment } from "@project/comment-module";

export class PublicationRdo {
  @ApiProperty({
    description: 'Publication ID',
    example: '12345',
  })
  @Expose()
  public publicationId!: string;
  @ApiProperty({
    description: 'User ID',
    example: '12345',
  })
  @Expose()
  public userId!: string;
  @ApiProperty({
    description: 'Video Title',
    example: 'Video Title',
  })
  @Expose()
  public titleVideo?: string;
  @ApiProperty({
    description: 'Video Link',
    example:
      'https://www.youtube.com/watch?v=2BcYD_F3QrA&list=RD2BcYD_F3QrA&start_radio=1',
  })
  @Expose()
  public video?: string;
  @ApiProperty({
    description: 'Text Title',
    example: 'Text Title',
  })
  @Expose()
  public titleText?: string;
  @ApiProperty({
    description: 'Announcement text',
    example: 'Время подключить базу данных.',
  })
  @Expose()
  public announcement?: string;
  @ApiProperty({
    description: 'Text Description',
    example: 'Пришло время подключить базу данных для первого микросервиса.',
  })
  @Expose()
  public text?: string;
  @ApiProperty({
    description: 'Quote Text',
    example:
      'Сервисы, предоставляющие REST API содержат документацию в формате OpenAPI',
  })
  @Expose()
  public quote?: string;
  @ApiProperty({
    description: 'Quote Author Name',
    example:
      'Игорь Антонов',
  })
  @Expose()
  public author?: string;
  @ApiProperty({
    description: 'Photo Link',
    example:
      'https://yandex.ru/images/search?text=%D0%9C%D0%BE%D1%80%D1%81%D0%BA%D0%B0%D1%8F%20%D0%A1%D0%B2%D0%B8%D0%BD%D0%BA%D0%B0&nl=1&source=morda',
  })
  @Expose()
  public photo?: string;
  @ApiProperty({
    description: 'Link',
    example: 'https://htmlacademy.ru',
  })
  @Expose()
  public link?: string;
  @ApiProperty({
    description: 'Link Description',
    example: 'HTMLAcademy',
  })
  @Expose()
  public descriptionLink?: string;
  @ApiProperty({
    description: 'Tags',
    example: 'Друзья',
  })
  @Expose()
  public tags?: string[];
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
  @ApiProperty({
    description: 'Publication Status',
    example: 'published',
  })
  @Expose()
  public publicStatus!: PublicationStatus;
  @ApiProperty({
    description: 'Publication Type',
    example: 'video',
  })
  @Expose()
  public publicType!: PublicationStatus;
  @ApiProperty({
    description: 'Repost Public',
    example: 'false',
  })
  @Expose()
  public isRepost!: boolean;
  @ApiProperty({
    description: 'Original Author ID',
    example: '12345',
  })
  @Expose()
  public originalAuthorId?: string;
  @ApiProperty({
    description: 'Original Publication ID',
    example: '1234',
  })
  @Expose()
  public originalPublicationId?: string;
  @ApiProperty({
    description: 'Comments Count',
    example: '1',
  })
  @Expose()
  public commentsCount!: number;
  @ApiProperty({
    description: 'Likes Count',
    example: '1',
  })
  @Expose()
  public likesCount!: number;
  @Expose()
  public comments?: Comment[];
}
