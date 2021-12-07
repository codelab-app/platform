import { mergeProps } from '@codelab/shared/utils'
import { RenderPipeFactory } from '../types/RenderTypes'

/*
 * Evaluates the prop transformation js
 */
export const propTransformationJsPipe: RenderPipeFactory =
  (next) => (element, context, initialProps) => {
    const transformationJs = element.propTransformationJs

    if (transformationJs) {
      try {
        const props = { ...initialProps }
        // eslint-disable-next-line no-eval
        const transform = eval(`(${transformationJs})`) // the parentheses allow us to return a function from eval

        if (typeof transform === 'function') {
          const newProps = transform(props)

          if (typeof newProps === 'object' && newProps) {
            return next(element, context, mergeProps(props, newProps))
          }
        }
      } catch (e) {
        console.warn('Error while evaluating prop transformation', e)
      }
    }

    return next(element, context, initialProps)
  }
