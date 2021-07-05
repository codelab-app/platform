import {
  ComponentNode,
  CytoscapeNode,
  ElementNode,
  NodeType,
} from '@codelab/frontend/shared'
import { css } from '@emotion/react'
import deepmerge from 'deepmerge'
import React from 'react'
import { elementFactory, RenderHandlers } from './elementFactory'

/**
 * Generic interface of a node renderer
 */
export type NodeRendererType<
  TNode extends CytoscapeNode,
  TMetadata = NodeRendererContext<TNode>,
> = (node: TNode, metadata: TMetadata) => React.ReactNode

export type NodeRendererContext<TNode extends CytoscapeNode = CytoscapeNode> = {
  handlers: RenderHandlers
  extraProps?: Record<string, any>
  pageElementId?: string
  componentElementId?: string // Not used right now, because we haven't re-implemented components in dgraph
}

const combineProps = (...props: Array<Record<string, any>>) => {
  return props.reduce((aggregate, nextProps) => {
    return {
      ...deepmerge(aggregate, nextProps),
      className: `${aggregate.className || ''} ${nextProps.className || ''}`,
    }
  }, {})
}

/**
 *  Handles the rendering of reusable components
 *  Not used right now, because we haven't re-implemented components in dgraph
 */
const renderComponent: NodeRendererType<ComponentNode> = (node, context) => {
  return node.children?.map((componentElement) =>
    nodeRendererFactory(componentElement, context),
  )
}

/**
 *  Handles the rendering of elements
 */
const renderElement: NodeRendererType<ElementNode> = (node, context) => {
  // need to change this once we add components to page element
  // const componentRoot = CytoscapeService.fromComponent(node.component)
  // const root = CytoscapeService.componentTree(componentRoot)
  //
  // return nodeRendererFactory(root, { ...context, pageElementId: node.id })

  const children = node.children?.map((child) =>
    nodeRendererFactory(child, {
      ...context,
      pageElementId: node.id,
    }),
  )

  // Render either the atom with children..
  if (node.atom) {
    const [RootComponent, props] = elementFactory({
      atom: node.atom,
      node,
      handlers: context.handlers,
    })

    if (!RootComponent) {
      return children
    }

    return (
      <RootComponent
        {...combineProps(props, context.extraProps || {}, node.props)}
        css={node.css ? css(node.css) : undefined}
      >
        {React.Children.count(children) ? children : node.props.children}
      </RootComponent>
    )
  }

  // .. or just the children if there's no atom
  return children
}

/**
 * Renders a Cytoscape node as a React component
 */
export const nodeRendererFactory = (
  node: CytoscapeNode,
  context: NodeRendererContext,
) => {
  let toRender: React.ReactNode = []

  switch (node.nodeType) {
    case NodeType.Element:
      toRender = renderElement(node, context)
      break
    case NodeType.Component:
      toRender = renderComponent(node, context)
      break
    default:
      throw new Error(`Can't render node of type ${(node as any).nodeType}`)
  }

  return Array.isArray(toRender) && toRender?.length === 1
    ? toRender[0]
    : toRender
}

export const NodeRenderer = React.memo(
  ({ node, context }: { node: CytoscapeNode; context: NodeRendererContext }) =>
    nodeRendererFactory(node, context) as any,
)
