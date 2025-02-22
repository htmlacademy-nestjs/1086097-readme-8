import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, NotFoundException, Get, Param, HttpStatus } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserRdo } from '@project/authentication'
import { fillDto } from '@project/helpers';
import { AuthenticationResponseMessage } from '@project/core';

@ApiTags('users')
@Controller('users')
export class PublicUserController {
  constructor(
    private readonly userServiceRepository: UserRepository
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })

  @Get(':email')
  public async show(@Param('email') email: string) {
    const user = await this.userServiceRepository.findByEmail(email)
    return user && fillDto(UserRdo, user.toPOJO());
  }
}
