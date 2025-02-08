import { Entity, StorableEntity, Subscriber } from '@project/core';

export class EmailSubscriberEntity extends Entity implements StorableEntity<Subscriber> {
  public email!: string;
  public name!: string;
  public dateLastNotify?: string;

  constructor (subscriber?: Subscriber) {
    super();
    this.populate(subscriber);
  }

  public populate(subscriber?: Subscriber): void {
    if (!subscriber) {
      return;
    }

    this.id = subscriber.id ?? '';
    this.email = subscriber.email;
    this.name = subscriber.name;
    this.dateLastNotify = subscriber.dateLastNotify ?? new Date(2024, 0, 1).toISOString();
  }

  public toPOJO(): Subscriber {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      dateLastNotify: this.dateLastNotify,
    }
  }
}
