import { unregisterRootStore } from 'mobx-keystone'
import { setupComponent, setupPage } from './setup'
import { rootApplicationStore } from './setup/root.test.store'
import { TestBed } from './setup/testbed'

let testbed: TestBed

describe('Renderer', () => {
  beforeEach(() => {
    rootApplicationStore.clear()
    testbed = new TestBed()
  })

  it('should create page runtime nodes', () => {
    const { rendererService } = rootApplicationStore
    const { page } = setupPage(testbed)

    const runtimeProviderPage = page.providerPage
      ? rendererService.runtimeContainerNode(page.providerPage)
      : undefined

    const runtimePage = rendererService.runtimeContainerNode(page)

    // Test the creation of provider page node
    expect(runtimeProviderPage?.containerNode.id).toBe(page.providerPage?.id)

    // Test the creation of page node
    expect(runtimePage?.containerNode.id).toBe(page.id)
  })

  it('should create component runtime node', () => {
    const { rendererService } = rootApplicationStore
    const { component } = setupComponent(testbed)
    const runtimeComponent = rendererService.runtimeContainerNode(component)

    expect(runtimeComponent?.containerNode.id).toBe(component.id)
  })

  afterAll(() => {
    unregisterRootStore(rootApplicationStore)
  })
})
