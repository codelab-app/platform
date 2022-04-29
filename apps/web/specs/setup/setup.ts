/// <reference types='jest'/>

import { createRootStore, IRootStore } from '@codelab/frontend/model/infra/mobx'
import { registerRootStore, unregisterRootStore } from 'mobx-keystone'
import {
  Auth0FileData,
  auth0UserInfo,
  loadAuth0DataFromFile,
  passwordRealmGrantType,
} from './auth0'

export const setup = () => {
  const setupData: {
    rootStore: IRootStore
    auth0Service: Promise<Auth0FileData>
  } = {} as any

  beforeAll(() => {
    /**
     * Used password grant flow
     */

    const auth0Data = loadAuth0DataFromFile()

    setupData.auth0Service = auth0UserInfo(auth0Data.access_token)
      /**
       * Don't really care about response here, we just call the API to make sure our access_token is working.
       */
      .then(() => {
        console.info('Loading Auth0 data from file...')

        return Promise.resolve(loadAuth0DataFromFile())
      })
      .catch((err) => {
        console.info('Fetching Auth0 data...')

        return passwordRealmGrantType()
      })

    /**
     * Setup root store
     */
    setupData.rootStore = createRootStore({})
    registerRootStore(setupData.rootStore)

    /**
     * Clear data
     */
    setupData.rootStore.adminService.resetData()

    /**
     * Create user
     */

    /**
     * Use token to call a M2M endpoint to test it's validity
     * @deprecated
     */
    // setupData.auth0Service = fetchAuth0User(auth0Data.access_token)
    //   /**
    //    * If token works then continue
    //    */
    //   .then<Auth0FileData>((res) => {
    //     console.log('Using cached Auth0 data...')
    //
    //     return {
    //       access_token: auth0Data.access_token,
    //       auth0_user_id: res.user_id,
    //       email: res.email,
    //     }
    //   })
    //   /**
    //    * If token doesn't work, then we re-fetch a new token and save it
    //    */
    //   .catch<Auth0FileData>((err) => {
    //     console.error(err.response.data)
    //
    //     return fetchAndCacheAuth0Data()
    //   })
  })

  // beforeEach(() => {})

  afterAll(() => {
    unregisterRootStore(setupData.rootStore)
  })

  return setupData
}
