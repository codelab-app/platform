import { PageDomainFactory } from '@codelab/frontend-domain-page/services'
import {
  appDto,
  atomReactFragmentDto,
  userDto,
} from '@codelab/frontend-test-data'
import { IPageKindName } from '@codelab/shared-abstract-core'
import { unregisterRootStore } from 'mobx-keystone'

import { createTestDomainStore } from '../test/test.store'

describe('App domain', () => {
  const pageFactory = new PageDomainFactory(userDto)
  const testStore = createTestDomainStore()
  const { appDomainService, atomDomainService } = testStore

  it('can add an app', async () => {
    const reactFragment = atomDomainService.hydrate(atomReactFragmentDto)
    const pages = pageFactory.addSystemPages(appDto, reactFragment)
    const app = appDomainService.hydrate(appDto)

    // App
    expect(app.toJson).toMatchObject(appDto)
    expect(pages).toEqual(
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
    app.pages.forEach((page) => {
      const store = page.current.store.current

      expect(store.name).toBe(store.name)
      expect(store.api.current.name).toBe(store.api.current.name)
    })
  })

  afterAll(() => {
    unregisterRootStore(testStore)
  })
})
