import { Comment } from './comment.interface';
import { StorableEntity, Entity } from '@project/core';

export class CommentEntity extends Entity implements StorableEntity<Comment>  {
    public publicationId!: string;
    public userId!: string;
    public text!: string;
    public createAt!: Date;
    public updateAt!: Date;

    constructor(data: Comment) {
      super()
      this.populate(data);
    }

    public populate(data: Comment) {
      if (!data) {
        return;
      }

      this.id = data.id ?? ''
      this.publicationId = data.publicationId;
      this.userId = data.userId;
      this.text = data.text;
      this.createAt = data.createAt ?? new Date();
      this.updateAt = data.updateAt ?? new Date();
    }

    public toPOJO() {
      return {
        id: this.id,
        publicationId: this.publicationId,
        userId: this.userId,
        text: this.text,
        createAt: this.createAt,
        updateAt: this.updateAt,
      };
    }
  }
