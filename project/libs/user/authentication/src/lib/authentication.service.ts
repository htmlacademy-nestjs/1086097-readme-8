import { ConflictException, Injectable, UnauthorizedException, NotFoundException, Logger, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserRepository, UserEntity } from '@project/user-module';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_PASSWORD_WRONG, AUTH_USER_NOT_FOUND, INITIAL_VALUE, INITIAL_ARRAY } from './authentication.const';
import { Token, TokenPayload, User } from '@project/core';
import { UserNotifyService } from '@project/user-notify';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly notifyService: UserNotifyService
  ) {}

  public async register(dto: CreateUserDto): Promise<UserEntity>  {
    const { email, name, password } = dto;

    const publicUser = {
      id: '',
      email: email,
      name: name,
      avatar: '',
      passwordHash: '',
      createAt: new Date(),
      publicationsCount: INITIAL_VALUE,
      subscribers: INITIAL_ARRAY,
    };

    const existUser = await this.userRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }
    const userEntity = await new UserEntity(publicUser).setPassword(password);
    await this.userRepository.save(userEntity);
    await this.notifyService.registerSubscriber({email, name});
    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }
    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const existUser = await this.userRepository.findById(id.toString());

    if (!existUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return existUser;
  }

  public async createUserToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
