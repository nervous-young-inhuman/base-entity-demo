import { InjectionMode, Lifetime, RESOLVER } from 'awilix';
import {BaseEntity} from '@shipwaves/api-libs';

export class BookInstanceEntity extends BaseEntity {
  constructor(container) {
    super(container);

    this.name = 'bookInstance';
    this.version = '0.0.1';
    this.schema = {
      dueBack: Date,
      status: {
        type: String,
        enum: ['A', 'B', 'C'],
      },
      book: {
        type: this.Schema.ObjectId,
        ref: 'book',
      },
      imprint: String,
      borrower: {
        type: this.Schema.ObjectId,
        ref: 'user',
      },
      created: Date,
      updated: Date,
    };

    this.routes = ['create', 'get', 'list',];
    this.init();
  }
}

BookInstanceEntity[RESOLVER] = {
  name: 'bookInstanceEntity',
  lifetime: Lifetime.SINGLETON,
  injectionMode: InjectionMode.PROXY,
};
