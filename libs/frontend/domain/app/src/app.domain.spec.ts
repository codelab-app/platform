import { appDto, atomReactFragmentDto } from '@codelab/frontend/test/data'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { unregisterRootStore } from 'mobx-keystone'
import { rootDomainStore } from './test/root.test.store'

describe('App domain', () => {
  const { appDomainService, atomDomainService } = rootDomainStore

  it('can add an app', async () => {
    const reactFragment = atomDomainService.hydrate(atomReactFragmentDto)
    const app = appDomainService.create(appDto, reactFragment.toJson)

    // App
    expect(app.toJson).toMatchObject(appDto)

    // Page
    const pages = app.pages.map((page) => {
      return {
        name: page.current.name,
      }
    })

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
    unregisterRootStore(rootDomainStore)
  })
})
