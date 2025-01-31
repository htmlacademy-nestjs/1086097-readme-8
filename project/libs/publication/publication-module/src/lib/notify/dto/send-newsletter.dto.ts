import { Publication } from '@project/core';

export class SendNewsletterDto {
  public id!: string;
  public email!: string;
  public publication!: Publication;
}
