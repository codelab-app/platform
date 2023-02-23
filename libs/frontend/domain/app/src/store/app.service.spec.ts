import type { ICreateAppDTO } from '@codelab/frontend/abstract/core'
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
import { AppService } from './app.service'

let rootStore: TestRootStore

beforeAll(() => {
  rootStore = new TestRootStore({})
})

afterAll(() => {
  unregisterRootStore(rootStore)
})

describe('AppService', () => {
  it('should add an app to the database', () => {
    const appDTO: ICreateAppDTO = {
      id: v4(),
      ownerId: v4(),
      name: 'Demo App',
    }

    const app = rootStore.appService.create(appDTO)

    // App
    expect(app.id).toBe(appDTO.id)
    expect(app.ownerId).toBe(appDTO.ownerId)
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
