import { mergeProps } from '@codelab/shared/utils'
import { RenderPipeFactory } from './types'

/**
 * Adds in props from element.hooks
 */
export const hookPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    if (!context.getHooksResponse) {
      return next(element, context, props)
    }

    const { getHooksResponse } = context
    const { hooks } = element
    const hooksResponse = hooks ? getHooksResponse(hooks, props) : {}

    return next(element, context, mergeProps(props, hooksResponse))
  }
