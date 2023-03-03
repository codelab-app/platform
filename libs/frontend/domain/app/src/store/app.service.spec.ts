import { IPageKindName } from '@codelab/shared/abstract/core'
import {
  appData,
  internalServerErrorPageData,
  notFoundPageData,
  providerPageData,
  storeApiData,
  storeData,
} from '@codelab/shared/data/test'
import { getSnapshot, unregisterRootStore } from 'mobx-keystone'
import { TestRootStore } from '../test/testRootStore'

let rootStore: TestRootStore

beforeAll(() => {
  rootStore = new TestRootStore({})
})

afterAll(() => {
  unregisterRootStore(rootStore)
})

describe('AppService', () => {
  it('should add an app to the database', () => {
    const owner = { auth0Id: 'test' }
    const api = storeApiData(owner)
    const store = storeData(api)
    const data = appData(owner)

    const pages = [
      providerPageData(data, store),
      notFoundPageData(data, store),
      internalServerErrorPageData(data, store),
    ]

    rootStore.storeService.add(store)
    rootStore.typeService.add(api)
    pages.forEach(rootStore.pageService.add)

    const app = rootStore.appService.add({ ...data, pages })

    // App
    expect(app.id).toBe(data.id)
    expect(app.owner).toEqual(data.owner)
    expect(app.name).toBe(data.name)

    // Page
    expect(app.pages.map((page) => getSnapshot(page.current))).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: IPageKindName.Provider,
        }),
        expect.objectContaining({
          name: IPageKindName.NotFound,
        }),
        expect.objectContaining({
          name: IPageKindName.InternalServerError,
        }),
      ]),
    )

    // Store
    expect(app.store.current.name).toBe(store.name)

    // API
    expect(app.store.current.api.current.name).toBe(api.name)
  })
})
