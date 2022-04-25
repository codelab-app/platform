/// <reference types='jest'/>

import { AppService } from '@codelab/frontend/modules/app'
import { unregisterRootStore } from 'mobx-keystone'
import { RenderTestRootStore } from './renderTestRootStore'

export const setup = () => {
  const data: {
    rootStore: RenderTestRootStore
    appService: AppService
  } = {} as any

  beforeEach(() => {
    data.rootStore = new RenderTestRootStore({
      appService: new AppService({}),
    })
  })

  afterEach(() => {
    unregisterRootStore(data.rootStore)
  })

  return data
}
