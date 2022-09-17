import { InjectionMode, Lifetime, RESOLVER } from 'awilix';
import {BaseEntity} from '@shipwaves/api-libs';

export class BookEntity extends BaseEntity {
  constructor(container) {
    super(container);

    this.name = 'book';
    this.version = '0.0.1';
    this.schema = {
      title: String,
      author: {
        type: "ObjectId",
        ref: "author",
      },
      summary: String,
      genre: [String],
      language: [String],
      created: Date,
      updated: Date,
    };
    this.routes = ['create', 'get', 'list',];

    this.controllers = {
      list: {
        population: [{path: 'author', select: 'name'}],
      },
      get: {
        population: [{path: 'author', select: 'name'}],
      }
    };
    this.init();
  }
  saveObject(obj) {
    // overwrite default save object
    const {data} = obj;
    this.log.info({ data });
    const res = super.saveObject(obj);
    return res;
  }
}

BookEntity[RESOLVER] = {
  name: 'bookEntity',
  lifetime: Lifetime.SINGLETON,
  injectionMode: InjectionMode.PROXY,
};
