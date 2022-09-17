import { RESOLVER, Lifetime, InjectionMode } from 'awilix';
import { BaseRouter } from "@shipwaves/api-libs";

export class MainRouter extends BaseRouter {
  constructor({router, authService, bookEntity, authorEntity, bookInstanceEntity, userEntity}) {
    super({router, authService});

    this.routes = [
      bookEntity,
      authorEntity,
      userEntity,
      bookInstanceEntity,
    ];
    this.registerRoutes();
  }
}

MainRouter[RESOLVER] = {
  name: 'mainRouter',
  lifetime: Lifetime.SINGLETON,
  injectionMode: InjectionMode.PROXY
}
