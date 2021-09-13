import {
  ElementFragment,
  ElementTreeGraphql,
  isElement,
} from '@codelab/frontend/modules/element'
import {
  RenderContext,
  RenderOutput,
} from '@codelab/frontend/presenter/container'
import { mergeProps } from '@codelab/shared/utils'
import { css } from '@emotion/react'
import { compose } from 'ramda'
import React, { ReactElement } from 'react'
import { HookElementWrapper } from '../hooks/HookElementWrapper'
import { reactComponentFactory } from '../reactComponentFactory'
import { RenderHandler } from '../types/RenderHandler'
import { RenderPipe, RenderPipeFactory } from '../types/RenderPipe'
import { evaluateRenderIfPropKey } from '../utils/evaluateRenderIfPropKey'

export const renderElement: RenderHandler = (element, context) => {
  if (!isElement(element)) {
    return null
  }

  // (1). All the prop-generating and prop-modifying pipes
  const propsPipeline = compose(
    basePropsPipe,
    persistedPropsPipe,
    extraPropsPipe,
    extraElementPropsPipe,
    hookPipe,
  )

  // (2). All the pipes that output ReactElements
  const renderPipeline = compose(
    conditionalRenderPipe,
    loopingRenderPipe,
    elementsComponentPipe,
    elementsAtomPipe,
  )

  // (3). Combine the 2 pipelines and add the final renderChildrenPipe
  const finalPipeline = compose(
    propsPipeline,
    renderPipeline,
  )(renderChildrenPipe)

  // (4). Render
  const renderResult = finalPipeline(element, context, {})

  // (5). Call the context.onRendered callback with the rendered result
  callOnRendered(renderResult, element, context)

  return renderResult
}

/**
 * Adds props which are universal for all elements
 */
const basePropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    return next(
      element,
      context,
      mergeProps(props, {
        nodeid: element.id,
        __node: element,
      }),
    )
  }

/**
 * Adds the persisted element props (element.props)
 */
const persistedPropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    try {
      return next(
        element,
        context,
        mergeProps(props, JSON.parse(element.props)),
      )
    } catch (e) {
      console.warn("Couldn't parse element props", element.props)

      return next(element, context, props)
    }
  }

/**
 * Adds context.extraProps
 */
const extraPropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    return next(
      element,
      context,
      context.extraProps ? mergeProps(props, context.extraProps) : props,
    )
  }

/**
 * Adds context.extraElementProps
 */
const extraElementPropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    if (
      context.extraElementProps &&
      context.extraElementProps[element.id] &&
      typeof context.extraElementProps[element.id] === 'object'
    ) {
      return next(
        element,
        context,
        mergeProps(props, context.extraElementProps[element.id]),
      )
    }

    return next(element, context, props)
  }

/**
 * Adds in props from element.hooks
 */
const hookPipe: RenderPipeFactory = (next) => (element, context, props) => {
  if (element.hooks?.length > 0) {
    return (
      // the key will cause the wrapper to be destroyed and re-rendered when we add/remove hooks, which will avoid react's error
      <HookElementWrapper
        key={element.hooks.length}
        hooks={element.hooks}
        renderChildren={(hookProps) => {
          console.log(hookProps)

          return next(element, context, mergeProps(props, hookProps))
        }}
      />
    )
  }

  return next(element, context, props)
}

/**
 * Evaluates the renderIfPropKey and stops the render pipeline if it evaluates to falsy
 */
const conditionalRenderPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    if (!evaluateRenderIfPropKey(element.renderIfPropKey, props)) {
      return null
    }

    return next(element, context, props)
  }

/**
 *  If element.renderForEachPropKey is defined, it maps the corresponding prop and calls next
 *  for each item in it, with the item itself as props
 */
const loopingRenderPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    if (!element.renderForEachPropKey) {
      return next(element, context, props)
    }

    const value = props[element.renderForEachPropKey]

    if (typeof value !== 'object') {
      return next(element, context, props)
    }

    if (!Array.isArray(value)) {
      return next(element, context, mergeProps(props, value))
    }

    return (
      <>
        {value.map((valueProps, i) => {
          console.log(
            mergeProps(props, valueProps, {
              key: `${props.key || element.id}-${i}`,
            }),
          )

          return next(
            element,
            context,
            mergeProps(props, valueProps, {
              key: `${props.key || element.id}-${i}`,
            }),
          )
        })}
      </>
    )
  }

/** If the element has a component it renders it, if not - calls next */
const elementsComponentPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const component = context.tree.getComponentOfElement(element.id)

    if (component) {
      return context.renderFactory(component, context)
    }

    return next(element, context, props)
  }

/**
 * If the element has an atom it renders it, if not - calls next
 */
const elementsAtomPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    if (!element.atom) {
      return next(element, context, props)
    }

    const [RootComponent, atomProps] = reactComponentFactory({
      atomType: element.atom.type,
      node: element,
    })

    if (!RootComponent) {
      return next(element, context, props)
    }

    const mergedProps = mergeProps(atomProps, props)

    return (
      <RootComponent
        {...mergedProps}
        css={element.css ? css(element.css) : undefined}
      >
        {next(element, context, mergedProps)}
      </RootComponent>
    )
  }

/**
 * Renders the elements children, this should be the last pipe
 */
const renderChildrenPipe: RenderPipe = (element, context, props) => {
  const childVertices = context.tree.getChildren(element.id)

  if (!childVertices || childVertices?.length === 0) {
    // Allow for a 'children' prop, but only if we have no regular children
    if (typeof props.children === 'string' && childVertices?.length === 0) {
      return props.children
    }

    // It's important to be undefined if we have no children to display,
    // since void components like input will throw an error if their children prop isn't undefined
    return undefined
  }

  return childVertices
    .map((child) => context.renderFactory(child, context))
    .filter((c): c is ReactElement => !!c)
}

const callOnRendered = (
  rendered: RenderOutput,
  element: ElementFragment,
  context: RenderContext<ElementTreeGraphql>,
) => {
  const renderCallback = context.onRendered

  if (renderCallback) {
    if (Array.isArray(rendered)) {
      rendered.forEach((r) => {
        console.log('rendered', r)
        renderCallback(r, element)
      })
    } else {
      renderCallback(rendered, element)
    }
  }
}
