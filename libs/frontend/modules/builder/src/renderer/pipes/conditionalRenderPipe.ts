import { RenderPipeFactory } from '../types/RenderTypes'
import { evaluateRenderIfPropKey } from '../utils/evaluateRenderIfPropKey'
import { onRendered } from '../utils/onRendered'

/**
 * Evaluates the renderIfPropKey and stops the render pipeline if it evaluates to falsy
 */
export const conditionalRenderPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    if (!evaluateRenderIfPropKey(element.renderIfPropKey, props)) {
      onRendered(null, element, context)

      return null
    }

    return next(element, context, props)
  }
