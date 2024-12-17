import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { AUTH_USER_EMAIL_NOT_VALID } from '../authentication.const';
import { MinLengthCheck, MaxLengthCheck } from '@project/core';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@host.local',
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email!: string;


  @ApiProperty({
    description: 'User name',
    example: 'Nick',
  })
  @IsString()
  @MinLength(MinLengthCheck.Name)
  @MaxLength(MaxLengthCheck.Name)
  public name!: string;


  @ApiProperty({
    description: 'User password',
    example: '12345678',
  })
  @IsString()
  @MinLength(MinLengthCheck.Password)
  @MaxLength(MaxLengthCheck.Password)
  public password!: string;
}
