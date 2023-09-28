import { ICreateAppData, IUser } from '@codelab/frontend/abstract/core'
import { User } from '@codelab/frontend/domain/user'
import { atomReactFragmentDto } from '@codelab/frontend/testing/data'
import { createTestRootStore } from '@codelab/frontend/testing/store'
import {
  IAtomType,
  IPageKindName,
  IUserDTO,
} from '@codelab/shared/abstract/core'
import { unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'

describe('App domain', () => {
  const rootStore = createTestRootStore()
  const { appService, userService, atomService } = rootStore

  it('can add an app', async () => {
    const appData: ICreateAppData = {
      id: v4(),
      name: 'Codelab App',
    }

    await atomService.add(atomReactFragmentDto)

    atomService.atomsList

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
    app?.pages?.forEach((page) => {
      const store = page.current.store.current

      expect(store.name).toBe(store.name)
      expect(store.api.current.name).toBe(store.api.current.name)
    })
  })

  afterAll(() => {
    unregisterRootStore(rootStore)
  })
})
