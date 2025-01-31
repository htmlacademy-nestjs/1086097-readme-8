import { UserEntity } from '@project/user-module';

export interface RequestWithUser {
  user?: UserEntity;
}
