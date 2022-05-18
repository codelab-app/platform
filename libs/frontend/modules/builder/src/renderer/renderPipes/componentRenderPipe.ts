import {
  DATA_COMPONENT_ID,
  DATA_ELEMENT_ID,
} from '@codelab/frontend/abstract/core'
import {
  IComponent,
  IElement,
  IPropData,
  IRenderOutput,
  IRenderPipe,
  IRenderService,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelClass, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { BaseRenderPipe } from './renderPipe.base'

@model('@codelab/ComponentRenderPipe')
export class ComponentRenderPipe
  extends ExtendedModel(modelClass(BaseRenderPipe), {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput> {
    const component = element.instanceOfComponent?.current

    if (!component) {
      return this.next.render(element, props)
    }

    const rootElement = this.renderer.current.tree?.element(
      component.rootElementId,
    )

    if (!rootElement) {
      ComponentRenderPipe.logRootElementNotFound(this.renderer.current, element)

      return this.next.render(element, props)
    }

    ComponentRenderPipe.logRendering(
      this.renderer.current,
      rootElement,
      element,
    )

    // Start the pipe again with the root element
    const overrideProps = ComponentRenderPipe.makeOverrideProps(
      props,
      component,
    )

    return this.renderer.current.renderIntermediateElement(
      rootElement,
      overrideProps,
    )
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
    renderer: IRenderService,
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
    renderer: IRenderService,
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
