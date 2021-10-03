import {
  ElementFragment,
  ElementTreeGraphql,
  isElement,
} from '@codelab/frontend/modules/element'
import {
  RenderContext,
  RenderOutput,
} from '@codelab/frontend/presenter/container'
import { TypeKind } from '@codelab/shared/codegen/graphql'
import { mergeProps } from '@codelab/shared/utils'
import { css } from '@emotion/react'
import { merge } from 'lodash'
import { compose } from 'ramda'
import React, { ReactElement, ReactNode } from 'react'
import { HookElementWrapper } from '../hooks/HookElementWrapper'
import { reactComponentFactory } from '../reactComponentFactory'
import { RenderHandler } from '../types/RenderHandler'
import { RenderPipe, RenderPipeFactory } from '../types/RenderPipe'
import { applyBinding } from '../utils/applyBinding'
import { evalCss } from '../utils/evalCss'
import { evaluateRenderIfPropKey } from '../utils/evaluateRenderIfPropKey'
import { getPropsByTypeKind } from '../utils/getPropsByTypeKind'
import { transformPropsToComponent } from '../utils/tranformPropsToComponent'

// TODO: split this in multiple files

export const renderElement: RenderHandler = (element, context) => {
  if (!isElement(element)) {
    return null
  }

  return pipeline(element, context, {})
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
        key: element.id,
      }),
    )
  }

/**
 * Adds the persisted element props (element.props)
 */
const reactNodePipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const { typeKindsById } = context

    const reactNodeProps = getPropsByTypeKind(
      props,
      TypeKind.ReactNodeType,
      typeKindsById,
    )

    const transformedReactNodeProps = transformPropsToComponent(
      reactNodeProps,
      context,
      true,
      props,
    )

    return next(element, context, mergeProps(props, transformedReactNodeProps))
  }

const renderPropsRenderPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const { typeKindsById } = context

    const renderProps = getPropsByTypeKind(
      props,
      TypeKind.RenderPropsType,
      typeKindsById,
    )

    const transformedRenderProps = transformPropsToComponent(
      renderProps,
      context,
      false,
      props,
    )

    return next(element, context, mergeProps(props, transformedRenderProps))
  }

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
        key={`${props.key ?? element.id}-${element.hooks.length}`}
        hooks={element.hooks}
        inputProps={props}
        renderChildren={(hookProps) => {
          return next(element, context, mergeProps(props, hookProps))
        }}
      />
    )
  }

  return next(element, context, props)
}

/**
 * Adds the prop map bindings to the context
 */
const propMapBindingsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const extraProps: Record<string, Record<string, any>> = {
      ...context.extraElementProps,
    }

    let currentElementProps: Record<string, any> = {}

    if (element.propMapBindings && element.propMapBindings.length > 0) {
      for (const binding of element.propMapBindings) {
        if (binding.targetElementId) {
          extraProps[binding.targetElementId] = applyBinding(
            extraProps[binding.targetElementId] ?? {},
            props,
            binding,
          )
        } else {
          currentElementProps = applyBinding(
            currentElementProps,
            props,
            binding,
          )
        }
      }
    }

    return next(
      element,
      {
        ...context,
        extraElementProps: extraProps,
      },
      mergeProps(props, currentElementProps),
    )
  }

/*
 *
 * Evaluates the prop transformation js
 */

const propTransformationJsPipe: RenderPipeFactory =
  (next) => (element, context, initialProps) => {
    const transformationJs = element.propTransformationJs

    if (transformationJs) {
      try {
        const props = { ...initialProps }
        // eslint-disable-next-line no-eval
        const transform = eval(`(${transformationJs})`) // the parentheses allow us to return a function from eval

        if (typeof transform === 'function') {
          const newProps = transform(props)

          if (typeof newProps === 'object' && newProps) {
            return next(element, context, mergeProps(props, newProps))
          }
        }
      } catch (e) {
        console.warn('Error while evaluating prop transformation', e)
      }
    }

    return next(element, context, initialProps)
  }

/**
 * Evaluates the renderIfPropKey and stops the render pipeline if it evaluates to falsy
 */
const conditionalRenderPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    if (!evaluateRenderIfPropKey(element.renderIfPropKey, props)) {
      onRendered(null, element, context)

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
      const rootElement = context.tree.getComponentRootElement(component.id)

      return context.renderFactory(
        component,
        merge(context, {
          extraElementProps: {
            [rootElement.id]: props,
          },
        }),
      )
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

    if (context.inspect) {
      console.group(element.id, element.name)
    }

    const rendered = (
      <RootComponent
        {...mergedProps}
        css={element.css ? css(evalCss(mergedProps, element.css)) : undefined}
      >
        {next(element, context, mergedProps)}
      </RootComponent>
    )

    onRendered(rendered, element, context)

    if (context.inspect) {
      console.groupEnd()
    }

    return rendered
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

  const rendered = childVertices
    .map((child) => context.renderFactory(child, context))
    .filter((c): c is ReactElement => !!c)

  if (!rendered?.length) {
    return undefined
  }

  // If we have only one children, just return it.
  // Ant Design doesn't handle array children well in some cases, like Forms
  if (rendered.length === 1) {
    return rendered[0]
  }

  return rendered
}

const onRendered = (
  rendered: RenderOutput,
  element: ElementFragment,
  context: RenderContext<ElementTreeGraphql>,
) => {
  const renderCallback = context.onRendered

  const callRendered = (r: ReactNode) => {
    if (context.inspect) {
      console.dir({ element: { ...element }, rendered: r })
    }

    if (renderCallback) {
      renderCallback(r, element)
    }
  }

  if (Array.isArray(rendered)) {
    rendered.forEach((r) => callRendered(r))
  } else {
    callRendered(rendered)
  }
}

//
// Construct the pipeline:
//

// (1). Base props
const propsPipeline = compose(
  basePropsPipe,
  persistedPropsPipe,
  extraElementPropsPipe,
)

// (2).Prop transformers
const propModifiersPipeline = compose(
  hookPipe,
  propTransformationJsPipe,
  loopingRenderPipe,
  propMapBindingsPipe, // We want the propMapBindings to be last, so that we can pass any transformed/modified props down
)

// (3). All the pipes that output ReactElements
const renderPipeline = compose(
  renderPropsRenderPipe,
  reactNodePipe,
  conditionalRenderPipe,
  elementsComponentPipe,
  elementsAtomPipe,
)

// (4). Combine the pipelines and add the final renderChildrenPipe
const pipeline = compose(
  propsPipeline,
  propModifiersPipeline,
  extraPropsPipe, // here are our 'global' builder props, which must override all other props, since we override onClick here
  renderPipeline,
)(renderChildrenPipe)
