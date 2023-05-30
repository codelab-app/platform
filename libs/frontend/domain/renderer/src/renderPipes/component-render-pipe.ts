import type {
  IElement,
  IPropData,
  IRenderer,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/frontend/abstract/core'
import {
  componentRef,
  getRendererId,
  isComponentInstance,
} from '@codelab/frontend/abstract/core'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { ArrayOrSingle } from 'ts-essentials'
import { ComponentRuntimeProps } from '../component-runtime-props.model'
import { BaseRenderPipe } from './render-pipe.base'

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
    // only the main component is not cloned in component builder
    // other nested components inside the main must be cloned
    // therefor it is not enough to compare using renderer.renderType
    const isComponentBuilder = this.renderer.id === getRendererId(component.id)

    const componentToRender = isComponentBuilder
      ? component
      : component.clone(element.id, element.id)

    const runtimeProp = ComponentRuntimeProps.create(
      componentRef(componentToRender.id),
    )

    this.renderer.runtimeProps.set(componentToRender.id, runtimeProp)

    const rootElement = componentToRender.rootElement.current

    ComponentRenderPipe.logRendering(this.renderer, rootElement, element)

    return this.renderer.renderIntermediateElement(rootElement)
  }

  // private static logRootElementNotFound(
  //   renderer: IRenderer,
  //   element: IElement,
  // ) {
  //   if (renderer.debugMode) {
  //     console.info(
  //       'ComponentRenderPipe: No root element found for the component',
  //       { element: element.name },
  //     )
  //   }
  // }

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
