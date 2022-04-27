import { DATA_COMPONENT_ID, DATA_ID } from '@codelab/frontend/abstract/core'
import { Component } from '@codelab/frontend/modules/component'
import { Element } from '@codelab/frontend/modules/element'
import {
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/shared/abstract/core'
import { Model, model, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import type { RenderService } from '../render.service'
import { getRenderService } from '../renderServiceContext'

@model('@codelab/ComponentRenderPipe')
export class ComponentRenderPipe
  extends Model({ next: prop<IRenderPipe>() })
  implements IRenderPipe
{
  render(element: Element, props: IPropData): ArrayOrSingle<IRenderOutput> {
    const component = element.instanceOfComponent?.current

    if (!component) {
      return this.next.render(element, props)
    }

    const renderer = getRenderService(this)
    const rootElement = renderer.tree?.element(component.rootElementId)

    if (!rootElement) {
      ComponentRenderPipe.logRootElementNotFound(renderer, element)

      return this.next.render(element, props)
    }

    ComponentRenderPipe.logRendering(renderer, rootElement, element)

    // Start the pipe again with the root element
    const overrideProps = ComponentRenderPipe.makeOverrideProps(
      props,
      component,
    )

    return renderer.renderIntermediateElement(rootElement, overrideProps)
  }

  private static makeOverrideProps(props: IPropData, component: Component) {
    const { key, [DATA_ID]: id, ...overrideProps } = { ...props } as any

    return {
      [DATA_COMPONENT_ID]: component.id,
      [DATA_ID]: component.rootElementId,
      ...overrideProps,
    }
  }

  private static logRootElementNotFound(
    renderer: RenderService,
    element: Element,
  ) {
    if (renderer.debugMode) {
      console.info(
        'ComponentRenderPipe: No root element found for the component',
        { element: element.name },
      )
    }
  }

  private static logRendering(
    renderer: RenderService,
    rootElement: Element,
    element: Element,
  ) {
    if (renderer.debugMode) {
      console.info(
        `ComponentRenderPipe: rendering component with root element ${rootElement.name}`,
        { element: element.name },
      )
    }
  }
}
