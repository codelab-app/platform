import { RendererType } from '@codelab/frontend/abstract/application'
import { createTestStore } from '@codelab/frontend-application-test/store'
import { IPageKind } from '@codelab/shared/abstract/core'
import { unregisterRootStore } from 'mobx-keystone'

describe('Page', () => {
  let testStore: ReturnType<typeof createTestStore>

  beforeAll(() => {
    testStore = createTestStore()
  })

  afterAll(() => {
    testStore.teardown()
  })

  it('should compute a getter for the builder url', () => {
    const { page, runtimePage, runtimeProviderPage } = testStore.setupPage(
      RendererType.Preview,
      IPageKind.Regular,
    )
  })
})
