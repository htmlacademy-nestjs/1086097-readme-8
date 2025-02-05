import { ConflictException, NotFoundException, Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ApplicationServiceURL } from '@project/core';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ValidateAuthorForCommitGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const {id} = request.params;
    const { data: commit } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comment}/${id}`,);
    if (!commit) {
      throw new NotFoundException(`Commit not found.`);
    }
    const { data: user } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.User}/check`, {}, {headers: {Authorization: request.headers['authorization'],},});
    if (!user) {
      throw new NotFoundException(`User not found.`);
    }
    if (commit.userId !== user.sub) {
      throw new ConflictException(`Chto zhe ty zhopa delaesh`);
    }
    return true;
  }
}
