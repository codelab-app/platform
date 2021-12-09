import { mergeProps } from '@codelab/shared/utils'
import { RenderPipeFactory } from '../types/RenderTypes'

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

    return next(element, context, props)
  }
