import { DATA_COMPONENT_ID, DATA_ID } from '@codelab/frontend/abstract/core'
import { Component } from '@codelab/frontend/modules/component'
import { Element } from '@codelab/frontend/modules/element'
import { IPropData } from '@codelab/shared/abstract/core'
import { Model, model, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { IRenderPipe } from '../abstract/IRenderPipe'
import { RenderOutput } from '../abstract/RenderOutput'
import type { RenderService } from '../RenderService'
import { getRenderContext } from '../renderServiceContext'

@model('codelab/ComponentRenderPipe')
export class ComponentRenderPipe
  extends Model({ next: prop<IRenderPipe>() })
  implements IRenderPipe
{
  render(element: Element, props: IPropData): ArrayOrSingle<RenderOutput> {
    const component = element.instanceOfComponent?.current

    if (!component) {
      return this.next.render(element, props)
    }

    const renderer = getRenderContext(this)
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

    return renderer.renderElementIntermediate(rootElement, overrideProps)
  }

  private static makeOverrideProps(props: IPropData, component: Component) {
    const {
      key,
      [DATA_COMPONENT_ID]: cid,
      [DATA_ID]: id,
      ...overrideProps
    } = { ...props } as any

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
      console.log(
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
      console.log(
        `ComponentRenderPipe: rendering component with root element ${rootElement.name}`,
        { element: element.name },
      )
    }
  }
}
