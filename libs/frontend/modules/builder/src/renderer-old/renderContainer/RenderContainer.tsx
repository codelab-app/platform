import React, { ReactElement, useEffect } from 'react'
import { getRenderedProps } from '../utils'
import { RenderContainerProps } from './types'

/**
 * A global wrapper to register props when render is done
 */
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

    const renderedPropsMap = getRenderedProps(rendered as ReactElement)
    /**
     * Register the PropsDataByElementId to Redux so we can show props to the props inspector. These values are transformed by the props pipeline, so we can't show them directly from the database.
     */
    context.onRendered(renderedPropsMap || {})
  }, [rendered, context])

  return <>{rendered}</>
}
