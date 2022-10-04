import {
  DATA_COMPONENT_ID,
  DATA_ELEMENT_ID,
  IComponent,
  IElement,
  IPropData,
  IRenderer,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/frontend/abstract/core'
import { getElementService } from '@codelab/frontend/presenter/container'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { BaseRenderPipe } from './renderPipe.base'

@model('@codelab/ComponentRenderPipe')
export class ComponentRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput> {
    const component = element.renderComponentType?.current

    if (!component) {
      return this.next.render(element, props)
    }

    const elementService = getElementService(this)
    const rootElement = elementService.elements.get(component.rootElementId)

    if (!rootElement) {
      ComponentRenderPipe.logRootElementNotFound(this.renderer, element)

      return this.next.render(element, props)
    }

    ComponentRenderPipe.logRendering(this.renderer, rootElement, element)

    // Start the pipe again with the root element
    const overrideProps = ComponentRenderPipe.makeOverrideProps(
      props,
      component,
    )

    return this.renderer.renderIntermediateElement(rootElement, overrideProps)
  }

  private static makeOverrideProps(props: IPropData, component: IComponent) {
    const { key, [DATA_ELEMENT_ID]: id, ...overrideProps } = { ...props } as any

    return {
      [DATA_COMPONENT_ID]: component.id,
      [DATA_ELEMENT_ID]: component.rootElementId,
      ...overrideProps,
    }
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
