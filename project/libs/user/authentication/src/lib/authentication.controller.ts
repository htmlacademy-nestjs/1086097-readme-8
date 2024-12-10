import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDto } from '@project/helpers';
import { UserRdo } from './rdo/user.rdo';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillDto(UserRdo, newUser.toPOJO());
  }

  @Post('login')
  public async find(@Body() dto: CreateUserDto) {
    const user = await this.authService.verifyUser(dto);
    return fillDto(UserRdo, user.toPOJO());
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const user = await this.authService.getUser(id);
    return fillDto(UserRdo, user.toPOJO());
  }
}
