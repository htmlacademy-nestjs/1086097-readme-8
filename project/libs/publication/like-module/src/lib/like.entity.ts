import { Like } from './like.interface';
import { StorableEntity, Entity } from '@project/core';

export class LikeEntity extends Entity implements StorableEntity<Like>  {
    public publicationId!: string;
    public userId!: string;

    constructor(data: Like) {
      super()
      this.populate(data);
    }

    public populate(data: Like) {
      if (!data) {
        return;
      }

      this.id = data.id ?? ''
      this.publicationId = data.publicationId;
      this.userId = data.userId;
    }

    public toPOJO() {
      return {
        id: this.id,
        publicationId: this.publicationId,
        userId: this.userId,
      };
    }
  }
