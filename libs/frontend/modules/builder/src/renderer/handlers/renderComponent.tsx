import { isComponent } from '@codelab/frontend/modules/element'
import { RenderHandler } from '../types/RenderHandler'

export const renderComponent: RenderHandler = (component, context) => {
  if (!isComponent(component)) {
    return null
  }

  if (!context) {
    throw new Error(
      'You need to have a RenderContext.Provider before Rendering Components',
    )
  }

  const rootElement = context.tree.getComponentRootElement(component.id)

  if (!rootElement) {
    return null
  }

  // data-component-id is to be able to distinguish regular elements and elements belonging to a component
  // we need this because we must not allow selection and editing of a component element inside a page builder
  return context.renderFactory(rootElement, {
    ...context,
    extraProps: { ...context.extraProps, 'data-component-id': component.id },
  })
}
