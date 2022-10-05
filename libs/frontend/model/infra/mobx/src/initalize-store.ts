import { IPageProps, IRootStore } from '@codelab/frontend/abstract/core'
import { UserService } from '@codelab/frontend/domain/user'
import { JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { fromSnapshot, registerRootStore } from 'mobx-keystone'
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
        id: pageProps?.user?.sub,
        auth0Id: pageProps?.user?.sub,
        roles: pageProps?.user?.[JWT_CLAIMS]?.roles ?? [],
        email: pageProps?.user?.email,
        username: pageProps?.user?.nickname,
        apps: [],
      }
    : undefined

  // if (pageProps?.storeSnapshot) {
  //   createRootStore({
  //     servicesFromSnapshot: {},
  //     user,
  //     init: false,
  //   })
  //
  //   const storeFromSnapshot = fromSnapshot(pageProps?.storeSnapshot)
  //
  //   return storeFromSnapshot
  // }

  // const servicesSnapshot = pageProps?.snapshot || {}
  // const servicesFromSnapshot: any = {}

  // Object.entries(servicesSnapshot).map(([key, snapshot]) => {
  //   const snapshotValue = fromSnapshot(snapshot)
  //   servicesFromSnapshot[key] = snapshotValue
  // })

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
     * Nghia: I think mobx keystone does some internal initializations behind the scence, and we can't set nested service data until the process is done
     */
    _store.setUserService(UserService.init(user))
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
