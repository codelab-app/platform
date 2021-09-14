import { ElementTreeGraphql } from '@codelab/frontend/modules/element'
import { RenderContext } from '@codelab/frontend/presenter/container'
import React from 'react'
import { renderComponent } from './handlers/renderComponent'
import { renderElement } from './handlers/renderElement'
import { RenderNode } from './types/RenderNode'

/**
 * Creates a React Component from a {@link RenderNode}
 */
export const renderFactory = (
  node: RenderNode,
  context: RenderContext<ElementTreeGraphql>,
) => {
  let toRender: React.ReactNode = []

  switch (node.__typename) {
    case 'Element':
      toRender = renderElement(node, context)
      break
    case 'Component':
      toRender = renderComponent(node, context)
      break
    default:
      throw new Error(`Can't render node of type ${(node as any)?.__typename}`)
  }

  return Array.isArray(toRender) && toRender?.length === 1
    ? toRender[0]
    : toRender
}
