import { get, isArray, merge } from 'lodash'
import React, { ReactElement, useCallback, useEffect } from 'react'
import { RenderPipelinePropsByElementId } from '../../store'
import { RenderContainerProps } from './types'

export const RenderContainer = ({
  context,
  children: rendered,
  isRoot = false,
}: RenderContainerProps) => {
  const getElementId = (renderedElement: ReactElement): string | undefined => {
    return get(renderedElement, 'props.data-id', undefined)
  }

  const treeToObject = useCallback(
    (renderElement: ReactElement): RenderPipelinePropsByElementId | null => {
      if (!renderElement) {
        return null
      }

      if (isArray(renderElement)) {
        return renderElement.map(treeToObject).reduce(merge)
      }

      const { children } = renderElement?.props || {}

      const chidlrenQueue =
        children && isArray(children) ? children : [children]

      const childrenProps = chidlrenQueue
        .filter((x) => !!x)
        .map(treeToObject)
        .reduce(merge, {})

      const elementId = getElementId(renderElement)
      const elementProps = elementId ? { [elementId]: renderElement.props } : {}

      return { ...elementProps, ...childrenProps }
    },
    [],
  )

  useEffect(() => {
    if (!context?.onRendered || !isRoot) {
      return
    }

    const renderMap = treeToObject(rendered as ReactElement)
    context.onRendered(renderMap || {})
  }, [context, rendered, isRoot, treeToObject])

  return <>{rendered}</>
}
