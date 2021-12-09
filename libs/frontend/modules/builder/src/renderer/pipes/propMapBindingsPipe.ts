import { mergeProps } from '@codelab/shared/utils'
import { RenderPipeFactory } from '../types/RenderTypes'
import { applyBinding } from '../utils/applyBinding'

/**
 * Adds the prop map bindings to the context
 */
export const propMapBindingsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const extraProps = {
      ...context.extraElementProps,
    }

    let currentElementProps: Record<string, any> = {}

    if (element.propMapBindings && element.propMapBindings.length > 0) {
      for (const binding of element.propMapBindings) {
        if (binding.targetElementId) {
          extraProps[binding.targetElementId] = applyBinding(
            extraProps[binding.targetElementId] ?? {},
            props,
            binding,
          )
        } else {
          currentElementProps = applyBinding(
            currentElementProps,
            props,
            binding,
          )
        }
      }
    }

    return next(
      element,
      {
        ...context,
        extraElementProps: extraProps,
      },
      mergeProps(props, currentElementProps),
    )
  }
