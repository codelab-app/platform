import { useRenderContext } from '@codelab/frontend/presenter/container'
import React from 'react'

/**
 * The root render point
 */
export const Renderer = () => {
  const context = useRenderContext()

  return <>{context.renderFactory(context.tree.getRoot())}</>
}
