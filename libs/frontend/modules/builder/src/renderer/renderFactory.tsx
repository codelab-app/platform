import { RenderNode } from '@codelab/frontend/abstract/core'
import React from 'react'
import { renderPipeline } from './renderPipeline'
import { RenderContext } from './types/RenderTypes'

/**
 * Creates a React Component from a {@link RenderNode}
 */
export const renderFactory = (node: RenderNode, context: RenderContext) => {
  const toRender: React.ReactNode = renderPipeline(node, context, {})

  return Array.isArray(toRender) && toRender.length === 1
    ? toRender[0]
    : toRender
}
