import { get, isObjectLike } from 'lodash'
import React, { ReactElement, useEffect } from 'react'
import { renderPipeline } from '../pipes'
import { RenderContainerWithKeyProps } from './types'

export const RenderContainerWithKey = ({
  element,
  context,
  props,
  isRoot,
}: RenderContainerWithKeyProps) => {
  const inspectRoot = context.inspect && isRoot

  if (inspectRoot) {
    console.group('Root')
  }

  const rendered = renderPipeline(element, context, props)

  if (inspectRoot) {
    console.groupEnd()
  }

  const getElementId = (renderedElement: ReactElement): string | undefined => {
    return get(renderedElement, 'props.data-id', undefined)
  }

  useEffect(() => {
    if (!context.onRendered) {
      return
    }

    const renderedElement = rendered as ReactElement
    const elementId = getElementId(renderedElement)
    const renderedElementProps = renderedElement.props

    if (!elementId || !isObjectLike(renderedElementProps)) {
      return
    }

    context.onRendered({ elementId, props: renderedElement.props })
  }, [context, rendered])

  return <>{rendered}</>
}
