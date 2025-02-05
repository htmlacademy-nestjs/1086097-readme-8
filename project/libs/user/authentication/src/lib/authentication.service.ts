import { ConflictException, Injectable, Inject, UnauthorizedException, NotFoundException, Logger, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { jwtConfig } from '@project/config';
import { UserRepository, UserEntity } from '@project/user-module';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AUTH_USER_EXISTS, AUTH_USER_PASSWORD_WRONG, AUTH_USER_NOT_FOUND, INITIAL_VALUE, INITIAL_ARRAY } from './authentication.const';
import { Token, TokenPayload, User } from '@project/core';
import { UserNotifyService } from '@project/user-notify';
import { createJWTPayload } from '@project/helpers';
import { RefreshTokenService } from './refresh-module/refresh-token.service';
import crypto from 'node:crypto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly notifyService: UserNotifyService,
    private readonly refreshTokenService: RefreshTokenService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
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

  public async changePassword(dto: ChangePasswordDto) {
    const { oldPassword, newPassword, id } = dto;
    const existUser = await this.userRepository.findById(id);

    if (!(await existUser.comparePassword(oldPassword))) {
      throw new ConflictException(AUTH_USER_PASSWORD_WRONG);
    }

    const userEntity = await new UserEntity(existUser).setPassword(newPassword);
    return this.userRepository.update(userEntity);
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
    if (!existUser) {throw new NotFoundException(`User with id ${id} not found`);}
    return existUser;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload: TokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {...accessTokenPayload, tokenId: crypto.randomUUID() }
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) {throw new NotFoundException(`User with email ${email} not found`);}
    return existUser;
  }

  public async updateAvatar(id: string, { avatarId }) {
    const user = await this.getUser(id);
    const userEntity = new UserEntity({...user, avatar: avatarId, id});
    return this.userRepository.update(userEntity);
  }

  public async subscribeUser(userId: string, subscriberId: string) {
    console.log();
    const user = await this.userRepository.findById(userId);
    const subscriberUser = await this.userRepository.findById(subscriberId);

    if (!user) { throw new NotFoundException(`User with id ${userId} not found`);}
    if (user.subscriptions.includes(subscriberId)) {throw new ConflictException(`You are already subscribed to this author`);}

    user.subscriptions.push(subscriberId);
    const userEntity = new UserEntity(user);

    subscriberUser.subscribers.push(userId);
    const subscriberEntity = new UserEntity(subscriberUser);
    await this.userRepository.update(subscriberEntity);

    return this.userRepository.update(userEntity);
  }

  public async unsubscribeUser(userId: string, subscriberId: string) {
    const user = await this.userRepository.findById(userId);
    const subscriberUser = await this.userRepository.findById(subscriberId);

    if (!user) { throw new NotFoundException(`User with id ${userId} not found`);}
    if (!user.subscriptions.includes(subscriberId)) {throw new ConflictException(`You are not subscribed to this author`);}

    user.subscriptions = [...user.subscriptions.filter((id) => id !== subscriberId)];
    const userEntity = new UserEntity(user);

    subscriberUser.subscribers = [...subscriberUser.subscribers.filter((id) => id !== userId)];
    const subscriberEntity = new UserEntity(subscriberUser);
    await this.userRepository.update(subscriberEntity);

    return this.userRepository.update(userEntity);
  }
}
