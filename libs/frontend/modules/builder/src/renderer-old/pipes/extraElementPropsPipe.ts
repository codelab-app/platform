import { mergeProps } from '@codelab/shared/utils'
import { RenderPipeFactory } from './types'

/**
 * Adds context.extraElementProps.${element.id}
 */
export const extraElementPropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const elementExtraProps = context?.extraElementProps?.[element.id] || {}

    return next(element, context, mergeProps(props, elementExtraProps))
  }
