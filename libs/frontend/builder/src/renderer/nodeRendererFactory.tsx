import {
  ComponentElementNode,
  ComponentRootNode,
  CytoscapeNode,
  NodeType,
  PageElementNode,
  PageRootNode,
} from '@codelab/frontend/shared'
import React from 'react'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import { elementParameterFactory } from './elementFactory'
import { ComponentHandlers } from './useComponentHandlers'

export type NodeRendererType<
  TNode extends CytoscapeNode,
  TMetadata = NodeRendererContext
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
  const [RootComponent, props] = elementParameterFactory({
    node,
    handlers: context.handlers,
  })

  if (!RootComponent) {
    return null
  }

  return (
    <RootComponent
      {...props}
      key={`ce__${context.pageElementId || ''}__${context.componentElementId}`}
    >
      {node.children?.map((child) =>
        nodeRendererFactory(child, { ...context, componentElementId: node.id }),
      )}
    </RootComponent>
  )
}

const renderComponentRoot: NodeRendererType<ComponentRootNode> = (
  node,
  context,
) => {
  return node.children?.map((componentElement) =>
    nodeRendererFactory(componentElement, context),
  )
}

const renderPageElement: NodeRendererType<PageElementNode> = (
  node,
  context,
) => {
  const componentRoot = CytoscapeService.fromComponent(node.component)
  const root = CytoscapeService.componentTree(componentRoot)

  return nodeRendererFactory(root, { ...context, pageElementId: node.id })
}

const renderPageRoot: NodeRendererType<PageRootNode> = (node, context) => {
  return node.children?.map((pageElement) =>
    nodeRendererFactory(pageElement, context),
  )
}

export const nodeRendererFactory = (
  node: CytoscapeNode,
  context: NodeRendererContext,
) => {
  let rendered: React.ReactNode = []

  switch (node.nodeType) {
    case NodeType.PageRoot:
      rendered = renderPageRoot(node, context)
      break
    case NodeType.PageElement:
      rendered = renderPageElement(node, context)
      break
    case NodeType.ComponentRoot:
      rendered = renderComponentRoot(node, context)
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
