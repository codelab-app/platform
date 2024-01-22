import {
  type IRenderOutput,
  type IRenderPipe,
  type IRuntimeElementModel,
  isRuntimeElement,
} from '@codelab/frontend/abstract/application'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { BaseRenderPipe } from './render-pipe.base'

@model('@codelab/ChildMapperRenderPipe')
export class ChildMapperRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(runtimeElement: IRuntimeElementModel): IRenderOutput {
    const element = runtimeElement.element.current
    const childMapperComponent = element.childMapperComponent

    if (!childMapperComponent) {
      return this.next.render(runtimeElement)
    }

    const props = runtimeElement.runtimeProps.evaluatedChildMapperProp || []
    const component = childMapperComponent.current
    const previousSiblingId = element.childMapperPreviousSibling?.id

    const childMapperRenderIndex =
      runtimeElement.sortedRuntimeChildren.findIndex(
        (child) =>
          isRuntimeElement(child) && child.element.id === previousSiblingId,
      ) + 1

    for (let index = 0; index < props.length; index++) {
      // since we are adding component no problem with casting
      const runtimeComponent = runtimeElement.addRuntimeChild(
        component,
        childMapperRenderIndex + index,
      )

      runtimeComponent.setChildMapperIndex(index)
    }

    if (this.renderer.debugMode) {
      console.info(
        `ChildMapperRenderPipe: Creating runtime component for: ${runtimeElement.element.current.slug}`,
      )
    }

    return this.next.render(runtimeElement)
  }
}
