import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '@project/core';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.data);
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.User}/check`, {}, {headers: {Authorization: request.headers['authorization'],},});

    request['user'] = data;
    return true;
  }
}
