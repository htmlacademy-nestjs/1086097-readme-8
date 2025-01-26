import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '12345',
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@host.local',
  })
  @Expose()
  public email!: string;

  @ApiProperty({
    description: 'User name',
    example: 'Иванов А.',
  })
  @Expose()
  public name!: string;

  @ApiProperty({
    description: 'Token',
    example: 'sdfsdfsdf.sdfsdf',
  })
  @Expose()
  public accessToken!: string;

  @ApiProperty({
    description: 'Refresh token',
  })
  @Expose()
  public refreshToken: string;
}
