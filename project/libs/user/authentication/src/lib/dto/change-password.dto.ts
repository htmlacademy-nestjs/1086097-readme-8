import { ApiProperty } from '@nestjs/swagger';
import { MinLengthCheck, MaxLengthCheck } from '@project/core';
import { MaxLength, MinLength, IsMongoId } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Old User Password',
    example: '123456',
  })
  public oldPassword!: string;

  @ApiProperty({
    description: 'New User Password',
    example: '7891011',
  })
  @MinLength(MinLengthCheck.Password)
  @MaxLength(MaxLengthCheck.Password)
  public newPassword!: string;

  @ApiProperty({
    description: 'User ID',
    example: '12313213213',
  })
  @IsMongoId()
  public id!: string;
}
