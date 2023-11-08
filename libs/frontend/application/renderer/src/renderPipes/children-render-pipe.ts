import type {
  IRenderOutput,
  IRenderPipe,
  IRuntimeElementModel,
} from '@codelab/frontend/abstract/application'
import { isComponent } from '@codelab/frontend/abstract/domain'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { BaseRenderPipe } from './render-pipe.base'

@model('@codelab/ChildrenRenderPipe')
export class ChildrenRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(runtimeElement: IRuntimeElementModel): IRenderOutput {
    const { element } = runtimeElement

    /**
     * Component instance children handled by @ComponentInstanceChildrenRenderPipe
     */
    if (isComponent(element.renderType.current)) {
      return this.next.render(runtimeElement)
    }

    for (const child of element.children) {
      runtimeElement.addRuntimeChild(child)
    }

    if (this.renderer.debugMode) {
      console.info(
        `ChildrenRenderPipe: Creating runtime children for element: ${element.slug}`,
        element.children.map((child) => child.slug),
      )
    }

    return this.next.render(runtimeElement)
  }
}
