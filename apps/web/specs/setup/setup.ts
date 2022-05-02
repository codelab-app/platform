/// <reference types='jest'/>

import { client } from '@codelab/frontend/model/infra/graphql'
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
     * Get auth token and pass in header to call admin service
     */
    return setupData.auth0Service.then(({ access_token }) => {
      client.setHeader('authorization', `Bearer ${access_token}`)

      /**
       * Clear data
       */
      return setupData.rootStore.adminService.resetData().then((res) => {
        console.log(res)
      })
    })
  })

  afterAll(() => {
    unregisterRootStore(setupData.rootStore)
  })

  return setupData
}
