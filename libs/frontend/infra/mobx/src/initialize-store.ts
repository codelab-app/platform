import type { IRootStore } from '@codelab/frontend/abstract/application'
import type { IPageProps } from '@codelab/frontend/abstract/domain'
import { registerRootStore } from 'mobx-keystone'
import { createRootStore } from './create-root-store'

export let _store: IRootStore | null = null

/**
 * User is passed automatically when we call withPageAuthRequired
 *
 * @param pageProps
 */
export const initializeStore = ({ user }: IPageProps): IRootStore => {
  /**
   * Using snapshot on SSR is a bit tricky, since model data may be out of sync on server-side and client side. Passing snapshot data from backend to frontend is also very costly in terms of bandwidth.
   */
  // Create the store once in the client
  if (!_store) {
    _store = createRootStore({
      user,
    })

    registerRootStore(_store)
  }

  return _store
}
