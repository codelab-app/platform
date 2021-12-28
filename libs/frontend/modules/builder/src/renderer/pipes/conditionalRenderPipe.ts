import { logRendered, shouldStopRendering } from '../utils'
import { RenderPipeFactory } from './types'

/**
 * Evaluates the renderIfPropKey and stops the render pipeline if it evaluates to falsy
 */
export const conditionalRenderPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    if (shouldStopRendering(element, props)) {
      logRendered(null, element, context)

      return null
    }

    return next(element, context, props)
  }
