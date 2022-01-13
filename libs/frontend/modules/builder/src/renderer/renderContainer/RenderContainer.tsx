import React, { ReactElement, useEffect } from 'react'
import { getRenderedProps } from '../utils'
import { RenderContainerProps } from './types'

export const RenderContainer = ({ context, root }: RenderContainerProps) => {
  if (context?.inspect) {
    console.group('Root')
  }

  const rendered = context?.render(root, context, {})

  if (context?.inspect) {
    console.groupEnd()
  }

  useEffect(() => {
    if (!context?.onRendered) {
      return
    }

    const renderMap = getRenderedProps(rendered as ReactElement)
    context.onRendered(renderMap || {})
  }, [rendered, context])

  return <>{rendered}</>
}
