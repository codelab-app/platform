import { mergeProps } from '@codelab/shared/utils'
import React from 'react'
import { RenderPipeFactory } from './types'

/**
 *  If element.renderForEachPropKey is defined, it maps the corresponding prop and calls next
 *  for each item in it, with the item itself as props
 */
export const loopingRenderPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    if (!element.renderForEachPropKey) {
      return next(element, context, props)
    }

    const value = props[element.renderForEachPropKey]

    if (typeof value !== 'object') {
      return next(element, context, props)
    }

    if (!Array.isArray(value)) {
      return next(element, context, mergeProps(props, value))
    }

    return (
      <>
        {value.map((valueProps, i) => {
          return next(
            element,
            context,
            mergeProps(props, valueProps, {
              key: `${props.key || element.id}-${i}`,
            }),
          )
        })}
      </>
    )
  }
