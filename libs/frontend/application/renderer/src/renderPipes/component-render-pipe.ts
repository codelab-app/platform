import type {
  IRendererModel,
  IRenderOutput,
  IRenderPipe,
  IRuntimeElementModel,
} from '@codelab/frontend/abstract/application'
import type { IElementModel } from '@codelab/frontend/abstract/domain'
import { componentRef, isComponent } from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { BaseRenderPipe } from './render-pipe.base'

@model('@codelab/ComponentRenderPipe')
export class ComponentRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(runtimeElement: IRuntimeElementModel): IRenderOutput {
    const element = runtimeElement.element

    if (!isComponent(element.renderType.current)) {
      return this.next.render(runtimeElement)
    }

    const component = element.renderType.current
    const clonedComponent = component.clone(element.id, element.id)
    const rootElement = clonedComponent.rootElement.current

    // this.renderer.addRuntimeComponent(clonedComponent)

    ComponentRenderPipe.logRendering(this.renderer, rootElement, element)

    return this.renderer.renderIntermediateElement(rootElement)
  }

  private static logRendering(
    renderer: IRendererModel,
    rootElement: IElementModel,
    element: IElementModel,
  ) {
    if (renderer.debugMode) {
      console.info(
        `ComponentRenderPipe: rendering component with root element ${rootElement.name}`,
        { element: element.name },
      )
    }
  }
}
