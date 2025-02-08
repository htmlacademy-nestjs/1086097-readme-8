import { HttpService } from '@nestjs/axios';
import { Request, Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {Body, Controller, Get, HttpStatus, Param, Post, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors,} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginUserDto, CreateUserDto, ChangePasswordDto } from '@project/authentication';
import { CheckAuthGuard } from '@project/guards';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { MongoIdValidationPipe, FileUploadPipe } from '@project/pipes';

@ApiTags('User')
@Controller('/')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User registered successfully',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with this email already exists',
  })
  @Post('user/register')
  public async register(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.User}/register`, createUserDto);
    return data;
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successful',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Email or password is invalid',
  })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.User}/login`, loginUserDto);
    return data;
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new pair access/refresh tokens',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not authorized',
  })
  @UseGuards(CheckAuthGuard)
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.User}/refresh`, null, {
      headers: {'Authorization': req.headers['authorization']}
    });
    return data;
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password successfully changed',
  })
  @UseGuards(CheckAuthGuard)
  @Post('change-password')
  public async newPassword(@Req() req: Request & { user: any }, @Body() dto: ChangePasswordDto) {
    const id = req.user.sub;
    const { data } = await this.httpService.axiosRef.put(
      `${ApplicationServiceURL.User}/change-password`,
      {...dto, id},
    );
    return data;
  }



  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User data found',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User is not found',
  })
  @UseGuards(CheckAuthGuard)
  @Get('user/:id')
  public async show(@Param('id') id: MongoIdValidationPipe,  @Req() req: Request,) {
    const { data: user } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.User}/user/${id}`);
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Publication}/user/${id}`);
    return { ...user, publicationsCount: data };
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Avatar added successfully',
  })
  @Post('files/upload/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  public async uploadAvatar(@Req() req: Request, @UploadedFile(FileUploadPipe) file: Express.Multer.File) {
    const { data: avatar } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Files}/upload/avatar`,
      file,
      {headers: {'Content-Type': req.headers['content-type'],}}
    );

    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.User}`,
      { avatar: avatar.id },
      {headers: {Authorization: req.headers['authorization'],}}
    );

    return data;
  }
}
