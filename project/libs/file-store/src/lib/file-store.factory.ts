import { Injectable } from '@nestjs/common';

import { FileStore, EntityFactory } from '@project/core';
import { FileStoreEntity } from './file-store.entity';

@Injectable()
export class FileStoreFactory implements EntityFactory<FileStoreEntity> {
  public create(entityPlainData: FileStore): FileStoreEntity {
    return new FileStoreEntity(entityPlainData);
  }
}
