import {
  rendererRef,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { unregisterRootStore } from 'mobx-keystone'
import { defaultPipes, renderPipeFactory } from '../renderPipes'
import { rendererFactory } from './renderer.test.factory'
import { setupComponent, setupPage } from './setup'
import { rootApplicationStore } from './setup/root.test.store'

describe('Runtime Element', () => {
  beforeEach(() => {
    rootApplicationStore.clear()
  })

  it('should create element runtime node', () => {
    const { rendererService } = rootApplicationStore
    const { page } = setupPage()
    const rootElement = page.rootElement.current

    const renderer = rendererFactory(rendererService)({
      elementTree: page,
      rendererType: RendererType.PageBuilder,
      renderPipe: renderPipeFactory(defaultPipes),
    })

    rendererService.setActiveRenderer(rendererRef(renderer.id))
    renderer.render()

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
    const { page } = setupPage()
    const pageRootElement = page.rootElement.current
    const providerPageRootElement = page.providerPage?.rootElement.current

    const renderer = rendererFactory(rendererService)({
      elementTree: page,
      rendererType: RendererType.PageBuilder,
      renderPipe: renderPipeFactory(defaultPipes),
    })

    rendererService.setActiveRenderer(rendererRef(renderer.id))
    renderer.render()

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
    const { page } = setupPage()
    const pageRootElement = page.rootElement.current
    const providerPageRootElement = page.providerPage?.rootElement.current

    const renderer = rendererFactory(rendererService)({
      elementTree: page,
      rendererType: RendererType.PageBuilder,
      renderPipe: renderPipeFactory(defaultPipes),
    })

    rendererService.setActiveRenderer(rendererRef(renderer.id))
    renderer.render()

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
    const { childrenContainerElement, component } = setupComponent()
    const componentRootElement = component.rootElement.current

    const renderer = rendererFactory(rendererService)({
      elementTree: component,
      rendererType: RendererType.ComponentBuilder,
      renderPipe: renderPipeFactory(defaultPipes),
    })

    rendererService.setActiveRenderer(rendererRef(renderer.id))
    renderer.render()

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
