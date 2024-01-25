import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'
import { unregisterRootStore } from 'mobx-keystone'
import { setupPage } from './setup'
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
    expect(runtimeElement?.closestContainerNode.current.containerNode.id).toBe(
      page.id,
    )
  })

  it('should add element runtime child', () => {
    const { rendererService } = rootApplicationStore
    const { page } = setupPage(testbed)
    const rootElement = page.rootElement.current
    const runtimeElement = rendererService.runtimeElement(rootElement)

    const childElement = testbed.addElement({
      name: 'child-element',
      parentElement: rootElement,
    })

    rootElement.writeCache({ firstChild: childElement })

    const runtimeChildElement = runtimeElement
      ?.children[0] as IRuntimeElementModel

    expect(runtimeChildElement.element.id).toBe(childElement.id)
  })

  it('should detach runtime element when element is detached', async () => {
    const { elementService, rendererService } = rootApplicationStore
    const { page } = setupPage(testbed)
    const rootElement = page.rootElement.current
    const runtimeElement = rendererService.runtimeElement(rootElement)
    const runtimePage = runtimeElement?.closestContainerNode.current

    expect(runtimePage?.runtimeElementsList.length).toEqual(1)

    elementService.elementDomainService.elements.delete(rootElement.id)

    expect(runtimePage?.runtimeElementsList.length).toEqual(0)
  })

  /*   it('should resolve closest runtime container node', () => {
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

    expect(pageRuntimeRootElement?.closestContainerNode.id).toBe(
      runtimePage?.id,
    )
    expect(providerPageRuntimeRootElement?.closestContainerNode.id).toBe(
      runtimeProviderPage?.id,
    )
  })
 */
  afterAll(() => {
    unregisterRootStore(rootApplicationStore)
  })
})
