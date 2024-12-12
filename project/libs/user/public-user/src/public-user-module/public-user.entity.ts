import { AuthUser, StorableEntity  } from '@project/core';
import { hash, genSalt, compare } from 'bcrypt';
import { Entity } from '@project/core';

export const SALTS = 14;

export class PublicUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email!: string;
  public name!: string;
  public avatar!: string;
  public createAt!: Date;
  public publicationsCount!: number;
  public subscribers?: string[];
  public passwordHash!: string;

  constructor(user: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.name = user.name;
    this.avatar = user.avatar;
    this.passwordHash = user.passwordHash;
    this.createAt = user.createAt ?? new Date();
    this.publicationsCount = user.publicationsCount;
    this.subscribers = user.subscribers;
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      passwordHash: this.passwordHash,
      createAt: this.createAt,
      publicationsCount: this.publicationsCount,
      subscribers: this.subscribers,
    };
  }

  public async setPassword(password: string): Promise<PublicUserEntity> {
    const salt = await genSalt(SALTS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
