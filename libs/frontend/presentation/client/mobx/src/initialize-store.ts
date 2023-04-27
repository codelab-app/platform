import type { IPageProps, IRootStore } from '@codelab/frontend/abstract/core'
import { IRole, JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { registerRootStore } from 'mobx-keystone'
import { createRootStore } from './create-root-store'

export let _store: IRootStore | null = null

/**
 * User is passed automatically when we call withPageAuthRequired
 *
 * @param pageProps
 */
export const initializeStore = (pageProps?: IPageProps): IRootStore => {
  /**
   * Using snapshot on SSR is a bit tricky, since model data may be out of sync on serverside and client side. Passing snapshot data from backend to frontend is also very costly in terms of bandwidth.
   */
  const user = pageProps?.user?.sub
    ? {
        apps: [],
        auth0Id: pageProps.user.sub,
        email: pageProps.user.email,
        id: pageProps.user.sub,
        roles: pageProps.user[JWT_CLAIMS].roles.map((role) => IRole[role]),
        username: pageProps.user.nickname,
      }
    : undefined

  // Create the store once in the client
  if (!_store) {
    _store = createRootStore({
      user,
    })

    registerRootStore(_store as IRootStore)
  }

  return _store

  /**
   * Apply snapshot data to root store if available. The snapshot contains data loaded during Next.js SSR inside the `getServerSideProps` block
   *
   * We break up snapshot per service to conserve bandwidth
   */

  // For SSG and SSR always create a new store
  // if (isServer) {
  //   _store = store
  //
  //   return _store
  // }

  // if (process.env.NODE_ENV === 'development') {
  //   ;(window as any).store = store
  // }
}
