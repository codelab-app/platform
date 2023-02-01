import type {
  IElement,
  IInterfaceType,
  IPropData,
  IRenderer,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/frontend/abstract/core'
import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/core'
import { getComponentService } from '@codelab/frontend/presenter/container'
import { mergeProps } from '@codelab/shared/utils'
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
    const component = element.renderComponentType?.current

    if (!component) {
      return this.next.render(element, props)
    }

    const componentService = getComponentService(this)

    const clonedComponent = componentService.cloneComponentTree(
      element,
      component,
    )

    const rootElement = clonedComponent.elementTree?.root

    if (!rootElement) {
      ComponentRenderPipe.logRootElementNotFound(this.renderer, element)

      return this.next.render(element, props)
    }

    const defaultValues = (component.api.current as IInterfaceType)
      .defaultValues

    /**
     * instance props --overrides--> component props --overrides--> interface default values
     */
    const overrideProps = mergeProps(
      element.props?.values,
      component.props?.values,
      defaultValues,
    )

    const instanceProps = {
      ...overrideProps,
      [DATA_COMPONENT_ID]: clonedComponent.id,
    }

    clonedComponent.props?.setMany(instanceProps)

    ComponentRenderPipe.logRendering(this.renderer, rootElement, element)

    return this.renderer.renderIntermediateElement(rootElement)
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
