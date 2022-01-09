import { mergeProps } from '@codelab/shared/utils'
import React from 'react'
import { RenderContainer } from '../renderContainer'
import { containerKey } from '../utils'
import { RenderPipeFactory } from './types'

/** If the element is a component add 'data-component-id' to the extra props */
export const componentPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const isComponent = !!element.componentTag

    if (isComponent) {
      return next(
        element,
        {
          ...context,
          extraProps: {
            ...context.extraProps,
            'data-component-id': element.id,
          },
        },
        mergeProps(props, { 'data-component-id': element.id }),
      )
    }

    if (element.instanceOfComponent?.id) {
      const component = context.tree.getComponentById(
        element.instanceOfComponent.id,
      )

      if (component) {
        // We override the component props with the element instance props
        const updateContext = {
          ...context,
          extraElementProps: {
            //
            ...context.extraElementProps,
            [component.id]: props,
          },
        }

        return (
          <RenderContainer key={containerKey(component)}>
            {context.render(component, updateContext, props)}
          </RenderContainer>
        )
      }
    }

    return next(element, context, props)
  }
