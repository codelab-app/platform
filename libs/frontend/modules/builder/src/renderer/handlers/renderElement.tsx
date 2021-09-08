import {
  ElementFragment,
  ElementTreeGraphql,
  isElement,
} from '@codelab/frontend/modules/element'
import { RenderContext } from '@codelab/frontend/presenter/container'
import { mergeProps } from '@codelab/shared/utils'
import { css, jsx } from '@emotion/react'
import React, { ReactElement } from 'react'
import { HookElementWrapper } from '../hooks/HookElementWrapper'
import { reactComponentFactory } from '../reactComponentFactory'
import { RenderHandler } from '../types/RenderHandler'

const renderChildren = (
  element: ElementFragment,
  context: RenderContext<ElementTreeGraphql>,
) =>
  context.tree
    .getChildren(element.id)
    ?.map((child) => context.renderFactory(child, context))

type RenderMiddleware = (
  element: ElementFragment,
  props: Record<string, any>,
  context: RenderContext<ElementTreeGraphql>,
  next?: (
    element: ElementFragment,
    props: Record<string, any>,
    context: RenderContext<ElementTreeGraphql>,
  ) => ReactElement | null,
) => ReactElement | null

const renderComponentMiddleware: RenderMiddleware = (
  element,
  props,
  context,
  next,
) => {
  const component = context.tree.getComponentOfElement(element.id)

  if (component) {
    return context.renderFactory(component, context)
  }

  if (next) {
    return next(element, props, context)
  }

  return null
}

const finalRender = (
  RootComponent: any, // don't how to type this so that css prop doesn't make an error
  element: ElementFragment,
  props: Record<string, any>,
  context: RenderContext<ElementTreeGraphql>,
  children: Array<React.ReactElement>,
) => {
  const propsCombined = mergeProps(
    {
      nodeid: element.id,
      __node: element,
    }, // Default props for all elements
    context.extraProps ?? {}, // Global props from context
    JSON.parse(element.props), // The props we get from the database
    props,
    context.extraElementProps && context.extraElementProps[element.id], // Props we get from context for this element
  )


  return (
    <RootComponent {...propsCombined} css={element.css ? css(element.css) : undefined}>
      {/*
          It's important to be undefined if we have no children to display,
          since void components like input will throw an error if their children prop isn't undefined
          */}
      {children.length ? children : undefined}
    </RootComponent>
  )
}

const renderIfPropKeyMiddleware: RenderMiddleware = (
  element,
  props,
  context,
  next,
) => {
  // Don't render it if the renderIfPropKey is missing or falsy from the props
  if (
    element.renderIfPropKey &&
    (!props[element.renderIfPropKey] ||
      props[element.renderIfPropKey] === 'false')
  ) {
    return null
  }

  return next ? next(element, props, context)
}

const renderAtomMiddleware: RenderMiddleware = (element, context, next) => {
  // Render either the atom with children..
  if (element.atom) {
    const [RootComponent, atomProps] = reactComponentFactory({
      atomType: element.atom.type,
      node: element,
    })

    if (!RootComponent) {
      // If for some reason we can't get the component from the factory, just return the children
      return renderChildren(element, context)
    }


  }

  // ... or just the children if there's no atom
  return renderChildren(element, context)
}

const middlewares = [renderComponentMiddleware, renderAtomMiddleware]

export const renderElement: RenderHandler = (element, context) => {
  if (!isElement(element)) {
    return null
  }

  const render = (otherProps?: Record<string, any>) => {
    const finalProps = otherProps
      ? mergeProps(propsCombined, otherProps)
      : propsCombined

    // Don't render it if the renderIfPropKey is missing or falsy from the props
    if (
      element.renderIfPropKey &&
      (!finalProps[element.renderIfPropKey] ||
        finalProps[element.renderIfPropKey] === 'false')
    ) {
      return null
    }

    const children = []

    // If the element doesn't have children, see if there's a children property in the props and render it
    if (React.Children.count(renderedChildren) > 0) {
      children.push(renderedChildren)
    } else if (finalProps.children) {
      children.push(finalProps.children)
    }

    const rendered = (
      <RootComponent
        {...finalProps}
        css={element.css ? css(element.css) : undefined}
      >
        {/*
          It's important to be undefined if we have no children to display,
          since void components like input will throw an error if their children prop isn't undefined
          */}
        {children.length ? children : undefined}
      </RootComponent>
    )

    if (context.onRendered) {
      context.onRendered(rendered, element)
    }

    return rendered
  }

  if (element.hooks?.length > 0) {
    return (
      // the key will cause the wrapper to be destroyed and re-rendered when we add/remove hooks, which will avoid react's error
      <HookElementWrapper
        key={element.hooks.length}
        hooks={element.hooks}
        renderChildren={(hookProps) => render(hookProps)}
      />
    )
  }

  return render()
}
