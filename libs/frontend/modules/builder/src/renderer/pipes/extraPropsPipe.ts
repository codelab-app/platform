import { mergeProps } from '@codelab/shared/utils'
import { RenderPipeFactory } from '../types/RenderPipe'

/**
 * Adds context.extraProps
 */
export const extraPropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    return next(
      element,
      context,
      context.extraProps ? mergeProps(props, context.extraProps) : props,
    )
  }
