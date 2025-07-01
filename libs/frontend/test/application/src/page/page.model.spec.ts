import { RendererType } from '@codelab/frontend-abstract-application'
import { createTestRootStore } from '@codelab/frontend-infra-mobx-store'
import { IPageKind } from '@codelab/shared-abstract-core'

describe('Page', () => {
  let testStore: ReturnType<typeof createTestRootStore>['rootStore']

  beforeAll(() => {
    testStore = createTestRootStore().rootStore
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
