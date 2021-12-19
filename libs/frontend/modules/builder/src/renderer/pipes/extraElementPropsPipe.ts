import { mergeProps } from '@codelab/shared/utils'
import { get } from 'lodash'
import { RenderPipeFactory } from './types'

/**
 * Adds context.extraElementProps.${element.id}
 */
export const extraElementPropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const propsPath = `extraElementProps.${element.id}`
    const elementExtraProps = get(context, propsPath, {})

    return next(element, context, mergeProps(props, elementExtraProps))
  }
