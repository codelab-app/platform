import type {
  IElementModel,
  IRenderer,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/frontend/abstract/domain'
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
  render(element: IElementModel, props: IPropData): IRenderOutput {
    if (!isComponent(element.renderType.current)) {
      return this.next.render(element, props)
    }

    const component = element.renderType.current
    const clonedComponent = component.clone(element.id, element.id)
    const rootElement = clonedComponent.rootElement.current

    this.renderer.addRuntimeProps(componentRef(clonedComponent.id))

    ComponentRenderPipe.logRendering(this.renderer, rootElement, element)

    return this.renderer.renderIntermediateElement(rootElement)
  }

  private static logRendering(
    renderer: IRenderer,
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
