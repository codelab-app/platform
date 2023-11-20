import { unregisterRootStore } from 'mobx-keystone'
import { setupComponent, setupPage } from './setup'
import { rootApplicationStore } from './setup/root.test.store'
import { TestBed } from './setup/testbed'

let testbed: TestBed

describe('Runtime Element', () => {
  beforeEach(() => {
    rootApplicationStore.clear()
    testbed = new TestBed()
  })

  it('should create element runtime node', () => {
    const { rendererService } = rootApplicationStore
    const { page } = setupPage(testbed)
    const rootElement = page.rootElement.current
    const runtimeElement = rendererService.runtimeElement(rootElement)

    // Test the creation of element node
    expect(runtimeElement?.element.id).toBe(rootElement.id)

    // Test the creation of link with container node
    expect(runtimeElement?.closestRuntimeContainerNode.containerNode.id).toBe(
      page.id,
    )
  })

  it('should resolve closest runtime container node', () => {
    const { rendererService } = rootApplicationStore
    const { page } = setupPage(testbed)
    const pageRootElement = page.rootElement.current
    const providerPageRootElement = page.providerPage?.rootElement.current

    const runtimeProviderPage = page.providerPage
      ? rendererService.runtimeContainerNode(page.providerPage)
      : undefined

    const runtimePage = rendererService.runtimeContainerNode(page)

    const pageRuntimeRootElement =
      rendererService.runtimeElement(pageRootElement)

    const providerPageRuntimeRootElement = providerPageRootElement
      ? rendererService.runtimeElement(providerPageRootElement)
      : undefined

    expect(pageRuntimeRootElement?.closestRuntimeContainerNode.id).toBe(
      runtimePage?.id,
    )
    expect(providerPageRuntimeRootElement?.closestRuntimeContainerNode.id).toBe(
      runtimeProviderPage?.id,
    )
  })

  it('should resolve page content container', () => {
    const { rendererService } = rootApplicationStore
    const { page } = setupPage(testbed)
    const pageRootElement = page.rootElement.current
    const providerPageRootElement = page.providerPage?.rootElement.current

    const pageRuntimeRootElement =
      rendererService.runtimeElement(pageRootElement)

    const providerPageRuntimeRootElement = providerPageRootElement
      ? rendererService.runtimeElement(providerPageRootElement)
      : undefined

    expect(pageRuntimeRootElement?.isPageContentContainer).toBe(false)
    expect(providerPageRuntimeRootElement?.isPageContentContainer).toBe(true)
  })

  it('should resolve component instance children container', () => {
    const { rendererService } = rootApplicationStore
    const { childrenContainerElement, component } = setupComponent(testbed)
    const componentRootElement = component.rootElement.current

    const componentRuntimeRootElement =
      rendererService.runtimeElement(componentRootElement)

    const childrenContainerRuntimeElement = rendererService.runtimeElement(
      childrenContainerElement,
    )

    expect(
      componentRuntimeRootElement?.isComponentInstanceChildrenContainer,
    ).toBe(false)

    expect(
      childrenContainerRuntimeElement?.isComponentInstanceChildrenContainer,
    ).toBe(true)
  })

  afterAll(() => {
    unregisterRootStore(rootApplicationStore)
  })
})
