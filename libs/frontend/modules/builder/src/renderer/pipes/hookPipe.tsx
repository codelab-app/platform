import { RenderPipeFactory } from '../types/RenderTypes'

/**
 * Adds in props from element.hooks
 */
export const hookPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    // TODO: implement hookPipe

    return next(element, context, props)
  }
