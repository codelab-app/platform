import { mergeProps } from '@codelab/shared/utils'
import { merge } from 'lodash'
import { RenderPipeFactory } from './types'

/** If the element is a component add 'data-component-id' to the extra props */
export const componentPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const isComponent = !!element.componentTag

    if (!isComponent) {
      return next(element, context, props)
    }

    const componentProp = { 'data-component-id': element.id }
    const updateContext = merge(context, { extraProps: componentProp })
    const mergedProps = mergeProps(props, componentProp)

    return next(element, updateContext, mergedProps)
  }
