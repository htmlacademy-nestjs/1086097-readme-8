import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoRepository } from '@project/data-access';

import { FileStoreEntity } from './file-store.entity';
import { FileStoreFactory } from './file-store.factory';
import { FileStoreModel } from './file-store.model';

@Injectable()
// @ts-ignore
export class FileStoreRepository extends BaseMongoRepository<FileStoreEntity, FileStoreModel> {
  constructor(
    entityFactory: FileStoreFactory,
    @InjectModel(FileStoreModel.name) fileModel: Model<FileStoreModel>
    ) {
    super(entityFactory, fileModel);
  }
}
