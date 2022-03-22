import { mergeProps } from '@codelab/shared/utils'
import { RenderPipeFactory } from './types'

/**
 * Adds context.extraProps
 */
export const extraPropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const { extraProps } = context
    const mergedProps = extraProps ? mergeProps(props, extraProps) : props

    return next(element, context, mergedProps)
  }
