import 'multer';
import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { extension } from 'mime-types';

const FileError = {
  MimetypeError: 'Wrong file extension',
  InvalidSize: 'File size is too big',
} as const;

const MaxImageSizeInByte = {
  Avatar: 512000,
  Image: 1048576,
} as const;

const ImageType = {
  Avatar: 'avatar',
  Image: 'image',
} as const;

const ALLOWED_MIMETYPES = ['jpeg', 'jpg', 'png'];

@Injectable()
export class FileUploadPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    try {
      const { fieldname, size, mimetype } = value;
      const fileExtension = extension(mimetype);

      if (!fileExtension || !ALLOWED_MIMETYPES.includes(fileExtension)) {
        throw new BadRequestException(FileError.MimetypeError);
      }
      const maxSize = fieldname === ImageType.Avatar ? MaxImageSizeInByte.Avatar : MaxImageSizeInByte.Image;
      if (size > maxSize) {
        throw new BadRequestException(FileError.InvalidSize);
      }
      return value;
    } catch ({message}) {
      throw new BadRequestException(`Ошибка загрузки файла: ${message}`);
    }
  }
}
