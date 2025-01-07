import { ConflictException, Injectable, Inject, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { dbMongoConfig } from '@project/config';
import { PublicUserRepository, PublicUserEntity } from '@project/user-module';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_PASSWORD_WRONG, INITIAL_VALUE, INITIAL_ARRAY } from './authentication.const';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly publicUserRepository: PublicUserRepository,

    @Inject(dbMongoConfig.KEY)
    private readonly dbConfig: ConfigType<typeof dbMongoConfig>,
  ) {}

  public async register(dto: CreateUserDto): Promise<PublicUserEntity>  {
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

    const existUser = await this.publicUserRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }
    const userEntity = await new PublicUserEntity(publicUser).setPassword( password);
    this.publicUserRepository.save(userEntity);
    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto): Promise<PublicUserEntity> {
    const { email, password } = dto;
    const existUser = await this.publicUserRepository.findByEmail(email);
    if (!existUser || !(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const existUser = await this.publicUserRepository.findById(id.toString());

    if (!existUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return existUser;
  }
}
