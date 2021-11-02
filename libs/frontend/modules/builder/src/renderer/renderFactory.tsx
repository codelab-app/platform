import { RenderNode } from '@codelab/frontend/abstract/core'
import { RenderContext } from '@codelab/frontend/presenter/container'
import React from 'react'
import { renderElement } from './handlers/renderElement'

/**
 * Creates a React Component from a {@link RenderNode}
 */
export const renderFactory = (node: RenderNode, context: RenderContext) => {
  const toRender: React.ReactNode = renderElement(node, context)

  return Array.isArray(toRender) && toRender?.length ? toRender[0] : toRender
}
