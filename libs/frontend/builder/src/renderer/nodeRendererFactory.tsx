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
  /** Use handlers to modify the behaviour of the rendered elements */
  handlers: RenderHandlers

  /** Extra props passed to the element. They override the common props, but props from the node instance override the extraProps */
  extraProps?: Record<string, any>

  /** Called inside the rendered components, after its children */
  postChildrenRenderHook?: (node: CytoscapeNode) => React.ReactNode

  /** Use this to modify the props of the node instance.
   * @param props - the node instance props, does not include the common props
   * @return the modified props you want to get passed to the rendered react component
   */
  nodePropsMapper?: (
    props: Record<string, any>,
    node: CytoscapeNode,
  ) => Record<string, any>
}

/**
 *  Deep merges a list of props together, the latter props have priority over the prior ones in case of conflict
 * The following edge cases are handled:
 * - Merging className strings together
 */
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
    nodeRendererFactory(child, context),
  )

  // Render either the atom with children..
  if (node.atom) {
    const [RootComponent, atomProps] = elementFactory({
      atom: node.atom,
      node,
      handlers: context.handlers,
    })

    if (!RootComponent) {
      return children
    }

    let nodeProps = node.props

    if (context.nodePropsMapper) {
      nodeProps = context.nodePropsMapper(nodeProps, node)
    }

    return (
      <RootComponent
        {...combineProps(atomProps, context.extraProps || {}, nodeProps)}
        css={node.css ? css(node.css) : undefined}
      >
        {React.Children.count(children) ? children : nodeProps.children}
        {context.postChildrenRenderHook && context.postChildrenRenderHook(node)}
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
    // Note: components are not implemented yet
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

/**
 * Wrapper element for {@link nodeRendererFactory}
 * @constructor
 */
export const NodeRenderer = ({
  node,
  context,
}: {
  node: CytoscapeNode
  context: NodeRendererContext
}) => nodeRendererFactory(node, context) as any
