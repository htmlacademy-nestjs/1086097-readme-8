import { IsEmail, IsNotEmpty } from 'class-validator';
import { emailDtoMessage } from './email.dto.message';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriberDto {
  @ApiProperty({
    description: 'User email',
    example: 'keks.mail.local',
  })
  @IsEmail({}, { message: emailDtoMessage.EMAIL_NOT_VALID })
  public email!: string;

  @ApiProperty({
    description: 'User name',
    example: 'keks',
  })
  @IsNotEmpty({ message: emailDtoMessage.FIRST_NAME_IS_EMPTY })
  public name!: string;
}
