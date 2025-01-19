import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';


@Injectable()
export class ValidateAuthorPipe implements PipeTransform {
  public async transform(value: string, { type, data }: ArgumentMetadata) {
    console.log('ValidateAuthorPipe is called');
    console.log(value, 'value');
    console.dir(type, 'type');
    console.dir(data, 'data');
    console.log('fin');
    return value;
  }
}
