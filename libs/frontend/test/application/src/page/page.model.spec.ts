import { RendererType } from '@codelab/frontend/abstract/application'
import { createTestApplication } from '@codelab/frontend/application/test'
import { IPageKind } from '@codelab/shared/abstract/core'

describe('Page', () => {
  let testApplication: ReturnType<typeof createTestApplication>

  beforeAll(() => {
    testApplication = createTestApplication()
  })

  it('should compute a getter for the builder url', () => {
    const { page, runtimePage, runtimeProviderPage } =
      testApplication.setupPage(RendererType.Preview, IPageKind.Regular)
  })
})
