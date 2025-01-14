import 'multer';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { extension } from 'mime-types';
import dayjs from 'dayjs';

import { FileStoreConfig } from '@project/config';
import { StoredFile } from '@project/core';
import { FileStoreFactory } from './file-store.factory';
import { FileStoreEntity } from './file-store.entity';
import { FileStoreRepository } from './file-store.repository';

@Injectable()
export class FileStoreService {
  private readonly logger = new Logger(FileStoreService.name);
  private readonly DATE_FORMAT = 'YYYY MM';

  constructor(
    @Inject(FileStoreConfig.KEY)
    private readonly config: ConfigType<typeof FileStoreConfig>,
    private readonly fileStoreRepository: FileStoreRepository,
  ) {}

  private getUploadDirectoryPath(): string {;
    return this.config.uploadDirectory;
  }

  private getSubUploadDirectoryPath(): string {
    const [year, month] = dayjs().format(this.DATE_FORMAT).split(' ');
    return join(year, month);
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), this.getSubUploadDirectoryPath(), filename);
  }

  public async writeFile(file: Express.Multer.File): Promise<StoredFile> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const subDirectory = this.getSubUploadDirectoryPath();
      const filename = randomUUID();
      const fileExtension = extension(file.mimetype).toString();
      const path = this.getDestinationFilePath(`${filename}.${fileExtension}`);

      await ensureDir(join(uploadDirectoryPath, subDirectory));
      await writeFile(path, file.buffer);

      return {
        fileExtension,
        filename,
        path,
        subDirectory,
      };
    } catch ({message}) {
      this.logger.error(`Error while saving file: ${message}`);
      throw new Error(`Can't save file`);
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<FileStoreEntity> {
    const storedFile = await this.writeFile(file);
    const fileEntity = new FileStoreFactory().create({
      hashName: storedFile.filename,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: storedFile.path,
      size: file.size,
      subDirectory: storedFile.subDirectory,
      createdAt: undefined,
      updatedAt: undefined,
    });

    await this.fileStoreRepository.save(fileEntity);
    return fileEntity;
  }

  public async getFile(fileId: string): Promise<FileStoreEntity> {
    const existFile = await this.fileStoreRepository.findById(fileId);

    if (!existFile) {
      throw new NotFoundException(`File with ${fileId} not found.`);
    }

    return existFile;
  }
}
