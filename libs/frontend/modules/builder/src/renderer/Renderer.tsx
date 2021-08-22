import { useRenderContext } from '@codelab/frontend/presenter/container'
import React from 'react'

/**
 * The root render point. RendererProvider must be used first.
 */
export const Renderer = () => {
  const context = useRenderContext()

  return (
    <>
      {context.renderFactory(context.tree.getRoot(), {
        ...(context ?? {}),
        tree: context.tree,
      })}
    </>
  )
}
