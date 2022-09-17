import { InjectionMode, Lifetime, RESOLVER } from 'awilix';
import {BaseEntity} from '@shipwaves/api-libs';

export class AuthorEntity extends BaseEntity {
  constructor(container) {
    super(container);

    this.name = 'author';
    this.version = '0.0.1';
    this.schema = {
      name: String,
      books: [{
        type: "ObjectId",
        ref: "book",
      }],
      dateOfBirth: Date,
      dateOfDeath: Date,
      created: Date,
      updated: Date,
    };

    this.routes = ['create', 'get', 'list',];

    // this defines the model defined by the schema and name.
    // It also autodefined the required controller, consumers for creating, updating
    // and listing the given model
    // the routes have to be defined explicitly as we need more control over what gets
    // auto exposed outside.
    this.init();
  }
}

AuthorEntity[RESOLVER] = {
  name: 'authorEntity',
  lifetime: Lifetime.SINGLETON,
  injectionMode: InjectionMode.PROXY,
};
