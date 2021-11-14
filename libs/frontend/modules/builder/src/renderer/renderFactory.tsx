import { RenderNode } from '@codelab/frontend/abstract/core'
import { RenderContext } from '@codelab/frontend/presenter/container'
import React from 'react'
import { renderPipeline } from './renderPipeline'

/**
 * Creates a React Component from a {@link RenderNode}
 */
export const renderFactory = (node: RenderNode, context: RenderContext) => {
  const toRender: React.ReactNode = renderPipeline(node, context, {})

  return Array.isArray(toRender) && toRender.length === 1
    ? toRender[0]
    : toRender
}
