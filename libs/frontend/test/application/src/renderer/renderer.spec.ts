import { RendererType } from '@codelab/frontend/abstract/application'
import { createTestStore } from '@codelab/frontend-application-test'
import { IPageKind } from '@codelab/shared/abstract/core'

describe('Renderer', () => {
  let testStore: ReturnType<typeof createTestStore>

  beforeEach(() => {
    testStore = createTestStore()
  })

  afterEach(() => {
    testStore.teardown()
  })

  it('should create page runtime nodes', () => {
    const { page, runtimePage, runtimeProviderPage } = testStore.setupPage(
      RendererType.Preview,
      IPageKind.Regular,
    )

    // Test the creation of provider page node
    expect(runtimeProviderPage?.page.id).toBe(page.providerPage?.id)

    // Test the creation of page node
    expect(runtimePage?.page.id).toBe(page.id)
  })

  it('should create component runtime node', () => {
    const { component, renderer } = testStore.setupComponent()

    expect(renderer.runtimeComponent?.component.id).toBe(component.id)
  })
})
