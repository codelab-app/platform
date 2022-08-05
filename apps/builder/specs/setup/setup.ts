/// <reference types='jest'/>

import { client } from '@codelab/frontend/model/infra/graphql'
import { createRootStore } from '@codelab/frontend/model/infra/mobx'
import { IRootStore } from '@codelab/shared/abstract/core'
import {
  isRootStore,
  registerRootStore,
  unregisterRootStore,
} from 'mobx-keystone'
import {
  Auth0FileData,
  auth0UserInfo,
  loadAuth0DataFromFile,
  passwordRealmGrantType,
} from './auth0'

export type SetupData = {
  rootStore: IRootStore
  auth0Service: Promise<Auth0FileData>
}

export const setup = () => {
  const setupData: SetupData = {} as SetupData

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
    setupData.rootStore = createRootStore({}) as IRootStore

    registerRootStore(setupData.rootStore)

    /**
     * Get auth token and pass in header to call admin service
     */
    return setupData.auth0Service.then(({ access_token }) => {
      /**
       * For some reason, only on ci did we need to add authorization for adminService, but putting in beforeAll setup is much better anyways, since we only need to set headers once.
       */
      client.setHeader('authorization', `Bearer ${access_token}`)

      /**
       * Clear data
       */
      return setupData.rootStore.adminService.resetData().then((res) => {
        // console.log(res)
      })
    })
  })

  afterAll(() => {
    if (isRootStore(setupData.rootStore)) {
      unregisterRootStore(setupData.rootStore)
    }
  })

  return setupData
}
