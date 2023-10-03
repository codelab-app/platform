import type { ICreateAppData } from '@codelab/frontend/abstract/domain'
import { atomReactFragmentDto, userDto } from '@codelab/frontend/test/data'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'
import { createTestRootStore } from './root-store'

describe('App domain', () => {
  const rootStore = createTestRootStore(userDto)
  const { appService, atomService, userService } = rootStore

  it('can add an app', async () => {
    const appData: ICreateAppData = {
      id: v4(),
      name: 'Codelab App',
    }

    await atomService.add(atomReactFragmentDto)

    await appService.create(appData)

    const app = appService.apps.get(appData.id)

    // App
    expect(app?.id).toBe(appData.id)
    expect(app?.name).toBe(appData.name)

    // Page
    const pages = app?.pages.map((page) => {
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
    app?.pages.forEach((page) => {
      const store = page.current.store.current

      expect(store.name).toBe(store.name)
      expect(store.api.current.name).toBe(store.api.current.name)
    })
  })

  afterAll(() => {
    unregisterRootStore(rootStore)
  })
})
