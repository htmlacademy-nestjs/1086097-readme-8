import { Controller, NotFoundException, Get, Param } from '@nestjs/common';
import { PublicUserRepository } from './public-user.repository';
import { UserRdo } from '@project/authentication'
import { fillDto } from '@project/helpers';

@Controller('users')
export class PublicUserController {
  constructor(
    private readonly userService: PublicUserRepository
  ) {}

  @Get(':email')
  public async show(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    console.log(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return fillDto(UserRdo, user.toPOJO());
  }
}
