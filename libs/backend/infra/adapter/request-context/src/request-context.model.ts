import { AsyncLocalStorage } from 'async_hooks'

export class RequestContext<TRequest = unknown, TResponse = unknown> {
  static cls = new AsyncLocalStorage<RequestContext>()

  static get currentContext() {
    console.log('get current context')

    return this.cls.getStore()
  }

  constructor(public readonly req: TRequest, public readonly res: TResponse) {}
}
