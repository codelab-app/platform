import { chance } from '@codelab/frontend/domain/shared'
import {
  appDto,
  atomReactFragmentDto,
  userDto,
} from '@codelab/frontend/test/data'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'
import { AppModelFactory } from './test/app.test.factory'
import { appModelFactory, factory, rootDomainStore } from './test/setup'

describe('App domain', () => {
  const appId = v4()
  const appName = chance.word({ capitalize: true })

  it('can add an app', async () => {
    // const app = factory.build('app', {
    //   id: appId,
    //   name: appName,
    // })
    const app = appModelFactory.build({
      id: appId,
      name: appName,
    })!

    // App
    expect(app.id).toBe(appId)
    expect(app.name).toBe(appName)

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
    unregisterRootStore(rootDomainStore)
  })
})
