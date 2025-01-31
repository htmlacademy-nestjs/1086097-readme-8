import {Body, Controller, Get, HttpStatus, Param, Post, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors,} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CreatePublicationDto, UpdatePublicationDto } from '@project/publication-module';
import { ApplicationServiceURL } from './app.config';
import { CheckAuthGuard } from '@project/guards';
import { UserIdInterceptor } from '@project/interceptors';

@ApiTags('Publications')
@ApiExtraModels(CreatePublicationDto, UpdatePublicationDto)
@Controller('/')
@UseFilters(AxiosExceptionFilter)
export class PublicController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Publication added successfully',
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('publications')
  public async create(@Body() dto: CreatePublicationDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Publication}/`,
      dto
    );
    return data;
  }
}
