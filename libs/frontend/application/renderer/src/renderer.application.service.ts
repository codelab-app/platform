import type {
  IRendererDto,
  IRendererService,
} from '@codelab/frontend/abstract/application'
import {
  IRendererModel,
  isRuntimeContainerNode,
  isRuntimeElement,
} from '@codelab/frontend/abstract/application'
import {
  IPageNode,
  isComponent,
  isElement,
} from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import {
  isModel,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
  walkTree,
  WalkTreeMode,
} from 'mobx-keystone'
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
    return renderer.render()
  }

  @modelAction
  getRuntimeModel(node: IPageNode) {
    const runtimeRoot = this.activeRenderer?.current.runtimeRootContainerNode

    if (!runtimeRoot) {
      return null
    }

    return walkTree(
      runtimeRoot,
      (child) => {
        if (!isModel(child)) {
          return undefined
        }

        const isNodeComponent =
          isComponent(node) &&
          isRuntimeContainerNode(child) &&
          node.id === child.containerNode.id

        const isNodeElement =
          isElement(node) &&
          isRuntimeElement(child) &&
          node.id === child.element.id

        return isNodeComponent || isNodeElement ? child : undefined
      },
      WalkTreeMode.ParentFirst,
    )
  }
}
