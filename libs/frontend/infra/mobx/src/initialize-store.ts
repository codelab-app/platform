import type {
  IPageProps,
  IRootStore,
} from '@codelab/frontend/abstract/application'
import { trace } from '@opentelemetry/api'
import { registerRootStore } from 'mobx-keystone'
import { createRootStore } from './root.store'

export let _store: IRootStore | null = null

/**
 * User is passed automatically when we call withPageAuthRequired
 *
 * @param pageProps
 */
export const initializeStore = ({ router, user }: IPageProps): IRootStore => {
  /**
   * Using snapshot on SSR is a bit tricky, since model data may be out of sync on server-side and client side. Passing snapshot data from backend to frontend is also very costly in terms of bandwidth.
   */
  // Create the store once in the client
  if (!_store) {
    trace.getActiveSpan()?.addEvent('Store not found')

    const store = createRootStore({
      router,
      user,
    })

    registerRootStore(store)

    _store = store
  }

  _store.routerService.update(router)

  return _store
}
