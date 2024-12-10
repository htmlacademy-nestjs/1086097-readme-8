import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { AUTH_USER_EMAIL_NOT_VALID } from '../authentication.const';
import { MinLengthCheck, MaxLengthCheck } from '@project/core';

export class CreateUserDto {
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email!: string;

  @IsString()
  @MinLength(MinLengthCheck.Name)
  @MaxLength(MaxLengthCheck.Name)
  public name!: string;

  @IsString()
  @MinLength(MinLengthCheck.Password)
  @MaxLength(MaxLengthCheck.Password)
  public password!: string;
}
