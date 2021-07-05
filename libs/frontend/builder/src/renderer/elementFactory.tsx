import { __AtomFragment, AtomType } from '@codelab/codegen/graphql'
import { CytoscapeNode, NodeBase, notify } from '@codelab/frontend/shared'
import React from 'react'
import { atomTypeElementFactory } from './atomTypeElementFactory'

export interface RenderHandlers {
  handleMouseEnter: (id: string) => any
  handleMouseLeave: (id: string) => any
  handleClick: (id: string) => any
}

interface AtomElementFactoryProps<TNode extends NodeBase = CytoscapeNode> {
  atom: __AtomFragment
  node: TNode
  // Function hooks injected to pass to handlers
  handlers: RenderHandlers
}

/**
 * This is a mapping of prop transformers for certain elements.
 * Add a transformer here if you want to modify or add props to a specific element type
 */
export const elementsPropTransformers: {
  [K in AtomType]?: (
    input: AtomElementFactoryProps & { props: Record<string, any> },
  ) => any
} = {
  [AtomType.AntDesignRglItem]: ({ node, props }) => {
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
  [AtomType.AntDesignRglResponsiveContainer]: ({ props }) => ({
    ...props,
    // onResizeStop: onResizeStop(handlers),
    style: {
      width: '200px',
      height: '200px',
    },
  }),
  [AtomType.ReactFragment]: ({ props: { key } }) => ({ key }), // Do not pass in any props for fragments, except key, because it creates an error
}

const commonProps = (node: CytoscapeNode, handlers: RenderHandlers) => ({
  'data-id': node.id,
  'data-node-type': node.nodeType,
  key: node.id,
  // https://stackoverflow.com/questions/41645325/mouseover-and-mouseout-trigger-multiple-times
  //
  // Use `onMouseEnter` instead of `onMouseOver`
  // `onMouseLeave` instead of `onMouseOut`
  //
  // Enter is only triggered once when we enter the box
  // Otherwise `onMouseOver` will fire endless as it toggles between current & children element
  onMouseEnter: () => {
    return handlers?.handleMouseEnter(node.id)
  },
  // We want to manually re-trigger the `onMouseEnter` of the parent
  onMouseLeave: (e: MouseEvent) => {
    return handlers?.handleMouseLeave(node.id)
  },
  onClick: (e: MouseEvent) => {
    if (handlers?.handleClick) {
      if (e.stopPropagation) {
        e.stopPropagation()
      }

      if (e.stopImmediatePropagation) {
        e.stopImmediatePropagation()
      }

      return handlers.handleClick(node.id)
    }
  },
  className: 'Builder-none',
})

/**
 * Creates a Element and props out of a node and an atom
 * Pass in handlers to modify the behavior of the rendered HTML element
 */
export const elementFactory = <TNode extends CytoscapeNode>({
  atom,
  node,
  handlers,
}: AtomElementFactoryProps<TNode>): [
  React.ComponentType<any> | string | null,
  Record<string, any>,
] => {
  if (!node) {
    return [null, {}]
  }

  const type = atom.type
  const component = atomTypeElementFactory(type)

  if (!component) {
    notify({
      type: 'error',
      title: `Missing element of type ${type} in element type map`,
    })

    return [null, {}]
  }

  let props = commonProps(node, handlers)
  const propsTransformer = elementsPropTransformers[type]

  if (propsTransformer) {
    props = propsTransformer({ atom, node, handlers, props })
  }

  return [component, props]
}
