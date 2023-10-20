import type { ICreateAppData } from '@codelab/frontend/abstract/domain'
import {
  appDto,
  atomReactFragmentDto,
  userDto,
} from '@codelab/frontend/test/data'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'
import { createTestRootStore } from './root-store'

describe('App domain', () => {
  const rootStore = createTestRootStore(userDto)
  const { appDomainService } = rootStore

  it('can add an app', async () => {
    const app = appDomainService.create(appDto, {
      __typename: 'Atom',
      id: atomReactFragmentDto.id,
    })

    // App
    expect(app.id).toBe(appDto.id)
    expect(app.name).toBe(appDto.name)

    // Page
    const pages = app.pages.map((page) => {
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
    app.pages.forEach((page) => {
      const store = page.store.current

      expect(store.name).toBe(store.name)
      expect(store.api.current.name).toBe(store.api.current.name)
    })
  })

  afterAll(() => {
    unregisterRootStore(rootStore)
  })
})
