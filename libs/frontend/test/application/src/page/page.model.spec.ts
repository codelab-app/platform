import { RendererType } from '@codelab/frontend/abstract/application'
import { IPageKind } from '@codelab/shared/abstract/core'
import { TestBed } from '../../../../application/test/src/test-bed'

let testBed: TestBed

describe('Page', () => {
  beforeAll(() => {
    testBed = TestBed.Create()
  })

  it('should compute a getter for the builder url', () => {
    const { page, runtimePage, runtimeProviderPage } = testBed.setupPage(
      RendererType.Preview,
      IPageKind.Regular,
    )
  })
})
