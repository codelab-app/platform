import { ElementFragment } from '@codelab/codegen/graphql'
import { ElementTree } from '@codelab/modules/element'
import { css } from '@emotion/react'
import deepmerge from 'deepmerge'
import React from 'react'
import { reactComponentFactory } from './reactComponentFactory'

export type RenderNode = ElementFragment

/**
 * Generic interface of a node renderer
 */
export type ElementRendererType<
  TNode extends RenderNode = RenderNode,
  TMetadata = RenderContext<TNode>,
> = (node: TNode, metadata: TMetadata) => React.ReactNode

export type RenderContext<TNode extends RenderNode = RenderNode> = {
  /** The rendered tree */
  tree: ElementTree

  /** Extra props passed to the element. They override the common props, but props from the node instance override the extraProps */
  extraProps?: Record<string, any>

  /** Called inside the rendered components, after its children */
  postChildrenRenderHook?: (node: TNode) => React.ReactNode

  /** Use this to modify the props of the node instance.
   * @param props - the node instance props, does not include the common props
   * @return the modified props you want to get passed to the rendered react component
   */
  nodePropsMapper?: (
    props: Record<string, any>,
    node: TNode,
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
 *  Handles the rendering of elements
 */
const renderElement: ElementRendererType<ElementFragment> = (
  element,
  context,
) => {
  const elementChildren = context.tree.getChildren(element.id)
  console.log(elementChildren)

  const renderedChildren = elementChildren?.map((child) =>
    renderFactory(child, context),
  )

  // Render either the atom with children..
  if (element.atom) {
    const [RootComponent, atomProps] = reactComponentFactory({
      atom: element.atom,
      node: element,
    })

    if (!RootComponent) {
      return renderedChildren
    }

    let nodeProps = JSON.parse(element.props)

    if (context.nodePropsMapper) {
      nodeProps = context.nodePropsMapper(nodeProps, element)
    }

    return (
      <RootComponent
        {...combineProps(atomProps, context.extraProps || {}, nodeProps)}
        css={element.css ? css(element.css) : undefined}
      >
        {React.Children.count(renderedChildren)
          ? renderedChildren
          : nodeProps.children}
        {context.postChildrenRenderHook &&
          context.postChildrenRenderHook(element)}
      </RootComponent>
    )
  }

  // .. or just the children if there's no atom
  return renderedChildren
}

/**
 * Creates a React Component from a {@link RenderNode}
 */
export const renderFactory = (node: RenderNode, context: RenderContext) => {
  let toRender: React.ReactNode = []

  switch (node.__typename) {
    case 'Element':
      toRender = renderElement(node, context)
      break
    // Note: components are not implemented yet
    // case NodeType.Component:
    //   toRender = renderComponent(node, context)
    //   break
    default:
      throw new Error(`Can't render node of type ${node.__typename}`)
  }

  return Array.isArray(toRender) && toRender?.length === 1
    ? toRender[0]
    : toRender
}

/**
 * Wrapper element for {@link renderFactory}
 * @constructor
 */
export const Renderer = ({
  tree,
  context,
}: {
  tree: ElementTree
  context: Omit<RenderContext, 'tree'>
}) => renderFactory(tree.getRoot(), { ...context, tree }) as any
