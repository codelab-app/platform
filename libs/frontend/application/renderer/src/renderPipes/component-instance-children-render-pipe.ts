import type {
  IRenderOutput,
  IRenderPipe,
  IRuntimeElementModel,
} from '@codelab/frontend/abstract/application'
import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { BaseRenderPipe } from './render-pipe.base'

@model('@codelab/ComponentInstanceChildrenRenderPipe')
export class ComponentInstanceChildrenRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(runtimeElement: IRuntimeElementModel): IRenderOutput {
    if (!runtimeElement.isComponentInstanceChildrenContainer) {
      return this.next.render(runtimeElement)
    }

    const element = runtimeElement.element.current
    const { containerNode } = runtimeElement.closestRuntimeContainerNode
    // we cast safely because isComponentInstanceChildrenContainer is true
    const { instanceElement } = containerNode.current as IComponentModel
    const instanceChildren = instanceElement?.current.children || []

    for (const child of instanceChildren) {
      runtimeElement.addRuntimeChild(child)
    }

    if (this.renderer.debugMode) {
      console.info(
        `ComponentInstanceChildrenRenderPipe: Creating runtime children for element: ${element.slug}`,
        instanceChildren.map((child) => child.slug),
      )
    }

    return this.next.render(runtimeElement)
  }
}
