import { useRenderContext } from '@codelab/frontend/shared'
import React from 'react'

/**
 * The root render point
 */
export const Renderer = () => {
  const context = useRenderContext()

  return <>{context.renderFactory(context.tree.getRoot())}</>
}
