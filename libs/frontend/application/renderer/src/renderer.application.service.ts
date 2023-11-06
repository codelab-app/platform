import type {
  IRendererDto,
  IRendererService,
  IRuntimeModel,
} from '@codelab/frontend/abstract/application'
import { IRendererModel } from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import { IPageKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { Renderer } from './renderer.model'

@model('@codelab/RendererApplicationService')
export class RendererApplicationService
  extends Model({
    activeRenderer: prop<Nullable<Ref<IRendererModel>>>(
      () => null,
    ).withSetter(),
    /**
     * These are renderers for the public, they are keyed by pageId
     */
    renderers: prop(() => objectMap<IRendererModel>()),
  })
  implements IRendererService
{
  @modelAction
  hydrate = (rendererDto: IRendererDto) => {
    let renderer = this.renderers.get(rendererDto.id)

    if (!renderer) {
      renderer = Renderer.create(rendererDto)

      this.renderers.set(rendererDto.id, renderer)
    }

    return renderer
  }

  /**
   * This is the entry point to start the rendering process
   */
  @modelAction
  renderRoot(renderer: IRendererModel) {
    const root = renderer.elementTree.maybeCurrent?.rootElement.current
    const parentComponent = root?.parentComponent?.current
    const currentPage = root?.page?.current

    if (!root) {
      console.error('Renderer: No root element found')

      return null
    }

    if (parentComponent) {
      // TODO: render component

      return null
    }

    if (currentPage) {
      return this.renderPage(renderer, currentPage)
    }

    console.error('Renderer: Neither page nor component found')

    return null
  }

  renderPage(renderer: IRendererModel, page: IPageModel) {
    if (page.kind !== IPageKind.Regular) {
      return this.renderContainerNode(renderer, page)
    }

    const providerRoot = renderer.providerTree?.current.rootElement.current
    const providerPage = providerRoot?.page?.current

    if (!providerPage) {
      console.error('Renderer: Provider page not found')

      return null
    }

    return this.renderContainerNode(renderer, providerPage)
  }

  renderContainerNode(
    renderer: IRendererModel,
    containerNode: IComponentModel | IPageModel,
    parent?: IRuntimeModel,
  ) {
    const runtimeContainerNode = renderer.addRuntimeContainerNode(
      containerNode,
      parent,
    )

    return runtimeContainerNode.render()
  }
}
