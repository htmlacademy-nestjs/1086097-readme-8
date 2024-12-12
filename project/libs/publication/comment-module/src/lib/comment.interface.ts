export interface Comment {
  id?: string;
  publicationId: string;
  userId: string;
  text: string;
  createAt?: Date;
  updateAt?: Date;
}
