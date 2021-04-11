import { AtomType, NodeA, notify } from '@codelab/frontend/shared'
import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'
import { elementTypeMap } from './elementTypeMap'
import { ComponentHandlers } from './useComponentHandlers'

interface ElementParameterFactoryInput<TNode extends NodeA = NodeA> {
  node: TNode
  // Function hooks injected to pass to handlers
  handlers: ComponentHandlers
}

/**
 * This is a mapping of prop transformers for certain elements.
 * Add a transformer here if you want to modify or add props to a specific element type
 */
export const elementsPropTransformers: {
  [K in AtomType]?: (
    input: ElementParameterFactoryInput & { props: Record<string, any> },
  ) => any
} = {
  [AtomType.ReactRglItem]: ({ node, props }) => {
    // Currently the react-grid-layout library, for some reason, re-renders the layout
    // only if it detects a change in the key of the child, and doesn't care about the data-grid property
    // So, a workaround is to incorporate the data-grid property into the key to make sure we rerender
    // There is a fix here https://github.com/STRML/react-grid-layout/issues/718, but for some reason it's not merged into the main repo

    return {
      ...props,
      key: props['data-grid'] ? JSON.stringify(props['data-grid']) : node.id,
      'data-id': node.id,
    }
  },
  [AtomType.ReactRglResponsiveContainer]: ({ handlers, props }) => ({
    ...props,
    // onResizeStop: onResizeStop(handlers),
    style: {
      width: '200px',
      height: '200px',
    },
  }),
}

export const elementParameterFactory = <TNode extends NodeA>({
  node,
  handlers,
}: ElementParameterFactoryInput<TNode>): [
  React.ComponentType<any> | string | null,
  Record<string, any>,
] => {
  if (!node) return [null, {}]

  const { type } = node

  const component = elementTypeMap[type]

  if (!component) {
    notify({
      type: 'error',
      title: `Missing element of type ${type} in element type map`,
    })

    return [null, {}]
  }

  let props = {
    ...node.props,
    // Add vertexType to attribute
    'data-vertex-type': node.type,
    'data-id': node.id,
    // https://stackoverflow.com/questions/41645325/mouseover-and-mouseout-trigger-multiple-times
    //
    // Use `onMouseEnter` instead of `onMouseOver`
    // `onMouseLeave` instead of `onMouseOut`
    //
    // Enter is only triggered once when we enter the box
    // Otherwise `onMouseOver` will fire endless as it toggles between current & children element
    onMouseEnter: (e: MouseEvent) => {
      // console.log('mouseEnter', e)

      return handlers?.showHoverOverlay(node.id)
    },
    // We want to manually re-trigger the `onMouseEnter` of the parent
    onMouseLeave: (e: MouseEvent) => {
      // console.log('mouseLeave', e)
      // https://stackoverflow.com/questions/28900077/why-is-event-target-not-element-in-typescript
      const currentTarget = e.currentTarget as HTMLElement
      const parentNode = currentTarget.parentNode as HTMLElement

      // https://stackoverflow.com/questions/39065010/why-react-event-handler-is-not-called-on-dispatchevent

      // console.log(parentNode, parentNode.dataset['vertex-type'])

      /**
       * This checks that we're hovering over a builder component
       */
      if (parentNode && parentNode.dataset.vertexType) {
        return ReactTestUtils.Simulate.mouseEnter(parentNode as Element)
      }

      return handlers?.resetHoverOverlay()
    },
    onClick: (e: MouseEvent) => {
      // We want to show overlay for current node
      e.stopPropagation()

      //Open inspector and the click overview
      handlers?.selectPageElement(node.id)
    },
  } as Record<string, any>

  const propsTransformer = elementsPropTransformers[type]

  if (propsTransformer) {
    props = propsTransformer({ node, handlers, props })
  }

  return [component, props]
}
