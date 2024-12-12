import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public id?: string;
  @Expose()
  public userId!: string;
  @Expose()
  public publicationId!: string;
  @Expose()
  public text?: string;
   @Expose()
  public createAt!: Date;
  @Expose()
  public updateAt!: Date;
}
