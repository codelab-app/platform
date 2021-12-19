import { mergeProps } from '@codelab/shared/utils'
import { RenderPipeFactory } from '../types'

/**
 * Adds context.extraElementProps
 */
export const extraElementPropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    if (
      context.extraElementProps &&
      context.extraElementProps[element.id] &&
      typeof context.extraElementProps[element.id] === 'object'
    ) {
      return next(
        element,
        context,
        mergeProps(props, context.extraElementProps[element.id]),
      )
    }

    return next(element, context, props)
  }
