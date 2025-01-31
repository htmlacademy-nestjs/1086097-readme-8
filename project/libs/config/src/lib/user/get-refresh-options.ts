import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export async function getRefreshOptions(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwt.JWT_REFRESH_TOKEN_SECRET'),
    signOptions: {
      expiresIn: configService.get<string>('jwt.JWT_REFRESH_TOKEN_EXPIRES_IN'),
      algorithm: 'HS256',
    }
  }
}
