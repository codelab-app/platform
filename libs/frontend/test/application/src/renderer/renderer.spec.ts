import { RendererType } from '@codelab/frontend/abstract/application'
import { createTestApplication } from '@codelab/frontend/application/test'
import { IPageKind } from '@codelab/shared/abstract/core'

describe('Renderer', () => {
  let testApplication: ReturnType<typeof createTestApplication>

  beforeEach(() => {
    testApplication = createTestApplication()
  })

  it('should create page runtime nodes', () => {
    const { page, runtimePage, runtimeProviderPage } =
      testApplication.setupPage(RendererType.Preview, IPageKind.Regular)

    // Test the creation of provider page node
    expect(runtimeProviderPage?.page.id).toBe(page.providerPage?.id)

    // Test the creation of page node
    expect(runtimePage?.page.id).toBe(page.id)
  })

  it('should create component runtime node', () => {
    const { component, renderer } = testApplication.setupComponent()

    expect(renderer.runtimeComponent?.component.id).toBe(component.id)
  })

  afterAll(() => {
    testApplication.teardown()
  })
})
