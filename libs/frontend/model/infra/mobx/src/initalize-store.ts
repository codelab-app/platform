import type { IPageProps, IRootStore } from '@codelab/frontend/abstract/core'
import { User } from '@codelab/frontend/domain/user'
import { IRole, JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { registerRootStore } from 'mobx-keystone'
import { createRootStore } from './create-root-store'

let _store: IRootStore | null = null

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
        id: pageProps.user.sub,
        auth0Id: pageProps.user.sub,
        roles: pageProps.user[JWT_CLAIMS].roles.map((role) => IRole[role]),
        email: pageProps.user.email,
        username: pageProps.user.nickname,
        apps: [],
      }
    : undefined

  // Create the store once in the client
  if (!_store) {
    _store = createRootStore({
      user,
    })

    registerRootStore(_store as IRootStore)
  }

  if (!_store.userService.user?.auth0Id && user) {
    /**
     * need to replace the instance because
     * set user prop on the service doesn't work
     *
     * Nghia: I think mobx keystone does some internal initializations behind the scene, and we can't set nested service data until the process is done
     */
    // _store.setUserService(UserService.init(user))
    _store.userService.setUser(User.hydrate(user))
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
