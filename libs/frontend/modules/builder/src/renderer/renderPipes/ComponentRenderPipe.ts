import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/core'
import { Component } from '@codelab/frontend/modules/component'
import { Element } from '@codelab/frontend/modules/element'
import { PropsData } from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { Model, model, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { IRenderPipe } from '../abstract/IRenderPipe'
import { RenderOutput } from '../abstract/RenderOutput'
import { getRenderContext } from '../renderContext'
import type { RenderService } from '../RenderService'
import { mapOutput } from '../utils/renderOutputUtils'

@model('@codelab/ComponentRenderPipe')
export class ComponentRenderPipe
  extends Model({ next: prop<IRenderPipe>() })
  implements IRenderPipe
{
  render(element: Element, props: PropsData): ArrayOrSingle<RenderOutput> {
    const component = element.instanceOfComponent?.current

    if (!component) {
      return this.next.render(element, props)
    }

    const renderer = getRenderContext(this)
    const rootElement = renderer.tree.getRootElementOfComponent(component)

    if (!rootElement) {
      ComponentRenderPipe.logRootElementNotFound(renderer, element)

      return this.next.render(element, props)
    }

    ComponentRenderPipe.logRendering(renderer, rootElement, element)

    // Start the pipe again with the root element
    const output = renderer.renderElementIntermediate(rootElement)

    const overrideProps = ComponentRenderPipe.makeOverrideProps(
      props,
      component,
    )

    return mapOutput(output, (o) => ({
      ...o,
      // replace the root element id with the instance id
      elementId: element.id,
      // Override the component props with the instance props
      props: mergeProps(o.props, overrideProps),
    }))
  }

  private static makeOverrideProps(props: PropsData, component: Component) {
    const {
      key,
      [DATA_COMPONENT_ID]: cid,
      ...overrideProps
    } = { ...props } as any

    return {
      [DATA_COMPONENT_ID]: component.id,
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
