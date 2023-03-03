import {
  APP_PAGE_NAME,
  INTERNAL_SERVER_ERROR_PAGE_NAME,
  NOT_FOUND_PAGE_NAME,
} from '@codelab/frontend/abstract/core'
import { Store } from '@codelab/frontend/domain/store'
import { InterfaceType } from '@codelab/frontend/domain/type'
import { appData } from '@codelab/shared/data/test'
import { getSnapshot, unregisterRootStore } from 'mobx-keystone'
import { TestRootStore } from '../test/testRootStore'

let rootStore: TestRootStore

beforeAll(() => {
  rootStore = new TestRootStore({})
})

afterAll(() => {
  unregisterRootStore(rootStore)
})

describe.skip('AppService', () => {
  // it('should add an app to the local store', () => {
  //   //
  // })

  it('should add an app to the database', () => {
    const app = rootStore.appService.add(appData)

    // App
    expect(app.id).toBe(appData.id)
    expect(app.owner).toEqual(appData.owner)
    expect(app.name).toBe(appData.name)

    // Page
    expect(app.pages.map((page) => getSnapshot(page.current))).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: APP_PAGE_NAME,
        }),
        expect.objectContaining({
          name: NOT_FOUND_PAGE_NAME,
        }),
        expect.objectContaining({
          name: INTERNAL_SERVER_ERROR_PAGE_NAME,
        }),
      ]),
    )

    // Store
    expect(app.store.current.name).toBe(Store.createName(appData))

    // API
    expect(app.store.current.api.current.name).toBe(
      InterfaceType.createName(`${app.name} Store`),
    )
  })
})
