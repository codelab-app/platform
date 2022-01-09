import { mergeProps } from '@codelab/shared/utils'
import { RenderPipeFactory } from './types'

/**
 * Adds props which are universal for all elements
 */
export const basePropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const baseProps = {
      nodeid: element.id,
      __node: element,
      key: element.id,
    }

    return next(element, context, mergeProps(props, baseProps))
  }
