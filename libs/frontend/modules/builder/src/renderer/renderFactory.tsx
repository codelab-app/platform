import { isElement, RenderNode } from '@codelab/frontend/abstract/props'
import {
  RenderProvider,
  useRenderContext,
} from '@codelab/frontend/presenter/container'
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
  props: React.PropsWithChildren<
    {
      __node: TNode
    } & Record<string, any>
  >,
) => any

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
const RenderElement: RenderHandler = ({ __node: element, ...props }) => {
  const runtimeProps = props
  const context = useRenderContext()

  const renderedChildren = context.tree
    .getChildren(element.id)
    ?.map((child) => renderFactory(child))
    .filter((c): c is ReactElement => !!c)

  const component = context.tree.getComponentOfElement(element.id)

  if (component) {
    return renderFactory(component)
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

    let propsCombined = mergeProps(
      atomProps,
      context.extraProps || {},
      elementProps,
      runtimeProps,
    )

    if (context.nodePropsMappers) {
      propsCombined = context.nodePropsMappers.reduce(
        (acc, mapper) => mapper(acc, element),
        propsCombined,
      )
    }

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
const RenderComponent: RenderHandler<ComponentFragment> = ({
  __node: component,
  ...props
}) => {
  const runtimeProps = props
  const context = useRenderContext()

  if (!context) {
    throw new Error(
      'You need to have a RenderContext.Provider before Rendering Components',
    )
  }

  const rootElement = context.tree.getComponentRootElement(component.id)

  if (!rootElement) {
    return null
  }

  const children = renderFactory(rootElement)

  // data-component-id is to be able to distinguish regular elements and elements belonging to a component
  // we need this because we must not allow selection and editing of a component element inside a page builder
  return (
    <RenderProvider
      context={{
        ...context,
        extraProps: {
          ...context.extraProps,
          'data-component-id': component.id,
        },
      }}
    >
      {/* Make sure we pass the props we get down */}
      {React.Children.map(children, (child) =>
        child ? React.cloneElement(child, runtimeProps) : child,
      )}
    </RenderProvider>
  )
}

/**
 * Creates a React Component from a {@link RenderNode}
 */
export const renderFactory = (node: RenderNode | undefined | null) => {
  if (!node) {
    return null
  }

  switch (node.__typename) {
    case 'Element':
      return <>{RenderElement({ __node: node })}</>
    case 'Component':
      return <>{RenderComponent({ __node: node })}</>
    default:
      throw new Error(`Can't render node of type ${(node as any)?.__typename}`)
  }
}
