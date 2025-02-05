import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform  } from 'class-transformer';

export class UserRdo {
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
    example: 'Nick',
  })
  @Expose()
  public name!: string;

  @ApiProperty({
    description: 'User avatar',
    example: '/images/user.jpg',
  })
  @Expose()
  public avatar!: string;

  @ApiProperty({
    description: 'User registration date',
  })
  @Expose({ name: 'createAt' })
  public createdAt: string;

  @ApiProperty({
    description: 'User posts amount',
    example: '0',
  })
  @Expose()
  public publicationsCount: number = 0;

  @ApiProperty({
    description: 'User subscribers',
    example: ['12344', '12345'],
  })
  @Expose()
  public subscribers: string[] = null;

  @ApiProperty({
    description: 'User subscriptions',
    example: ['12344', '12345'],
  })
  @Expose()
  public subscriptions: string[] = null;
}
