import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { merge } from 'lodash'
import { RenderPipeFactory } from './types'

/** If the element is a component add ${DATA_COMPONENT_ID} to the extra props */
export const componentPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const isComponent = !!element.componentTag

    if (!isComponent) {
      return next(element, context, props)
    }

    const componentProp = { [DATA_COMPONENT_ID]: element.id }
    const updateContext = merge(context, { extraProps: componentProp })
    const mergedProps = mergeProps(props, componentProp)

    return next(element, updateContext, mergedProps)
  }
