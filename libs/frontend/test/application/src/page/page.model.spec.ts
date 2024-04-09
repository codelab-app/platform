import { RendererType } from '@codelab/frontend/abstract/application'
import { IPageKind } from '@codelab/shared/abstract/core'
import { setupPages } from '../renderer/setup'
import { TestBed } from '../renderer/setup/testbed'

let testBed: TestBed

describe('Page', () => {
  beforeAll(() => {
    testBed = new TestBed()
  })

  it('should compute a getter for the builder url', () => {
    const { page, runtimePage, runtimeProviderPage } = setupPages(
      testBed,
      RendererType.Preview,
      IPageKind.Regular,
    )
  })
})
