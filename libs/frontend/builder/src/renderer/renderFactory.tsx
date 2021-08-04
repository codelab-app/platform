import { ComponentFragment, ElementFragment } from '@codelab/codegen/graphql'
import { css } from '@emotion/react'
import deepmerge from 'deepmerge'
import React from 'react'
import { ElementTree } from '../elementTree'
import { reactComponentFactory } from './reactComponentFactory'
import { RenderNode } from './RenderNode'

//
// Types:
//

/**
 * Generic interface of a node renderer
 */
export type RenderHandler<TNode extends RenderNode = RenderNode> = (
  node: TNode,
  metadata: RenderContext<any>,
) => React.ReactNode

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

//
// Helpers:
//

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

//
// Render handlers:
//

/**
 *  Handles the rendering of elements
 */
const renderElement: RenderHandler<ElementFragment> = (element, context) => {
  const renderedChildren = context.tree
    .getChildren(element.id)
    ?.map((child) => renderFactory(child, context))

  const component = context.tree.getComponentOfElement(element.id)

  if (component) {
    return renderFactory(component, context)
  }

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
 *  Handles the rendering of components
 */
const renderComponent: RenderHandler<ComponentFragment> = (
  component,
  context,
) => {
  const rootElement = context.tree.getComponentRootElement(component.id)

  if (!rootElement) {
    return null
  }

  // data-component-id is to be able to distinguish regular elements and elements belonging to a component
  // we need this because we must not allow selection and editing of a component element inside a page builder
  return renderFactory(rootElement, {
    ...context,
    extraProps: { ...context.extraProps, 'data-component-id': component.id },
  })
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
