import type { ICreateAppData } from '@codelab/frontend/abstract/core'
import {
  APP_PAGE_NAME,
  INTERNAL_SERVER_ERROR_PAGE_NAME,
  NOT_FOUND_PAGE_NAME,
} from '@codelab/frontend/abstract/core'
import { Store } from '@codelab/frontend/domain/store'
import { InterfaceType } from '@codelab/frontend/domain/type'
import { getSnapshot, unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'
import { TestRootStore } from '../test/testRootStore'

let rootStore: TestRootStore

beforeAll(() => {
  rootStore = new TestRootStore({})
})

afterAll(() => {
  unregisterRootStore(rootStore)
})

describe('AppService', () => {


  it('should add an app to the local store', () => {
    //
  })

  it('should add an app to the database', () => {
    const app = rootStore.appService.add(appDTO)

    // App
    expect(app.id).toBe(appDTO.id)
    expect(app.owner).toEqual(appDTO.owner)
    expect(app.name).toBe(appDTO.name)

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
    expect(app.store.current.name).toBe(Store.createName(appDTO))

    // API
    expect(app.store.current.api.current.name).toBe(
      InterfaceType.createName(`${app.name} Store`),
    )
  })
})
