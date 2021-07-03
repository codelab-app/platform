import {
  ComponentElementNode,
  ComponentNode,
  CytoscapeNode,
  NodeType,
  PageElementNode,
} from '@codelab/frontend/shared'
import { css } from '@emotion/react'
import React from 'react'
import { atomElementFactory } from './elementFactory'
import { ComponentHandlers } from './useComponentHandlers'

export type NodeRendererType<
  TNode extends CytoscapeNode,
  TMetadata = NodeRendererContext,
> = (node: TNode, metadata: TMetadata) => React.ReactNode

export type NodeRendererContext = {
  handlers: ComponentHandlers
  pageElementId?: string
  componentElementId?: string
}

const renderComponentElement: NodeRendererType<ComponentElementNode> = (
  node,
  context,
) => {
  const [RootComponent, props] = atomElementFactory({
    node,
    atom: node.atom,
    handlers: context.handlers,
  })

  if (!RootComponent) {
    return null
  }

  return (
    <RootComponent
      {...props}
      key={node.id}
      // key={`ce__${context.pageElementId || ''}__${context.componentElementId}`}
    >
      {node.children?.map((child) =>
        nodeRendererFactory(child, {
          ...context,
          componentElementId: node.id,
        }),
      )}
    </RootComponent>
  )
}

const renderComponent: NodeRendererType<ComponentNode> = (node, context) => {
  return node.children?.map((componentElement) =>
    nodeRendererFactory(componentElement, context),
  )
}

const renderPageElement: NodeRendererType<PageElementNode> = (
  node,
  context,
) => {
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

  if (node.atom) {
    const [RootComponent, props] = atomElementFactory({
      atom: node.atom,
      node,
      handlers: context.handlers,
    })

    if (!RootComponent) {
      return children
    }

    return (
      <RootComponent
        {...props}
        {...node.props}
        css={node.css ? css(node.css) : undefined}
        key={node.id}
      >
        {React.Children.count(children) ? children : node.props.children}
      </RootComponent>
    )
  }

  return children
}

export const nodeRendererFactory = (
  node: CytoscapeNode,
  context: NodeRendererContext,
) => {
  let rendered: React.ReactNode = []

  switch (node.nodeType) {
    case NodeType.PageElement:
      rendered = renderPageElement(node, context)
      break
    case NodeType.Component:
      rendered = renderComponent(node, context)
      break
    case NodeType.ComponentElement:
      rendered = renderComponentElement(node, context)
      break
    default:
      throw new Error(`Can't render node of type ${(node as any).nodeType}`)
  }

  return Array.isArray(rendered) && rendered?.length === 1
    ? rendered[0]
    : rendered
}
