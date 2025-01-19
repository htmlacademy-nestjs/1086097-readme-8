import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Body, Post, Get, Param, HttpStatus, UseGuards } from '@nestjs/common';

import { AuthenticationResponseMessage } from '@project/core';
import { MongoIdValidationPipe } from '@project/pipes';
import { JwtAuthGuard } from '@project/guards';
import { AuthenticationService } from './authentication.service';
import { fillDto } from '@project/helpers';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

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
  @Post('login')
  public async find(@Body() dto: LoginUserDto) {
    const user = await this.authService.verifyUser(dto);
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
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const user = await this.authService.getUser(id);
    return fillDto(UserRdo, user.toPOJO());
  }

  @UseGuards(JwtAuthGuard)
  @Get('/demo/:id')
  public async demoPipe(@Param('id') id: number) {
    console.log(typeof id);
  }
}
