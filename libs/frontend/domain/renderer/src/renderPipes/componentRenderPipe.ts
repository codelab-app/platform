import type {
  IElement,
  IPropData,
  IRenderer,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/frontend/abstract/core'
import {
  DATA_COMPONENT_ID,
  isComponentInstance,
} from '@codelab/frontend/abstract/core'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { ArrayOrSingle } from 'ts-essentials'
import { BaseRenderPipe } from './renderPipe.base'

@model('@codelab/ComponentRenderPipe')
export class ComponentRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput> {
    if (!isComponentInstance(element.renderType)) {
      return this.next.render(element, props)
    }

    const component = element.renderType.current
    const clonedComponent = component.clone(element.id)
    const rootElement = clonedComponent.elementTree.root

    if (!rootElement) {
      ComponentRenderPipe.logRootElementNotFound(this.renderer, element)

      return this.next.render(element, props)
    }

    const overrideProps = {
      ...props,
      [DATA_COMPONENT_ID]: clonedComponent.id,
    }

    ComponentRenderPipe.logRendering(this.renderer, rootElement, element)

    return this.renderer.renderIntermediateElement(rootElement, overrideProps)
  }

  private static logRootElementNotFound(
    renderer: IRenderer,
    element: IElement,
  ) {
    if (renderer.debugMode) {
      console.info(
        'ComponentRenderPipe: No root element found for the component',
        { element: element.name },
      )
    }
  }

  private static logRendering(
    renderer: IRenderer,
    rootElement: IElement,
    element: IElement,
  ) {
    if (renderer.debugMode) {
      console.info(
        `ComponentRenderPipe: rendering component with root element ${rootElement.name}`,
        { element: element.name },
      )
    }
  }
}
