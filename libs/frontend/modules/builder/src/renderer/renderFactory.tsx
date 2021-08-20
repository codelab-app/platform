import { isElement, RenderNode } from '@codelab/frontend/abstract/props'
import { RenderContext } from '@codelab/frontend/presenter/container'
import { ComponentFragment } from '@codelab/shared/codegen/graphql'
import { css } from '@emotion/react'
import deepmerge from 'deepmerge'
import React, { ReactElement } from 'react'
import { reactComponentFactory } from './reactComponentFactory'

//
// Types:
//

/**
 * Generic interface of a node renderer
 */
export type RenderHandler<TNode extends RenderNode = RenderNode> = (
  node: TNode,
  metadata: RenderContext,
) => ReactElement | null

//
// Helpers:
//

/**
 *  Deep merges a list of props together, the latter props have priority over the prior ones in case of conflict
 * The following edge cases are handled:
 * - Merging className strings together
 */
const mergeProps = (...props: Array<Record<string, any>>) => {
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
const renderElement: RenderHandler = (element, context) => {
  const renderedChildren = context.tree
    .getChildren(element.id)
    ?.map((child) => renderFactory(child, context))

  const component = context.tree.getComponentOfElement(element.id)

  if (component) {
    return renderFactory(component, context)
  }

  // Render either the atom with children..
  if (isElement(element) && element.atom) {
    const [RootComponent, atomProps] = reactComponentFactory({
      atom: element.atom,
      node: element,
    })

    if (!RootComponent) {
      return renderedChildren
    }

    const elementProps: Record<string, any> = JSON.parse(element.props)

    const propsCombined = mergeProps(
      {
        nodeid: element.id,
      },
      atomProps,
      context.extraProps || {},
      elementProps,
    )

    return (
      <RootComponent
        {...propsCombined}
        css={element.css ? css(element.css) : undefined}
      >
        {React.Children.count(renderedChildren)
          ? renderedChildren
          : propsCombined.children}
        {context.postChildrenRenderHook &&
          context.postChildrenRenderHook(element)}
      </RootComponent>
    )
  }

  // ... or just the children if there's no atom
  return renderedChildren
}

/**
 *  Handles the rendering of components
 */
const renderComponent: RenderHandler<ComponentFragment> = (
  component,
  context,
) => {
  if (!context) {
    throw new Error(
      'You need to have a RenderContext.Provider before Rendering Components',
    )
  }

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
