import { PropData } from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { isArray, isObjectLike } from 'lodash'
import React from 'react'
import { RenderPipeFactory } from './types'

/**
 *  If element.renderForEachPropKey is defined, it maps the corresponding prop and calls next
 *  for each item in it, with the item itself as props
 */
export const loopingRenderPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const { renderForEachPropKey } = element
    const value = renderForEachPropKey ? props[renderForEachPropKey] : null

    if (!isObjectLike(value) || !isArray(value)) {
      const nextProps = isObjectLike(value) ? mergeProps(props, value) : props

      return next(element, context, nextProps)
    }

    const renderProp = (valueProp: PropData, index: number) => {
      const key = `${props.key || element.id}-${index}`

      return next(element, context, mergeProps(props, valueProp, { key }))
    }

    return <>{value.map(renderProp)}</>
  }
