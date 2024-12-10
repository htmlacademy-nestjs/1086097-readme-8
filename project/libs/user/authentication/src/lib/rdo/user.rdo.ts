import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public id!: string;

  @Expose()
  public email!: string;

  @Expose()
  public name!: string;

  @Expose()
  public avatar!: string;

  @Expose({ name: 'createdAt' })
  public createAt!: string;

  @Expose()
  public publicationsCount: number = 0;

  @Expose()
  public subscribers: string[] = null;
}
