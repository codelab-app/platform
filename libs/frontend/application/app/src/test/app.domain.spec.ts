import type { ICreateAppData } from '@codelab/frontend/abstract/domain'
import { atomReactFragmentDto, userDto } from '@codelab/frontend/test/data'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'
import { createTestRootStore } from './root-store'

describe('App domain', () => {
  const rootStore = createTestRootStore(userDto)
  const { appDomainService, atomService } = rootStore

  it('can add an app', async () => {
    const appData: IAppDTO = {
      id: v4(),
      name: 'Codelab App',
      owner: userDto,
    }

    await atomService.atomDomainService.add(atomReactFragmentDto)

    await appDomainService.add(appData)

    const app = appDomainService.apps.get(appData.id)

    // App
    expect(app?.id).toBe(appData.id)
    expect(app?.name).toBe(appData.name)

    // Page
    const pages = app?.pages.map((page) => {
      return {
        name: page.name,
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
    app?.pages.forEach((page) => {
      const store = page.store.current

      expect(store.name).toBe(store.name)
      expect(store.api.current.name).toBe(store.api.current.name)
    })
  })

  afterAll(() => {
    unregisterRootStore(rootStore)
  })
})
