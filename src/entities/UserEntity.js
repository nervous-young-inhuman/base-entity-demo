import { InjectionMode, Lifetime, RESOLVER } from 'awilix';
import {BaseEntity} from '@shipwaves/api-libs';

export class UserEntity extends BaseEntity {
  constructor(container) {
    super(container);

    this.name = 'user';
    this.version = '0.0.1';
    this.schema = {
      name: String,
      created: Date,
      updated: Date,
    };

    this.routes = ['create', 'get', 'list', 'update'];

    this.eventConsumers = [
      {
        name: 'update.completed.user.updated',
        consumeMessage: this.onUserUpdated.bind(this),
      },
    ];

    this.init();
  }
  onUserUpdated(event) {
    // do something when a user gets updated this is a queue event consumer,
    this.log.info('got', event.name);
    this.log.info('payload = ', event.payload);
    return true;
  }
}

UserEntity[RESOLVER] = {
  name: 'userEntity',
  lifetime: Lifetime.SINGLETON,
  injectionMode: InjectionMode.PROXY,
};
