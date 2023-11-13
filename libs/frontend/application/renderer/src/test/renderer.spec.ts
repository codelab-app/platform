import {
  rendererRef,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { unregisterRootStore } from 'mobx-keystone'
import { defaultPipes, renderPipeFactory } from '../renderPipes'
import { rendererFactory } from './renderer.test.factory'
import { setupComponent, setupPage } from './setup'
import { rootApplicationStore } from './setup/root.test.store'

describe('Renderer', () => {
  beforeEach(() => {
    rootApplicationStore.clear()
  })

  it('should create page runtime nodes', () => {
    const { rendererService } = rootApplicationStore
    const { page } = setupPage()

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

    // Test the creation of provider page node
    expect(runtimeProviderPage?.containerNode.id).toBe(page.providerPage?.id)

    // Test the creation of page node
    expect(runtimePage?.containerNode.id).toBe(page.id)
  })

  it('should create component runtime node', () => {
    const { rendererService } = rootApplicationStore
    const { component } = setupComponent()

    const renderer = rendererFactory(rendererService)({
      elementTree: component,
      rendererType: RendererType.ComponentBuilder,
      renderPipe: renderPipeFactory(defaultPipes),
    })

    rendererService.setActiveRenderer(rendererRef(renderer.id))
    renderer.render()

    const runtimeComponent = rendererService.runtimeContainerNode(component)

    expect(runtimeComponent?.containerNode.id).toBe(component.id)
  })

  afterAll(() => {
    unregisterRootStore(rootApplicationStore)
  })
})
