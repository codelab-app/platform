import { mergeProps } from '@codelab/shared/utils'
import { RenderPipeFactory } from '../types/RenderPipe'

/**
 * Adds props which are universal for all elements
 */
export const basePropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    return next(
      element,
      context,
      mergeProps(props, {
        nodeid: element.id,
        __node: element,
        key: element.id,
      }),
    )
  }
