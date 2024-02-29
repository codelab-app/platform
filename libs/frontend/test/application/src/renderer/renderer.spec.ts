import { unregisterRootStore } from 'mobx-keystone'
import { setupComponent, setupPages } from './setup'
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
    const { page } = setupPages(testbed)

    const runtimeProviderPage = page.providerPage
      ? rendererService.runtimePage(page.providerPage)
      : undefined

    const runtimePage = rendererService.runtimePage(page)

    // Test the creation of provider page node
    expect(runtimeProviderPage?.page.id).toBe(page.providerPage?.id)

    // Test the creation of page node
    expect(runtimePage?.page.id).toBe(page.id)
  })

  it('should create component runtime node', () => {
    const { rendererService } = rootApplicationStore
    const { component } = setupComponent(testbed)
    const runtimeComponent = rendererService.runtimeComponent(component)

    expect(runtimeComponent?.component.id).toBe(component.id)
  })

  afterAll(() => {
    unregisterRootStore(rootApplicationStore)
  })
})
