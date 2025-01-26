import { UnauthorizedException } from '@nestjs/common';

export class TokenNotFoundException extends UnauthorizedException {
  constructor(tokenId: string) {
    super(`Token with ID ${tokenId} not found`);
  }
}
