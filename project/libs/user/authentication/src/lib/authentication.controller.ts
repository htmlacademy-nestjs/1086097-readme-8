import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Body, Post, Get, Req, Put, Param, HttpStatus, UseGuards, HttpCode } from '@nestjs/common';

import { AuthenticationResponseMessage, RequestWithUser } from '@project/core';
import { MongoIdValidationPipe } from '@project/pipes';
import { JwtAuthGuard, LocalAuthGuard, JwtRefreshGuard } from '@project/guards';
import { AuthenticationService } from './authentication.service';
import { fillDto } from '@project/helpers';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async find(@Req() {user}: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, {...user.toPOJO(), ...userToken});
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const user = await this.authService.getUser(id);
    return fillDto(UserRdo, user.toPOJO());
  }


  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Current password is wrong',
  })
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Password has changed',
  })
  @Put('change-password')
  public async newPassword(@Body() dto: ChangePasswordDto) {
    const existUser = await this.authService.changePassword(dto);
    return fillDto(UserRdo, existUser);
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Avatar is update',
  })
  @UseGuards(JwtAuthGuard)
  @Put('avatar/:userId')
  public async updateAvatar(@Param('userId') userId: string, @Body() dto) {
    return this.authService.updateAvatar(userId, dto);
  }


  @UseGuards(JwtAuthGuard)
  @Put('subscribe/:subscriberId')
  public async subscribeUser(@Param('subscriberId') subscriberId: string, @Req() { user }) {
    return this.authService.subscribeUser(user.sub, subscriberId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('unsubscribe/:subscriberId')
  public async unsubscribeUser(@Param('subscriberId') subscriberId: string, @Req() { user }) {
    return this.authService.unsubscribeUser(user.sub, subscriberId);
  }


  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() {user}: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/demo/:id')
  public async demoPipe(@Param('id') id: number) {
    console.log(typeof id);
  }
}
