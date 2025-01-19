import { IsArray, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { emailDtoMessage } from './email.dto.message';
import { Publication } from '@project/publication-module';

export class NewsletterDto {
  @ApiProperty({
    description: 'User email',
    example: 'keks.mail.local',
  })
  @IsEmail({}, { message: emailDtoMessage.EMAIL_NOT_VALID })
  public email!: string;

  @IsArray()
  public publications!: Publication[];

  @ApiProperty({
    description: 'Newsletter ID',
    example: '12345',
  })
  @IsString()
  public id!: string;
}
