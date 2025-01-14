import { Entity, FileStore, StorableEntity } from '@project/core';

export class FileStoreEntity extends Entity implements StorableEntity<FileStore> {
  public originalName!: string;
  public subDirectory!: string;
  public size!: number;
  public mimetype!: string;
  public hashName!: string;
  public path!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  constructor (file?: FileStore) {
    super();
    this.populate(file);
  }

  public populate(file?: FileStore): void {
    if (!file) {
      return;
    }

    this.id = file.id ?? '';
    this.originalName = file.originalName;
    this.subDirectory = file.subDirectory;
    this.size = file.size;
    this.mimetype = file.mimetype;
    this.hashName = file.hashName;
    this.path = file.path;
    this.createdAt = file.createdAt ?? new Date();
    this.updatedAt = file.updatedAt ?? new Date();
  }

  public toPOJO(): FileStore {
    return {
      id: this.id,
      originalName: this.originalName,
      size: this.size,
      mimetype: this.mimetype,
      hashName: this.hashName,
      path: this.path,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      subDirectory: this.subDirectory,
    }
  }
}
